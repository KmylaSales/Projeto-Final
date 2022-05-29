import Product from "../models/Product";
import Wishlist from "../models/Wishlist";

// const { Op } = require("sequelize");

class WishProdController {
  async store(req, res) {
    try {
      const { wishlist_id } = req.params;
      const { product_id } = req.body;

      const list = await Wishlist.findOne({
        where: { id: wishlist_id },
      });
      console.log(list);
      const product = await Product.findOne({
        where: { id: product_id },
      });
      console.log(product_id);
      console.log(product);

      await list.addProduct(product);

      return res.json(list);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Ops. Algo deu errado" });
    }
  }
}
export default new WishProdController();
