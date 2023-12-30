import express from 'express';
import admin from '../firebase.js'; // Caminho para o seu arquivo Firebase Admin

const router = express.Router();

/**
 * @swagger
 * /anonymous-auth:
 *   post:
 *     summary: Cria um usuário anônimo e retorna um token de autenticação
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Usuário anônimo criado com sucesso e token de autenticação retornado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação do Firebase
 *       500:
 *         description: Erro ao criar usuário anônimo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro detalhada
 */
router.post('/anonymous-auth', async (req, res) => {
  try {
    const userRecord = await admin.auth().createUser({});
    const token = await admin.auth().createCustomToken(userRecord.uid);

    res.status(200).send({ 'token': token });
  } catch (error) {
    console.error('Error creating anonymous user:', error);
    res.status(500).send({ error: error.message });
  }
});

export default router;
