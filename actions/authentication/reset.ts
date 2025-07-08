"use server";
import { db } from "@/libs/db";
import { hash } from "bcrypt";
type UpdatePasswordInput = {
  email: string;
  password: string;
};
export async function updatePassword({ email, password }: UpdatePasswordInput) {
  if (!password) {
    throw new Error("Missing required fields");
  }
  const passwordRegex = /^.{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error("Password must be at least 8 characters");
  }
  try {
    const hashedPassword = await hash(password, 10);
    await db.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    return { success: true, message: "Password updated" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "Internal server error" };
    }
  }
}
