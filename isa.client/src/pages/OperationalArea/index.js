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
  const [currentPage, setCurrentPage] = useState();
  const [totalItens, setTotalItens] = useState();

  useEffect(() => {
    async function loadAreas() {
      const response = await (await api.get('/operationalArea')).data.areas;

      setTotalItens(response.length);
      setAreas(response);
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
    console.log(`${currentPage} was active`);
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
            {areas.map((area) => (
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
        <section className="align-baseline d-flex justify-content-end">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={10}
            totalItemsCount={100}
            pageRangeDisplayed={2}
            itemClass="page-item"
            linkClass="page-link"
            onChange={handlePageChange.bind(this)}
          />
        </section>

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
      </section>
    </div>
  );
}

export default withRouter(OperationalArea);
