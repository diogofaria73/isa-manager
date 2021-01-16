import * as Yup from 'yup';
import Equipment from '../models/Equipment';
import OperationalArea from '../models/OperationalArea';
import EquipmentType from '../models/EquipmentType';

class EquipmentController {
  async index(req, res) {
    const equipmentList = await Equipment.findAll({
      order: [['name', 'asc']],
      include: [
        {
          model: OperationalArea,
          as: 'area',
          attributes: ['id', 'title'],
        },
        {
          model: EquipmentType,
          as: 'type',
          attributes: ['id', 'title'],
        },
      ],
    });

    if (!equipmentList)
      return res
        .status(400)
        .json({ error: 'Não foram encontrados equipamentos' });

    return res.status(200).json({
      equipmentList,
    });
  }

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
      operational_area_id: Yup.number().required(),
      equipment_type_id: Yup.number().required(),
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

    const { id, name, tag, area, type } = await Equipment.findByPk(
      req.params.id,
      {
        include: [
          {
            model: OperationalArea,
            as: 'area',
            attributes: ['id', 'title'],
          },
          {
            model: EquipmentType,
            as: 'type',
            attributes: ['id', 'title'],
          },
        ],
      }
    );

    return res.json({
      id,
      name,
      tag,
      area,
      type,
    });
  }

  async edit(req, res) {
    const equipment = await Equipment.findByPk(req.params.id);

    if (!equipment) {
      return res.status(400).json({ error: 'Equipamento não encontrado.' });
    }

    return res.json({
      equipment,
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

  // Método para seleção de equipamento de acordo com área ou tipo de equipamento.
  async findByAreaAndType(req, res) {
    let equipmentList = [];
    const schema = Yup.object().shape({
      operational_area_id: Yup.number().required(),
      equipment_type_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados de busca inválidos.' });
    }

    const area_id = req.body.operational_area_id;
    const type_id = req.body.equipment_type_id;

    if (area_id === '0' && type_id === '0') {
      equipmentList = await Equipment.findAll();
    } else if (area_id !== '0' && type_id === '0') {
      equipmentList = await Equipment.findAll({
        where: {
          operational_area_id: area_id,
        },
      });
    } else if (area_id === '0' && type_id !== '0') {
      equipmentList = await Equipment.findAll({
        where: {
          equipment_type_id: type_id,
        },
      });
    } else {
      equipmentList = await Equipment.findAll({
        where: {
          operational_area_id: area_id,
          equipment_type_id: type_id,
        },
      });
    }

    return res.json({
      equipmentList,
    });
  }
}

export default new EquipmentController();
