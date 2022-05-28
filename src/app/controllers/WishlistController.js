import Wishlist from "../models/WishlistModels";
import User from "../models/User";
import Product from "../models/ProductModels"

class WishListController {
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
  
  async update(req, res) {
    const { req_id } = req.params;

    const userExists = await User.findOne({
      where: { id: req_id },
    });
    // Email params existe então busco email body
    if (userExists) {
      const emailUpdate = await User.findOne({
        where: { email: req.body.email },
      });

      // Verifico se o email do body não é null ou se ele é igual ao email params
      if (!emailUpdate || emailUpdate.email === userExists.email) {
        const { id, name, email } = await userExists.update(req.body);
        return res.json({ id, name, email });
      }

      // Email do body já existe !! Retorna o erro
      if (emailUpdate) {
        return res.status(400).json({ error: "Usuário já existe! " });
      }
    }
    return res.status(400).json({ error: "Email não existe" });
  }
}

export default new WishListController();


