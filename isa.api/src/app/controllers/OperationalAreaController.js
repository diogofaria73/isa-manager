import * as Yup from 'yup';
import OperationalArea from '../models/OperationalArea';

class OperationalAreaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const equipmentTypeExists = await OperationalArea.findOne({
      where: { name: req.body.name },
    });

    if (equipmentTypeExists)
      return res.status(400).json({ error: 'User already exists' });

    const { id, name } = await OperationalArea.create(req.body);

    return res.json({
      id,
      name,
    });
  }
}

export default new OperationalAreaController();
