import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Dashboard from '../pages/Dashboard';
import Equipment from '../pages/Equipment';
import EquipmentType from '../pages/EquipmentType';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/equipment" exact component={Equipment} />
      <Route path="/equipmentType" exact component={EquipmentType} />
    </Switch>
  );
}
