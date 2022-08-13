class ManejadorMascotas {
  constructor(pets = []) {
    this.pets = pets;
  }

  sortByAgeIncrease(req, res, next) {
    req.orderedArray = petsArray.sort(function (a, b) {
      return a.value - b.value;
    });
    next();
  }
}
module.exports = ManejadorMascotas;
