import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';    
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const singup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, otp, role } = req.body;
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

        const response = await prisma.otp.findMany({
            where:{
                email
            },
            orderBy: {
                cretedAt: 'desc'
            },
            take: 1
            })

            if(response.length === 0 || otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });
            }

            let hashPassword;
            try {
                hashPassword = await bcrypt.hash(password, 10);
            } catch (error) {
                 return res.status(500).json({
                    success: false,
                    message: `Hashing password error for ${password}: ` + error,
                });
            }

            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashPassword,
                    role
                },
            })
            return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: newUser,
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error });
    }
}

export default{ 
    singup
}