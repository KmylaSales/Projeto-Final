import Sequelize from "sequelize";
import databaseConfig from "../config/database";

import User from "../app/models/User";
import Product from "../app/models/ProductModels"
import Wishlist from "../app/models/WishlistModels";


// criado um array pois haverá mais models
const models = [User, Product, Wishlist];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Conexão do banco de dados com nossos models
    this.connection = new Sequelize(databaseConfig);

    // carregar os models e fazer a conexão
    models.map((model) => model.init(this.connection));

  }
}

Wishlist.associate(connection.models)

export default new Database();
