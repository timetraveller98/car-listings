"use server";
import { db } from "@/libs/db";
import { hash } from "bcrypt";
import nodemailer from "nodemailer";

export default async function getUsers(page: number, limit: number) {
  const skip = (page - 1) * limit;
  const users = await db.user.findMany({
    where: {
      role: "USER",
    },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  const total = await db.user.count({
    where: {
      role: "USER",
    },
  });
  return { users, total };
}


export async function setUsers(formData: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      return { success: false, message: "All fields are required." };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, message: "Invalid email format." };
    }
    if (password.length < 8) {
      return {
        success: false,
        message: "Password must be at least 8 characters.",
      };
    }
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, message: "Email already exists." };
    }
    const namePart = name.slice(0, 3).toUpperCase();
    let membershipId: string = "";
    let isUnique = false;
    while (!isUnique) {
      membershipId = `${namePart}${Math.floor(10000 + Math.random() * 90000)}`;
      const existingMembership = await db.user.findUnique({
        where: { membershipId },
      });
      if (!existingMembership) isUnique = true;
    }
    const hashedPassword = await hash(password, 10);
    await db.user.create({
      data: { name, email, password: hashedPassword, membershipId },
    });

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
      subject: "Welcome to Car Listing Management App",
      html: `
           <div style="display: flex; justify-content: center; align-items: center; background-color: #f4f4f4; padding: 20px;">
             <div style="max-width: 400px; width: 100%; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
               <div style="text-align: center; margin-bottom: 20px;">
                 <h2 style="color: #2c3e50; font-weight: bold;">Welcome, ${name}!</h2>
                 <p style="color: #555; font-size: 16px;">We're excited to have you as a part of the Electro Air family.</p>
               </div>
               <div style="background-color: #2ecc71; color: #fff; padding: 15px; border-radius: 6px; text-align: center; font-size: 15px; margin-bottom: 20px;">
                 <strong>Your Password:</strong> <span style="font-weight: bold;">${password}</span>
               </div>
               <div style="background-color: orange; color: #fff; padding: 15px; border-radius: 6px; text-align: center; font-size: 15px; margin-bottom: 20px;">
                 <strong>Your UID:</strong> <span style="font-weight: bold;">${membershipId}</span>
               </div>
               <div style="text-align: center;">
                 <a href="${process.env.NEXT_PUBLIC_BASE_URL}/user-verify/${membershipId}" 
                    style="display: inline-block; padding: 12px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; font-size: 14px; border-radius: 6px; font-weight: bold;"
                    target="_blank">
                   Verify Your Account
                 </a>
               </div>
               <div style="margin-top: 40px; text-align: center; color: #777; font-size: 14px;">
                 <p>Best regards,</p>
                 <p><strong>Car Listings Team</strong></p>
               </div>
             </div>
           </div>
         `,
    });

    return { success: true, message: "Please verify email" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Failed to register user." };
  }
}
