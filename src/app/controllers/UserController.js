import User from "../models/User";

class UserController {
  // Criando usuário
  async store(req, res) {
    // Verificando se ja existe um email cadastrado
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      return res.status(400).json({ error: "Usuário já existe! " });
    }

    // Criando o novo usuário com as informações do body
    const { id, name, email } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { req_email } = req.params;

    // verificcar se o email existe
    const userExists = await User.findOne({
      where: { email: req_email },
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

export default new UserController();
