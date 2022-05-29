
    import Wishlist from "../models/Wishlist";
    import User from "../models/User";
    import Product from "../models/Product";
    
    // const { Op } = require("sequelize");
    
    class WishlistController {
    
      //Criando uma wishlist
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


  //Atualizando uma wishlist
  async update(req, res){
    const { req_id } = req.params;
    const { product_id } = req.params

  const thisListExists = await Wishlist.findOne({
    where: { id: req_id },
  });
  const productExistList = await Product.findOne({
    where: { id: product_id}
  })
  const informedList = await Product.findOne({
    where: { title: req.body.title, author: req.body.author, description: req.body.description, price: req.body.price }
  })
    if (productExistList.id === informedList.title || informedList.auhtor || informedList.description || informedList.price) {
      await thisListExists.update(req.body);
      return res.json({ product_id });
      }
    // if (informedList) {
    //   return res.status(406).json({ error: "Produto já existe!" });
    // }
  // return res.status(404).json({ error: "Usuario não encontrado" });
}

  async findAllWishlist(req, res) {
    const { wishlist_id } = req.params;
    const wisklistAll = await Wishlist.findByPk(wishlist_id, {
      include: { association: "products" },
    });

    return res.json(wisklistAll);
  }
}
export default new WishlistController();

