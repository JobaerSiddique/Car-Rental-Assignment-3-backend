
import nodemailer from "nodemailer"
import config from "../../config";


export const sendEmail=async(to:string,html:string)=>{
  
  
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com.",
      port: 587,
      secure:config.NODE_ENV === 'production', 
      auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASS,
      },
      
    });
 
     await transporter.sendMail({
      from: config.GMAIL_USER, // sender address
      to, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html, // html body
    });
  }