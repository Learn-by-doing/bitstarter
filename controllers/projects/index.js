'use strict';

module.exports = function(app) {

	require('./add')(app);
	require('./edit')(app);
	require('./delete')(app);
};
