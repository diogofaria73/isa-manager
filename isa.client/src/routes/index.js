import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Equipment from '../pages/Equipment';
import EquipmentType from '../pages/EquipmentType';
import OperationalArea from '../pages/OperationalArea';

export default function Routes() {
  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/equipment" exact component={Equipment} />
      <Route path="/equipmentType" exact component={EquipmentType} />
      <Route path="/operationalArea" exact component={OperationalArea} />
    </Switch>
  );
}
