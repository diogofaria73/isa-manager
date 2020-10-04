import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { format, parseISO } from 'date-fns';
import Pagination from 'react-js-pagination';
import Title from '../../components/Title';
import api from '~/services/api';
import history from '~/services/history';

function OperationalArea() {
  const [areas, setAreas] = useState([]);
  const [areasPaged, setAreasPaged] = useState([]);
  const [currentPage, setCurrentPage] = useState();
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
    setAreasPaged(pagedList);
  };

  useEffect(() => {
    async function loadAreas() {
      const response = await (await api.get('/operationalArea')).data.areas;

      setTotalItens(response.length);
      setAreas(response);
      if (currentPage === undefined) {
        setCurrentPage(1);
        getPage(currentPage, response);
      }
    }
    loadAreas();
  }, [totalItens, currentPage]);

  const startEdit = (id) => {
    history.push(`/area/edit/${id}`);
  };

  const startDelete = (id) => {
    history.push(`/area/delete/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // console.log(`${currentPage} atual`);
    getPage(page, areas);
  };

  return (
    <div className="mt-4">
      <Title titulo="Lista de Áreas Operacionais:" />
      <section className="align-baseline mt-4">
        <table className="table table-sm table-striped table-hover text-center">
          <thead>
            <tr>
              <th>Área</th>
              <th>Última Atualização</th>
              <th>Editar</th>
              <th>Apagar</th>
            </tr>
          </thead>
          <tbody>
            {areasPaged.map((area) => (
              <tr key={area.id}>
                <td>{area.title}</td>
                <td>
                  {format(parseISO(area.updatedAt), 'dd/MM/YYY HH:mm', {
                    timezone: 'America/Sao_Paulo',
                  })}
                </td>
                <td>
                  <button
                    onClick={() => startEdit(area.id)}
                    type="button"
                    className="btn"
                  >
                    <span className="fa fa-edit" />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => startDelete(area.id)}
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
                  to="/area/register"
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

export default withRouter(OperationalArea);
