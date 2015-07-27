
var bootstrap = require("./queue/bootstrap");
var producer = require("./producer/storyProducer");
var jobUtils = require("./utils/jobUtils");
	
	bootstrap.init()
	.then(function(results){
		configureJobs(results.exchange);
	})
	.catch(function(error){
		console.log(error.msg);
	});

function configureJobs(exchange){
	console.log("configuring jobs");
	//producer.produce(exchange, "This is test message");
	jobUtils.configureStoriesJob();
}
// 3. configure job and start it
