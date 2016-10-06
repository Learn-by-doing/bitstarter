'use strict';

module.exports = function(app) {

	require('./home')(app);
	require('./login')(app);
	require('./logout')(app);
};
