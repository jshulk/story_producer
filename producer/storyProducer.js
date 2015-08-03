var config = require("../config/messagingConfig"),
	producerChannel = require("../channels/producerChannel");

exports.produce = function(message){
	var channel = producerChannel.get();

	channel.publish(config.STORY_EXCHANGE, config.ROUTING_KEY, new Buffer(JSON.stringify(message)));
	
}