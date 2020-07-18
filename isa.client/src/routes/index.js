import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Dashboard from '../pages/Dashboard';
import Equipment from '../pages/Equipment';
import EquipmentType from '../pages/EquipmentType';
import OperationalArea from '../pages/OperationalArea';
import SignIn from '../pages/SignIn';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route path="/equipment" exact component={Equipment} isPrivate />
      <Route path="/type" exact component={EquipmentType} isPrivate />
      <Route path="/area" exact component={OperationalArea} isPrivate />
    </Switch>
  );
}
