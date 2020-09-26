import React, { Component } from 'react';
import DashboardFilter from './filter';
import Title from '../../components/Title';
import Graph from './graph';

class Dashboard extends Component {
  render() {
    return (
      <div className="mt-4">
        <Title titulo="Dashboard de Status dos Equipamentos:" />
        <DashboardFilter />
        <Graph />
      </div>
    );
  }
}

export default Dashboard;
