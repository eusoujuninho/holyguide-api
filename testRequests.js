import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

// Usando as variáveis de ambiente
const serverUrl = process.env.HOST_URL; // Exemplo: 'http://localhost:3000'
const userId = 'some_user_id'; // Substitua com um userId válido para seu sistema
const authToken = 'your_auth_token'; // Substitua com um token de autenticação válido para seu sistema

// Configuração do axios para incluir o token de autenticação
const axiosInstance = axios.create({
  baseURL: serverUrl,
  headers: {
    Authorization: authToken
  }
});

// Função para testar a inicialização do chat
async function testInitializeChat() {
  try {
    const response = await axiosInstance.post('/api/chats/initialize', { userId });
    console.log('Initialize Chat Response:', response.data);
  } catch (error) {
    console.error('Error in Initialize Chat:', error.response?.data || error.message);
  }
}

// Função para testar a obtenção do ID do chat
async function testGetChatId() {
  try {
    const response = await axiosInstance.get('/api/chats/id', { params: { userId } });
    console.log('Get Chat ID Response:', response.data);
  } catch (error) {
    console.error('Error in Get Chat ID:', error.response?.data || error.message);
  }
}

// Função para testar o envio de mensagens
async function testSendMessage() {
  try {
    const messageData = { userId, content: 'Hello!', type: 'text' }; // Substitua com dados de mensagem relevantes
    const response = await axiosInstance.post('/api/chats/send', messageData);
    console.log('Send Message Response:', response.data);
  } catch (error) {
    console.error('Error in Send Message:', error.response?.data || error.message);
  }
}

// Executar os testes
testInitializeChat();
testGetChatId();
testSendMessage();
