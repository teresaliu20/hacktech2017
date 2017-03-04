var angle = 0;
var x = 0;
var y = 0;
var x_arr = [];
var y_arr = [];
var data;
var totalDistance = 0;
var cliffFrontLeft, cliffFrontRight, cliffLeft, cliffRight;
var bumpLeft, bumpRight, lightBumpCenterLeft, lightBumpCenterRight, lightBumpFrontLeft, lightBumpFrontRight,
	lightBumpLeft, lightBumpRight;
var dropLeft, dropRight;
var wall;
var encoderLeft, encoderRight;
var hitColor = "red";



// function newAngle(){
// 	robot.onMotion = function() {
//   		angle += robot.delta.angle;
// 		  $('#angle').circleProgress({
// 		    value: angle,
// 		    size: 360,
// 		    fill: {
// 		      gradient: ["red", "orange"]
// 		    }
// 		  });

// 	}
// }

function analyze_data(message){
	// console.log("in analyze_data");
	cliffFrontLeft = message["data"]["data"]["cliffFrontLeft"];
	if(cliffFrontLeft) {
		document.getElementById('cliffFrontLeft').style = "background-color: " + hitColor;
		document.getElementById('cliffFrontLeft').innerHTML = "Front left cliff reached"
	}
	else {
		document.getElementById('cliffFrontLeft').style = "background-color: #69A7A9";
		document.getElementById('cliffFrontLeft').innerHTML = "Front Left Cliff - not hit";
	}
	cliffFrontRight = message["data"]["data"]["cliffFrontRight"];
	if(cliffFrontLeft) {
		document.getElementById('cliffFrontRight').style = "background-color: " + hitColor;
		document.getElementById('cliffFrontRight').innerHTML = "Front right cliff reached"
	}
	else {
		document.getElementById('cliffFrontRight').style = "background-color: #69A7A9";
		document.getElementById('cliffFrontRight').innerHTML = "Front Right Cliff - not hit";
	}
	cliffLeft = message["data"]["data"]["cliffLeft"];
	if(cliffFrontLeft) {
		document.getElementById('cliffLeft').style = "background-color: " + hitColor;
		document.getElementById('cliffLeft').innerHTML = "Left cliff reached"
	}
	else {
		document.getElementById('cliffLeft').style = "background-color: #69A7A9";
		document.getElementById('cliffLeft').innerHTML = "Left Cliff - not hit";
	}
	cliffRight = message["data"]["data"]["cliffRight"];
	if(cliffFrontLeft) {
		document.getElementById('cliffRight').style = "background-color: " + hitColor;
		document.getElementById('cliffRight').innerHTML = "Right cliff reached"
	}
	else {
		document.getElementById('cliffRight').style = "background-color: #69A7A9";
		document.getElementById('cliffRight').innerHTML = "Right Cliff - not hit";
	}
	bumpLeft = message["data"]["data"]["bumpLeft"];
	if(bumpLeft) {
		document.getElementById('bumpLeft').style = "background-color: " + hitColor;
		document.getElementById('bumpLeft').innerHTML = "Left side bumped"
	}
	else {
		document.getElementById('bumpLeft').style = "background-color: #69A7A9";
		document.getElementById('bumpLeft').innerHTML = "Left Side - not bumped";
	}
	bumpRight = message["data"]["data"]["bumpRight"];
	if(bumpRight) {
		document.getElementById('bumpRight').style = "background-color: " + hitColor;
		document.getElementById('bumpRight').innerHTML = "Right side bumped"
	}
	else {
		document.getElementById('bumpRight').style = "background-color: #69A7A9";
		document.getElementById('bumpRight').innerHTML = "Right Side - not bumped";
	}
	lightBumpCenterLeft = message["data"]["data"]["lightBumpCenterLeft"];
	lightBumpCenterRight = message["data"]["data"]["lightBumpCenterRight"];
	lightBumpFrontLeft = message["data"]["data"]["lightBumpFrontLeft"];
	lightBumpFrontRight = message["data"]["data"]["lightBumpFrontRight"];
	lightBumpLeft = message["data"]["data"]["lightBumpLeft"];
	lightBumpRight = message["data"]["data"]["lightBumpRight"];
	dropLeft = message["data"]["data"]["dropLeft"];
	dropRight = message["data"]["data"]["dropRight"];
	wall = message["data"]["data"]["wall"];
	encoderLeft = message["data"]["data"]["encoderLeft"];
	encoderRight = message["data"]["data"]["encoderRight"];
	document.getElementById('encoder-counts').innerHTML = "Left Encoder Count: " + encoderLeft + '\n' + 
		"Right Encoder Count: " + encoderRight;
}


function analyze_delta_data(message){
	// console.log(message['data']['delta']);
	// console.log("Encoder left: " + message["data"]['encoderLeft']);
	// console.log("Encoder right: " + message["data"]['encoderRight']);
	var delta_distance = message['data']['distance'];
	var delta_angle = message['data']['angle'];
	totalDistance += delta_distance;
	if (!((typeof delta_angle === "undefined" ) || (typeof delta_distance === "undefined")) ) {
		// console.log("angle : " + angle );
		angle +=  6.25* delta_angle;
		x += delta_distance * Math.cos(angle * (Math.PI / 180));
		y += delta_distance * Math.sin(angle * (Math.PI / 180));
		// console.log("x: " + x + " y: " + y);
		x_arr.push(x);
		y_arr.push(y);
	}
	var trace1 = {
	  x:x_arr,
	  y:y_arr,
	  mode: 'markers',
	  type: 'scatter',
	  marker: { size: 5 }
	};
	data = [trace1];
	// document.getElementById("wall").innerHTML = message["data"]['Wall'];
	// document.getElementById("leftEncoder").innerHTML = message["data"]['encoderLeft'];
	// document.getElementById("rightEncoder").innerHTML = message["data"]['encoderRight'];
}