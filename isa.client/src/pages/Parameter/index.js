import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { format, parseISO } from 'date-fns';
import Pagination from 'react-js-pagination';
import Title from '../../components/Title';
import api from '../../services/api';
import history from '~/services/history';

export default function Parameter() {
  const [parameters, setParameters] = useState([]);
  const [parametersPaged, setParametersPaged] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItens, setTotalItens] = useState();
  const [itemsPerPage] = useState(10);

  const getPage = (page, list) => {
    const pagedList = [];
    if (page === undefined) {
      page = 1;
    }
    const startIndex = (page - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage - 1;
    if (endIndex >= list.length) {
      endIndex = list.length - 1;
    }

    for (let i = startIndex; i <= endIndex; i += 1) {
      pagedList.push(list[i]);
    }
    setParametersPaged(pagedList);
  };

  useEffect(() => {
    async function loadParameters() {
      const response = await api.get('parameter');
      const data = response.data.parameterList;
      setParameters(data);
      setTotalItens(data.length);
      const pagedList = [];
      const startIndex = 0;
      let endIndex = itemsPerPage - 1;
      if (endIndex >= data.length) {
        endIndex = data.length - 1;
      }
      for (let i = startIndex; i <= endIndex; i += 1) {
        pagedList.push(data[i]);
      }
      setParametersPaged(pagedList);
    }
    loadParameters();
  }, [itemsPerPage]);

  const startEdit = (id) => {
    history.push(`/parameter/edit/${id}`);
  };

  const startDelete = (id) => {
    history.push(`/parameter/delete/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getPage(page, parameters);
  };

  return (
    <div className="mt-4">
      <Title titulo="Lista de Parâmetros:" />
      <section className="align-baseline mt-4">
        <table className="table table-sm table-striped table-hover text-center">
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
            {parametersPaged.map((parameter) => (
              <tr key={parameter.id}>
                <td>{parameter.name}</td>
                <td>{parameter.price.toLocaleString('pt-BR')}</td>
                <td>
                  {format(parseISO(parameter.updatedAt), 'dd/MM/YYY HH:mm', {
                    timezone: 'America/Sao_Paulo',
                  })}
                </td>
                <td>
                  <button
                    onClick={() => startEdit(parameter.id)}
                    type="button"
                    className="btn"
                  >
                    <span className="fa fa-edit" />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => startDelete(parameter.id)}
                    type="button"
                    className="btn"
                  >
                    <span className="fa fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <div className="col">
            <section className="align-baseline d-flex justify-content-start">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalItens || 1}
                pageRangeDisplayed={2}
                itemClass="page-item"
                linkClass="page-link"
                onChange={handlePageChange.bind(this)}
              />
            </section>
          </div>
          <div className="col">
            <div className="align-baseline d-flex justify-content-end">
              <div className="btn-group">
                <Link
                  to="/parameter/register"
                  type="button"
                  className="btn btn-secondary btn-sm"
                >
                  <BsFillPlusCircleFill size={16} color="#FFF" /> Adicionar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
