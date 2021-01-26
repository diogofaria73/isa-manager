import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Line, Bar, Pie, HorizontalBar } from 'react-chartjs-2';
import { Form } from '@rocketseat/unform';
import api from '../../services/api';

export default function Graph() {
  const [chartLine, setChartLine] = useState([]);
  const [chartPie, setChartPie] = useState([]);
  const [chartBar, setChartBar] = useState([]);
  const [chartBarHoriz, setChartBarHoriz] = useState([]);
  useEffect(() => {
    // Chamada para preencher os gráficos quando a página é carregada;
    async function loadDataChartsJs() {
      const response = await api.post('dashboard/getDataChartJs');
      const dataChartLine = {
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
            fill: true,
            backgroundColor: 'rgba(45,15,45,0.2)',
            borderColor: '#742774',
          },
        ],
      };
      const dataChartBar = {
        labels: response.data.labels,
        datasets: [
          {
            label: 'Potência Consumida',
            data: response.data.powers,
            fill: true,
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
          },
          {
            label: 'Custo',
            data: response.data.costs,
            fill: true,
            backgroundColor: '#FF6A33',
            borderColor: '#FF6A33',
          },
        ],
      };
      const dataChartBarHoriz = {
        labels: response.data.labels,
        datasets: [
          {
            label: 'Potência Consumida',
            data: response.data.powers,
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.5)',
            borderColor: 'rgba(75,192,192,1)',
          },
          {
            label: 'Custo',
            data: response.data.costs,
            fill: true,
            backgroundColor: 'rgba(45,15,45,0.5)',
            borderColor: '#742774',
          },
        ],
      };
      const dataChartPie = {
        labels: response.data.labels,
        datasets: [
          {
            label: 'Potência Consumida',
            data: response.data.powers,
            fill: true,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            houverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      };
      setChartLine(dataChartLine);
      setChartBar(dataChartBar);
      setChartPie(dataChartPie);
      setChartBarHoriz(dataChartBarHoriz);
    }
    loadDataChartsJs();
  }, []);

// Função de chamada com os dados do filtro;
  function handleSubmit() {
    async function exportExcelData() {
      const response = await api.post('dashboard/getExcelData');
      console.log(response);
      //TODO - Popular os gráficos;
    }
    exportExcelData();
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col">
          <h6 className="text-center">Potência - Bar ChartJs</h6>
          <Bar data={chartBar} />
        </div>
        <div className="col">
          <h6 className="text-center">Potência - Line ChartJs</h6>
          <Line data={chartLine} />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col">
          <h6 className="text-center">Potência - Bar Horizontal</h6>
          <HorizontalBar data={chartBarHoriz} />
        </div>
        <div className="col">
          <h6 className="text-center">Potência - Pizza ChartJs</h6>
          <Pie data={chartPie} />
        </div>
      </div>
      <Form onSubmit={handleSubmit} className="mt-4">
        <div className="row mt-5">
          <div className="col">
            <div align="right">
              <button type="submit" className="btn btn-secondary btn-sm">
                <BsSearch size={12} color="#FFF" /> Exportar
              </button>
            </div>
          </div>
        </div>
      </Form>
      <div className="row mt-3">
        <div className="col" />
      </div>
    </>
  );
}
