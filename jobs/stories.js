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
	var ex = exchange.get();
	if( ex ){
		// publish all the story ids
		producer.produce(ex, {
			type: "TOP_STORIES",
			ids: storyIds
		});

		_.each(storyIds, function(id){
			producer.produce(ex, {id: id});
		}, this);	
	}
}

module.exports = stories;