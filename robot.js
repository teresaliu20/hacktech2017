var create = require('create2');
var chalk = require('chalk');

var robot;
var robot_setup;
var input = 1;

function init() {
	create.debug = false; //Data will be logged to terminal.
	create.inputMode = 1; //Only relevant when debug is on.
	create.prompt(function(p){
		// process.send({ "p": p });
		robot = create.open(p,main);
	});
}

// robot = create.open(port, callback=null)

function intervalFunc () {
  console.log(robot.data);
}



//Main Program:
function main(r) {
      robot_setup = r; 
      robot_setup.write(128);
      robot_setup.write(131);
      console.log("init completed");
      setInterval(intervalFunc, 1000);
}

function forward(){
	stop();
	console.log("forward() triggered");
	robot.drive(20, 32767);
}

function backward(){
	stop();
	robot.drive(-20, 32767);
}

function left(){
	stop();
	robot.drive(20,1);
}
function right(){
	stop();
	robot.drive(20, -1);
}
function stop(){
	robot.drive(0, 32767);
}

process.on('message', function(m) {
  // console.log('CHILD:robot.js got message:', m);
  // console.log("robot moving" + m['opcode']);

  if (m['opcode'] == 'forward') {
  	forward();

  }else if (m['opcode'] == 'backward') {
  	backward();

  }else if (m['opcode'] == 'left') {
  	left();

  }else if (m['opcode'] == 'right') {
  	right();

  }else if (m['opcode'] == 'stop'){
  	stop();
  }

});

init();