"use server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { db } from "@/libs/db";
export async function sendResetLink(email: string) {
  try {
    if (!email) {
      return { success: false, message: "Missing required fields" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Invalid email format" };
    }
    const existingUser = await db.user.findUnique({ where: { email } });
    if (!existingUser) {
      return { success: false, message: "Email doesn't exist" };
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await db.user.update({
      where: { email },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry,
      },
    });
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.LOGIN_EMAIL,
        pass: process.env.LOGIN_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Car Listings" <chuhan718@gmail.com>',
      to: email,
      subject: "Your Reset Password Link",
      text: `This link will expire in 10 minutes: ${resetUrl}`,
    });

    return { success: true, message: "Link sent successfully" };
  } catch (error) {
    console.error("Reset error:", error);
    return { success: false, message: "Something went wrong" };
  }
}
