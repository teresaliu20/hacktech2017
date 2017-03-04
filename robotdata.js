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
	if(cliffFrontRight) {
		document.getElementById('cliffFrontRight').style = "background-color: " + hitColor;
		document.getElementById('cliffFrontRight').innerHTML = "Front right cliff reached"
	}
	else {
		document.getElementById('cliffFrontRight').style = "background-color: #69A7A9";
		document.getElementById('cliffFrontRight').innerHTML = "Front Right Cliff - not hit";
	}
	cliffLeft = message["data"]["data"]["cliffLeft"];
	if(cliffLeft) {
		document.getElementById('cliffLeft').style = "background-color: " + hitColor;
		document.getElementById('cliffLeft').innerHTML = "Left cliff reached"
	}
	else {
		document.getElementById('cliffLeft').style = "background-color: #69A7A9";
		document.getElementById('cliffLeft').innerHTML = "Left Cliff - not hit";
	}
	cliffRight = message["data"]["data"]["cliffRight"];
	if(cliffRight) {
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
	if(lightBumpCenterLeft) {
		document.getElementById('lightBumpCenterLeft').style = "background-color: " + hitColor;
		document.getElementById('lightBumpCenterLeft').innerHTML = "Light Center Left Side bumped"
	}
	else {
		document.getElementById('lightBumpCenterLeft').style = "background-color: #69A7A9";
		document.getElementById('lightBumpCenterLeft').innerHTML = "Light Center Left Side - not bumped";
	}
	lightBumpCenterRight = message["data"]["data"]["lightBumpCenterRight"];
	if(lightBumpCenterRight) {
		document.getElementById('lightBumpCenterRight').style = "background-color: " + hitColor;
		document.getElementById('lightBumpCenterRight').innerHTML = "Light Center Right Side bumped"
	}
	else {
		document.getElementById('lightBumpCenterRight').style = "background-color: #69A7A9";
		document.getElementById('lightBumpCenterRight').innerHTML = "Light Center Right Side - not bumped";
	}
	lightBumpFrontLeft = message["data"]["data"]["lightBumpFrontLeft"];
	if(lightBumpFrontLeft) {
		document.getElementById('lightBumpFrontLeft').style = "background-color: " + hitColor;
		document.getElementById('lightBumpFrontLeft').innerHTML = "Light Front Left Side bumped"
	}
	else {
		document.getElementById('lightBumpFrontLeft').style = "background-color: #69A7A9";
		document.getElementById('lightBumpFrontLeft').innerHTML = "Light Front Left Side - not bumped";
	}
	lightBumpFrontRight = message["data"]["data"]["lightBumpFrontRight"];
	if(lightBumpFrontRight) {
		document.getElementById('lightBumpFrontRight').style = "background-color: " + hitColor;
		document.getElementById('lightBumpFrontRight').innerHTML = "Light Front Right Side bumped"
	}
	else {
		document.getElementById('lightBumpFrontRight').style = "background-color: #69A7A9";
		document.getElementById('lightBumpFrontRight').innerHTML = "Light Front Right Side - not bumped";
	}
	lightBumpLeft = message["data"]["data"]["lightBumpLeft"];
	if(lightBumpLeft) {
		document.getElementById('lightBumpLeft').style = "background-color: " + hitColor;
		document.getElementById('lightBumpLeft').innerHTML = "Light Left Side bumped"
	}
	else {
		document.getElementById('lightBumpLeft').style = "background-color: #69A7A9";
		document.getElementById('lightBumpLeft').innerHTML = "Light Left Side - not bumped";
	}
	lightBumpRight = message["data"]["data"]["lightBumpRight"];
	if(lightBumpRight) {
		document.getElementById('lightBumpRight').style = "background-color: " + hitColor;
		document.getElementById('lightBumpRight').innerHTML = "Light Right Side bumped"
	}
	else {
		document.getElementById('lightBumpRight').style = "background-color: #69A7A9";
		document.getElementById('lightBumpRight').innerHTML = "Light Right Side - not bumped";
	}
	dropLeft = message["data"]["data"]["dropLeft"];
	if(dropLeft) {
		document.getElementById('dropLeft').style = "background-color: " + hitColor;
		document.getElementById('dropLeft').innerHTML = "Left Wheel - dropped"
	}
	else {
		document.getElementById('dropLeft').style = "background-color: #69A7A9";
		document.getElementById('dropLeft').innerHTML = "Left Wheel - not dropped";
	}
	dropRight = message["data"]["data"]["dropRight"];
	if(dropRight) {
		document.getElementById('dropRight').style = "background-color: " + hitColor;
		document.getElementById('dropRight').innerHTML = "Right Wheel - dropped"
	}
	else {
		document.getElementById('dropRight').style = "background-color: #69A7A9";
		document.getElementById('dropRight').innerHTML = "Right Wheel - not dropped";
	}
	wall = message["data"]["data"]["wall"];
	if(wall) {
		document.getElementById('wall').style = "background-color: " + hitColor;
		document.getElementById('wall').innerHTML = "Wall - found"
	}
	else {
		document.getElementById('wall').style = "background-color: #69A7A9";
		document.getElementById('wall').innerHTML = "Wall - not found";
	}
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