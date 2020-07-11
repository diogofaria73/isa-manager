import * as Yup from 'yup';
import Equipment from '../models/Equipment';
import OperationalArea from '../models/OperationalArea';
// import EquipmentType from '../models/EquipmentType';

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

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(5)
        .required(),
      tag: Yup.string()
        .min(5)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os dados digitados' });
    }

    const equipmentTag = req.body.tag;

    const equipment = await Equipment.findByPk(req.params.id);

    if (equipmentTag && equipmentTag !== equipment.tag) {
      const equipmentTagExists = await Equipment.findOne({
        where: { tag: equipmentTag },
      });

      if (equipmentTagExists) {
        return res
          .status(400)
          .json({ error: 'Existe um equipamento associado a esta TAG' });
      }
    }

    await equipment.update(req.body);

    const { id, name, tag, area } = await Equipment.findByPk(req.params.id, {
      include: [
        {
          model: OperationalArea,
          as: 'area',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json({
      id,
      name,
      tag,
      area,
    });
  }

  async delete(req, res) {
    try {
      await Equipment.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res
        .status(200)
        .json({ message: 'Equipamento foi deletado com sucesso' });
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Não foi possivel deletar o equipamento' });
    }
  }
}

export default new EquipmentController();
