import Sequelize, { Model } from "sequelize";

class User extends Model {
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
}

export default User;
