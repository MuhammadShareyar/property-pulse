"use server";

import connectDB from "@/config/database";
import getSessionUser from "@/utils/getSessionUser";
import message from "@/models/Message";

const addMessage = async (previousState,formData) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not authenticated");
  }

  const { userId } = sessionUser;
  const recipient = formData.get("recipient");

    if (userId === recipient) {
     return{error:"You cannot send a message to yourself"};
    }

  const messageData = {
    sender: userId,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  };

  const newMessage = new message(messageData);
  await newMessage.save();

  return { submitted: true };
};

export default addMessage;
