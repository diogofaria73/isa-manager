import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EquipmentFilter from '../../components/Equipment/Filter/EquipmentFilter';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import api from '../../services/api';

class Equipment extends Component {
  state = {
    equipments: [],
  };

  async componentDidMount() {
    const response = await api.get('equipment');

    const data = response.data.equipmentList;

    console.log(data);
    this.setState({ equipments: data });
  }

  async handleDelete(equipment) {
    const response = await api.delete(`equipment/${equipment.id}`);
  }

  handleModal = (equipment) => {
    alert(`Abrindo o modal para editar o equipamento ${equipment.id}`);
  };

  render() {
    const { equipments } = this.state;
    return (
      <div className="mt-4">
        <h3>Lista de Equipamentos</h3>
        <EquipmentFilter />
        <section className="h-100 align-baseline">
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
              <Link
                to="/equipment/register"
                type="button"
                className="btn btn-secondary btn-sm"
              >
                <BsFillPlusCircleFill size={16} color="#FFF" /> Adicionar
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Equipment;
