import Wishlist from "../models/WishlistModels";
import User from "../models/User";
import Product from "../models/ProductModels"

module.exports = {
  async store(req, res) {
    const { user_id } = req.params
    const { name } = re.body
    const { product_id } = req.params

    const user = await User.findOne(user_id)
    const product = await Product.findByPk(product_id)

    if (!user && !product) {
      return res.status(400).json({ error: 'Usuário não localizado'})
    }
    const wishlist = await Wishlist.create({
      user_id,
      name,
      product_id
    })
    return res.json(wishlist)
  }
}
