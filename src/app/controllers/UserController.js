import User from "../models/User";

const { Op } = require("sequelize");

class UserController {
//Cadastrando um cliente
  async store(req, res) {
    try {
      const thisUserExists = await User.findOne({
        where: { email: req.body.email },
      });
      if (thisUserExists) {
        return res.status(406).json({ error: "Usuário já existe!" });
      }

      const { id, name, email } = await User.create(req.body);
      return res.json({
        id,
        name,
        email,
      });
    } catch (error) {
      res.status(500).json({ error: "Ops! Algo deu errado." });
    }
    return res.json("Usuário cadastrado com sucesso!");
  }

//Atualizando os dados do cliente
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
        return res.json({ id, name, email});
      }

      if (informedEmail) {
        return res.status(406).json({ error: "Usuário já existe!" });
      }
    }
    return res.status(404).json({ error: "Email não encontrado" });
  }

//Removendo um cliente
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

//Pesquisando um cliente por ID
  async index(req, res) {
    const { id } = req.params;
    const userRead = await User.findByPk(id);

    if (!userRead) {
      res.status(404).json({ error: "Usuario não foi localizado!" });
    }
    return res.json(userRead);
  }

//Pesquisando um cliente por Email
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

//Pesquisando vários clientes por filtro
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


//Pesquisando uma lista de desejos por código do cliente
   async findForWishlistUser(req, res) {
    const { user_id } = req.params;
    const user = await User.findAll({
      where: { id: user_id },
      attributes: ["id"],
      include: [
        {
          association: "wishlist",
          required: false,
        },
      ],
    });
  }


//Pesquisa paginada
  async SearchAllU(req, res) {

    //valores de página e quantidade em cada lote é informado via URL 
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)


    const startIndex =(page-1)* limit
    const endIndex = page * limit

  const usersfind = await User.findAll({
      where: { name: { [Op.iLike]: `%${req.body.name}%` } },
    });

    const pagination = {}

    // Pagina atual 
    pagination.pagina_atual = {
        page: page,
        limit: limit
      }

    // limitando exibição da próxima página ao tamanho do resultado da busca
    if (endIndex < usersfind.length){
    pagination.proxima_pagina = {
      page: page +1,
      limit: limit
    }
    }

  // limitando exibição da página anterior como maior que zero, ou seja, a primeira página é a 1
    if(startIndex > 0) {
    pagination.pagina_anterior = {
      page: page -1,
      limit: limit
    }}


    pagination.listaCliente = usersfind.slice(startIndex, endIndex)

    return res.json(pagination);
  }
}
export default new UserController();
