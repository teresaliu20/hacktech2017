var create = require('create2');
var chalk = require('chalk');
var S = require('s');

var robot;
var robot_setup;
var input = 1;

var robot_speed = 400;
var robot_rot_speed = 150;

var ps_item;

function init() {
  create.debug = false; //Data will be logged to terminal.
  create.inputMode = 1; //Only relevant when debug is on.
  create.ports(function(ps){
    for (var i = ps.length - 1; i >= 0; i--) {
      var name = ps[i]['comName'];
      if(S(name).includes('usbserial')){
        ps_item = ps[i]['comName'];
        robot = create.open(name, main);
        console.log("connected to "+ name);
        break;
      }else if(i == ps.length -1){
        console.log("no device found");
      }
    };
  });
}

function intervalFunc() {
  // console.log(robot.data);
  // process.send(JSON.stringify(robot.data));
  process.send(JSON.stringify({ 'delta': robot.delta}));
  process.send(JSON.stringify({ 'data' : robot.data}));
}



// robot = create.open(port, callback=null)


//Main Program:
function main(r) {
  console.log("in main");
      robot_setup = r; 
      robot_setup.write(128);
      robot_setup.write(131);
      console.log("init completed");
      setInterval(intervalFunc, 100);
}



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



// robot = create.open(ps_item, autonomous);


process.on('message', function(m) {
  // console.log('CHILD:robot.js got message:', m);
  console.log("robot moving" + m['opcode']);

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
