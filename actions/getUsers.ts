"use server";
import { db } from "@/libs/db";
import { hash } from "bcrypt";
export default async function getUsers(page: number, limit: number, searchQuery: string) {
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
    const hashedPassword = await hash(password, 10);
    await db.user.create({
      data: { name, email, password: hashedPassword },
    });
    return { success: true, message: "Successfully Register" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Failed to register user." };
  }
}
