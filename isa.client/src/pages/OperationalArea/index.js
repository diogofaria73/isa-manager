import React, { Component } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import api from '../../services/api';
import Title from '../../components/Title';

class OperationalArea extends Component {
  state = {
    operationalAreas: [],
  };

  async componentDidMount() {
    const response = await api.get('operationalArea');

    const data = response.data.operationalAreaList.map((operationalArea) => ({
      ...operationalArea,
      // createdAt: format(equipment.createdAt, 'dd/MM/YYYY HH:mm', {
      //   locale: pt,
      //   timeZone: 'America/Sao_Paulo',
      // }),
    }));

    // format(addedDate, 'dd/MM/YYYY HH:mm', {
    //   timeZone: 'America/Sao_Paulo',
    // });
    this.setState({ operationalAreas: data });
  }

  async handleDelete(operationalArea) {
    const response = await api.delete(`operationalArea/${operationalArea.id}`);
  }

  handleModal = (operationalArea) => {
    alert(`Abrindo o modal para editar a area operacional ${operationalArea.id}`);
  };

  render() {
    const { operationalAreas } = this.state;
    return (
      <div className="mt-4">
        <Title titulo="Áreas Operacionais:" />
        <section className="align-baseline mt-4">
          <table className="table table-sm table-striped table-hover">
            <thead>
              <tr>
                <th>Área</th>
                <th>Última Atualização</th>
                <th>Editar</th>
                <th>Apagar</th>
              </tr>
            </thead>
            <tbody>
              {operationalAreas.map((operationalArea) => (
                <tr key={operationalArea.id}>
                  <td>{operationalArea.name}</td>
                  <td>{operationalArea.updatedAt}</td>
                  <td>
                    <span
                      className="fa fa-edit"
                      onClick={() => this.handleModal(operationalArea)}
                    />
                  </td>
                  <td>
                    <span className="fa fa-trash" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="align-baseline d-flex justify-content-end">
            <div className="btn-group">
              <button type="button" className="btn btn-secondary btn-sm">
                <BsFillPlusCircleFill size={16} color="#FFF" /> Adicionar
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

}

export default OperationalArea;
