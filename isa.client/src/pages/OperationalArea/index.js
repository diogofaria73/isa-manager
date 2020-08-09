import React, { useEffect, useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import api from '~/services/api';

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

  return (
    <div className="mt-4">
      <h3>Lista de Áreas Operacionais</h3>
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
            {areas.map((area) => (
              <tr key={area.id}>
                <td>{area.title}</td>
                <td>{area.updatedAt}</td>
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
