import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <img
          src={conversation.profilePic}
          alt={conversation.fullName}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="flex-1">
          <h2 className="font-semibold text-sm">{conversation.fullName}</h2>
          {/* <p className="text-xs text-gray-500">{contact.lastMessage}</p> */}
        </div>
        {isOnline && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
