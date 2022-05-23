import express from 'express';
import { home, updateAccount } from '../controllers/index.controller';
import validation from '../validations';
import validate from '../middleware/validate';

const router = express.Router();

router.get('/', home); 
router.patch('/api/update-account', validate(validation), updateAccount); 

export { router as Routes };