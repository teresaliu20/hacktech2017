var create = require('create2');
var chalk = require('chalk');
var S = require('s');

var robot;
var robot_setup;
var input = 1;

var robot_speed = 100;
var robot_rot_speed = 100;

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
  robot_setup = r; 
  robot_setup.write(128);
  robot_setup.write(132);
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

//NOTES 
var c4 = 60;
var cis4 = 61;
var des4 = 61;
var d4 = 62;
var dis4 = 63;
var ees4 = 63;
var e4 = 64;
var f4 = 65;
var fis4 = 66;
var ges4 = 66;
var g4 = 67;
var gis4 = 68;
var aes4 = 68;
var a4 = 69;
var ais4 = 70;
var bes4 = 70;
var b4 = 71;
var c5 = 72;
var cis5 = 73;
var des5 = 73;
var d5 = 74;
var dis5 = 75;
var ees5 = 75;
var e5 = 76;
var f5 = 77;
var fis5 = 78;
var ges5 = 78;
var g5 = 79;
var gis5 = 80;
var aes5 = 80;
var a5 = 81;
var ais5 = 82;
var bes5 = 82;
var b5 = 83;
var c6 = 84;
var cis6 = 85;
var des6 = 85;
var d6 = 86;
var dis6 = 87;
var ees6 = 87;
var e6 = 88;
var f6 = 89;
var fis6 = 90;
var ges6 = 90;


init();
