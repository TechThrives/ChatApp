import React, { useState, useEffect } from "react";
import useGetUsers from "../hooks/useGetUsers";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { Icon } from "@iconify/react";
import SearchInput from "./SearchInput";

const Modal = ({ closeModal }) => {
  const { loading, users } = useGetUsers();
  const { setSelectedConversation } = useConversation();
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (users.length > 0) {
      setFilteredUsers(users);
    }
  }, [users]);

  const handleConversationClick = (user) => {
    setSelectedConversation(user);
    closeModal();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={closeModal}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative bg-white w-full max-w-md shadow-lg p-4 rounded-lg">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <Icon icon="mdi:close" className="h-5 w-5" />
          </button>
          <h2 className="font-semibold">Create New Chat</h2>
          <SearchInput setFilteredUsers={setFilteredUsers} />
          <div className="mt-4 h-[300px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
              </div>
            ) : !filteredUsers.length ? (
              <div className="flex items-center justify-center h-full">
                <p>No users found</p>
              </div>
            ) : (
              filteredUsers.map((user, idx) => (
                <Conversation
                  key={user._id}
                  user={user}
                  lastIdx={idx === users.length - 1}
                  onConversationClick={handleConversationClick}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Conversation = ({ user, lastIdx, onConversationClick }) => {
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <>
      <div
        className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
        onClick={() => onConversationClick(user)}
      >
        <img
          src={user.profilePic}
          alt={user.fullName}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="flex-1">
          <h2 className="font-semibold text-sm">{user.fullName}</h2>
        </div>
        {isOnline && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Modal;
