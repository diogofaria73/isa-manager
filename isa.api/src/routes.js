import { Router } from 'express';

import UserController from './app/controllers/UserController';
import EquipmentTypeController from './app/controllers/EquipmentTypeController';
import OperationalAreaController from './app/controllers/OperationalAreaController';
import EquipmentController from './app/controllers/EquipmentController';
import ParameterController from './app/controllers/ParameterController';
import ConsumptionController from './app/controllers/ConsumptionController';
import DashboardController from './app/controllers/DashboardController';
import SessionController from './app/controllers/SessionController';
import AuthMiddleware from './middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/user', AuthMiddleware, UserController.index);
routes.post('/user', UserController.store);
routes.get('/user/edit/:id', AuthMiddleware, UserController.edit);
routes.delete('/user/:id', AuthMiddleware, UserController.delete);

routes.get('/equipmentType', AuthMiddleware, EquipmentTypeController.index);
routes.get(
  '/equipmentType/edit/:id',
  AuthMiddleware,
  EquipmentTypeController.edit
);
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
routes.get(
  '/operationalArea/edit/:id',
  AuthMiddleware,
  OperationalAreaController.edit
);
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
routes.get('/equipment/edit/:id', AuthMiddleware, EquipmentController.edit);
routes.post('/equipment', AuthMiddleware, EquipmentController.store);
routes.post(
  '/equipment/findByAreaAndType',
  AuthMiddleware,
  EquipmentController.findByAreaAndType
);
routes.put('/equipment/:id', AuthMiddleware, EquipmentController.update);
routes.delete('/equipment/:id', AuthMiddleware, EquipmentController.delete);

routes.get('/parameter', AuthMiddleware, ParameterController.index);
routes.get('/parameter/edit/:id', AuthMiddleware, ParameterController.edit);
routes.post('/parameter', AuthMiddleware, ParameterController.store);
routes.put('/parameter/:id', AuthMiddleware, ParameterController.update);
routes.delete('/parameter/:id', AuthMiddleware, ParameterController.delete);

routes.get(
  '/consumption/:page?/:pageSize?/:tag?/:startDate?/:endDate?',
  AuthMiddleware,
  ConsumptionController.index
);
routes.get('/dashboard', AuthMiddleware, DashboardController.index);
routes.post(
  '/dashboard/getPowerData',
  AuthMiddleware,
  DashboardController.getPowerData
);
routes.post(
  '/dashboard/getDataChartJs',
  AuthMiddleware,
  DashboardController.getDataChartJs
);
routes.post(
  '/dashboard/getDataChartJsByFilter',
  AuthMiddleware,
  DashboardController.getDataChartJsByFilter
);
export default routes;
