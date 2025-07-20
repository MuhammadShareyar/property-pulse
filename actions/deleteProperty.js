"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  // Connect to the database
  await connectDB();

  // Get the session user
  const { user, userId } = await getSessionUser();

  if (!user || !userId) {
    throw new Error("User ID is required!");
  }

  // Find the property by ID and ensure it belongs to the user
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found !");
  }

  // Check if the property belongs to the user
  if (property.owner.toString() !== userId) {
    throw new Error("You are not authorized to delete this property!");
  }

  // Extract image public IDs from the property
  const imagePublicIds = property.images.map((image) => {
    const parts = image.split("/");
    return parts.at(-1)?.split(".")[0];
  });

  if (imagePublicIds.length > 0) {
    // Delete images from Cloudinary
    for (let publicId of imagePublicIds) {
      await cloudinary.uploader.destroy(`propertypulse/${publicId}`);
    }
  }

  // Delete the property from the database
  await property.deleteOne();

  // Revalidate the path to update the cache
  revalidatePath("/", "layout");
}

export default deleteProperty;
