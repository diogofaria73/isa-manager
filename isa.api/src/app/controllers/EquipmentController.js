import * as Yup from 'yup';
import Equipment from '../models/Equipment';

class EquipmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(5),
      tag: Yup.string()
        .required()
        .min(5),
      operational_area_id: Yup.number().required(),
      equipment_type_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Confira os dados que estão sendo cadastrados' });
    }

    const equipmentExists = await Equipment.findOne({
      where: { tag: req.body.tag },
      limit: 10,
    });

    if (equipmentExists)
      return res
        .status(400)
        .json({ error: 'Já existe um equipamento com esta TAG' });

    const { id, name, tag } = await Equipment.create(req.body);

    return res.json({
      id,
      name,
      tag,
    });
  }
}

export default new EquipmentController();
