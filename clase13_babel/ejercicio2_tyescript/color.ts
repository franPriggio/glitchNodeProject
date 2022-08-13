class Color {
  getRandomColor() {
    const randomNumber = () => Math.floor(Math.random() * 256);
    return `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
  }
}
