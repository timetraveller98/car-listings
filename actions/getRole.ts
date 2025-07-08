'use server';
import { Role } from '@prisma/client';
type GetRolesResponse = {
  success: boolean;
  roles?: Role[];
  message?: string;
};
export async function getRoles(): Promise<GetRolesResponse> {
  try {
    const roles = Object.values(Role).filter(role => role !== 'SUPERADMIN');
    return {
      success: true,
      roles,
    };
  } catch (error) {
    console.error("Error retrieving roles:", error);
    return {
      success: false,
      message: 'Failed to retrieve roles',
    };
  }
}

