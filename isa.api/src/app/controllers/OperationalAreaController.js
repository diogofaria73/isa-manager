import * as Yup from 'yup';
import OperationalArea from '../models/OperationalArea';

class OperationalAreaController {
  async index(req, res) {
    const operationalAreaList = await OperationalArea.findAll();

    if (!operationalAreaList)
      return res
        .status(400)
        .json({ error: 'Não existem areas operacionais cadatradas' });

    return res.json({
      operationalAreaList,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique os dados informados' });
    }

    const operationalAreaExist = await OperationalArea.findOne({
      where: { name: req.body.name },
    });

    if (operationalAreaExist)
      return res
        .status(400)
        .json({ error: 'Esta area operacional já está cadastrada' });

    const { id, name } = await OperationalArea.create(req.body);

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

    const operationalAreaName = req.body.name;
    const operationalArea = await OperationalArea.findByPk(req.params.id);

    if (operationalAreaName && operationalAreaName !== operationalArea.name) {
      const operationalAreaExists = await OperationalArea.findOne({
        where: { name: operationalAreaName },
      });

      if (operationalAreaExists) {
        return res
          .status(400)
          .json({ error: 'Já existe uma área operacional com este nome' });
      }
    }

    await operationalArea.update(req.body);

    const { id, name } = await OperationalArea.findByPk(req.params.id);

    return res.json({
      id,
      name,
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
