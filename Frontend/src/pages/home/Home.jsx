import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import Modal from "../../components/Model";
import Conversations from "../../components/Conversations";
import MessageContainer from "../../components/MessageContainer";
import useSignout from "../../hooks/useSignout";
import Logo from "../../assets/logo.png";

export default function Home() {
  const { authUser } = useAuthContext();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const { loading, signout } = useSignout();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (selectedConversation) {
      setIsSidebarOpen(false);
    }
  }, [selectedConversation]);

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <img className="w-8 h-8" src={Logo} alt="ChatApp Logo" />
          <span className="text-xl font-semibold text-gray-900">ChatApp</span>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-red-500" onClick={signout}>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500 border-solid"></div>
              </div>
            ) : (
              <Icon icon="lucide:log-out" className="w-6 h-6 cursor-pointer" />
            )}
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Icon icon="mdi:menu" className="w-6 h-6 text-gray-900" />
          </button>
        </div>
      </header>

      <div className="flex overflow-hidden flex-grow">
        {/* Left Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-full md:w-96 border-r border-gray-200 p-4 overflow-y-auto bg-white transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:static md:translate-x-0`}
        >
          <div className="md:hidden flex items-center justify-between p-2 mb-4 bg-white border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <img className="w-8 h-8" src={Logo} alt="ChatApp logo" />
              <span className="text-xl font-semibold text-gray-900">
                ChatApp
              </span>
            </div>
            <button
              className="p-2 text-gray-900 hover:text-red-500 transition duration-200"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center mb-4">
            <img
              src={authUser.profilePic}
              alt={authUser.fullName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="font-semibold">{authUser.fullName}</h2>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>

          {/* Create New Chat Button */}
          <button
            className="text-white font-medium bg-blue-500 w-full justify-start p-2 border border-gray-300 rounded-lg flex items-center mb-4"
            onClick={() => setIsNewChatOpen(true)}
          >
            <Icon icon="mdi:plus" className="mr-2 h-4 w-4" />
            Create New Chat
          </button>
          <Conversations />
        </aside>

        {/* Main Chat Area */}
        <div className="flex-grow overflow-y-auto">
          {!selectedConversation ? <NoChatSelected /> : <MessageContainer />}
        </div>
      </div>

      {isNewChatOpen && (
            <Modal closeModal={() => setIsNewChatOpen(false)} />
          )}
          
    </div>
  );
}

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center text-lg text-black font-semibold flex flex-col items-center gap-2">
        <p>
          Welcome <span className="text-blue-500">{authUser.fullName}</span>
        </p>
        <div className="flex items-center justify-center">
          <p className="mr-2">
            Select a chat to start messaging or Create a new chat
          </p>
          <Icon icon="mdi:chat" className="text-3xl" />
        </div>
      </div>
    </div>
  );
};
