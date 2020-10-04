import Consumption from '../models/Consumption';

class ConsumptionController {
  // Listagem de todos os consumos de energia na tela inicial.
  async index(req, res) {
    let page = 1;
    let pageSize = 5;
    if (req.params.page !== undefined) {
      page = req.params.page;
    }
    if (req.params.pageSize !== undefined) {
      pageSize = req.params.pageSize;
    }

    const consumptionList = await Consumption.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    if (!consumptionList)
      return res.status(400).json({ error: 'Não foram encontrados consumos.' });

    return res.status(200).json({
      consumptionList,
    });
  }
}

export default new ConsumptionController();
