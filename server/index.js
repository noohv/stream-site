import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

app.use(cors())

io.on('connection', (socket) => {
	console.log("User joined")

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

  socket.on('join', (channel) => {
    console.log(`${socket.id} joined the channel: ${channel}`);
    socket.join(channel); // Join the socket.io room corresponding to the channel
  });

  socket.on('message', (data) => {
    const { message, room } = data
    console.log(`Message: ${message}`)
    io.in(room).emit(`message`, message)
  })

})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})