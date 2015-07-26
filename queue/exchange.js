var amqp = require("amqp"),
	Q = require("q"),
	config = require("../config/messagingConfig");
var exchange ;

exports.getExchange = function(){
	return exchange;

};
/**
 * [create description]
 * @return {Q.Promise}
 */
exports.create = function(connection){
	var deferred = Q.defer();
		connection.exchange(config.STORY_EXCHANGE, config.exchangeProps, function(exchange){
		 	exchange = exchange;
		 	deferred.resolve(exchange);
		});

	return deferred.promise;
};

