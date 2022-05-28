import Product from "../models/Product";


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
  const { req_title } = req.params;

  // verificar se o title existe
  const thisTitleExists = await Product.findOne({
    where: { title: req_title },
  });

  if (thisTitleExists) {
    const informedTitle = await Product.findOne({
      where: { title: req.body.title },
    });

    // Verifico se o title do body não é null ou se ele é igual ao title params
    if (!informedTitle || informedTitle.title === thisTitleExists.title) {
      const { id, title, description, price } = await thisTitleExists.update(req.body);
      return res.json({ id, title, description, price });
    }

    // Email do body já existe !! Retorna o erro
    if (informedTitle) {
      return res.status(400).json({ error: "Produto já existe! " });
    }
  }
  return res.status(400).json({ error: "Produto não alterado!" });
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

// // Filtro por nome do [cliente??]

// async findAll(req, res) {
//   const users = await User.findAll({
//     where: { title: { [Op.iLike]: `%${req.body.title}%` } },
//   });

//   return res.json(users);
// }
}

export default new ProductController();
