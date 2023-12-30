import express from 'express';
import ChatController from '../controllers/chatController.js';
import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();
const chatController = new ChatController();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 * security:
 *   - ApiKeyAuth: []
 */

/**
 * @swagger
 * /api/chats/initialize:
 *   post:
 *     summary: Inicializa um chat
 *     tags: [Chat]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Retorna o ID do chat inicializado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chat:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID do chat inicializado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/api/chats/initialize', authenticate, (req, res) => {
  chatController.initializeChat(req.userId)
    .then(result => res.status(200).send(result))
    .catch(error => res.status(500).send({ message: error.message }));
});

/**
 * @swagger
 * /api/chats/id:
 *   get:
 *     summary: Obtém o ID de um chat
 *     tags: [Chat]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Retorna o ID do chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chat:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID do chat
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/api/chats/id', authenticate, (req, res) => {
  chatController.getChatId(req.userId)
    .then(result => res.status(200).send(result))
    .catch(error => res.status(500).send({ message: error.message }));
});

/**
 * @swagger
 * /api/chats/send:
 *   post:
 *     summary: Envia uma mensagem no chat
 *     tags: [Chat]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               content:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mensagem enviada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 response:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       type:
 *                         type: string
 *                       content:
 *                         type: string
 *                       direction:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                       audioUrl:
 *                         type: string
 *                       convertedFromAudio:
 *                         type: boolean
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao enviar a mensagem
 */
router.post('/api/chats/send', authenticate, (req, res) => {
  const { userId, content, type } = req.body;
  chatController.sendMessage(userId, content, type)
    .then(result => res.status(200).send(result))
    .catch(error => res.status(500).send({ message: error.message }));
});

export default router;
