import express from 'express';
import { 
  createBusiness, 
  getBusinesses, 
  updateBusiness 
} from '../controllers/businessController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getBusinesses)
  .post(protect, createBusiness);

router.route('/:id')
  .put(protect, updateBusiness);

export default router; 