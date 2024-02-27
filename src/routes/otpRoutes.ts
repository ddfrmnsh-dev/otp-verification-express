import express from 'express';
import otpController from '../controller/otpController';

const router = express.Router();

router.post('/send-otp', otpController.sendOtp);

export default router;