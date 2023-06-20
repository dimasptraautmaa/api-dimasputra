import express from "express";
import { login, main, ready, register } from "../controllers/controllers.js";
import { verifytoken } from "../middleware/middleware.js";
export const router = express.Router()

router.get('/', ready)
router.get('/main',verifytoken, main)
router.post('/login', login)
router.post('/register', register)