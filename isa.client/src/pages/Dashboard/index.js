import React, {Component} from 'react';
import DashboardFilter from './dashboardfilter';
import Title from '../../components/Title';

class Dashboard extends Component {
  render() {
  return (
      <div className="mt-4">
        <Title titulo="Dashboard de Status dos Equipamentos:" />
        <DashboardFilter />
      </div>
    );
  }
}

export default Dashboard;
