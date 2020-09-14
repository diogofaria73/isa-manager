import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import api from '../../services/api';

export default function Graph() {
  const [power, setPower] = useState([]);

  useEffect(() => {
    async function loadPowerData() {
      const response = await api.post('dashboard/getPowerData');
      const data = response.data.powerData;
      setPower(data);
    }
    loadPowerData();
  }, []);

  return (
    <div className="row mt-4">
      <div className="col">
        <h6 className="text-center">Potência e Custo Por Equipamento</h6>
        <div style={{ display: 'flex', maxWidth: 900 }}>
          <Chart
            width={500}
            height={400}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={power}
            options={{
              title: '',
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Equipamentos',
                minValue: 0,
              },
              vAxis: {
                title: 'Valor',
              },
            }}
            legendToggle
          />
        </div>
      </div>
      <div className="col">
        <h6>Teste</h6>
      </div>
    </div>
  );
}
