
import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        author: Sequelize.STRING,
        description: Sequelize.STRING,
        price: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName:'product'
      }
    );

    return this;
    
  }
}

export default Product;