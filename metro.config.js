const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

// pastikan resolver.assetExts ada dan tambahkan 'bin'
if (Array.isArray(config.resolver?.assetExts)) {
  config.resolver.assetExts = Array.from(new Set([...config.resolver.assetExts, 'bin']));
} else {
  config.resolver = {
    ...(config.resolver || {}),
    assetExts: ['bin'],
  };
}

module.exports = config;