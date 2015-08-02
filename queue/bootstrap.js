var async = require("async"),
	Q = require("q"),
	exchange = require("./exchange"),
	connection = require("./connection"),
	producerChannel = require("../channels/producerChannel");
	queue = require("./storyQueue");

exports.init = function(){
		var deferred = Q.defer();
		var tasks = [
			createConnection,
			createChannel,
			createExchange,
			configureQueue,
			bindQueue
		];

		async.waterfall(tasks, function(err, results){
			if( err ){
				deferred.reject(err);
			} else {
				deferred.resolve(results);
			}
		});

		return deferred.promise;
}

function createConnection(callback){
	connection.create()
	.then(function(connection){
		callback(null, connection);
	})
	.catch(function(){
		callback({msg: "Could not establish connection"}, null);
	})
	.done();
	
}

function createExchange(channel, callback){
	exchange.create(channel)
	.then(function(exchange){
		callback(null, channel);
	})
	.catch(function(){
		callback({msg: "could not create exchange"}, null);
	});
}



function configureQueue(channel, callback){
	queue.configure(channel)
	.then(function(queue){
		callback(null, channel);
	})
	.catch(function(){
		callback({msg: "could not create queue"}, null);
	});
}

function createChannel(amqpConnection, callback){

	producerChannel.create(amqpConnection)
	.then(function(chan){
		callback(null, chan);
	})
	.catch(function(err){
		callback(err, null);
	})
}

function bindQueue(channel, callback){
	channel.bindQueue(config.STORY_QUEUE, config.STORY_EXCHANGE, config.ROUTING_KEY)
	.then(function(){
		callback(null, channel);
	})
	.catch(function(err){
		callback(err, null);
	})
}