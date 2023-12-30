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

    // Retorne os detalhes do usuário criado
    res.status(201).send({ userId: userRecord.uid });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Função para autenticar um usuário
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Aqui você precisará implementar a lógica de login
    // O Firebase Admin SDK não fornece um método direto para autenticar usuários
    // Você pode precisar usar o Firebase Authentication no lado do cliente
    // ou implementar um sistema de tokens personalizado

    res.status(200).send({ message: 'Login successful' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Função para logout do usuário
export const logoutUser = async (req, res) => {
  try {
    // Implemente a lógica de logout conforme necessário
    res.status(200).send({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
