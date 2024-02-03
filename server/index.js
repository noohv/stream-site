import express from 'express';
import { createServer, request } from 'node:http';
import { Server } from 'socket.io';
import api from "./api/index.js"
import cors from 'cors';
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'
import bodyParser from 'body-parser';

const supabaseUrl = 'https://rsyjptimymqowkppqmzn.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", api)

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

