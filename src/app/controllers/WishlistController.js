import Wishlist from "../models/Wishlist";
import User from "../models/User";
import Product from "../models/Product";

// const { Op } = require("sequelize");

class WishlistController {
  async store(req, res) {
    try {
      const { user_id } = req.params;
      const { product_id, name } = req.body;
      const thisHaveUser = await User.findByPk(user_id);
      if (!thisHaveUser) {
        return res.status(406).json({ error: "Usuario não existe! " });
      }
      const product = await Product.findOne({
        where: { id: product_id },
      });
      if (!product) {
        return res.status(406).json({ error: "Produto não existe! " });
      }

      const wishlist = await Wishlist.create({
        name,
        user_id: parseInt(user_id, 10),
      });

      wishlist.addProduct(product);

      return res.json(wishlist);
    } catch (error) {
      return res.json({ ok: false });
    }
  }
}
export default new WishlistController();
