var config = require("../config/messagingConfig");

exports.produce = function(exchange, message){
	exchange.publish(config.ROUTING_KEY, message, config.publishProps, function(value){
		console.log("publication was "+ value);
	});
}