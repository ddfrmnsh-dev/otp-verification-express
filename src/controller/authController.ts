import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';    
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const singup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, otp } = req.body;
        if (!name || !email || !password || !otp) {
            return res.status(403).json({
              success: false,
              message: 'All fields are required',
            });
          }
        
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }   
        })
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
              });
        }
    } catch (error) {
        
    }
}