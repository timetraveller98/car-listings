"use server";
import { db } from "@/libs/db";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
export default async function getListing(
  page: number,
  limit: number,
) {
  const skip = (page - 1) * limit;
  const listings = await db.listing.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
     include: {
      user: true,
    },
  });
  const total = await db.listing.count({});
  return { listings, total };
}

export async function setListing(formData: {
  brand: string;
  model: string;
  year: number;
  price: number;
}) {
  try {
    const { brand, model, year, price } = formData;
    if (!brand || !year || !price || !model) {
      return { success: false, message: "All fields are required." };
    }
    const currentUser = await getCurrentUser();
      if (!currentUser) {
      return {
        success: false,
        redirect: "/login",
        message: "Please login first.",
      };
    }
    await db.listing.create({
      data: {
        user: { connect: { id: currentUser?.id } },
        brand,
        model,
        year,
        price,
      },
    });
    return { success: true, message: "Car Added" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Failed to adding car." };
  }
}
