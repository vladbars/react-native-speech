const {createRunOncePlugin} = require('@expo/config-plugins');

const withReactNativeSpeech = config => {
  return config;
};

const PACKAGE = require('../../package.json');
module.exports = createRunOncePlugin(
  withReactNativeSpeech,
  PACKAGE.name,
  PACKAGE.version,
);
