import express from "express";
import { admin, instagram, login, main, ready} from "../controllers/controllers.js";
import { verifytoken } from "../middleware/middleware.js";
export const router = express.Router()

router.get('/main',verifytoken, main)
router.get('/', ready)

router.post('/login', login)
router.post('/admin', admin)
router.post('/instagram', instagram)