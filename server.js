var express = require('express');
var http = require('http');
var io = require('socket.io');
var create = require('create2');
var chalk = require('chalk');
 

var opcode = "";


var ls = process.exec('node worker.js '+i, function (error, stdout, stderr) {
   if (error) {
     console.log(error.stack);
     console.log('Error code: '+error.code);
     console.log('Signal received: '+error.signal);
   }
   console.log('stdout: ' + stdout);
   console.log('stderr: ' + stderr);
   
 });

 ls.on('exit', function (code) {
   console.log('Child process exited with exit code '+code);
 });




// Server-side communication with Client-side
var app = express();
app.use(express.static('./'));
//Specifying the folder of the server to make the html accesible using the static middleware

var server =http.createServer(app).listen(8000);
//Server listens on the port 8000
io = io.listen(server); 
/*initializing the websockets communication , server instance has to be sent as the argument */
 
io.sockets.on("connection",function(socket){
    /*Associating the callback function to be executed when client visits the page and 
      websocket connection is made */
      
      var message_to_client = {
        data:"Connection with the server established"
      }
      socket.send(JSON.stringify(message_to_client)); 
      /*sending data to the client , this triggers a message event at the client side */
    console.log('Socket.io Connection with the client established');
    socket.on("message",function(data){
        /*This event is triggered at the server side when client sends the data using socket.send() method */
        data = JSON.parse(data);

        /*Printing the data */
        var ack_to_client = {
        data:"LMAO"
      }

      if (data["opcode"] == "start") {
        opcode = data["opcode"];
        starting = true;
        init();
      };

      socket.send(JSON.stringify(ack_to_client));
        /*Sending the Acknowledgement back to the client , this will trigger "message" event on the clients side*/
    });

});



var robot, input = 1;

function init() {
	create.debug = false; //Data will be logged to terminal.
	create.inputMode = 1; //Only relevant when debug is on.
	create.prompt(function(p){create.open(p,main)});
}


//Main Program:
function main(r) {

      robot = r; 
      robot.write(128);
      robot.write(135);


}





