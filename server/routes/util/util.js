function randomNumber(min = 0, max = 100) {
  return parseInt(Math.random() * (max - min + 1) + min, 10);
}

module.exports = {
  randomNumber
}