import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import api from '../../services/api';
import history from '~/services/history';

export default function EquipmentType() {
  const [equipmentTypes, setEquipmentTypes] = useState([]);

  useEffect(() => {
    async function loadEquipmentTypes() {
      const response = await api.get('equipmentType');
      const data = response.data.types;
      setEquipmentTypes(data);
    }
    loadEquipmentTypes();
  }, []);

  const startEdit = (id) => {
    history.push(`/type/edit/${id}`);
  };

  const startDelete = (id) => {
    history.push(`/type/delete/${id}`);
  };

  return (
    <div className="mt-4">
      <h3>Lista de Tipos de Equipamentos</h3>
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
                <td>{equipmentType.title}</td>
                <td>{equipmentType.updatedAt}</td>
                <td>
                  <Link
                    onClick={() => startEdit(equipmentType.id)}
                    type="button"
                    className="btn"
                  >
                    <span className="fa fa-edit" />
                  </Link>
                </td>
                <td>
                  <Link
                    onClick={() => startDelete(equipmentType.id)}
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
              to="/type/register"
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
