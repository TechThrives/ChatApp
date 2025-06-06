import useGetConversationsHistory from "../hooks/useGetConversationsHistory";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversationsHistory();

  return (
    <div className="h-[calc(100vh-280px)] overflow-y-auto">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : !conversations.length ? (
        <div className="flex items-center justify-center h-full">
          <p>No conversations yet</p>
        </div>
      ) : (
        conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;
