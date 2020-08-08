import OperationalArea from '../models/OperationalArea';
import EquipmentType from '../models/EquipmentType';
import Equipment from '../models/Equipment';

class DashboardController {
  // Exibição da tela inicial de Dashboard.
  async index(req, res) {
    const operationalAreaList = await OperationalArea.findAll({
      order: [['name', 'asc']],
    });
    const equipmentTypeList = await EquipmentType.findAll({
      order: [['name', 'asc']],
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
}

export default new DashboardController();
