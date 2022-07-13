class UtilProducts {
  constructor() {}
  generateRandom(min = 1, max) {
    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
  }
}
export default Util;
