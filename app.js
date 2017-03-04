var fs = require('fs');
var child_process = require('child_process');

var server_process = child_process.fork("server.js");  
  	

// server.js sends message to app.js
server_process.on('message', function(m) {
  // console.log('PARENT got message:', m);
  var opcode = m['opcode'];
  robot_process.send({ 'opcode': opcode });
});

// server_process.send({ hello: 'world' });

// Server close statement
server_process.on('close', function (code) {
	console.log('Server is closed with code: ' + code);
});




// Robot close statement
var robot_process = child_process.fork("robot.js", "");

robot_process.on('message', function(m) {
  // console.log('PARENT got message:', m);
});

// robot.js sends message to app.js
robot_process.on('close', function (code) {
	console.log('Robot is closed with code: ' + code);
});
// robot_process.send({ hello: 'world' });