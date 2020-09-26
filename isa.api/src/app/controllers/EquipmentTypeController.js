import * as Yup from 'yup';
import EquipmentType from '../models/EquipmentType';

class EquipmentTypeController {
  async index(req, res) {
    const types = await EquipmentType.findAll({
      order: [['title', 'asc']],
    });

    if (!types)
      return res
        .status(200)
        .json({ error: 'Não existe nenhum equipamento cadastrado' });

    return res.json({
      types,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Confira os dados que estão sendo cadastrados' });
    }

    const equipmentTypeExists = await EquipmentType.findOne({
      where: { title: req.body.title },
    });

    if (equipmentTypeExists)
      return res.status(400).json({ error: 'O Tipo de Equipamento já existe' });

    const { id, title } = await EquipmentType.create(req.body);

    return res.json({
      id,
      title,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Verifique os dados digitados' });

    const equipmentTypeTitle = req.body.tag;
    const equipmentType = await EquipmentType.findByPk(req.params.id);

    if (equipmentTypeTitle && equipmentTypeTitle !== equipmentType.title) {
      const equipmentTypeTitleExists = await EquipmentType.findOne({
        where: { title: equipmentTypeTitle },
      });

      if (equipmentTypeTitleExists) {
        return res.status(400).json({
          error: 'Já existe um tipo de equipamento cadastrado com este nome',
        });
      }
    }

    await equipmentType.update(req.body);

    const { id, title } = await EquipmentType.findByPk(req.params.id);

    return res.json({
      id,
      title,
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

  async edit(req, res) {
    const equipmentType = await EquipmentType.findByPk(req.params.id);

    if (!equipmentType) {
      return res
        .status(400)
        .json({ error: 'Tipo de equipamento não encontrado.' });
    }

    return res.json({
      equipmentType,
    });
  }
}

export default new EquipmentTypeController();
