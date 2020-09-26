import * as Yup from 'yup';
import Parameter from '../models/Parameter';

class ParameterController {
  // Listagem de todos os parâmetros na tela inicial.
  async index(req, res) {
    const parameterList = await Parameter.findAll({
      order: [['name', 'asc']],
    });

    if (!parameterList)
      return res
        .status(400)
        .json({ error: 'Não foram encontrados parâmetros.' });

    return res.status(200).json({
      parameterList,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Confira os dados que estão sendo cadastrados' });
    }

    const parameterExists = await Parameter.findOne({
      where: { name: req.body.name },
    });

    if (parameterExists)
      return res
        .status(400)
        .json({ error: 'Já existe um parâmetro com este nome.' });

    const { id, name, price } = await Parameter.create(req.body);

    return res.json({
      id,
      name,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Verifique os dados digitados.' });

    const parameter = await Parameter.findByPk(req.params.id);

    if (!parameter) {
      return res.status(400).json({ error: 'Parâmetro não encontrado.' });
    }

    await parameter.update(req.body);

    const { id, name, price } = await Parameter.findByPk(req.params.id);

    return res.json({
      id,
      name,
      price,
    });
  }

  async delete(req, res) {
    try {
      await Parameter.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res
        .status(200)
        .json({ message: 'Parâmetro deletado com sucesso' });
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Não foi possivel deletar o parâmetro' });
    }
  }

  async edit(req, res) {
    const parameter = await Parameter.findByPk(req.params.id);

    if (!parameter) {
      return res
        .status(400)
        .json({ error: 'Área operacional não encontrada.' });
    }

    return res.json({
      parameter,
    });
  }
}

export default new ParameterController();
