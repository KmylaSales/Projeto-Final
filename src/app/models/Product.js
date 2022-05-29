import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        author: Sequelize.STRING,
        price: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: "products",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Wishlist, {
      foreignKey: "product_id",
      through: "wishlist_product",
      as: "wishlist",
    });
  }
}

export default Product;
