import { useAuthContext } from "../context/AuthContext";
import { extractTime } from "../utils/extractTime";
import useConversation from "../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const shouldShake = message.shouldShake? "shake": "";
  return (
       
    <div key={message.id} className={`my-2 ${fromMe ? 'text-right' : 'text-left'}`}>
    {/* Align the profile picture to the left or right based on the message sender */}
    <div className={`flex items-center ${fromMe ? 'justify-end' : 'justify-start'}`}>
      {!fromMe && (
        <img alt='' src={profilePic} className="w-10 h-10 rounded-full mr-2" />
      )}
      <div className={`inline-block p-2 rounded-lg ${fromMe ? 'bg-sky-500' : 'bg-gray-200'} ${shouldShake}`}>
        <p>{message.message}</p>
        <span className="text-xs text-black">{formattedTime}</span>
      </div>
      {fromMe && (
        <img alt='' src={profilePic} className="w-10 h-10 rounded-full ml-2" />
      )}
    </div>
  </div>
  
  );
};

export default Message;
