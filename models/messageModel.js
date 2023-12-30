class Message {
  constructor(id, type, content, direction, timestamp, audioUrl = null) {
    this.id = id;
    this.type = type;
    this.content = content;
    this.direction = direction;
    this.timestamp = timestamp;
    this.audioUrl = audioUrl;
  }
}

export default Message;
