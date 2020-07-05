import { Router } from 'express';

import User from './app/controllers/UserController';
import EquipmentType from './app/controllers/EquipmentTypeController';
import OperationalArea from './app/controllers/OperationalAreaController';

const routes = new Router();

routes.post('/user', User.store);

routes.post('/equipmentType', EquipmentType.store);

routes.post('/operationalArea', OperationalArea.store);

export default routes;
