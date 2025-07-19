"use server";

import connectDB from "@/config/database";
import getSessionUser from "@/utils/getSessionUser";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

const addProperty = async (formData) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not authenticated");
  }

  // Access all values from amenities and images
  const amenities = formData.getAll("amenities");
  const images = formData.getAll("images").filter((image) => image.name !== "");

  const propertyData = {
    owner: sessionUser.userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("locations.street"),
      city: formData.get("locations.city"),
      state: formData.get("locations.state"),
      zipcode: formData.get("locations.zipcode"),
    },
    amenities,
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    rates: {
      monthly: formData.get("rates.monthly"),
      weekly: formData.get("rates.weekly"),
      nightly: formData.get("rates.nightly"),
    },
    square_feet: formData.get("square_feet"),
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const imageUrls = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert image to base64 
    const imageBase64 = imageData.toString("base64")  ;

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
      folder: "propertypulse",
    });

    imageUrls.push(uploadResult.secure_url);
  }

  propertyData.images = imageUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/", "layout");

  redirect(`/properties/${newProperty._id}`);
};

export default addProperty;
