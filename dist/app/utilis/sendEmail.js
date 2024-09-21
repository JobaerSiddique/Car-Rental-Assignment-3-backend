"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const generateEmailTemplate = (resetLink) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          background-color: #00bcd4;
          color: #ffffff;
          padding: 20px;
          text-align: center;
        }
        .email-body {
          padding: 20px;
          text-align: left;
          color: #333;
        }
        .email-body h2 {
          color: #333;
        }
        .email-body p {
          line-height: 1.6;
        }
        .reset-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #00bcd4;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
          text-align: center;
        }
        .email-footer {
          background-color: #f4f4f4;
          color: #777;
          padding: 10px;
          text-align: center;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Reset Your Password</h1>
        </div>
        <div class="email-body">
          <h2>Hello,</h2>
          <p>We received a request to reset your password. Please click the button below to reset your password. This link is valid for 10 minutes.</p>
          <a href="${resetLink}" class="reset-button">Reset Password</a>
          <p>If you didn't request a password reset, please ignore this email.</p>
          <p>Thank you!</p>
        </div>
        <div class="email-footer">
          <p>&copy; ${new Date().getFullYear()} Car Rentals. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
const sendEmail = (to, html) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ html });
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com.",
        port: 587,
        secure: config_1.default.NODE_ENV === 'production',
        auth: {
            user: config_1.default.GMAIL_USER,
            pass: config_1.default.GMAIL_PASS,
        },
    });
    const htmls = generateEmailTemplate(html);
    yield transporter.sendMail({
        from: config_1.default.GMAIL_USER,
        to,
        subject: "Reset Your Password ",
        text: "Reset your password after 10 Mins otherwise this link can not be worked", // plain text body
        html: htmls,
    });
});
exports.sendEmail = sendEmail;
