import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import EquipmentFilter from '../../components/Equipment/Filter/EquipmentFilter';
import api from '~/services/api';
import history from '~/services/history';

export default function Equipment() {
  const [equipments, setEquipment] = useState([]);

  useEffect(() => {
    async function loadEquipments() {
      const response = await api.get('equipment');
      const data = response.data.equipmentList;
      setEquipment(data);
    }
    loadEquipments();
  }, []);

  const startEdit = (id) => {
    history.push(`/equipment/edit/${id}`);
  };

  const startDelete = (id) => {
    history.push(`/equipment/delete/${id}`);
  };

  return (
    <div className="mt-4">
      <h3>Lista de Equipamentos</h3>
      <EquipmentFilter />
      <section className="h-100 align-baseline">
        <table className="table table-sm table-striped table-hover">
          <thead>
            <tr>
              <th>Equipamento</th>
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
                <td>{equipment.name}</td>
                <td>{equipment.tag}</td>
                <td>{equipment.type.title}</td>
                <td>{equipment.area.title}</td>
                <td>{equipment.is_active ? 'Sim' : 'Não'}</td>
                <td>{equipment.createdAt}</td>
                <td>
                  <Link
                    onClick={() => startEdit(equipment.id)}
                    type="button"
                    className="btn"
                  >
                    <span className="fa fa-edit" />
                  </Link>
                </td>
                <td>
                  <Link
                    onClick={() => startDelete(equipment.id)}
                    type="button"
                    className="btn"
                  >
                    <span className="fa fa-trash" />
                  </Link>
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
