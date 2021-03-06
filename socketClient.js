var socket = io.connect("/"); 
/*Initializing the connection with the server via websockets */
socket.on("message",function(message){  
    /*
        When server sends data to the client it will trigger "message" event on the client side , by 
        using socket.on("message") , one cna listen for the ,message event and associate a callback to 
        be executed . The Callback function gets the dat sent from the server 
    */
    // console.log("Message from the server arrived");
    message = JSON.parse(message);
    // console.log(message);
    if (message['data'] == "Connection with the server established") {
        console.log(message); /*converting the data into JS object */
        $('#content').append('<div >'+message.data+'</div>'); /*appending the data on the page using Jquery */
    }else{
        // console.log(message);

        if (! (typeof message['data']['delta'] === "undefined") ) {
            analyze_delta_data(message);
        }else{
            analyze_data(message);
        }
    };
});

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "ArrowDown":
      // code for "down arrow" key press.
      var data = {
          opcode:'backward'              
      }
      socket.send(JSON.stringify(data)); 
      break;
    case "ArrowUp":
      // code for "up arrow" key press.
      var data = {
          opcode:'forward'              
      }
      socket.send(JSON.stringify(data)); 
      break;
    case "ArrowLeft":
      // code for "left arrow" key press.
      var data = {
          opcode:'left'              
      }
      socket.send(JSON.stringify(data)); 
      break;
    case "ArrowRight":
      // code for "right arrow" key press.
      var data = {
          opcode:'right'              
      }
      socket.send(JSON.stringify(data)); 
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);
window.addEventListener("keyup", function (event) {
  var data = {
      opcode:'stop'              
  }
  socket.send(JSON.stringify(data)); 

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);
// Forward
$(function(){
    $('#forward-button').click(function(){
        var data = {
            opcode:'forward'              
        }
        socket.send(JSON.stringify(data)); 
    });
});

// Backward
$(function(){
    $('#backward-button').click(function(){
        var data = {
            opcode:'backward'              
        }
        socket.send(JSON.stringify(data)); 
    });
});

// Forward left
$(function(){
    $('#left-button').click(function(){
        var data = {
            opcode:'left'              
        }
        socket.send(JSON.stringify(data)); 
    });
});

// Forward right
$(function(){
    $('#right-button').click(function(){
        var data = {
            opcode:'right'              
        }
        socket.send(JSON.stringify(data)); 
    });
});

// Stop
$(function(){
    $('#off-button').click(function(){
        var data = {
            opcode:'stop'              
        }
        socket.send(JSON.stringify(data)); 
    });
});