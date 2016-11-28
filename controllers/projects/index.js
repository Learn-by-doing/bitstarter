'use strict';

module.exports = function(app) {

	require('./add')(app);
	require('./delete')(app);
	require('./edit')(app);
	require('./view')(app);
};
