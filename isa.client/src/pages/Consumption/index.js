import React, { useState, useEffect } from 'react';
import api from '~/services/api';

export default function Consumption() {
  const [consumptions, setConsumption] = useState([]);

  useEffect(() => {
    async function loadConsumption() {
      const response = await api.get('consumption');
      const data = response.data.consumptionList;
      setConsumption(data);
    }
    loadConsumption();
  }, []);

  return (
    <div className="mt-4">
      <h3>Lista de Equipamentos</h3>
      <section className="align-baseline mt-4">
        <table className="table table-sm table-striped table-hover">
          <thead>
            <tr>
              <th>Tag CLP</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {consumptions.map((consumption) => (
              <tr key={consumption.id}>
                <td>{consumption.plcTag}</td>
                <td>{consumption.consumptionValue}</td>
                <td>{consumption.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
