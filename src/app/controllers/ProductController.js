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
    const { req_id } = req.params;
    const userDelete = await Product.findByPk(req_id);
    // if (userDelete) {
    //   const productDelete = await Product.findAll({
    //     include: { association: "wishlist" },
    //   });

    //   if (productDelete) {
    //     return res
    //       .status(405)
    //       .json({ erro: "Ops vc tem uma lista de desejos" });
    //   }
    // }

    await userDelete.destroy();
    return res.send();
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

  // Fazendo busca de uma lista por um cliente
  async findWishlist(req, res) {
    const { req_id } = req.params;
    const users = await Product.findByPk(req_id, {
      include: { association: "wishlist" },
    });

    return res.json(users);
  }
}
export default new ProductController();
