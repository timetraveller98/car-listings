'use server';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { db } from '@/libs/db';
type UpdateCarStatusInput = {
  id: string;
  status: string;
};
export async function updateCarStatus({ id, status }: UpdateCarStatusInput) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'SUPERADMIN') {
    return {
      success: false,
      message: 'Unauthorized User',
    };
  }
  try {
    const updatedUser = await db.listing.update({
      where: { id: id },
      data: { status, adminEmail:currentUser?.email },
    });
    return {
      success: true,
      message: 'status updated.',
      updatedUser,
    };
  } catch (error) {
    console.error("Error updating Listing status:", error);
    return {
      success: false,
      message: 'Failed to update user status.',
    };
  }
}

// Delete a user by ID
export async function deleteCarById(id: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'SUPERADMIN') {
    throw new Error("Unauthorized User");
  }
  await db.listing.delete({
    where: { id },
  });
  return { success: true };
}
