import Chat from '../models/chatModel.js';
import Message from '../models/messageModel.js';
import transcribeAudio from '../libs/sttGenerator.js';
import voiceflowService from '../services/voiceflowService.js';


class ChatController {
  async initializeChat(userId) {
    try {
      voiceflowService.setUserID(userId);
      const chat = await Chat.getOrCreateByUserId(userId);
      return {
        chat: {
          'id': chat.id
        }
      };
    } catch (error) {
      throw error;
    }
  }

  async getChatId(userId) {
    try {
      const chat = await Chat.getOrCreateByUserId(userId);
      return {
        chat: {
          'id': chat.id
        }
      };
    } catch (error) {
      throw error;
    }
  }

  async sendMessage(userId, content, type) {
    try {
      voiceflowService.setUserID(userId);
      const chat = await Chat.getOrCreateByUserId(userId);

      if (!chat.id) {
        await voiceflowService.startChat(chat.id);
      }

      let messageContent = content;
      let messageType = type;
      let convertedFromAudio = false;

      if (type === 'audiofile') {
        messageContent = await transcribeAudio(content);
        messageType = 'text';
        convertedFromAudio = true;
      }

      // Criar e salvar a mensagem enviada pelo usuário
      const userMessage = new Message(null, messageType, messageContent, 'sent', new Date(), null, convertedFromAudio);
      chat.messages.push(userMessage);
      await chat.save();

      // Enviar mensagem para o Voiceflow e processar a resposta
      const voiceflowResponse = await voiceflowService.interact('text', messageContent);

      // Processar cada item da resposta do Voiceflow
      voiceflowResponse.forEach(async (item) => {
        let responseMessageType = item.type;
        let responseMessageContent = item.payload.message || '';
        let responseMessageAudioUrl = item.type === 'audio' ? item.payload.src : null;

        // Criar e salvar a mensagem recebida do Voiceflow
        const responseMessage = new Message(null, responseMessageType, responseMessageContent, 'received', new Date(), responseMessageAudioUrl);
        chat.messages.push(responseMessage);
      });

      // Salvar o chat com as novas mensagens
      await chat.save();

      return {
        success: true,
        response: chat.messages
      };
    } catch (error) {
      throw error;
    }
  }
}

export default ChatController;