import { useEffect, useMemo, useCallback } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  
  const sound = useMemo(() => new Audio(notificationSound), []);

  const handleNewMessage = useCallback((newMessage) => {
    if (newMessage.senderId === selectedConversation._id) {
      newMessage.shouldShake = true;
      sound.play().catch((error) => console.error("Error playing sound:", error));
      setMessages([...messages, newMessage]);
    }
  }, [messages, setMessages, selectedConversation, sound]);

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, handleNewMessage]);
};

export default useListenMessages;
