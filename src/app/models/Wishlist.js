import Sequelize, { Model } from "sequelize";

class Wishlist extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: "wishlist",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "users" });
    this.belongsToMany(models.Product, {
      foreignKey: "wishlist_id",
      through: "wishlist_product",
      as: "products",
    });
  }
}

export default Wishlist;