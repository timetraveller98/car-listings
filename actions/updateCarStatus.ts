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
      data: { status },
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
