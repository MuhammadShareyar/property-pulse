import connectDB from "@/config/database";
import getSessionUser from "@/utils/getSessionUser";
import Message from "@/models/Message";
import "@/models/Property";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import MessageCard from "@/components/MessageCard";

const MessagePage = async () => {
  await connectDB();

  const { user, userId } = await getSessionUser();

  if (!user || !userId) {
    throw new Error("User not authenticated");
  }

  const readMessagesDocs = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessagesDocs = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...unreadMessagesDocs, ...readMessagesDocs].map(
    (messageDoc) => {
      const message = convertToSerializeableObject(messageDoc);
      message.sender = convertToSerializeableObject(messageDoc.sender);
      message.property = convertToSerializeableObject(messageDoc.property);

      return message;
    }
  );

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          {messages.length === 0 ? (
            <p className="text-gray-500">No messages found.</p>
          ) : (
            messages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MessagePage;
