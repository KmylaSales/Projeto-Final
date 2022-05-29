import User from "../models/User";

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
    const { id } = req.params;
    const userDelete = await User.findByPk(id);
    /*  if(userDelete){
          const findWhishlist = await User.findAll({
            include:{ association: 'wishlist' }
          })
          res.status(405).json({error: Você possui uma lista de desejos, não podemos deletar sua conta! })
      } */

    await userDelete.destroy();
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
      limit: 10,
      offset: 1,
      where: { name: { [Op.iLike]: `%${req.body.name}%` } },
    });

    if (!users || users === null) {
      res
        .status(404)
        .json({ error: "Ops! Usuário não existe ou não foi informado!" });
    }
    return res.json(users);
  }

  async findAllUser(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }
}
export default new UserController();
