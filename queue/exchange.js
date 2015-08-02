var amqp = require("amqp"),
	Q = require("q"),
	config = require("../config/messagingConfig");
var exchange ;

exports.get = function(){
	return exchange;

};
/**
 * [create description]
 * @return {Q.Promise}
 */
exports.create = function(channel){
	var deferred = Q.defer();

	channel.assertExchange(config.STORY_EXCHANGE, config.exchangeProps.type, {
		durable: config.exchangeProps.durable
	})
	.then(function(ex){
		exchange = ex;
		deferred.resolve(exchange)
	})
	.catch(function(err){
		deferred.reject(err);
	});

	return deferred.promise;
};

