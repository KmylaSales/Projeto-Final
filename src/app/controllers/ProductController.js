import Product from "../models/ProductModels";

class ProductController {

  async store(req, res) {

    const productExists = await Product.findOne({
      where: { id: req.params.id },
    });
    if (productExists) {
      return res.status(400).json({ error: "produto já existe!" });
    }


    const { id, name, description } = await Product.create(req.body);
    return res.json({
      id,
      name,
      description,
    });
  }
}

export default new ProductController();