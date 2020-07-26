import React, { Component } from 'react';
import api from '../../services/api';

class Equipment extends Component {
  state = {
    equipments: [],
  };

  async componentDidMount() {
    const response = await api.get('equipment');
    this.setState({ equipments: response.data.equipmentList });
  }

  render() {
    const { equipments } = this.state;
    return (
      <div>
        <section className=" form-group mt-5 d-flex justify-content-between">
          <div className="row align-content-between">
            <div className="col-md-4">
              <div className="input-group-sm mb-auto">
                <input
                  className="form-control"
                  placeholder="Tag do Equipamento"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group-sm mb-3">
                <input
                  className="form-control"
                  placeholder="Tipo do Equipamento"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group-sm mb-3">
                <input className="form-control" placeholder="Status" />
              </div>
            </div>
            <div className="col-md-1">
              <div className="btn-group">
                <button type="button" className="btn btn-primary btn-sm">
                  Pesquisar
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="align-baseline">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Tag</th>
                <th>Tipo</th>
                <th>Localidade</th>
                <th>Ativo</th>
                <th>Data Cadastro</th>
                <th>Editar</th>
                <th>Apagar</th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((equipment) => (
                <tr key={equipment.id}>
                  <td>{equipment.tag}</td>
                  <td>{equipment.type.name}</td>
                  <td>{equipment.area.name}</td>
                  <td>{equipment.is_active}</td>
                  <td>{equipment.createdAt}</td>
                  <td>
                    <span className="fa fa-edit" />
                  </td>
                  <td>
                    <span className="fa fa-trash" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}
export default Equipment;
