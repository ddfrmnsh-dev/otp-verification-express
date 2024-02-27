import nodemailer from "nodemailer"

const mailSender = async (email:string, title:string, body:string) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth:  {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: title,
            html: body
        })

        console.log("Email info: ", info);
        return info
    } catch (error) {
        console.log(error);
    }
}

export {
    mailSender
}