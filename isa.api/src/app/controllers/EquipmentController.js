import * as Yup from 'yup';
import Equipment from '../models/Equipment';

class EquipmentController {
  async store(req, res) {
    // const schema = Yup.object().shape({
    //   name: Yup.string()
    //     .required()
    //     .min(5),
    //   tag: Yup.string()
    //     .required()
    //     .min(5),
    //   operational_area_id: Yup.number().required(),
    // });
  }
}

export default new EquipmentController();
