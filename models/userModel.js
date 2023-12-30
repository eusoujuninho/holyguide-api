class User {
  constructor(id, mobilePhone, isAnonymous, trialStarted = null) {
    this.id = id;
    this.mobilePhone = mobilePhone;
    this.isAnonymous = isAnonymous;
    this.trialStarted = trialStarted;
  }
}

export default User;
