import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";

export const getUsers = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsers: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getUsersWithConversationsHistory = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const conversations = await Conversation.find({ participants: loggedInUserId })
      .populate("participants", "-password") 
      .exec();

    const userIds = new Set(); 

    conversations.forEach(conversation => {
      conversation.participants.forEach(participant => {
        if (participant._id.toString() !== loggedInUserId.toString()) {
          userIds.add(participant._id);
        }
      });
    });

    const filteredUsers = await User.find({ _id: { $in: Array.from(userIds) } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersWithChatHistory: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

