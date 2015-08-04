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
		.catch(function(err){
			console.log("error occurred while fetching stories");
			console.log("error");
			console.log(err);
			console.log("finished refresh stories job.............");
		});
	}
};


function produceStoryMessages(storyIds){
		// publish all the story ids
		producer.produce({
			type: "TOP_STORIES",
			ids: storyIds
		});

		_.each(storyIds, function(id){
			producer.produce({id: id});
		}, this);	
	
}

module.exports = stories;