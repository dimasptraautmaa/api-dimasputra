import express from "express";
import { admin, instagram, login, main, payment, ready} from "../controllers/controllers.js";
import { paymentKey, verifytoken } from "../middleware/middleware.js";
export const router = express.Router()

router.get('/', ready)
router.get('/instagram', ready)
router.get('/main',verifytoken, main)
router.get('/payment', paymentKey, payment)

router.post('/login', login)
router.post('/admin', admin)
router.post('/instagram', instagram)