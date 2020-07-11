import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import auth from '../../configs/auth/authConfig';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os campos digitados' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });

    if (!(await user.checkPassword(password)))
      return res.status(400).json({ error: 'Senha informada não é valida' });

    const { id, name, is_admin } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        is_admin,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}
export default new SessionController();
