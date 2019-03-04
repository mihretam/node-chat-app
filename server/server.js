const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

   

    socket.on('createMessage', (message) => {
        message.createdAt = new Date().getTime();
        io.emit('newMessage',message );
    });

    socket.on('disconnect', () => {
    console.log('User disconnected');
    });
}); //socket in here represents individual socket, as opposed to the socket in index.html which represents socket for all users

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});