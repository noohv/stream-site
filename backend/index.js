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

  socket.on('message', (msg) => {
    console.log(`Message: ${msg}`)
    io.emit(`message`, msg)
  })

})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})