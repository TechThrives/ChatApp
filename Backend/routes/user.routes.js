import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsers, getUsersWithConversationsHistory } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsers);
router.get('/history', protectRoute, getUsersWithConversationsHistory);

export default router;
