var webApi = require("../utils/webApi"),
	_ = require("lodash"),
	exchange = require("../queue/exchange"),
	producer = require('../producer/storyProducer');

var stories = {
	fetchTopStories: function(){
		console.log("Starting refresh stories job.............");
		//hnservice.saveDocument("Dummy document");
		webApi.fetchTopStories()
		.then(function(storyIds){
			console.log('story ids');
			console.log(storyIds);
			produceStoryMessages(storyIds);
			console.log("finished refresh stories job..............");
		})
		.catch(function(){
			console.log("error occurred while fetching stories");
			console.log("finished refresh stories job.............");
		})
		.done();
	}
};


function produceStoryMessages(storyIds){
	console.log("produce story messages called");
	console.log(exchange);
	var ex = exchange.get();
	if( ex ){
		console.log("producing messages now");
		_.each(storyIds, function(id){
			producer.produce(ex, id);
		}, this);	
	}
}

module.exports = stories;