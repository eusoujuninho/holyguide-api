import BaseModel from "../repositories/baseModel";

class User extends BaseModel {
  static collectionName = "users";

  constructor(id, mobilePhone, isAnonymous, trialStarted = null) {
    super(User.collectionName);
    this.id = id;
    this.mobilePhone = mobilePhone;
    this.isAnonymous = isAnonymous;
    this.trialStarted = trialStarted;
  }

  toFirestoreData() {
    return {
      mobilePhone: this.mobilePhone,
      isAnonymous: this.isAnonymous,
      trialStarted: this.trialStarted,
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

export default User;