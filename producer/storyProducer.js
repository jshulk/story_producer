var config = require("../config/messagingConfig");

exports.produce = function(exchange, message){
	exchange.publish(config.ROUTING_KEY, message, {}, function(value){
		console.log("publication was "+ value);
	});
}