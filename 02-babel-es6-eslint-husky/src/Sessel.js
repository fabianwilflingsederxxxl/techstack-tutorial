class Sessel {
  constructor(color) {
    this.color = color;
  }

  info() {
    return `I am a ${this.color} chair.`;
  }
}

module.exports = Sessel;
