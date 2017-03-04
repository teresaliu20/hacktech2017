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
$(function(){
    $('#on-button').click(function(){ /*listening to the button click using Jquery listener*/
        var data = { /*creating a Js object to be sent to the server*/ 
            opcode:'start'              
        }
        socket.send(JSON.stringify(data)); 
        /*Data can be sent to server very easily by using socket.send() method 
        The data has to be changed to a JSON before sending
                              it (JSON.stringify() does this job )*/
        /* This triggers a message event on the server side 
        and the event handler obtains the data sent */

    });
});