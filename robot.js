var create = require('create2');
var chalk = require('chalk');
var S = require('s');

var robot;
var robot_setup;
var input = 1;

var robot_speed = 400;
var robot_rot_speed = 150;

var ps = [];

function intervalFunc () {
  // console.log(robot.data);
  // process.send(JSON.stringify(robot.data));
  process.send(JSON.stringify({ 'delta': robot.delta}));
  process.send(JSON.stringify({ 'data' : robot.data}));
}

function init() {
	create.debug = false; //Data will be logged to terminal.
	create.inputMode = 1; //Only relevant when debug is on.
  create.ports(function(ps){
    for (var i = ps.length - 1; i >= 0; i--) {
      var name = ps[i]['comName'];
      if(S(name).includes('usbserial')){
        robot = create.open(name, main);
        console.log("connected to "+ name);
        break;
      }else if(i == ps.length -1){
        console.log("no device found");
      }
    };
  });
}

// robot = create.open(port, callback=null)




//Main Program:
function main(r) {
      robot_setup = r; 
      robot_setup.write(128);
      robot_setup.write(131);
      console.log("init completed");
      setInterval(intervalFunc, 100);
      // robot = r;
}

function autonomous(){
  // create.ports(function(ports){
  //   for (var i = ps.length - 1; i >= 0; i--) {
  //     var name = ps[i]['comName'];
  //     if(S(name).includes('usbserial')){
  //       robot = create.open(name,main);

  //       console.log("connected to "+ name);
  //       break;
  //     }else if(i == ps.length -1){
  //       console.log("no device found");
  //     }
  //   };
  // });
  forward();

  //React to left bumper sensor using robot.on:
  robot.on.bumpLeft = function(value) {
    if(value == true) {
      //BumpLeft just changed, and the new value is true!
      backward();
      setTimeout(right(), 500);
      setTimeout(forward(), 1000);
    }
  };

  //React to right bumper sensor using robot.on:
  robot.on.bumpRight = function(value) {
    if(value == true) {
      //BumpRight just changed, and the new value is true!
      backward();
      setTimeout(left(), 500);
      setTimeout(forward(), 1000);
    }
  };
}

// console.log(robot);







function forward(){
  stop();
  // console.log("forward() triggered");
  robot.drive(robot_speed, 32767);
}

function backward(){
  stop();
  robot.drive(-robot_speed, 32767);
}

function left(){
  stop();
  robot.drive(robot_rot_speed,1);
}
function right(){
  stop();
  robot.drive(robot_rot_speed, -1);
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
  }else if (m['opcode'] == 'auto'){
    autonomous();
  }

});

init();