import Wishlist from "../models/Wishlist";
import User from "../models/User";
import Product from "../models/Product";

const { Op } = require("sequelize");

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
      console.log(error);
      return res.json({ ok: false });
    }
  }

  async update(req, res) {
    try {
      const { user_id } = req.params;
      const { wishlist_id, product_id } = req.body;

      const user = await User.findOne({
        where: { id: user_id },
      });

      if (!user) {
        return res.status(401).json({ error: "Você não está cadastrado" });
      }
      const product = await Product.findOne({
        where: { id: product_id },
      });
      if (!product) {
        return res.status(400).json({ error: "Esse produto não existe" });
      }

      const findwishlist = await Wishlist.findOne({
        where: { id: wishlist_id },
        include: [{ association: "products" }],
      });
      const wishList = findwishlist.products;

      const inList =
        wishList.filter((item) => item.dataValues.id === product_id).length !==
        0;
      console.log(inList);
      if (inList) {
        return res.status(405).json({ error: "Esse produto ja esta na lista" });
      }

      await findwishlist.addProduct(product);

      return res.status(200).json("Você adicinou um produto");
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

  async SearchAllW(req, res) {
    const product = await Product.findAll({
      where: { title: { [Op.iLike]: `%${req.body.title}%` } },
      include: [
        {
          association: "wishlist",
          required: true,
        },
      ],
    });

    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};

    pagination.pagina_atual = {
      page,
      limit,
    };

    if (endIndex < product.length) {
      pagination.proxima_pagina = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.pagina_anterior = {
        page: page - 1,
        limit,
      };
    }

    pagination.listaProduto = product.slice(startIndex, endIndex);

    return res.json(pagination);
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
