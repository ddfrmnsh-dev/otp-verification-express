import express from 'express';
import authController from '../controller/authController';

const router = express.Router();

router.post('/signup', authController.singup);

export default router;