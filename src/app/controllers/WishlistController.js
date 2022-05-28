
import User from "../models/User";
import Product from "../models/ProductModels"

class WishListController {
  async store(req, res) {
    const { user_id } = req.params
    const { name } = req.body
    const { product_id } = req.params

    const user = await User.findOne(user_id)
    const product = await Product.findByPk(product_id)

    if (!user && !product) {
      return res.status(400).json({error: 'Usuário não localizado'})
    }
    const wishlist = await Wishlist.create({
      user_id,
      name,
      product_id
    })
    return res.json(wishlist)
  }
  
  async updateId(req, res) {
    const { req_id } = req.params;

    const wishListUp = await User.findOne({
      where: { id: req_id },
    })
    if (wishListUp) {
        return res.status(400).json({error: "A lista já existe!"});
      }
    }

  async deleteWishes(req, res) {
    const { id } = req.params;
    const userDeleteWish = await User.findByPk(id)
    if (Wishlist === null){
    return res.status(400).json({error: "Lista não pode ser deletada"})
  }
    await userDeleteWish.destroy();
    return res.send("Sucesso: Lista deletada!");
  }

  async indexWishes(req, res) {
    const { id } = req.params;
    const wishRead = await User.findByPk(id);
    return res.json(wishRead);
  }

  async findAllWishes(req, res) {
    const wishes = await User.findAll({
      limit: 1,
      offset: 1,
      where: { id: req_id},
    });
    return res.json(wishes);
  }

    async findWishlist(req, res) {
      const { id } = req.params;
      const users = await User.findByPk(id, {
        include: { association: "user" },
      });

      return res.json(users);
    }

    async findWishlistProduct(req, res) {
      const { product_id } = req.params;
      const product = await User.findByPk(id, {
        include: { association: "product" },
      });

      return res.json(product);
    }
}
export default new WishListController();


