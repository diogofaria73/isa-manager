import React, { Component } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import api from '../../services/api';
import Title from '../../components/Title';

class EquipmentType extends Component {
  state = {
    equipmentTypes: [],
  };

  async componentDidMount() {
    const response = await api.get('equipmentType');

    const data = response.data.equipmentTypesList.map((equipmentType) => ({
      ...equipmentType,
      // createdAt: format(equipment.createdAt, 'dd/MM/YYYY HH:mm', {
      //   locale: pt,
      //   timeZone: 'America/Sao_Paulo',
      // }),
    }));

    // format(addedDate, 'dd/MM/YYYY HH:mm', {
    //   timeZone: 'America/Sao_Paulo',
    // });
    this.setState({ equipmentTypes: data });
  }

  async handleDelete(equipmentType) {
    const response = await api.delete(`equipmentType/${equipmentType.id}`);
  }

  handleModal = (equipmentType) => {
    alert(`Abrindo o modal para editar o tipo de equipamento ${equipmentType.id}`);
  };

  render() {
    const { equipmentTypes } = this.state;
    return (
      <div className="mt-4">
        <Title titulo="Tipo de Equipamento:" />
        <section className="align-baseline mt-4">
          <table className="table table-sm table-striped table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Última Atualização</th>
                <th>Editar</th>
                <th>Apagar</th>
              </tr>
            </thead>
            <tbody>
              {equipmentTypes.map((equipmentType) => (
                <tr key={equipmentType.id}>
                  <td>{equipmentType.name}</td>
                  <td>{equipmentType.updatedAt}</td>
                  <td>
                    <span
                      className="fa fa-edit"
                      onClick={() => this.handleModal(equipmentType)}
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

export default EquipmentType;
