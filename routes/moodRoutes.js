import express from "express";
import auth from "../middleware/authMiddleware.js";
import { trackMood } from "../controllers/moodController.js";


const router = express.Router();

router.post("/", auth, trackMood);

export default router;
