import BaseModel from "./baseModel.js";

class Chat extends BaseModel {
  static collectionName = "chats";

  constructor(
    id,
    userId,
    messages,
    createdAt = new Date(),
    updatedAt = new Date()
  ) {
  
    super(Chat.collectionName);
    this.id = id;
    this.userId = userId;
    this.messages = messages;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toFirestoreData() {
    return {
      userId: this.userId,
      messages: this.messages.map((message) => ({
        id: message.id,
        type: message.type,
        content: message.content,
        direction: message.direction,
        timestamp: message.timestamp,
        audioUrl: message.audioUrl,
      })),
      createdAt: this.createdAt,
      updatedAt: new Date(),
    };
  }

  async save() {
    const data = this.toFirestoreData();
    if (this.id) {
      await this.update(this.id, data);
    } else {
      const savedData = await this.add(data);
      this.id = savedData.id;
    }
    return this;
  }

  // Os métodos estáticos find, findBy e findOrCreateByUserId podem ser herdados ou modificados conforme necessário

  // Dentro da classe Chat em Chat.js

  static async getOrCreateByUserId(userId) {
    const existingChats = await this.findBy("userId", userId);
    if (existingChats.length > 0) {
      return existingChats[0];
    } else {
      const newChat = new Chat(null, userId, []);
      await newChat.save();
      return newChat;
    }
  }
}

export default Chat;