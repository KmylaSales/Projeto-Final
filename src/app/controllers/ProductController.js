import Product from "../models/Product";

const { Op } = require("sequelize");

class ProductController {
//Cadastrando um produto
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

//Atualizando dados de um produto
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

//Removendo um produto

    
//Pesquisando um produto
  async index(req, res) {
    const { req_id } = req.params;
    const userRead = await Product.findByPk(req_id);
    return res.json(userRead);
  }

//Pesquisando vários produtos por filtro
  async findAll(req, res) {
    const users = await Product.findAll({
      where: { title: { [Op.iLike]: `%${req.body.title}%` } },
    });
    return res.json(users);
  }

//Pesquisando uma lista por um produto
  async findWishlist(req, res) {
    const { req_id } = req.params;
    const users = await Product.findByPk(req_id, {
      include: { association: "wishlist" },
    });

    return res.json(users);
  }

//Pesquisa paginada
  async SearchAllP(req, res) {

    //valores de página e quantidade em cada lote é informado via URL 
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)


    const startIndex =(page-1)* limit
    const endIndex = page * limit

  const productfind = await Product.findAll({
      where: { title: { [Op.iLike]: `%${req.body.title}%` } },
    });

    const pagination = {}

    // Pagina atual 
    pagination.pagina_atual = {
        page: page,
        limit: limit
      }

    // limitando exibição da próxima página ao tamanho do resultado da busca
    if (endIndex < productfind.length){
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

    pagination.listaProduto = productfind.slice(startIndex, endIndex)

    return res.json(pagination);
}
}
export default new ProductController();
