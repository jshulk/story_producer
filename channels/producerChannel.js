var Q = require("q"),
	chan;


exports.create = function(amqpConnection){
	var deferred = Q.defer();
	amqpConnection.createChannel()
	.then(function(ch){
		chan = ch;
		deferred.resolve(chan);
	})
	.catch(function(){
		deferred.reject({message: "could not create channel"});
	});

	return deferred.promise;
}

exports.get = function(){
	return chan;
}