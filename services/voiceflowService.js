import axios from "axios";
import Chat from "./models/chatModel.js"; // Ajuste o caminho conforme necessário
import Message from "./models/messageModel.js"; // Ajuste o caminho conforme necessário

const BASE_URL = "https://general-runtime.voiceflow.com";
const API_KEY = "VF.DM.658b4b30d7bebc00071baf6f.dmFTl6R1iageTAjz";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_KEY,
    "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params["timestamp"] = new Date().getTime();
  return config;
});

class VoiceflowService {
  
  versionID = "sandbox";
  config = { stopAll: false, excludeTypes: ["block", "debug", "flow", "path"] };
  chatID = null;
  userID = null;
  chat = null; // Instância do Chat

  setVersionID(versionID) {
    this.versionID = versionID;
  }

  async startChat(customPayload = []) {
    this.chat = new Chat(null, this.userID, []);
    return this.interact("launch", customPayload);
  }

  async interact(actionType, payload = {}) {
    const requestBody = {
      action: { type: actionType, payload },
      config: this.config,
    };

    try {
      const response = await axiosInstance.post(
        `/state/${this.versionID}/user/${this.userID}/interact`,
        requestBody
      );

      // Criar e salvar a mensagem enviada
      const sentMessage = new Message(
        null, // ID gerado pelo banco de dados
        actionType,
        typeof payload === "string" ? payload : JSON.stringify(payload),
        "sent",
        new Date()
      );
      this.chat.messages.push(sentMessage);

      // Tratar e salvar as mensagens recebidas
      response.data.forEach((item) => {
        if (item.payload && item.payload.message) {
          const receivedMessage = new Message(
            null, // ID gerado pelo banco de dados
            item.type,
            item.payload.message,
            "received",
            new Date()
          );
          this.chat.messages.push(receivedMessage);
        }
      });

      return response.data;
    } catch (error) {
      console.error(`Erro na interação: ${actionType}`, error);
      throw error;
    }
  }

  async sendMessage(message) {
    if (!message.trim()) {
      throw new Error("Mensagem vazia");
    }
    return this.interact("text", message);
  }

}

const voiceflowService = new VoiceflowService();

export default voiceflowService;