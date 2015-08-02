var amqp = require("amqplib"),
	config = require('../config/messagingConfig'),
	Q = require("q");
var connection;

module.exports = {
	getConnection: function(){
		return connection;
	},
	create: function(){
		var deferred = Q.defer();
		amqp.connect(config.connectionProps.url)
		.then(function(conn){
			connection = conn;
			//binding for interrupt event.
			process.once("SIGINT", conn.close.bind(conn));
			deferred.resolve(connection);
		})
		.catch(function(err){
			console.log("connection error");
			console.log(err);
			deferred.reject({message: "Could not establish connection"});
		});
		return deferred.promise;
	}

};