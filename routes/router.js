import express from "express";
import { admin, login, main, ready, user } from "../controllers/controllers.js";
import { verifytoken } from "../middleware/middleware.js";
export const router = express.Router()

router.get('/main',verifytoken, main)
router.get('/', ready)

router.post('/login', login)
router.post('/admin', admin)
router.post('/user', user)