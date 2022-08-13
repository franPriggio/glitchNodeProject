const options = {
  client: "sqlite3",
  connection: {
    filename: "../DB/ecom.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = {
  options,
};
