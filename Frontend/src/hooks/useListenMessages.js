import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages, selectedConversation } = useConversation();
	const sound = new Audio(notificationSound);

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			if(newMessage.senderId === selectedConversation._id) {
			newMessage.shouldShake = true;
			sound.play();
				setMessages([...messages, newMessage]);
			}
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
