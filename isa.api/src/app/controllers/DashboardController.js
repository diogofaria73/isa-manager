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

  // TODO - Metodo de exemplo para geração de gráfico
  async getPowerData(req, res) {
    const powerData = [['Equipamento', 'Potência', 'Custo']];

    const equipmentList = await Equipment.findAll({
      order: [['tag', 'asc']],
    });

    equipmentList.forEach(equipment => {
      const novoItem = [
        equipment.tag,
        Math.random() * 100,
        Math.random() * 100,
      ];
      powerData.push(novoItem);
    });

    return res.status(200).json({
      powerData,
    });
  }
}

export default new DashboardController();
