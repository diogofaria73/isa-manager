import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import api from '~/services/api';

export default function Graph() {
  const [power, setPower] = useState([]);

  useEffect(() => {
    async function loadPowerData() {
      const response = await api.post('/dashboard/getPowerData');
      setPower(response.data.powerData);
    }
    loadPowerData();
  }, []);

  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <h6 className="text-center mt-4">Potência e Custo x Equipamento</h6>
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
                  title: 'Potência',
                },
              }}
              legendToggle
            />
          </div>
        </div>
        <div className="col">
          <label></label>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <label></label>
        </div>
        <div className="col">
          <label></label>
        </div>
      </div>
    </>
  );
}
