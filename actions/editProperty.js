"use server";

import connectDB from "@/config/database";
import getSessionUser from "@/utils/getSessionUser";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const editProperty = async (propertyId,formData) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not authenticated");
  }

  // check if the property exists
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  // check if the property belongs to the user
  if (property.owner.toString() !== sessionUser.userId) {
    throw new Error("You are not authorized to edit this property!");
  }
  
  const propertyData = {
    owner: sessionUser.userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    amenities: formData.getAll("amenities"),
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

  // Update the property with new data
  const updatedProperty = await Property.findByIdAndUpdate(propertyId,propertyData);

  revalidatePath("/", "layout");

  redirect(`/properties/${updatedProperty._id}`);
};

export default editProperty;
