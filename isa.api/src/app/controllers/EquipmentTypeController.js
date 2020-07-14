import * as Yup from 'yup';
import EquipmentType from '../models/EquipmentType';

class EquipmentTypeController {
  async index(req, res) {
    const equipmentTypesList = await EquipmentType.findAll({
      attributes: ['id', 'name'],
    });

    if (!equipmentTypesList)
      return res
        .status(200)
        .json({ error: 'Não existe nenhum equipamento cadastrado' });

    return res.json({
      equipmentTypesList,
    });
  }

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

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Verifique os dados digitados' });

    const equipmentTypeName = req.body.tag;
    const equipmentType = await EquipmentType.findByPk(req.params.id);

    if (equipmentTypeName && equipmentTypeName !== equipmentType.name) {
      const equipmentTypeNameExists = await EquipmentType.findOne({
        where: { name: equipmentTypeName },
      });

      if (equipmentTypeNameExists) {
        return res.status(400).json({
          error: 'Já existe um tipo de equipamento cadastrado com este nome',
        });
      }
    }

    await EquipmentType.update(req.body);

    const { id, name } = await EquipmentType.findByPk(req.params.id);

    return res.json({
      id,
      name,
    });
  }

  async delete(req, res) {
    try {
      await EquipmentType.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res
        .status(200)
        .json({ message: 'Tipo de Equipamento deletado com sucesso' });
    } catch (error) {
      return res.status(400).json({
        message:
          'Não foi possível deleter o tipo de equipamento, existem equipamentos vinculados a este registro',
      });
    }
  }
}

export default new EquipmentTypeController();
