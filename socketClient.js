var socket = io.connect("/"); 
/*Initializing the connection with the server via websockets */
socket.on("message",function(message){  
    /*
        When server sends data to the client it will trigger "message" event on the client side , by 
        using socket.on("message") , one cna listen for the ,message event and associate a callback to 
        be executed . The Callback function gets the dat sent from the server 
    */
    console.log("Message from the server arrived")
    message = JSON.parse(message);
    console.log(message); /*converting the data into JS object */
    $('#content').append('<div >'+message.data+'</div>'); /*appending the data on the page using Jquery */
});

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