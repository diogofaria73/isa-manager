import React, { Component } from 'react';
import EquipmentFilter from '../../components/Filters/Equipment/EquipmentFilter';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import api from '../../services/api';

class Equipment extends Component {
  state = {
    equipments: [],
  };

  async componentDidMount() {
    const response = await api.get('equipment');

    const data = response.data.equipmentList.map((equipment) => ({
      ...equipment,
      // createdAt: format(equipment.createdAt, 'dd/MM/YYYY HH:mm', {
      //   locale: pt,
      //   timeZone: 'America/Sao_Paulo',
      // }),
    }));

    // format(addedDate, 'dd/MM/YYYY HH:mm', {
    //   timeZone: 'America/Sao_Paulo',
    // });

    this.setState({ equipments: data });
  }

  handleModal = (equipment) => {
    alert(`Abrindo o modal para editar o equipamento ${equipment.id}`);
  };

  render() {
    const { equipments } = this.state;
    return (
      <div>
        <EquipmentFilter />
        <section className="align-baseline">
          <table className="table table-sm table-striped table-hover">
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
                  <td>{equipment.active}</td>
                  <td>{equipment.createdAt}</td>
                  <td>
                    <span
                      className="fa fa-edit"
                      onClick={() => this.handleModal(equipment)}
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
export default Equipment;
