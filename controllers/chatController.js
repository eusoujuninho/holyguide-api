import Chat from '../models/chatModel.js';
import Message from '../models/messageModel.js';
import transcribeAudio from '../utils/transcribeAudio.js';
import voiceflowService from '../services/VoiceflowService.js';

export const sendMessage = async (req, res) => {
  try {
    const { userId, content, type } = req.body;

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

    res.status(200).json({ message: 'Message sent and response processed successfully', chat });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
