import BaseModel from '../repositories/baseModel';

class Message extends BaseModel {
  static collectionName = 'messages';

  constructor(id, type, content, direction, timestamp, audioUrl = null) {
    super(Message.collectionName);
    this.id = id;
    this.type = type;
    this.content = content;
    this.direction = direction;
    this.timestamp = timestamp;
    this.audioUrl = audioUrl;
    this.convertedFromAudio = convertedFromAudio; // Indica se a mensagem foi convertida de áudio para texto
  }

  toFirestoreData() {
    return {
      type: this.type,
      content: this.content,
      direction: this.direction,
      timestamp: this.timestamp,
      audioUrl: this.audioUrl,
      convertedFromAudio: this.convertedFromAudio
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
}

export default Message;