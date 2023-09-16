import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { Server } from 'socket.io';
import { router } from './routes/router.js';

const app = express();
const server = http.createServer(app)
const socket = new Server(server, {cors : "*"})

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({credentials : true, origin : "https://vixcera.netlify.app/*"}))
app.use(router)

socket.on("connection", (socket) => {
    socket.on("pesan", (result) => socket.broadcast.emit("pesan", result))
    socket.on("username", (data) => socket.broadcast.emit("username", data))
})

server.listen(process.env.app_port, () => console.log('server up and running...'))