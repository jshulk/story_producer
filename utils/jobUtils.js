var stories = require("../jobs/stories"),
	CronJob = require("cron").CronJob,
	appConstants = require("../constants/appConstants");

var jobUtils = {
	configureStoriesJob: function(){
		var job = new CronJob(appConstants.cronTime, stories.refreshTopStories);
		job.start();
	},
	/**
	 * [validateCronTime description]
	 * @param  {[string]} cronTime [description]
	 * @return {[boolean]}          [description]
	 */
	validateCronTime: function(cronTime){
		var isValid = false;
		try {
			new CronJob(cronTime, function(){
				isValid = true;
			});
		} catch(e){
			isValid = false
		}

		return isValid;
	}
};

module.exports = jobUtils;