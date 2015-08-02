var webApi = require("../utils/webApi"),
	_ = require("lodash"),
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
		// publish all the story ids
		console.log("published top story ids");
		producer.produce({
			type: "TOP_STORIES",
			ids: storyIds
		});

		_.each(storyIds, function(id){
			producer.produce({id: id});
		}, this);	
	
}

module.exports = stories;