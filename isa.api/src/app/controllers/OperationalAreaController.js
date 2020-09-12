import * as Yup from 'yup';
import OperationalArea from '../models/OperationalArea';

class OperationalAreaController {
  async index(req, res) {
    const areas = await OperationalArea.findAll({
      order: [['title', 'asc']],
    });

    if (!areas)
      return res
        .status(400)
        .json({ error: 'Não existem areas operacionais cadatradas' });

    return res.json({
      areas,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os dados informados' });
    }

    const operationalAreaExist = await OperationalArea.findOne({
      where: { title: req.body.title },
    });

    if (operationalAreaExist)
      return res
        .status(400)
        .json({ error: 'Esta area operacional já está cadastrada' });

    const { id, title } = await OperationalArea.create(req.body);

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

    const operationalAreaTitle = req.body.title;
    const operationalArea = await OperationalArea.findByPk(req.params.id);

    if (
      operationalAreaTitle &&
      operationalAreaTitle !== operationalArea.title
    ) {
      const operationalAreaExists = await OperationalArea.findOne({
        where: { title: operationalAreaTitle },
      });

      if (operationalAreaExists) {
        return res
          .status(400)
          .json({ error: 'Já existe uma área operacional com este nome' });
      }
    }

    await operationalArea.update(req.body);

    const { id, title } = await OperationalArea.findByPk(req.params.id);

    return res.json({
      id,
      title,
    });
  }

  async edit(req, res) {
    const area = await OperationalArea.findByPk(req.params.id);

    if (!area) {
      return res
        .status(400)
        .json({ error: 'Área operacional não encontrada.' });
    }

    return res.json({
      area,
    });
  }

  async delete(req, res) {
    try {
      await OperationalArea.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res
        .status(200)
        .json({ message: 'Area Operacional deletada com sucesso' });
    } catch (error) {
      return res.status(400).json({
        message:
          'Não foi possivel  deletar a area operacional, existem equipamentos vinculados a este registro',
      });
    }
  }
}

export default new OperationalAreaController();
