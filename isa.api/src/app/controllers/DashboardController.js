import OperationalArea from '../models/OperationalArea';
import EquipmentType from '../models/EquipmentType';
import Equipment from '../models/Equipment';
import Consumption from '../models/Consumption';
import { QueryTypes } from 'sequelize';

class DashboardController {
  // Exibição da tela inicial de Dashboard.
  async index(req, res) {
    const operationalAreaList = await OperationalArea.findAll({
      order: [['title', 'asc']],
    });
    const equipmentTypeList = await EquipmentType.findAll({
      order: [['title', 'asc']],
    });
    const equipmentList = await Equipment.findAll({
      order: [['tag', 'asc']],
    });

    if (!operationalAreaList && !equipmentTypeList && !equipmentList)
      return res.status(400).json({ error: 'Não foram encontrados dados.' });

    return res.status(200).json({
      operationalAreaList,
      equipmentTypeList,
      equipmentList,
    });
  }

  // Método de teste para jogar dados para o gráfico da tela do dashboard - app do Google.
  async getPowerData(req, res) {
    const powerData = [['Equipamento', 'Potência', 'Custo']];

    const equipmentList = await Equipment.findAll({
      order: [['tag', 'asc']],
    });
    equipmentList.forEach(eqp => {
      powerData.push([eqp.tag, Math.random() * 100, Math.random() * 100]);
    });

    return res.status(200).json({
      powerData,
    });
  }

  // Método de teste para jogar dados para o gráfico da tela do dashboard.
  async getDataChartJs(req, res) {
    const labels = [];
    const powers = [];
    const costs = [];

    // Query de exmeplo para consultar o consumo de cada equipamento por área ...
    const resultQuery = await Consumption.sequelize.query(
      // eslint-disable-next-line no-multi-str
      'select co.plc_tag as tag, sum(co.consumption_value) as consumo \
       from consumptions as co, equipment as eqp \
       where co.plc_tag = eqp.tag and eqp.operational_area_id = :id_procurado \
       group by co.plc_tag order by co.plc_tag',
      {
        replacements: { id_procurado: 1 },
        type: QueryTypes.SELECT,
      }
    );

    resultQuery.forEach(r => {
      labels.push([r.tag]);
      powers.push(r.consumo);
      costs.push(r.consumo * Math.random() * 5);
    });

    return res.status(200).json({
      labels,
      powers,
      costs,
    });
  }

  // Método de teste para jogar dados para o gráfico da tela do dashboard de acordo com o filtro.
  async getDataChartJsByFilter(req, res) {
    const labels = [];
    const powers = [];
    const costs = [];

    const equipmentList = await Equipment.findAll({
      order: [['tag', 'asc']],
    });
    equipmentList.forEach(eqp => {
      labels.push([eqp.tag]);
      powers.push(Math.random() * 100);
      costs.push(Math.random() * 50);
    });

    return res.status(200).json({
      labels,
      powers,
      costs,
    });
  }
}

export default new DashboardController();
