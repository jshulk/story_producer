var hnservice = require("../services/hnservice");
var stories = {
	refreshTopStories: function(){
		console.log("Starting refresh stories job.............");

		hnservice.saveDocument("Dummy document");
		
		hnservice.fetchTopStories()
		.then(function(storyIds){
			console.log('story ids');
			console.log(storyIds);
			console.log("finished refresh stories job..............");
		})
		.catch(function(){
			console.log("error occurred while fetching stories");
			console.log("finished refresh stories job.............");
		})
		.done();
	}
};

module.exports = stories;