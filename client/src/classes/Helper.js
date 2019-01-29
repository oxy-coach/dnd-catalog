module.exports = class Helper {
  constructor() {

  }

  static getPrice(price) {
    if (price >= 100) {
      return (price / 100) + ' зм';
    }
    if (price >= 10) {
      return (price / 10) + ' см';
    }

    return price + ' мм';
  }
}