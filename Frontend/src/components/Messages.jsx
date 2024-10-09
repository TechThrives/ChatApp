import { useEffect, useRef } from "react";
import useGetMessages from "../hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div
            className="flex-1 overflow-y-auto p-4"
            key={message._id}
            ref={lastMessageRef}
          >
            <Message message={message} />
          </div>
        ))}

      {loading && (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}
      {!loading && messages.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center text-lg text-black font-semibold flex flex-col items-center gap-2">
          <div className="flex items-center justify-center">
            <p className="mr-2">
              Select a chat to start messaging or Create a new chat
            </p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
export default Messages;
