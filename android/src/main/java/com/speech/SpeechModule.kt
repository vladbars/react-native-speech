package com.speech

import java.util.UUID
import java.util.Locale
import android.os.Bundle
import android.speech.tts.Voice
import android.annotation.SuppressLint
import android.speech.tts.TextToSpeech
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.ReadableMap
import android.speech.tts.UtteranceProgressListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = SpeechModule.NAME)
class SpeechModule(reactContext: ReactApplicationContext) :
  NativeSpeechSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "Speech"

    @SuppressLint("ConstantLocale")
    private val defaultOptions: Map<String, Any> = mapOf(
      "rate" to 0.5f,
      "pitch" to 1.0f,
      "volume" to 1.0f,
      "language" to Locale.getDefault().toLanguageTag()
    )
  }

  private lateinit var synthesizer: TextToSpeech

  private var isInitialized = false
  private var isInitializing = false
  private val pendingOperations = mutableListOf<Pair<() -> Unit, Promise>>()

  private var globalOptions: MutableMap<String, Any> = defaultOptions.toMutableMap()

  init {
    initializeTTS()
  }

  private fun processPendingOperations() {
    val operations = ArrayList(pendingOperations)
    pendingOperations.clear()
    for ((operation, promise) in operations) {
      try {
        operation()
      } catch (e: Exception) {
        promise.reject("speech_error", e.message ?: "Unknown error")
      }
    }
  }

  private fun rejectPendingOperations() {
    val operations = ArrayList(pendingOperations)
    pendingOperations.clear()
    for ((_, promise) in operations) {
      promise.reject("speech_error", "Failed to initialize TTS engine")
    }
  }

  private fun getSpeechParams(): Bundle {
    val params = Bundle()
    val volume = (globalOptions["volume"] as? Number)?.toFloat() ?: 1.0f
    params.putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, volume)
    return params
  }

  private fun getEventData(utteranceId: String): WritableMap {
    return Arguments.createMap().apply {
      putInt("id", utteranceId.hashCode())
    }
  }

  private fun getVoiceItem(voice: Voice): ReadableMap {
    val quality = if (voice.quality > Voice.QUALITY_NORMAL) "Enhanced" else "Default"

    return Arguments.createMap().apply {
      putString("quality", quality)
      putString("name", voice.name)
      putString("identifier", voice.name)
      putString("language", voice.locale.toLanguageTag())
    }
  }

  private fun getUniqueID(): String {
    return UUID.randomUUID().toString()
  }

  private fun initializeTTS() {
    if (isInitializing) return
    isInitializing = true

    synthesizer = TextToSpeech(reactApplicationContext) { status ->
      isInitialized = status == TextToSpeech.SUCCESS
      isInitializing = false

      if (isInitialized) {
        synthesizer.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
          override fun onStart(utteranceId: String) {
            emitOnStart(getEventData(utteranceId))
          }

          override fun onDone(utteranceId: String) {
            emitOnFinish(getEventData(utteranceId))
          }

          override fun onError(utteranceId: String) {
            emitOnError(getEventData(utteranceId))
          }

          override fun onStop(utteranceId: String, interrupted: Boolean) {
            emitOnStopped(getEventData(utteranceId))
          }

          override fun onRangeStart(utteranceId: String, start: Int, end: Int, frame: Int) {
            val data = getEventData(utteranceId).apply {
              putInt("length", end - start)
              putInt("location", start)
            }
            emitOnProgress(data)
          }
        })
        applyGlobalOptions()
        processPendingOperations()
      } else {
        rejectPendingOperations()
      }
    }
  }

  private fun ensureInitialized(promise: Promise, operation: () -> Unit) {
    when {
      isInitialized -> {
        try {
          operation()
        } catch (e: Exception) {
          promise.reject("speech_error", e.message ?: "Unknown error")
        }
      }
      isInitializing -> {
        pendingOperations.add(Pair(operation, promise))
      }
      else -> {
        pendingOperations.add(Pair(operation, promise))
        initializeTTS()
      }
    }
  }

  private fun applyGlobalOptions() {
    globalOptions["language"]?.let {
      val locale = Locale.forLanguageTag(it as String)
      synthesizer.setLanguage(locale)
    }
    globalOptions["pitch"]?.let {
      synthesizer.setPitch(it as Float)
    }
    globalOptions["rate"]?.let {
      synthesizer.setSpeechRate(it as Float)
    }
    globalOptions["voice"]?.let { voiceId ->
      synthesizer.voices?.forEach { voice ->
        if (voice.name == voiceId) {
          synthesizer.setVoice(voice)
          return@forEach
        }
      }
    }
  }

  private fun getValidatedOptions(options: ReadableMap): Map<String, Any> {
    val validated = mutableMapOf<String, Any>()
    if (options.hasKey("voice")) {
      validated["voice"] = options.getString("voice") ?: ""
    }
    if (options.hasKey("language")) {
      validated["language"] = options.getString("language")
        ?: Locale.getDefault().toLanguageTag()
    }
    if (options.hasKey("pitch")) {
      validated["pitch"] = options.getDouble("pitch").toFloat().coerceIn(0.1f, 2.0f)
    }
    if (options.hasKey("volume")) {
      validated["volume"] = options.getDouble("volume").toFloat().coerceIn(0f, 1.0f)
    }
    if (options.hasKey("rate")) {
      validated["rate"] = options.getDouble("rate").toFloat().coerceIn(0.1f, 2.0f)
    }
    return validated
  }

  override fun initialize(options: ReadableMap) {
    val newOptions = globalOptions.toMutableMap()
    newOptions.putAll(getValidatedOptions(options))
    globalOptions = newOptions
    applyGlobalOptions()
  }

  override fun reset() {
    globalOptions = defaultOptions.toMutableMap()
    applyGlobalOptions()
  }

  override fun getAvailableVoices(language: String?, promise: Promise) {
    ensureInitialized(promise) {
      val voicesArray = Arguments.createArray()
      val voices = synthesizer.voices

      if (voices == null) {
        promise.resolve(voicesArray)
        return@ensureInitialized
      }
      if (language != null) {
        voices.forEach { voice ->
          val lcLanguage = language.lowercase(Locale.getDefault())
          val voiceLanguage = voice.locale.toLanguageTag().lowercase(Locale.getDefault())
          if (voiceLanguage.startsWith(lcLanguage)) {
            voicesArray.pushMap(getVoiceItem(voice))
          }
        }
        if (voicesArray.size() == 0) {
          voices.forEach { voice ->
            val lowerCaseLanguage = language.lowercase(Locale.getDefault())
            val voiceLanguage = voice.locale.toLanguageTag().lowercase(Locale.getDefault())
            if (voiceLanguage.contains(lowerCaseLanguage)) {
              voicesArray.pushMap(getVoiceItem(voice))
            }
          }
        }
      } else {
        voices.forEach { voice ->
          voicesArray.pushMap(getVoiceItem(voice))
        }
      }
      promise.resolve(voicesArray)
    }
  }

  override fun isSpeaking(promise: Promise) {
    ensureInitialized(promise) {
      promise.resolve(synthesizer.isSpeaking)
    }
  }

  override fun stop(promise: Promise) {
    ensureInitialized(promise) {
      if (synthesizer.isSpeaking) {
        synthesizer.stop()
      }
      promise.resolve(null)
    }
  }

  override fun pause(promise: Promise) {
    ensureInitialized(promise) {
      promise.resolve(false)
    }
  }

  override fun resume(promise: Promise) {
    ensureInitialized(promise) {
      promise.resolve(false)
    }
  }

  override fun speak(text: String?, promise: Promise) {
    if (text == null) {
      promise.reject("speech_error", "Text cannot be null")
      return
    }
    ensureInitialized(promise) {
      if (synthesizer.isSpeaking) {
        synthesizer.stop()
      }
      val params = getSpeechParams()
      val utteranceId = getUniqueID()
      synthesizer.speak(text, TextToSpeech.QUEUE_FLUSH, params, utteranceId)
      promise.resolve(null)
    }
  }

  override fun speakWithOptions(text: String?, options: ReadableMap, promise: Promise) {
    if (text == null) {
      promise.reject("speech_error", "Text cannot be null")
      return
    }
    ensureInitialized(promise) {
      if (synthesizer.isSpeaking) {
        synthesizer.stop()
      }
      val newOptions = globalOptions.toMutableMap().apply {
        putAll(getValidatedOptions(options))
      }
      globalOptions = newOptions
      applyGlobalOptions()

      val params = getSpeechParams()
      val utteranceId = getUniqueID()
      synthesizer.speak(text, TextToSpeech.QUEUE_FLUSH, params, utteranceId)
      promise.resolve(null)
    }
  }

  override fun invalidate() {
    super.invalidate()
    if (::synthesizer.isInitialized) {
      synthesizer.stop()
      synthesizer.shutdown()
    }
  }
}
