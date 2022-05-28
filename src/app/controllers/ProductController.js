import Product from "../models/Product";

const { Op } = require("sequelize");

class ProductController {

//Create Product
  async store(req, res) {

//Verificando se existe um nome cadastrado
  const thisProductExists = await Product.findOne({
    where: { title: req.body.title},
  });
  if(thisProductExists){
    return res.status(400).json({ error: "Produto já existe"});
  }
//Criando o novo usuário com as informações do body 

    const {id, author, title, price} = await Product.create(req.body);
    return res.json({
      id,
      author,
      title,
      price
    });
}
 

//UPDATE PRODUCT 

async update(req, res) {
  const { req_id } = req.params;

  const thisTitleExists = await Product.findOne({
    where: { id: req_id },
  });

  if (thisTitleExists) {
    const informedTitle = await Product.findOne({
      where: { title: req.body.title },
    });

    if (!informedTitle|| informedTitle.title === thisTitleExists) {
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
// //DELETE PRODUCT - ID 

async delete(req, res){
  const { id } = req.params;
  /*  if(userDelete){
        const findWhishlist = await User.findAll({ 
          include:{ association: 'wishlist' }
        })
    } */
  const productDelete = await Product.findByPk(id);

  await productDelete.destroy();
  return res.send();
}

// // SEARCH FOR A PRODUCT BY ID 

async index(req, res) {
  const { id } = req.params;
  const productRead = await Product.findByPk(id);
  return res.json(productRead);
}

// // SEARCH MULTIPLE PRODUCTS

// // Filtro por nome do produto 

async findAllProduct(req, res) {
  const product = await Product.findAll({
    where: { title: { [Op.iLike]: `%${req.body.title}%` } },
  });
  return res.json(product);

}
}

export default new ProductController();
