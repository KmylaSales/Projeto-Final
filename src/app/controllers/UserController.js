import User from "../models/User";
import Wishlist from "../models/Wishlist";

const { Op } = require("sequelize");

class UserController {
  async store(req, res) {
    try {
      const thisUserExists = await User.findOne({
        where: { email: req.body.email },
      });
      if (thisUserExists) {
        return res.status(406).json({ error: "Usuário já existe! " });
      }

      const { id, name, email } = await User.create(req.body);
      return res.json({
        id,
        name,
        email,
      });
    } catch (error) {
      console.log(req.body);
      res.status(500).json({ error: "Ops!! Algo deu errado" });
    }
    return res.json();
  }

  async update(req, res) {
    const { req_email } = req.params;

    const thisUserExists = await User.findOne({
      where: { email: req_email },
    });

    if (thisUserExists) {
      const informedEmail = await User.findOne({
        where: { email: req.body.email },
      });

      if (!informedEmail || informedEmail.email === thisUserExists.email) {
        const { id, name, email } = await thisUserExists.update(req.body);
        return res.json({ id, name, email });
      }

      if (informedEmail) {
        return res.status(406).json({ error: "Usuário já existe! " });
      }
    }
    return res.status(404).json({ error: "Email não encontrado" });
  }

  async delete(req, res) {
    const { req_id } = req.params;
    const userDelete = await User.findByPk(req_id);
    if (userDelete) {
      const findWishlist = await Wishlist.findAll({
        where: { user_id: req_id },
      });
      if (findWishlist.length !== 0) {
        res.status(405).json({
          error:
            "Você possui uma lista de desejos, não podemos deletar sua conta!",
        });
      } else {
        await userDelete.destroy();
      }
    }

    return res.send();
  }

  async index(req, res) {
    const { id } = req.params;
    const userRead = await User.findByPk(id);

    if (!userRead) {
      res.status(404).json({ error: "Usuario não foi localizado!" });
    }
    return res.json(userRead);
  }

  async findEmail(req, res) {
    const { req_email } = req.params;
    const userRead = await User.findOne({
      where: { email: req_email },
    });
    if (!userRead) {
      res.status(404).json({ error: "Usuario não foi localizado!" });
    }

    return res.json(userRead);
  }

  async findAll(req, res) {
    const users = await User.findAll({
      where: { name: { [Op.iLike]: `%${req.body.name}%` } },
    });
    return res.json(users);
  }

  async findAllUser(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  async findForWishlist(req, res) {
    const { user_id } = req.params;
    const user = await User.findAll({
      where: { id: user_id },
      attributes: ["name"],
      include: [
        {
          association: "wishlist",
          required: false,
        },
      ],
    });

    res.json(user);
  }
}
export default new UserController();
