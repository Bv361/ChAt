$(function(){
    var chatbox = $('#chatbox');
    var message = $('#message');
    var chatForm = $('#chatForm');

    // Connect to the server-side script
    var chatSocket = new WebSocket('ws://localhost:8080/chat.php');

    // When a new message is received, append it to the chatbox
    chatSocket.onmessage = function(event){
        chatbox.append('<p>' + event.data + '</p>');
    };

    // When the form is submitted, send the message to the server-side script
    chatForm.submit(function(event){
        event.preventDefault();
        chatSocket.send(message.val());
        message.val('');
    });
});
