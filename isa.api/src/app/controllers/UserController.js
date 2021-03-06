import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const usersList = await User.findAll();

    if (!usersList)
      return res
        .status(200)
        .json({ error: 'Não existe nenhum equipamento cadastrado' });

    return res.json({
      usersList,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists)
      return res.status(400).json({ error: 'User already exists' });

    const { id, name, email, is_admin } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      is_admin,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.json(400).json({ error: 'This e-mail is already in use' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const { id, name } = await User.findByPk(req.userId);

    return res.json({
      id,
      name,
    });
  }

  async edit(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    return res.json({
      user,
    });
  }

  async delete(req, res) {
    try {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Não foi possivel deletar o usuário' });
    }
  }
}

export default new UserController();
