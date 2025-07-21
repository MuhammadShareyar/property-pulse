"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import getSessionUser from "@/utils/getSessionUser";

async function checkBookmarkStatus(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser.userId || !sessionUser.user) {
    throw new Error("User not authenticated");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);
  let isBookmarked = user.bookmarks.includes(propertyId);

  return {
    isBookmarked,
  };
}

export default checkBookmarkStatus;
