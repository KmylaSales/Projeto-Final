require("dotenv").config();

module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "kerem",
  password: "9180",
  database: "luizacode",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
