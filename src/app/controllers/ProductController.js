import Product from "../models/Product";

const { Op } = require("sequelize");

class ProductController {
  async store(req, res) {
    const thisProductExists = await Product.findOne({
      where: { title: req.body.title },
    });
    if (thisProductExists) {
      return res.status(400).json({ error: "Produto já existe! " });
    }
    const { id, title, author, description, price } = await Product.create(
      req.body
    );
    return res.json({
      id,
      title,
      author,
      description,
      price,
    });
  }

  async update(req, res) {
    const { req_id } = req.params;

    const thisTitleExists = await Product.findOne({
      where: { id: req_id },
    });

    if (thisTitleExists) {
      const informedTitle = await Product.findOne({
        where: { title: req.body.title },
      });

      if (!informedTitle || informedTitle.title === thisTitleExists.title) {
        const { id, title, author, description, price } =
          await thisTitleExists.update(req.body);
        return res.json({ id, title, author, description, price });
      }

      if (informedTitle) {
        return res.status(406).json({ error: "Produto já existe! " });
      }
    }
    return res.status(404).json({ error: "Usuario não encontrado" });
  }

  async delete(req, res) {
    try {
      const { product_id } = req.params;
      console.log(req.params);
      const productDelete = await Product.findOne({
        where: { id: product_id },
      });

      await productDelete.destroy();
      return res.json();
    } catch (error) {
      return res.send({ error: "Não foi possivel excluir produto" });
    }
  }

  async index(req, res) {
    const { req_id } = req.params;
    const userRead = await Product.findByPk(req_id);
    return res.json(userRead);
  }

  async findAll(req, res) {
    const users = await Product.findAll({
      where: { title: { [Op.iLike]: `%${req.body.title}%` } },
    });
    return res.json(users);
  }

  async findWishlist(req, res) {
    const { req_id } = req.params;
    const users = await Product.findByPk(req_id, {
      include: { association: "wishlist" },
    });

    return res.json(users);
  }

  async SearchAllP(req, res) {
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const productfind = await Product.findAll({
      where: { title: { [Op.iLike]: `%${req.body.title}%` } },
    });

    const pagination = {};

    pagination.pagina_atual = {
      page,
      limit,
    };

    if (endIndex < productfind.length) {
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

    pagination.listaProduto = productfind.slice(startIndex, endIndex);

    return res.json(pagination);
  }
}
export default new ProductController();
