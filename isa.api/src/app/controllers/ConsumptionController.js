import Sequelize from 'sequelize';
import Consumption from '../models/Consumption';

class ConsumptionController {
  // Listagem de todos os consumos de energia na tela inicial.
  async index(req, res) {
    const op = Sequelize.Op;
    let page = 1;
    let pageSize = 10;

    const { tag } = req.params;
    const start = req.params.startDate;
    let end = req.params.endDate;
    if (req.params.page !== undefined) {
      page = req.params.page;
    }
    if (req.params.pageSize !== undefined) {
      pageSize = req.params.pageSize;
    }

    let data;
    if (start === undefined && end === undefined) {
      if (tag === undefined) {
        data = await Consumption.findAndCountAll({
          limit: pageSize,
          offset: (page - 1) * pageSize,
          order: [['createdAt', 'desc']],
        });
      } else {
        data = await Consumption.findAndCountAll({
          limit: pageSize,
          offset: (page - 1) * pageSize,
          order: [['createdAt', 'desc']],
          where: {
            plcTag: {
              [op.substring]: [tag],
            },
          },
        });
      }
    } else {
      end = new Date(end);
      end.setHours(23);
      end.setMinutes(59);
      end.setSeconds(59);
      if (tag === undefined || tag === 'undefined') {
        data = await Consumption.findAndCountAll({
          limit: pageSize,
          offset: (page - 1) * pageSize,
          order: [['createdAt', 'desc']],
          where: {
            createdAt: {
              [op.between]: [start, end],
            },
          },
        });
      } else {
        data = await Consumption.findAndCountAll({
          limit: pageSize,
          offset: (page - 1) * pageSize,
          order: [['createdAt', 'desc']],
          where: {
            createdAt: {
              [op.between]: [start, end],
            },
            plcTag: {
              [op.substring]: [tag],
            },
          },
        });
      }
    }
    const consumptionList = data.rows;
    const consumptionTotal = data.count;

    if (!consumptionList)
      return res.status(400).json({ error: 'Não foram encontrados consumos.' });

    return res.status(200).json({
      consumptionList,
      consumptionTotal,
    });
  }
}

export default new ConsumptionController();
