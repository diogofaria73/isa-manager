import OperationalArea from '../models/OperationalArea';
import EquipmentType from '../models/EquipmentType';
import Equipment from '../models/Equipment';

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

  // Método de teste para jogar dados para o gráfico da tela do dashboard.
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
