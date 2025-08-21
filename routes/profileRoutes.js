import express from 'express';
import {
  getUserProfile,
  updateProfilePhoto
} from '../controllers/profileControllers.js';

const router = express.Router();

router.get('/:userId', getUserProfile);
router.put('/:userId/photo', updateProfilePhoto);

export default router;
