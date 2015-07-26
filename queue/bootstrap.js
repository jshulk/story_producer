var async = require("async"),
	Q = require("q"),
	exchange = require("./exchange"),
	connection = require("./connection"),
	queue = require("./storyQueue");

exports.init = function(){
		var deferred = Q.defer();
		var tasks = [
			createConnection,
			createExchange,
			createQueue
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
	});
	
}

function createExchange(connection, callback){
	exchange.create(connection)
	.then(function(exchange){
		callback(null, connection, exchange);
	})
	.catch(function(){
		callback({msg: "could not create exchange"}, null);
	});
}



function configureQueue(connection, exchange, callback){
	queue.configure(connection)
	.then(function(queue){
		callback(null, queue);
	})
	.catch(function(){
		callback({msg: "could not create queue"}, null);
	});
}