import { Router } from 'express';

import UserController from './app/controllers/UserController';
import EquipmentTypeController from './app/controllers/EquipmentTypeController';
import OperationalAreaController from './app/controllers/OperationalAreaController';
import EquipmentController from './app/controllers/EquipmentController';
import SessionController from './app/controllers/SessionController';
import AuthMiddleware from './middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/user', AuthMiddleware, UserController.store);

routes.post('/equipmentType', AuthMiddleware, EquipmentTypeController.store);

routes.post(
  '/operationalArea',
  AuthMiddleware,
  OperationalAreaController.store
);

routes.post('/equipment', AuthMiddleware, EquipmentController.store);

export default routes;
