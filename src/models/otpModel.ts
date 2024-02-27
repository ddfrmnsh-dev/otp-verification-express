import { mailSender } from "../utils/mailSender";
async function sendVerfivationEmail(email:string, otp:string) {
    try {
        const mailRes = await mailSender(
            email,
            "Verification Email",
            `<h1>Please confirm your OTP</h1>
            <p>Here is your OTP code: ${otp}</p>`
        );
        console.log("Email successfully sent", mailRes);
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}