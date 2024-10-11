import useConversation from "../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useSocketContext } from "../context/SocketContext";

const MessageContainer = () => {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  return (
    <div className="h-full flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="p-2 bg-blue-300 border-b border-gray-200 flex justify-between items-center">
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
    </div>
  );
};
export default MessageContainer;
