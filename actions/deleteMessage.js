"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId) {
  // Connect to the database
  await connectDB();

  // Get the session user
  const { user, userId } = await getSessionUser();

  if (!user || !userId) {
    throw new Error("User ID is required!");
  }

  // Find the message by ID and ensure it belongs to the user
  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error("Message not found !");
  }

  // Check if the message belongs to the user
  if (message.recipient.toString() !== userId) {
    throw new Error("You are not authorized to delete this message!");
  }


  // Delete the message from the database
  await message.deleteOne();

  // Revalidate the path to update the cache
  revalidatePath("/messages", "layout");
}

export default deleteMessage;
