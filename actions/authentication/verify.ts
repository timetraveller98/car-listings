'use server';
import { db } from "@/libs/db";
import crypto from "crypto";
export async function verifyTokenAction(token:string) {
  if (!token) {
    return { status: 400, message: "Token is required" };
  }
  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await db.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      return { status: 400, message: "Invalid token or token has expired" };
    }
    return { status: 200, user };
  } catch (error) {
    console.error("Error in password reset verification:", error);
    return { status: 500, message: "Something went wrong, please try again later" };
  }
}
