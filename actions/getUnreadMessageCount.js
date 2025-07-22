"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import getSessionUser from "@/utils/getSessionUser";

async function getUnreadMessageCount(messageId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser.userId || !sessionUser.user) {
    throw new Error("User not authenticated");
  }

  const { userId } = sessionUser;

  const messageCount = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { count: messageCount };
}

export default getUnreadMessageCount;
