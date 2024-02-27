import express, {Request, Response} from "express";
import authRoutes from './src/routes/authRoutes'
import otpRoutes from './src/routes/otpRoutes'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express()

// Middleware untuk mengaktifkan CORS

// Middleware untuk parsing body dari request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api',authRoutes)


app.use(otpRoutes)

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`Serve berjalan pada port http://localhost:${PORT}`)
});
export default app