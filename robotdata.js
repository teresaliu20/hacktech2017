var angle = 90;
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



function newAngle(){
	if (angle-90 > 0) {
		$('#angle').circleProgress({
		  value: ( (Math.abs(angle-90)%360)/360 -1),
		  size: 80,
		  fill: {
		    gradient: ["red", "orange"]
		  },
		  animation:false,
		  startAngle: Math.PI*3/2,
		});
	}else{
		$('#angle').circleProgress({
		  value: ( 1- (Math.abs(angle-90)%360)/360),
		  size: 80,
		  fill: {
		    gradient: ["red", "orange"]
		  },
		  animation:false,
		  reverse:true,
		  startAngle: Math.PI*3/2,
		});
	}

}

function analyze_data(message){
	// console.log("in analyze_data");
	cliffFrontLeft = message["data"]["data"]["cliffFrontLeft"];
	if(cliffFrontLeft) {
		document.getElementById('cliffFrontLeft').style = "background-color: " + hitColor;
		document.getElementById('cliffFrontLeft').innerHTML = "HIT"
	}
	else {
		document.getElementById('cliffFrontLeft').style = "background-color: #69A7A9";
		document.getElementById('cliffFrontLeft').innerHTML = "0";
	}
	cliffFrontRight = message["data"]["data"]["cliffFrontRight"];
	if(cliffFrontRight) {
		document.getElementById('cliffFrontRight').style = "background-color: " + hitColor;
		document.getElementById('cliffFrontRight').innerHTML = "HIT"
	}
	else {
		document.getElementById('cliffFrontRight').style = "background-color: #69A7A9";
		document.getElementById('cliffFrontRight').innerHTML = "0";
	}
	cliffLeft = message["data"]["data"]["cliffLeft"];
	if(cliffLeft) {
		document.getElementById('cliffLeft').style = "background-color: " + hitColor;
		document.getElementById('cliffLeft').innerHTML = "HIT"
	}
	else {
		document.getElementById('cliffLeft').style = "background-color: #69A7A9";
		document.getElementById('cliffLeft').innerHTML = "0";
	}
	cliffRight = message["data"]["data"]["cliffRight"];
	if(cliffRight) {
		document.getElementById('cliffRight').style = "background-color: " + hitColor;
		document.getElementById('cliffRight').innerHTML = "HIT"
	}
	else {
		document.getElementById('cliffRight').style = "background-color: #69A7A9";
		document.getElementById('cliffRight').innerHTML = "0";
	}
	lightBumpCenterLeft = message["data"]["data"]["lightBumpCenterLeft"];
	if(lightBumpCenterLeft) {
		document.getElementById('upper-left-orange').style.display = "initial";
		document.getElementById('currBump').innerHTML += "Center Left Light Bumper  ";
		document.getElementById('lightBumpCenterLeft').style = "background-color: " + hitColor;
		document.getElementById('lightBumpCenterLeft').innerHTML = "Light Center Left Side bumped"
	}
	else {
		document.getElementById('upper-left-orange').style.display = "none";
		document.getElementById('currBump').innerHTML = document.getElementById('currBump').innerHTML.replace('Center Left Light Bumper  ','');
		document.getElementById('lightBumpCenterLeft').style = "background-color: #69A7A9";
		document.getElementById('lightBumpCenterLeft').innerHTML = "Light Center Left Side - not bumped";
	}
	lightBumpCenterRight = message["data"]["data"]["lightBumpCenterRight"];
	if(lightBumpCenterRight) {
		document.getElementById('upper-right-orange').style.display = "initial";
		document.getElementById('currBump').innerHTML += "Center Right Light Bumper  ";
		document.getElementById('lightBumpCenterRight').style = "background-color: " + hitColor;
		document.getElementById('lightBumpCenterRight').innerHTML = "Light Center Right Side bumped"
	}
	else {
		document.getElementById('upper-right-orange').style.display = "none";
		document.getElementById('currBump').innerHTML = document.getElementById('currBump').innerHTML.replace('Center Right Light Bumper  ','');
		document.getElementById('lightBumpCenterRight').style = "background-color: #69A7A9";
		document.getElementById('lightBumpCenterRight').innerHTML = "Light Center Right Side - not bumped";
	}
	lightBumpFrontLeft = message["data"]["data"]["lightBumpFrontLeft"];
	if(lightBumpFrontLeft) {
		document.getElementById('lower-left-orange').style.display = "initial";
		document.getElementById('currBump').innerHTML += "Front Left Light Bumper  ";
		document.getElementById('lightBumpFrontLeft').style = "background-color: " + hitColor;
		document.getElementById('lightBumpFrontLeft').innerHTML = "Light Front Left Side bumped"
	}
	else {
		document.getElementById('lower-left-orange').style.display = "none";
		document.getElementById('currBump').innerHTML = document.getElementById('currBump').innerHTML.replace('Front Left Light Bumper  ','');
		document.getElementById('lightBumpFrontLeft').style = "background-color: #69A7A9";
		document.getElementById('lightBumpFrontLeft').innerHTML = "Light Front Left Side - not bumped";
	}
	lightBumpFrontRight = message["data"]["data"]["lightBumpFrontRight"];
	if(lightBumpFrontRight) {
		document.getElementById('lower-right-orange').style.display = "initial";
		document.getElementById('currBump').innerHTML += "Front Right Light Bumper  ";
		document.getElementById('lightBumpFrontRight').style = "background-color: " + hitColor;
		document.getElementById('lightBumpFrontRight').innerHTML = "Light Front Right Side bumped"
	}
	else {
		document.getElementById('lower-right-orange').style.display = "none";
		document.getElementById('currBump').innerHTML = document.getElementById('currBump').innerHTML.replace('Front Right Light Bumper  ','');
		document.getElementById('lightBumpFrontRight').style = "background-color: #69A7A9";
		document.getElementById('lightBumpFrontRight').innerHTML = "Light Front Right Side - not bumped";
	}
	lightBumpLeft = message["data"]["data"]["lightBumpLeft"];
	if(lightBumpLeft) {
		document.getElementById('left-red').style = "opacity: 0.5";
		document.getElementById('currBump').innerHTML += "Left Light Bumper  ";
		document.getElementById('lightBumpLeft').style = "background-color: " + hitColor;
		document.getElementById('lightBumpLeft').innerHTML = "Light Left Side bumped"
	}
	else {
		document.getElementById('left-red').style = "opacity: 0";
		document.getElementById('currBump').innerHTML = document.getElementById('currBump').innerHTML.replace('Default Left Light Bumper  ','');
		document.getElementById('lightBumpLeft').style = "background-color: #69A7A9";
		document.getElementById('lightBumpLeft').innerHTML = "Light Left Side - not bumped";
	}
	lightBumpRight = message["data"]["data"]["lightBumpRight"];
	if(lightBumpRight) {
		document.getElementById('right-red').style = "opacity: 0.5";
		document.getElementById('currBump').innerHTML += "Right Light Bumper  ";
		document.getElementById('lightBumpRight').style = "background-color: " + hitColor;
		document.getElementById('lightBumpRight').innerHTML = "Light Right Side bumped"
	}
	else {
		document.getElementById('right-red').style = "opacity: 0";
		document.getElementById('currBump').innerHTML = document.getElementById('currBump').innerHTML.replace('Default Right Light Bumper  ','');
		document.getElementById('lightBumpRight').style = "background-color: #69A7A9";
		document.getElementById('lightBumpRight').innerHTML = "Light Right Side - not bumped";
	
}	bumpLeft = message["data"]["data"]["bumpLeft"];
	if(bumpLeft) {
		document.getElementById('left-red').style = "opacity: 1";
		document.getElementById('currBump').innerHTML += "Left Bumper  ";
		document.getElementById('bumpLeft').style = "background-color: " + hitColor;
		document.getElementById('bumpLeft').innerHTML = "Left side bumped"
	}
	else {
		document.getElementById('currBump').innerHTML = document.getElementById('currBump').innerHTML.replace('Left Bumper  ','');
		document.getElementById('bumpLeft').style = "background-color: #69A7A9";
		document.getElementById('bumpLeft').innerHTML = "Left Side - not bumped";
	}
	bumpRight = message["data"]["data"]["bumpRight"];
	if(bumpRight) {
		document.getElementById('right-red').style = "opacity: 1";
		document.getElementById('currBump').innerHTML += "Right Bumper  ";
		document.getElementById('bumpRight').style = "background-color: " + hitColor;
		document.getElementById('bumpRight').innerHTML = "Right side bumped"
	}
	else {
		document.getElementById('currBump').innerHTML = document.getElementById('currBump').innerHTML.replace('Right Bumper  ','');
		document.getElementById('bumpRight').style = "background-color: #69A7A9";
		document.getElementById('bumpRight').innerHTML = "Right Side - not bumped";
	}
	dropLeft = message["data"]["data"]["dropLeft"];
	if(dropLeft) {
		document.getElementById('dropLeft').style = "background-color: " + hitColor;
		document.getElementById('dropLeft').innerHTML = "DROPPED"
	}
	else {
		document.getElementById('dropLeft').style = "background-color: #69A7A9";
		document.getElementById('dropLeft').innerHTML = "UP";
	}
	dropRight = message["data"]["data"]["dropRight"];
	if(dropRight) {
		document.getElementById('dropRight').style = "background-color: " + hitColor;
		document.getElementById('dropRight').innerHTML = "DROPPED"
	}
	else {
		document.getElementById('dropRight').style = "background-color: #69A7A9";
		document.getElementById('dropRight').innerHTML = "UP";
	}
	wall = message["data"]["data"]["wall"];
	if(wall) {
		document.getElementById('wall').style = "background-color: " + hitColor;
		document.getElementById('wall').innerHTML = "FOUND";
	}
	else {
		document.getElementById('wall').style = "background-color: #69A7A9";
		document.getElementById('wall').innerHTML = "0";
	}
	encoderLeft = message["data"]["data"]["encoderLeft"];
	encoderRight = message["data"]["data"]["encoderRight"];
	document.getElementById('encoder-counts').innerHTML = encoderLeft + ', ' + encoderRight;
}


