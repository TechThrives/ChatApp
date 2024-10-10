import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useAuthContext } from "./AuthContext";
import SocketIoClient from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const socketRef = useRef(null); 

  useEffect(() => {
    if (authUser && !socketRef.current) {
      socketRef.current = SocketIoClient(process.env.REACT_APP_API_URL, {
        query: {
          userId: authUser._id,
        },
        transports: ["websocket"],
        withCredentials: true,
      });

      socketRef.current.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.off("getOnlineUsers");
          socketRef.current.close();
          socketRef.current = null;
        }
      };
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
