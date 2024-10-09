import { useState } from 'react';
import { Icon } from '@iconify/react';
import useSendMessage from "../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 p-2 border rounded-lg"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
            type="submit"
            className="ml-2 p-2 bg-sky-500 text-white rounded-lg flex items-center justify-center"
            disabled={loading} 
        >
            {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></div> 
            ) : (
                <Icon icon="mingcute:send-line" className="h-5 w-5" />
            )}
           
        </button>
    </form>
  );
};

export default MessageInput;
