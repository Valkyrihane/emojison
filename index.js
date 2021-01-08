const dir = './json/';

class Emojison {
  constructor(service = 'goog') {
    this.service = service.toLowerCase();
    if (service === 'all') this.service = 'emoji';

    try {
      this.data = require(`${dir}${this.service}.json`);
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        throw new Error(`Service name '${this.service}' not found`);
      }
    }
  }

  currentService() {
    return this.service;
  }

  getData() {
    return this.data;
  }

  getEmoji(emojiName) {
    return this.data[emojiName.toLowerCase()];
  }

  getEmojiSrc(emojiName, serviceName) {
    const emoji = this.data[emojiName.toLowerCase()];
    if (!emoji) return emoji;
    if (serviceName && this.service === 'emoji')
      return emoji.src[serviceName.toLowerCase()];
    return emoji.src;
  }
}

module.exports = Emojison;