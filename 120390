<?php

$host = 'localhost';
$port = 8080;

$socket = socket_create(AF_INET, SOCK_STREAM, 0) or die("Could not create socket\n");
$result = socket_bind($socket, $host, $port) or die("Could not bind to socket\n");
$result = socket_listen($socket, 3) or die("Could not set up socket listener\n");

$clients = array($socket);

while (true) {
$read = $clients;
$write = $except = null;
socket_select($read, $write, $except, null);

foreach ($read as $client) {
if ($client === $socket) {
$new_client = socket_accept($socket);
$clients[] = $new_client;

// Send a welcome message to the new client
$message = "Welcome to the chat room!\n";
socket_write($new_client, $message, strlen($message));
} else {
$message = socket_read($client, 1024);

// Remove any control characters from the message
$message = preg_replace('/[\x00-\x1F\x7F]/u', '', $message);

// Broadcast the message to all clients except the sender
foreach ($clients as $send_client) {
if ($send_client !== $socket && $send_client !== $client) {
socket_write($send_client, $message, strlen($message));
}
}
}
}
}

socket_close($socket);
