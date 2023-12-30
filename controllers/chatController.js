import firebase from '../firebase.js';
import Chat from '../models/chatModel.js';
import { getFirestore, collection, doc, addDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebase);

// Criar novo chat
export const createChat = async (req, res) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'chats'), data);
    res.status(200).send('Chat created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Obter todos os chats
export const getChats = async (req, res) => {
  // Implementação semelhante ao getProducts
};

// Obter chat por ID
export const getChat = async (req, res) => {
  // Implementação semelhante ao getProduct
};

// Atualizar chat
export const updateChat = async (req, res) => {
  // Implementação semelhante ao updateProduct
};

// Deletar chat
export const deleteChat = async (req, res) => {
  // Implementação semelhante ao deleteProduct
};