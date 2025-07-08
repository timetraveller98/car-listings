"use server";
import { db } from "@/libs/db";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { Role } from "@prisma/client";
export async function getCarById(id: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized User");
  }

  const listings = db.listing.findUnique({
    where: { id },
  });
  return listings;
}

export async function updateCarById(
  id: string,
  formData: {
    brand: string;
  model: string;
  year: number;
  price: number;
  }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorized User");
  }
  const {brand, model, year, price } = formData;
  const updatedUser = await db.listing.update({
    where: { id },
    data: {
     brand, model, year, price
    },
  });
  return updatedUser;
}
