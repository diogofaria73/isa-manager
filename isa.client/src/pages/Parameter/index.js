import React, { Component } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import api from '../../services/api';
import Title from '../../components/Title';

class Parameter extends Component {
  state = {
    parameters: [],
  };

  async componentDidMount() {
    const response = await api.get('parameter');

    const data = response.data.parameterList.map((parameter) => ({
      ...parameter,
      // createdAt: format(equipment.createdAt, 'dd/MM/YYYY HH:mm', {
      //   locale: pt,
      //   timeZone: 'America/Sao_Paulo',
      // }),
    }));

    // format(addedDate, 'dd/MM/YYYY HH:mm', {
    //   timeZone: 'America/Sao_Paulo',
    // });
    this.setState({ parameters: data });
  }

  async handleDelete(parameter) {
    const response = await api.delete(`parameter/${parameter.id}`);
  }

  handleModal = (parameter) => {
    alert(`Abrindo o modal para editar o parametro ${parameter.id}`);
  };

  render() {
    const { parameters } = this.state;
    return (
      <div className="mt-4">
        <Title titulo="Parâmetros:" />
        <section className="align-baseline mt-4">
          <table className="table table-sm table-striped table-hover">
            <thead>
              <tr>
                <th>Parâmetro</th>
                <th>Valor</th>
                <th>Última Atualização</th>
                <th>Editar</th>
                <th>Apagar</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((parameter) => (
                <tr key={parameter.id}>
                  <td>{parameter.name}</td>
                  <td>{parameter.price}</td>
                  <td>{parameter.updatedAt}</td>
                  <td>
                    <span
                      className="fa fa-edit"
                      onClick={() => this.handleModal(parameter)}
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

export default Parameter;
