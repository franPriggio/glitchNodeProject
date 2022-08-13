class ManejoDatos {
  constructor() {}

  sortByAgeIncrease(req, res, next) {
    req.petsMessage = "Pets are awesome!";
    next();
  }

  uploadData(body) {}
}

module.exports = ManejoDatos;
