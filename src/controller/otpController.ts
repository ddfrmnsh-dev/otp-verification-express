import otpGenerator from 'otp-generator';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendVerfivationEmail } from '../models/otpModel';

const prisma = new PrismaClient();

const sendOtp = async (req: Request,res: Response) => {
    try {
        const {email} = req.body
        const checkUserPresent = await prisma.user.findUnique({
            where: {
                email
            }
        })
        
        if(checkUserPresent) {
            return res.status(401).json({
                success: false,
                message : 'User is already registered'
            })
        }

        let otp = otpGenerator.generate(6, { 
            upperCaseAlphabets: false, 
            lowerCaseAlphabets: false, 
            specialChars: false 
        });
        let result = await prisma.otp.findFirst({
            where: {
                otp: otp
            }
        })
        while(result) {
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false
            });
            result = await prisma.otp.findFirst({
            where : {
                otp: otp
            }
            })
        }
        // const otpPayload= { email, otp}
        const saveOtp = await prisma.otp.create({
            data: {
                email,
                otp
            }
        })
        const otpBody = await sendVerfivationEmail(email, otp);
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message : `Internal Server Error: ${error}`});
    }
}

export default {sendOtp}