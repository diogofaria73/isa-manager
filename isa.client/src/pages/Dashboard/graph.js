import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import api from '../../services/api';

export default function Graph() {
  const [power, setPower] = useState([]);
  const [powerJs, setPowerJs] = useState([]);

  useEffect(() => {
    async function loadPowerData() {
      const response = await api.post('dashboard/getPowerData');
      const data = response.data.powerData;
      setPower(data);
    }
    async function loadDataChartsJs() {
      const response = await api.post('dashboard/getDataChartJs');
      const dataChartJs = {
        labels: response.data.labels,
        datasets: [
          {
            label: 'Potência Consumida',
            data: response.data.powers,
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
          },
          {
            label: 'Custo',
            data: response.data.costs,
            fill: false,
            borderColor: '#742774',
          },
        ],
      };
      setPowerJs(dataChartJs);
    }
    loadPowerData();
    loadDataChartsJs();
  }, []);

  return (
    <>
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
          <h6 className="text-center">Potência - Line ChartJs</h6>
          <Line data={powerJs} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h6 className="text-center">Potência - Bar ChartJs</h6>
          <Bar data={powerJs} />
        </div>
        <div className="col">
          <h6 className="text-center">Potência - Doughnut ChartJs</h6>
          <Doughnut data={powerJs} />
        </div>
      </div>
    </>
  );
}
