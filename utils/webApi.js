var Q = require("q"),
	request = require('superagent'),
	appConstants = require("../constants/appConstants");

module.exports = {
	fetchTopStories: function(){

		var deferred = Q.defer();
		request(appConstants.TOP_STORIES_URL)
		.end(function(error, response){
			if( error ){
				deferred.reject(error);
			} else {
				deferred.resolve(response.body);
			}
		});

		return deferred.promise;
	}
};