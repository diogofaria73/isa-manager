import Consumption from '../models/Consumption';

class ConsumptionController {
  // Listagem de todos os consumos de energia na tela inicial.
  async index(req, res) {
    const consumptionList = await Consumption.findAll();

    if (!consumptionList)
      return res.status(400).json({ error: 'Não foram encontrados consumos.' });

    return res.status(200).json({
      consumptionList,
    });
  }
}

export default new ConsumptionController();
