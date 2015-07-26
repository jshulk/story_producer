var amqp = require("amqp"),
	Q = require("q"),
	messagingConfig = require("../config/messagingConfig");
var exchange ;

exports.getExchange: function(){
	return exchange;

};
/**
 * [create description]
 * @return {Q.Promise}
 */
exports.create = function(connection){
	var deferred = Q.defer();
		connection.exchange(messagingConfig.STORY_EXCHANGE, messagingConfig.exchangeProps, function(exchange){
		 	exchange = exchange;
		 	deferred.resolve(exchange);
		});

	return deferred.promise;
};

