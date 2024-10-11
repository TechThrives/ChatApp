import { useEffect, useRef } from "react";
import useGetMessages from "../hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="px-2 flex-1 overflow-auto">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : messages.length > 0 ? (
        messages.map((message) => (
          <div className="flex-1 overflow-y-auto p-2" key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center text-lg text-black font-semibold flex flex-col items-center gap-2">
            <p className="mr-2">No messages</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
