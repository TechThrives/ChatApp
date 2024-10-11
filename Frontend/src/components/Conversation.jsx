import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "..."; 
    }
    return text;
  };

  return (
    <>
      <div
        className={`flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer ${
          isSelected ? "bg-blue-300" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <img
          src={conversation.profilePic}
          alt={conversation.fullName}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="flex-1">
          <h2 className="font-semibold text-sm truncate">{truncateText(conversation.fullName, 20)}</h2>
          <p className="text-xs text-black truncate">{truncateText(conversation.lastMessage?.message || "No messages yet", 30)}</p>
        </div>
        {isOnline && <div className="w-2 h-2 bg-green-700 rounded-full"></div>}
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
