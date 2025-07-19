import { authOptions } from "./authOptions";
import { getServerSession } from "next-auth/next";

const getSessionUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }

  return { user: session?.user, userId: session?.user.id };
};

export default getSessionUser;
