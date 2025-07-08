'use server';
import { db } from "@/libs/db";

type UpdateUserInput = {
  membershipId: string;
  emailVerified: boolean;
};

export async function verifyEmail({ membershipId, emailVerified }: UpdateUserInput) {
  try {
    const order = await db.user.update({
      where: { membershipId: membershipId },
      data: { emailVerified }
    });
    return {
      success: true,
      message: "Email verification status updated successfully.",
      order,
    };
  } catch (error) {
    console.error("Error verifying email:", error);
    return {
      success: false,
      message: "Failed to update email verification status. Please try again.",
    };
  }
}
