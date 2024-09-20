import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const socketInstance = io(`${process.env.REACT_APP_API_URL}`, {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socketInstance);

			socketInstance.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => {
				socketInstance.off("getOnlineUsers");
				socketInstance.close();
			};
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]); // Only authUser is a dependency

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
