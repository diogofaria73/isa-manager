import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import Pagination from 'react-js-pagination';
import { BsSearch } from 'react-icons/bs';
import { Form } from '@rocketseat/unform';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import Title from '../../components/Title';
import api from '~/services/api';

registerLocale('pt-BR', ptBR);

export default function Consumption() {
  const [consumptions, setConsumption] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItens, setTotalItens] = useState();
  const [pageSize] = useState(10);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [tag, setTag] = useState();

  useEffect(() => {
    async function loadConsumption() {
      const response = await api.get('consumption');
      const data = response.data.consumptionList;
      setConsumption(data);
      setTotalItens(response.data.consumptionTotal);
    }
    loadConsumption();
  }, []);

  async function getPageData(page) {
    let response;
    if (
      startDate !== undefined &&
      startDate !== null &&
      endDate !== undefined &&
      endDate !== null
    ) {
      response = await api.get(
        `consumption/${page}/${pageSize}/${tag}/${startDate}/${endDate}`
      );
    } else if (tag !== undefined) {
      response = await api.get(`consumption/${page}/${pageSize}/${tag}`);
    } else {
      response = await api.get(`consumption/${page}/${pageSize}`);
    }
    const data = response.data.consumptionList;
    setConsumption(data);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getPageData(page);
  };

  const handleSubmit = () => {
    setCurrentPage(1);
    getPageData(1);
  };

  const handleChange = (event) => {
    if (event.target.value === '') {
      setTag(undefined);
    } else {
      setTag(event.target.value);
    }
  };

  return (
    <div className="mt-4">
      <Title titulo="Histórico de Consumo:" />
      <Form className="mt-4" onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-body">
            <div className="row mt-2 align-items-center">
              <div className="col">
                <h6>Tag:</h6>
                <input
                  className="form-control"
                  id="tagName"
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <h6>Data Inicial:</h6>
                <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  locale="pt-BR"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="col">
                <h6>Data Final:</h6>
                <DatePicker
                  className="form-control"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  locale="pt-BR"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="col">
                <div className="btn-group">
                  <button type="submit" className="btn btn-secondary btn-sm">
                    <BsSearch size={12} color="#FFF" /> Buscar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
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
      <section className="align-baseline d-flex justify-content-start">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={pageSize}
          totalItemsCount={totalItens || 1}
          pageRangeDisplayed={2}
          itemClass="page-item"
          linkClass="page-link"
          onChange={handlePageChange.bind(this)}
        />
      </section>
    </div>
  );
}
