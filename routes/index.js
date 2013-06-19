
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Your Page Is Slow' });
};



exports.newdata = function(req,res) {
	var childProcess = require('child_process');

	// executes `pwd`
	child = childProcess.exec("phantomjs loadpages.js", function (error, stdout, stderr) {
	  console.log("STDOUT: " + stdout);
	  res.render('newdata', { title: 'Page Results', stdout: stdout });
	  if (error !== null) {
	    console.log('exec error: ' + error);
	  }
	});
	console.log("END OF NEWDATA");
}

// http://nodejs.org/api.html#_child_processes

