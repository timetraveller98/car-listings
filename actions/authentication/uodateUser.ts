'use server';
import { db } from "@/libs/db";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { Role } from "@prisma/client";
// Get a user by ID
export async function getUserById(id: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized User");
  }
  const user = await db.user.findUnique({
    where: { id },
  });
  return user;
}

export async function updateUserById(id: string, formData: {
  name: string;
  email: string;
  contact: string | null;
  membershipId: string;
  role: Role;
  referral: string | null;
  image: string | null;
  address: {
    city: string;
    state: string;
    line1: string;
    line2: string | null;
    postalCode: string;
  } | null;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorized User");
  }
  const { name, email, contact, role, address, referral,image } = formData;
  const updatedUser = await db.user.update({
    where: { id },
    data: {
      name,
      email,
      contact,
      role,
      referral,
      image,
      ...(address && { address }),
    },
  });
  return updatedUser;
}

// Delete a user by ID
export async function deleteUserById(id: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'SUPERADMIN') {
    throw new Error("Unauthorized User");
  }
  await db.user.delete({
    where: { id },
  });
  return { success: true };
}
