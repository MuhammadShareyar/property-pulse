"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageRead(messageId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser.userId || !sessionUser.user) {
    throw new Error("User not authenticated");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error("Message not found");
  }

  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized access to message");
  }

  message.read = !message.read;

  revalidatePath("/messages", "page");

  await message.save();

  return message.read;
}

export default markMessageRead;
