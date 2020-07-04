// import Equipment from '../models/Equipment';

class EquipmentController {
  async index(req, res) {
    return res.json({ message: 'Equipamentos' });
  }
}

export default new EquipmentController();