function analyze_delta_data(message){
	// console.log(message['data']['delta']);
	// console.log("Encoder left: " + message["data"]['encoderLeft']);
	// console.log("Encoder right: " + message["data"]['encoderRight']);
	var delta_distance = message['data']['delta']['distance'];
	var delta_angle = message['data']['delta']['angle'];
	totalDistance += Math.abs(delta_distance);
	document.getElementById('distance').innerHTML = totalDistance;
	document.getElementById('velocity').innerHTML = delta_distance / 0.5 + " mm/s";
	// document.getElementById('angle').innerHTML = angle;
	// console.log("angle : " + angle );

	if (!((typeof delta_angle === "undefined" ) || (typeof delta_distance === "undefined")) ) {
		// console.log("angle : " + angle );
		angle +=  1.263 *delta_angle;
		x += delta_distance * Math.cos(angle * (Math.PI / 180));
		y += delta_distance * Math.sin(angle * (Math.PI / 180));
		// console.log("x: " + x + " y: " + y);
		x_arr.push(x);
		y_arr.push(y);
	}
	var trace1 = {
	  x:x_arr,
	  y:y_arr,
	  mode: 'lines',
	  type: 'scatter',
	  lines: { size: 7 }
	};
	data = [trace1];

	newAngle();
	// document.getElementById("wall").innerHTML = message["data"]['Wall'];
	// document.getElementById("leftEncoder").innerHTML = message["data"]['encoderLeft'];
	// document.getElementById("rightEncoder").innerHTML = message["data"]['encoderRight'];
}