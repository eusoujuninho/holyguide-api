import express from 'express';
import { createChat, getChats, getChat, updateChat, deleteChat } from '../controllers/chatController.js';

const router = express.Router();

router.post('/chats', createChat);
router.get('/chats', getChats);
router.get('/chats/:id', getChat);
router.put('/chats/:id', updateChat);
router.delete('/chats/:id', deleteChat);

export default router;