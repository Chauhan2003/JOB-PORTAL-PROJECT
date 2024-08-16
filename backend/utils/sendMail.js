import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { generateToken } from "./tokenHandling.js";
dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

export const sendVarificationEmail = async (user) => {
  const { fullName, email, _id } = user;
  const token = await generateToken({ userId: _id }, "15m");
  const link = `${APP_URL}/user/verify/${token}`;

  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Welcome to Job Portal Platform</h1>
        </div>
        <div style="padding: 30px; background-color: white;">
          <h2 style="color: #4CAF50; margin-top: 0;">Hello, ${fullName}!</h2>
          <p style="font-size: 16px; color: #555;">We're excited to have you on board. To get started, please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${link}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 15px 30px; font-size: 16px; text-decoration: none; border-radius: 5px;">Verify Email</a>
          </div>
          <p style="font-size: 14px; color: #777;">If the button above doesn't work, you can copy and paste the following link into your browser:</p>
          <p style="word-break: break-all; color: #4CAF50;"><a href="${link}" style="color: #4CAF50; text-decoration: none;">${link}</a></p>
          <p style="font-size: 14px; color: #777;">Please note, this link will expire in 15min.</p>
          <p style="font-size: 16px; color: #555;">Thank you,<br>The Job Portal Platform Team</p>
        </div>
        <div style="background-color: #f1f1f1; padding: 20px; text-align: center; color: #888; font-size: 12px;">
          <p style="margin: 0;">Need help? Contact our <a href="#" style="color: #4CAF50; text-decoration: none;">support team</a>.</p>
          <p style="margin: 5px 0;">&copy; 2024 Job Portal Platform. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendDeleteAccountEmail = async ({ email }) => {
  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Account Deletion Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <div style="background-color: #FF5722; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Account Deletion Confirmation</h1>
        </div>
        <div style="padding: 30px; background-color: white;">
          <h2 style="color: #FF5722; margin-top: 0;">Hello, User</h2>
          <p style="font-size: 16px; color: #555;">We're sorry to see you go. Your account on Job Portal Platform has been successfully deleted.</p>
          <p style="font-size: 16px; color: #555;">If you didn't request this action, please contact our support team immediately.</p>
          <p style="font-size: 16px; color: #555;">Thank you for being a part of our community.</p>
          <p style="font-size: 16px; color: #555;">Best regards,<br>The Job Portal Platform Team</p>
        </div>
        <div style="background-color: #f1f1f1; padding: 20px; text-align: center; color: #888; font-size: 12px;">
          <p style="margin: 0;">Need help? Contact our <a href="#" style="color: #FF5722; text-decoration: none;">support team</a>.</p>
          <p style="margin: 5px 0;">&copy; 2024 Job Portal Platform. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
