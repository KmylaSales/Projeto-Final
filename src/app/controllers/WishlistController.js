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

  // async store(req, res) {
  //   try {
  //     const { user_id } = req.params;
  //     const { product_id } = req.body;
  //     const { wishlist_name } = req.body;

  //     const user = await User.findOne({
  //       where: { id: user_id },
  //     });

  //     const list = await Wishlist.findOne({
  //       where: { name: wishlist_name },
  //     });
  //     console.log(list);
  //     const product = await Product.findOne({
  //       where: { id: product_id },
  //     });
  //     console.log(product_id);
  //     console.log(product);

  //     if (user === list.user_id) {
  //       await list.addProduct(product);

  //       return res.json(list);
  //     }

  //     return res
  //       .status(400)
  //       .json({ error: "Essa lista não perttence a esse usuario" });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ error: "Ops. Algo deu errado" });
  //   }
  // }

  // async update(req, res) {
  //   const { req_email } = req.params;

  //   const thisUserExists = await Wishlist.findOne({
  //     where: { email: req_email },
  //   });

  //   if (thisUserExists) {
  //     const informedEmail = await Wishlist.findOne({
  //       where: { email: req.body.email },
  //     });

  //     if (!informedEmail || informedEmail.email === thisUserExists.email) {
  //       const { id, name, email } = await thisUserExists.update(req.body);
  //       return res.json({ id, name, email });
  //     }

  //     if (informedEmail) {
  //       return res.status(406).json({ error: "Usuário já existe! " });
  //     }
  //   }
  //   return res.status(404).json({ error: "Email não encontrado" });
  // }

  // async delete(req, res) {
  //   const { id } = req.params;
  //   const userDelete = await Wishlist.findByPk(id);
  //   /*  if(userDelete){
  //         const findWhishlist = await Wishlist.findAll({
  //           include:{ association: 'wishlist' }
  //         })
  //         res.status(405).json({error: Você possui uma lista de desejos, não podemos deletar sua conta! })
  //     } */

  //   await userDelete.destroy();
  //   return res.send();
  // }

  // async index(req, res) {
  //   const { id } = req.params;
  //   const userRead = await Wishlist.findByPk(id);

  //   if (!userRead) {
  //     res.status(404).json({ error: "Usuario não foi localizado!" });
  //   }
  //   return res.json(userRead);
  // }

  // async findEmail(req, res) {
  //   const { req_email } = req.params;
  //   const userRead = await Wishlist.findOne({
  //     where: { email: req_email },
  //   });
  //   if (!userRead) {
  //     res.status(404).json({ error: "Usuario não foi localizado!" });
  //   }

  //   return res.json(userRead);
  // }

  // async findAll(req, res) {
  //   const users = await Wishlist.findAll({
  //     limit: 10,
  //     offset: 1,
  //     where: { name: { [Op.iLike]: `%${req.body.name}%` } },
  //   });

  //   if (!users || users === null) {
  //     res
  //       .status(404)
  //       .json({ error: "Ops! Usuário não existe ou não foi informado!" });
  //   }
  //   return res.json(users);
  // }

  async findAllWishlist(req, res) {
    const { wishlist_id } = req.params;
    const wisklistAll = await Wishlist.findByPk(wishlist_id, {
      include: { association: "products" },
    });

    return res.json(wisklistAll);
  }
}
export default new WishlistController();
