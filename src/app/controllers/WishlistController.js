
import Wishlist from "../models/Wishlist";
import User from "../models/User";
import Product from "../models/Product";

const { Op } = require("sequelize");

class WishlistController {

//Criando uma wishlist
  async store(req, res) {
    try {
      const { user_id } = req.params;
      const { product_id, name } = req.body;
      const thisHaveUser = await User.findByPk(user_id);
      if (!thisHaveUser) {
        return res.status(406).json({ error: "Usuario não existe!" });
      }
      const product = await Product.findOne({
        where: { id: product_id },
      });
      if (!product) {
        return res.status(406).json({ error: "Produto não existe!" });
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

//atualizando uma wishlist
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

// deletando uma wishlist
async deleteWish(req, res) {
  const { id } = req.params;
  const userDelete = await Wishlist.findByPk(id);
  await userDelete.destroy();
  return res.send();
}

// Fazendo busca de uma lista por um id
  async findAllWishlist(req, res) {
    const { req_id } = req.params;
    const findlist = await Wishlist.findByPk(req_id)
    return res.json(findlist);
  }

  //Pesquisa paginada
  async SearchAllW(req, res) {

    //valores de página e quantidade em cada lote é informado via URL 
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)


    const startIndex =(page-1)* limit
    const endIndex = page * limit

    const users = await Product.findAll({
      where: { title: { [Op.iLike]: `%${req.body.title}%` } },
    include: [
      {
        association: "wishlist",
        required: false,
      },
    ]
  })
  

    const pagination = {}

    // Pagina atual 
    pagination.pagina_atual = {
        page: page,
        limit: limit
      }

    // limitando exibição da próxima página ao tamanho do resultado da busca
    if (endIndex < wishfind.length){
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

    pagination.listaProduto = wishfind.slice(startIndex, endIndex)

    return res.json(pagination);
  }


//Pesquisando uma lista de desejos por código do cliente
async findForWishlistUser(req, res) {
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

}
}
export default new WishlistController();
