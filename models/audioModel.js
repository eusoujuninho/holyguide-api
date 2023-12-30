import BaseModel from "./baseModel.js";

class Audio extends BaseModel {
  static collectionName = 'audios';

  constructor(id, text, url) {
    super(Audio.collectionName);
    this.id = id;
    this.text = text;
    this.url = url;
  }

  toFirestoreData() {
    return {
      text: this.text,
      url: this.url,
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

export default Audio;