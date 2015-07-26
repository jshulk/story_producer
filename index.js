
var bootstrap = require("./queue/bootstrap");
var producer = require("./producer/storyProducer");
	
	bootstrap.init()
	.then(function(results){
		configureJobs(results.exchange);
	})
	.catch(function(error){
		console.log(error.msg);
	});

function configureJobs(exchange){
	console.log("Jobs configured");
	producer.produce(exchange, "This is test message");
}
// 3. configure job and start it
