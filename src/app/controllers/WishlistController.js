
import User from "../models/User";
import Wishlist from "../models/Wishlist";

class WishListController {

  async store(req, res) {
    try {
      const { user_id } = req.params;
      const thisHaveUser = await User.findByPk(user_id)
      if (!thisHaveUser) {
        return res.status(406).json({ error: "Lista de desejos já existe! " });
      }

      const { name } = req.body;
      const wishlist = await Wishlist.create({
        name,
        user_id: parseInt(user_id, 10),
      });
      return res.json(wishlist);
    } catch (error) {
      console.error(error)
      return res.json({ ok: false });
    }
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


