import * as Yup from 'yup';
import EquipmentType from '../models/EquipmentType';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Confira os dados que estão sendo cadastrados' });
    }

    const equipmentTypeExists = await EquipmentType.findOne({
      where: { name: req.body.name },
    });

    if (equipmentTypeExists)
      return res.status(400).json({ error: 'O Tipo de Equipamento já existe' });

    const { id, name } = await EquipmentType.create(req.body);

    return res.json({
      id,
      name,
    });
  }
}

export default new UserController();
