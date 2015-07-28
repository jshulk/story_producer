var amqp = require("amqp"),
	Q = require("q"),
	config = require("../config/messagingConfig");
var ex ;

exports.get = function(){
	return ex;

};
/**
 * [create description]
 * @return {Q.Promise}
 */
exports.create = function(connection){
	var deferred = Q.defer();
		connection.exchange(config.STORY_EXCHANGE, config.exchangeProps, function(exchange){
		 	ex = exchange;
		 	deferred.resolve(exchange);
		});

	return deferred.promise;
};

