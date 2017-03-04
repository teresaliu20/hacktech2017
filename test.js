/*<legalstuff> This work is licensed under a GNU General Public License, v3.0. Visit http://gnu.org/licenses/gpl-3.0-standalone.html for details. </legalstuff>*/
//Create2 TEST Demo. Copyright (©) 2016, Pecacheu (Bryce Peterson).

//Allows you to send commands over the OI.

//Send a raw byte like this: 131
//Send multiple bytes like this: 146,127,255,127,255
//Send command byte then ASCII string like this: 164,abcd

//Use 'i' to switch input modes bewtween ASCII, Binary, and Off.
//(Input means from Roomba -> Computer, binary is usally the best mode)

var create = require('create2'),
chalk = require('chalk');

var robot, input = 1;

function start() {
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

start();