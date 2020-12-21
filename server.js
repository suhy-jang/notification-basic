const express = require('express');
const socketio = require('socket.io');
const app = express();

const port = 3000;

const CORSOptions = {
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  origin: 'http://localhost:3000',
  credentials: true,
};

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = socketio(server, {
  cors: {
    origin: CORSOptions,
  },
});
io.on('connection', function (socket) {
  // console.log(`Auth value: ${socket.id}`);

  socket.on('sendNotification', (data) => {
    socket.broadcast.emit('sendNotification', data);
  });
  socket.on('disconnect', function () {
    console.log('disconnected');
  });
});
