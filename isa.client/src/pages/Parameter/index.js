import React, { useEffect, useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import api from '../../services/api';

export default function Parameter() {
  const [parameters, setParameters] = useState([]);

  useEffect(() => {
    async function loadParameters() {
      const response = await api.get('parameter');
      const data = response.data.parameterList;
      setParameters(data);
    }
    loadParameters();
  }, []);

  return (
    <div className="mt-4">
      <h3>Lista de Parâmetros</h3>
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
