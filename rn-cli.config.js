const blacklist = require('metro/src/blacklist');
module.exports = {
	getBlacklistRE() {
		return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/]);
	  },
}

// rm node_modules/react-native/local-cli/core/__fixtures__/files/package.json