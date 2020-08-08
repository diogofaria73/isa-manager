import React, { Component } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import api from '../../services/api';
import Title from '../../components/Title';

class Consumption extends Component {
  state = {
    consumptions: [],
  };

  async componentDidMount() {
    const response = await api.get('consumption');

    const data = response.data.consumptionList.map((consumption) => ({
      ...consumption,
      // createdAt: format(equipment.createdAt, 'dd/MM/YYYY HH:mm', {
      //   locale: pt,
      //   timeZone: 'America/Sao_Paulo',
      // }),
    }));

    // format(addedDate, 'dd/MM/YYYY HH:mm', {
    //   timeZone: 'America/Sao_Paulo',
    // });
    this.setState({ consumptions: data });
  }

  render() {
    const { consumptions } = this.state;
    return (
      <div className="mt-4">
        <Title titulo="Registros de Consumo Energético:" />
        <section className="align-baseline mt-4">
          <table className="table table-sm table-striped table-hover">
            <thead>
              <tr>
                <th>Tag CLP</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {consumptions.map((consumption) => (
                <tr key={consumption.id}>
                  <td>{consumption.plcTag}</td>
                  <td>{consumption.consumptionValue}</td>
                  <td>{consumption.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    );
  }

}

export default Consumption;
