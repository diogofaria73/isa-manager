import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import Title from '../../components/Title';
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
      <Title titulo="Histórico de Consumo:" />
      <section className="align-baseline mt-4">
        <table className="table table-sm table-striped table-hover text-center">
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
                <td>{consumption.consumptionValue.toLocaleString('pt-BR')}</td>
                <td>
                  {format(parseISO(consumption.createdAt), 'dd/MM/YYY HH:mm', {
                    timezone: 'America/Sao_Paulo',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
