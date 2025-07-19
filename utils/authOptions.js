import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {

      // Connect to the database
      await connectDB();

      // Check if user already exists
      let userExists = await User.findOne({ email: profile.email });

      // If user does not exist, create a new user
      if(!userExists) {
        userExists = await User.create({
          username: profile.name,
          email: profile.email,
          image: profile.picture,
        });
      }

      // Return true to allow sign-in
      return true;
    },
    async session({ session }) {
      // get user ID from the database
      const user = await User.findOne({ email: session.user.email });
      // set user ID in session
      session.user.id = user._id.toString();

      // Return the session object
      return session;
    },
  },
};
