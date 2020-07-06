import { Router } from 'express';

import User from './app/controllers/UserController';
import EquipmentType from './app/controllers/EquipmentTypeController';
import OperationalArea from './app/controllers/OperationalAreaController';
import Equipment from './app/controllers/EquipmentController';

const routes = new Router();

routes.post('/user', User.store);

routes.post('/equipmentType', EquipmentType.store);

routes.post('/operationalArea', OperationalArea.store);

routes.post('/equipment', Equipment.store);

export default routes;
