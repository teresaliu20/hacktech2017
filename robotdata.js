var angle = 90;
var x = 0;
var y = 0;
var x_arr = [];
var y_arr = [];
var data;


function newAngle(){
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
}

function analyzeData(message){

	// console.log(message);
	// console.log("Encoder left: " + message["data"]['encoderLeft']);
	// console.log("Encoder right: " + message["data"]['encoderRight']);
	var delta_distance = message['data']['distance'];
	var delta_angle = message['data']['angle'];
	if (!((typeof delta_angle === "undefined" ) || (typeof delta_distance === "undefined")) ) {
		console.log("angle : " + angle );
		angle +=  delta_angle;
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