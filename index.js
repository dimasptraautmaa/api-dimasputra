import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { router } from './routes/router.js';

const app = express();
const server = http.createServer(app)

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({credentials : true, origin : 'http://localhost:5173/'}))
app.use(router)

server.listen(process.env.app_port, () => console.log('server up and running...'))