import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Dashboard from '../pages/Dashboard';
import Equipment from '../pages/Equipment';
import EquipmentRegister from '../pages/Equipment/Register';
import EquipmentEdit from '../pages/Equipment/Edit';
import EquipmentDelete from '../pages/Equipment/Delete';
import EquipmentType from '../pages/EquipmentType';
import EquipmentTypeRegister from '../pages/EquipmentType/Register';
import EquipmentTypeEdit from '../pages/EquipmentType/Edit';
import EquipmentTypeDelete from '../pages/EquipmentType/Delete';
import OperationalArea from '../pages/OperationalArea';
import OperationalAreaRegister from '../pages/OperationalArea/Register';
import OperationalAreaEdit from '../pages/OperationalArea/Edit';
import OperationalAreaDelete from '../pages/OperationalArea/Delete';
import SignIn from '../pages/SignIn';
import Parameter from '../pages/Parameter';
import ParameterRegister from '../pages/Parameter/Register';
import ParameterEdit from '../pages/Parameter/Edit';
import ParameterDelete from '../pages/Parameter/Delete';
import User from '../pages/User';
import UserRegister from '../pages/User/Register';
import UserDelete from '../pages/User/Delete';
import Consumption from '../pages/Consumption';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route path="/equipment" exact component={Equipment} isPrivate />
      <Route
        path="/equipment/register"
        exact
        component={EquipmentRegister}
        isPrivate
      />
      <Route
        path="/equipment/edit/:id"
        exact
        component={EquipmentEdit}
        isPrivate
      />
      <Route
        path="/equipment/delete/:id"
        exact
        component={EquipmentDelete}
        isPrivate
      />
      <Route path="/type" exact component={EquipmentType} isPrivate />
      <Route
        path="/type/register"
        exact
        component={EquipmentTypeRegister}
        isPrivate
      />
      <Route
        path="/type/edit/:id"
        exact
        component={EquipmentTypeEdit}
        isPrivate
      />
      <Route
        path="/type/delete/:id"
        exact
        component={EquipmentTypeDelete}
        isPrivate
      />
      <Route path="/area" isPrivate exact component={OperationalArea} />
      <Route
        path="/area/register"
        exact
        component={OperationalAreaRegister}
        isPrivate
      />
      <Route
        path="/area/edit/:id"
        exact
        component={OperationalAreaEdit}
        isPrivate
      />
      <Route
        path="/area/delete/:id"
        exact
        component={OperationalAreaDelete}
        isPrivate
      />
      <Route path="/parameter" exact component={Parameter} isPrivate />
      <Route
        path="/parameter/register"
        exact
        component={ParameterRegister}
        isPrivate
      />
      <Route
        path="/parameter/edit/:id"
        exact
        component={ParameterEdit}
        isPrivate
      />
      <Route
        path="/parameter/delete/:id"
        exact
        component={ParameterDelete}
        isPrivate
      />
      <Route path="/user" exact component={User} isPrivate />
      <Route path="/user/register" exact component={UserRegister} isPrivate />
      <Route path="/user/delete/:id" exact component={UserDelete} isPrivate />
      <Route path="/consumption" exact component={Consumption} isPrivate />
    </Switch>
  );
}
