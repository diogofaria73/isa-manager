import { Router } from 'express';

import UserController from './app/controllers/UserController';
import EquipmentTypeController from './app/controllers/EquipmentTypeController';
import OperationalAreaController from './app/controllers/OperationalAreaController';
import EquipmentController from './app/controllers/EquipmentController';
import ParameterController from './app/controllers/ParameterController';
import ConsumptionController from './app/controllers/ConsumptionController';
import SessionController from './app/controllers/SessionController';
import AuthMiddleware from './middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/user', AuthMiddleware, UserController.index);
routes.post('/user', UserController.store);

routes.get('/equipmentType', AuthMiddleware, EquipmentTypeController.index);
routes.post('/equipmentType', AuthMiddleware, EquipmentTypeController.store);
routes.put(
  '/equipmentType/:id',
  AuthMiddleware,
  EquipmentTypeController.update
);
routes.delete(
  '/equipmentType/:id',
  AuthMiddleware,
  EquipmentTypeController.delete
);

routes.get('/operationalArea', AuthMiddleware, OperationalAreaController.index);
routes.post(
  '/operationalArea',
  AuthMiddleware,
  OperationalAreaController.store
);
routes.put(
  '/operationalArea/:id',
  AuthMiddleware,
  OperationalAreaController.update
);
routes.delete(
  '/operationalArea/:id',
  AuthMiddleware,
  OperationalAreaController.delete
);

routes.get('/equipment', AuthMiddleware, EquipmentController.index);
routes.post('/equipment', AuthMiddleware, EquipmentController.store);
routes.put('/equipment/:id', AuthMiddleware, EquipmentController.update);
routes.delete('/equipment/:id', AuthMiddleware, EquipmentController.delete);

routes.get('/parameter', AuthMiddleware, ParameterController.index);
routes.post('/parameter', AuthMiddleware, ParameterController.store);
routes.put('/parameter/:id', AuthMiddleware, ParameterController.update);
routes.delete('/parameter/:id', AuthMiddleware, ParameterController.delete);

routes.get('/consumption', AuthMiddleware, ConsumptionController.index);

export default routes;
