import admin from 'firebase-admin';
import config from '../config.js';

// Inicialize o Firebase Admin com as credenciais do projeto
admin.initializeApp({
  credential: admin.credential.cert(config.firebaseServiceAccount),
  // ... outras configurações necessárias
});

// Função para registrar um novo usuário
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    res.status(201).send({ userId: userRecord.uid });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Middleware para verificar o token de ID do Firebase
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userId = decodedToken.uid;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Failed to authenticate token' });
  }
};

// Função para obter os detalhes do usuário autenticado
export const getUserDetails = async (req, res) => {
  try {
    const userRecord = await admin.auth().getUser(req.userId);
    res.status(200).send({ userDetails: userRecord });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Função para logout do usuário (gerenciado no lado do cliente)
export const logoutUser = (req, res) => {
  // O logout é geralmente gerenciado no lado do cliente em aplicativos Firebase
  res.status(200).send({ message: 'Logout successful' });
};

export default {
  registerUser,
  authenticate,
  getUserDetails,
  logoutUser
};