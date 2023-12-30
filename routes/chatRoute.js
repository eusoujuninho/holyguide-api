// Em chatRoute.js
import express from 'express';
import chatController from '../controllers/chatController.js';

const router = express.Router();

router.post('/send', chatController.sendMessage);
// Outras rotas do chat, se necessário

export default router;