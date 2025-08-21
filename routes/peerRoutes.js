import express from 'express';
import {
  getAllCircles,
  joinCircle,
  createCircle,
  leaveCircle
} from '../controllers/peerController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCircles);                      // Public
router.post('/', auth, createCircle);                // Create circle (auth required)
router.post('/:circleId/join', auth, joinCircle);    // Join circle
router.post('/:circleId/leave', auth, leaveCircle);  // Leave circle

export default router;

