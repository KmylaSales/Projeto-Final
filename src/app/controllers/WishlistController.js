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

  async update(req, res) {
    try {
      const { wishlist_id } = req.params;
      const { product_id } = req.body;

      const list = await Wishlist.findOne({
        where: { id: wishlist_id },
      });

      const product = await Product.findOne({
        where: { id: product_id },
      });

      const thereProduct = await Product.findOne({
        include: [{ association: "wishlist", where: { id: product } }],
      });

      if (thereProduct) {
        return res
          .status(401)
          .json({ error: "esse produto ja esta na sua lista" });
      }
      await product.addProduct(product);

      return res.json(list);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Ops. Algo deu errado" });
    }
  }

  async delete(req, res) {
    const { req_id } = req.params;
    const wishlistDelete = await Wishlist.findOne({
      where: { id: req_id },
    });
    if (!wishlistDelete) {
      res.status(404).json({ error: "Lista não encontrada" });
    } else {
      await wishlistDelete.destroy();
    }
    return res.send();
  }

  async index(req, res) {
    const { req_id } = req.params;
    const wishlistSearch = await Wishlist.findOne({ where: { id: req_id } });

    if (!wishlistSearch) {
      res.status(404).json({ error: "LIsta de desejos não localizada!" });
    }
    return res.json(wishlistSearch);
  }

  async findForWishlist(req, res) {
    const { user_id } = req.params;

    const user = await Wishlist.findAll({
      include: [
        {
          attributes: ["name"],
          association: "users",
          where: { id: user_id },
        },
        {
          attributes: ["title"],
          association: "products",
        },
      ],
    });

    res.json(user);
  }
}

export default new WishlistController();
