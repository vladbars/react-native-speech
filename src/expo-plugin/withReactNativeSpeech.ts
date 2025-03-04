import {type ConfigPlugin, createRunOncePlugin} from '@expo/config-plugins';

const PACKAGE = require('../../../package.json');

const withReactNativeSpeech: ConfigPlugin = config => {
  return config;
};

export default createRunOncePlugin(
  withReactNativeSpeech,
  PACKAGE.name,
  PACKAGE.version,
);
