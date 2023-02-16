const path = require('path');
const { merge } = require('webpack-merge');
const wpScriptsConfig = require('@wordpress/scripts/config/webpack.config');
const version = require('./package.json').version; // never require full config!

const nfdCloudPatternsWebpackConfig = {
	output: {
		path: path.resolve(process.cwd(), `build/${version}`),
		library: ['newfold', 'WonderBlocks', '[name]'],
		libraryTarget: 'window',
	},
};

module.exports = merge(wpScriptsConfig, nfdCloudPatternsWebpackConfig);
