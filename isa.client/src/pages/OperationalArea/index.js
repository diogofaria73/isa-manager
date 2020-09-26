import React, { useEffect, useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { format, parseISO } from 'date-fns';
import api from '~/services/api';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import RegisterModal from './RegisterModal';

export default function OperationalArea() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function loadAreas() {
      const response = await api.get('/operationalArea');
      const data = response.data.areas;
      setAreas(data);
    }
    loadAreas();
  }, []);

  const handleEditModal = () => {
    return <EditModal />;
  };

  const handleDeleteModal = () => {
    return <DeleteModal />;
  };

  const handleCreateModal = () => {
    return <RegisterModal />;
  };

  return (
    <div className="mt-4">
      <section className="align-baseline mt-4">
        <table className="table table-sm table-striped table-hover text-center">
          <thead>
            <tr>
              <th>Área</th>
              <th>Última Atualização</th>
              <th>Editar</th>
              <th>Apagar</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr key={area.id}>
                <td>{area.title}</td>
                <td>
                  {format(parseISO(area.updatedAt), 'dd/MM/YYY HH:mm', {
                    timezone: 'America/Sao_Paulo',
                  })}
                </td>
                <td>
                  <button
                    onClick={() => handleEditModal()}
                    type="button"
                    className="btn"
                  >
                    <span className="fa fa-edit" />
                  </button>
                </td>
                <button
                    onClick={() => handleDeleteModal()}
                    type="button"
                    className="btn"
                  >
                    <span className="fa fa-delete" />
                  </button>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="align-baseline d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={() => handleCreateModal()}
            type="button"
          >
            <BsFillPlusCircleFill size={16} color="#FFF" /> Adicionar
          </button>
        </div>
      </section>
    </div>
  );
}
