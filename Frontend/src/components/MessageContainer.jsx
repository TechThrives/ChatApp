import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { Icon } from "@iconify/react";
import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex-1 flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <img
              src={selectedConversation.profilePic}
              alt={selectedConversation.fullName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-sm">
                {selectedConversation.fullName}
              </h2>
              {onlineUsers.includes(selectedConversation._id) ? (
                <p className="text-xs text-green-500">Online</p>
              ) : (
                <p className="text-xs text-red-500">Offline</p>
              )}
            </div>
          </div>

          {/* Messages */}
          <Messages />

          {/* Message Input */}
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center text-lg text-black font-semibold flex flex-col items-center gap-2">
        <p>
          Welcome <span className="text-blue-500">{authUser.fullName}</span>
        </p>
        <div className="flex items-center justify-center">
          <p className="mr-2">Select a chat to start messaging or Create a new chat</p>
          <Icon icon="mdi:chat" className="text-3xl" />
        </div>
      </div>
    </div>
  );
};
