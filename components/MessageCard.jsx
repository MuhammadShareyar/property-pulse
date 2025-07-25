"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import markMessageRead from "@/actions/markMessageRead";
import deleteMessage from "@/actions/deleteMessage";
import { useMessageCountContext } from "@/context/MessageCountContext";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadMessageCount } = useMessageCountContext();

  const handleReadClick = async () => {
    const read = await markMessageRead(message._id);

    setIsRead(read);
    setUnreadMessageCount((prevCount) =>
      read ? prevCount - 1 : prevCount + 1
    );
    toast.success(read ? "Message marked as read" : "Message marked as unread");
  };

  const handleDeleteClick = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (confirmed) {
      await deleteMessage(message._id)
        .then(() => {
          setIsDeleted(true);
          setUnreadMessageCount((prevCount) =>
            isRead ? prevCount : prevCount - 1
          );
          toast.success("Message deleted successfully");
        })
        .catch((error) => {
          toast.error(error.message || "Failed to delete message");
        });
    }
  };

  if (isDeleted) {
    return <div className="text-red-500">Message deleted!</div>;
  }

  return (
    <div className="space-y-4 mt-4">
      <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
        {!isRead ? (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
            New
          </div>
        ) : null}

        <h2 className="text-xl mb-4">
          <span className="font-bold">Property Inquiry : </span>
          {message.property.name}
        </h2>
        <p className="text-gray-700">{message.body}</p>

        <ul className="mt-4">
          <li>
            <strong>Name:</strong> {message.name}
          </li>

          <li>
            <strong>Reply Email: </strong>
            <a href={`mailto:${message.email}`} className="text-blue-500">
              {message.email}
            </a>
          </li>
          <li>
            <strong>Reply Phone: </strong>
            <a href={`tel:${message.phone}`} className="text-blue-500">
              {message.phone}
            </a>
          </li>
          <li>
            <strong>Received: </strong>
            {new Date(message.createdAt).toLocaleString()}
          </li>
        </ul>
        <button
          onClick={handleReadClick}
          className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
        >
          {isRead ? "Mark As New" : "Mark As Read"}
        </button>
        <button
          onClick={handleDeleteClick}
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MessageCard;
