import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';


class Wishlist extends Model {
    static init(sequelize) {
        super.init(
          {
            user: {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL 
            },
            Product: {
                name: Sequelize.STRING,
                description: Sequelize.STRING,
          },
        },
          {
            sequelize,
          })
      }
      static associate(models) {
        this.belongsTo(model.User, { foreignKey: 'user_id', as: 'user'})
      }
    }
    uuidv4();
    
    export default Wishlist;
    