import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {useAuthContext} from "../../context/AuthContext";
import Modal from "../../components/Model";
import Conversations from "../../components/Conversations";
import MessageContainer from "../../components/MessageContainer";
import useSignout from "../../hooks/useSignout";
import Logo from "../../assets/logo.png";

export default function Home() {
	const {authUser} = useAuthContext();
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const { loading, signout } = useSignout();

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="bg-white flex overflow-hidden w-full">
        {/* Left Sidebar */}
        <div className="w-1/4 border-r border-gray-200 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <img className="w-8 h-8" src={Logo} alt="logo" />
              <span className="text-2xl font-semibold text-gray-900">
                ChatApp
              </span>
            </div>
            <button className="p-2 text-red-500">
              {!loading ? (
                <Icon
                  icon="lucide:log-out"
                  className="w-6 h-6 cursor-pointer"
                  onClick={signout}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500 border-solid"></div>
                </div>
              )}
            </button>
          </div>

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
          <button
            className="text-white font-medium bg-blue-500 w-full justify-start p-2 border border-gray-300 rounded-lg flex items-center mb-4"
            onClick={() => setIsNewChatOpen(true)}
          >
            <Icon icon="mdi:plus" className="mr-2 h-4 w-4" />
            Create New Chat
          </button>
          {isNewChatOpen && (
            <Modal closeModal={() => setIsNewChatOpen(false)} />
          )}
          <Conversations />
        </div>

        {/* Main Chat Area */}
        <MessageContainer />
      </div>
    </div>
  );
}
