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

  // Fazendo autualização do Usuário /// payloand ---
  async update(req, res) {
    const { req_id } = req.params;

    const thisUserExists = await Product.findOne({
      where: { id: req_id },
    });

    if (thisUserExists) {
      const informedEmail = await Product.findOne({
        where: { title: req.body.title },
      });

      if (!informedEmail || informedEmail.email === thisUserExists.email) {
        const { id, title, author, description, price } =
          await thisUserExists.update(req.body);
        return res.json({ id, title, author, description, price });
      }

      if (informedEmail) {
        return res.status(406).json({ error: "Produto já existe! " });
      }
    }
    return res.status(404).json({ error: "Usuario não encontrado" });
  }

  // // Fazendo o delete do user
  // async delete(req, res) {
  //   const { id } = req.params;
  //   /*  if(userDelete){
  //         const findWhishlist = await User.findAll({
  //           include:{ association: 'wishlist' }
  //         })
  //     } */
  //   const userDelete = await Product.findByPk(id);

  //   await userDelete.destroy();
  //   return res.send();
  // }

  // // Fazendo busca de um usuario por id
  // async index(req, res) {
  //   const { id } = req.params;
  //   const userRead = await Product.findByPk(id);
  //   return res.json(userRead);
  // }

  // // fazendo busca de um usuario por email
  // async findEmail(req, res) {
  //   const { req_title } = req.params;
  //   const userReade = await Product.findOne({
  //     where: { email: req_title },
  //   });
  //   return res.json(userReade);
  // }

  // fazendo busca pelo nome
  async findAll(req, res) {
    const users = await Product.findAll({
      limit: 1,
      offset: 1,
      where: { name: { [Op.iLike]: `%${req.body.name}%` } },
    });
    return res.json(users);
  }

  // // Fazendo busca de uma lista por um cliente
  // //   async findWishlist(req, res) {
  // //     const { id } = req.params;
  // //     const users = await Product.findByPk(id, {
  // //       include: { association: "wishlist" },
  // //     });

  // //     return res.json(users);
  // //   }
}
export default new ProductController();
