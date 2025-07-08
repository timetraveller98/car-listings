'use server';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { db } from "@/libs/db";
type UpdateUserStatusInput = {
  id: string;
  isEnabled: boolean;
};
export async function updateUserStatus({ id, isEnabled }: UpdateUserStatusInput) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'SUPERADMIN') {
    return {
      success: false,
      message: 'Unauthorized User',
    };
  }
  try {
    const updatedUser = await db.user.update({
      where: { id: id },
      data: { isEnabled },
    });
    return {
      success: true,
      message: 'User status updated successfully.',
      updatedUser,
    };
  } catch (error) {
    console.error("Error updating user status:", error);
    return {
      success: false,
      message: 'Failed to update user status.',
    };
  }
}
