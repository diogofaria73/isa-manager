import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../configs/auth/authConfig';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res
      .status(400)
      .json({ error: 'O Token de acesso não foi infomrado' });

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
};
