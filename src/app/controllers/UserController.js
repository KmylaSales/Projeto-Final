import User from "../models/User";

class UserController {
  // Criando usuário
  async store(req, res) {
    // Verificando se ja existe um email cadastrado
    const thisUserExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (thisUserExists) {
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

  // Fazendo autualização do Usuário
  async update(req, res) {
    const { req_email } = req.params;

    // verificcar se o email existe
    const thisUserExists = await User.findOne({
      where: { email: req_email },
    });
    // Email params existe então busco email body
    if (thisUserExists) {
      const informedEmail = await User.findOne({
        where: { email: req.body.email },
      });

      // Verifico se o email do body não é null ou se ele é igual ao email params
      if (!informedEmail || informedEmail.email === thisUserExists.email) {
        const { id, name, email } = await thisUserExists.update(req.body);
        return res.json({ id, name, email });
      }

      // Email do body já existe !! Retorna o erro
      if (informedEmail) {
        return res.status(400).json({ error: "Usuário já existe! " });
      }
    }
    return res.status(400).json({ error: "Email não existe" });
  }

  // Fazendo busca de varios usuarios

  async index(req, res) {
    const users = await User.findAll({
      where: {
        name: req.body.name.toLowerCase(),
      },
    });

    return res.json(users);
  }

  // Fazendo busca de uma unica pessoa
}

export default new UserController();
