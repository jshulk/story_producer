
var bootstrap = require("./queue/bootstrap");
	
	bootstrap.init()
	.then(function(){
		configureJobs();
	})
	.catch(function(error){
		console.log(error.msg);
	});

function configureJobs(){
	console.log("Jobs configured");
}
// 3. configure job and start it
