import { Router } from 'express';

import EquipmentController from './app/controllers/EquipmentController';

const routes = new Router();

routes.get('/equipments', EquipmentController.index);

export default routes;
