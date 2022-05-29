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
      
  }
}

export default Wishlist;