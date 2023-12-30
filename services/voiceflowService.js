import axios from "axios";

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
  constructor() {
    this.versionID = "production";
    this.config = { stopAll: false, excludeTypes: ["block", "debug", "flow", "path"] };
    this.userID = null;
  }

  setUserID(userID) {
    this.userID = userID;
  }

  async startChat(chatID) {
    const customPayload = { chat_uid: chatID };
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
      return response.data;
    } catch (error) {
      console.error(`Erro na interação: ${actionType}`, error);
      throw error;
    }
  }
}

const voiceflowService = new VoiceflowService();
export default voiceflowService;
