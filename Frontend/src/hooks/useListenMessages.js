import { useEffect, useMemo } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages, selectedConversation } = useConversation();
  
  const sound = useMemo(() => new Audio(notificationSound), []);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (newMessage.senderId === selectedConversation._id) {
        newMessage.shouldShake = true;
        sound.play();
        setMessages((prevMessages) => [...prevMessages, newMessage]); 
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages, selectedConversation, sound]);
};

export default useListenMessages;
