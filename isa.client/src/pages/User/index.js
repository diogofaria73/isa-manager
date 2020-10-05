import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import Pagination from 'react-js-pagination';
import Title from '../../components/Title';
import api from '~/services/api';
import history from '~/services/history';

export default function User() {
  const [users, setUser] = useState([]);
  const [usersPaged, setUsersPaged] = useState([]);
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
    setUsersPaged(pagedList);
  };

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('user');
      const data = response.data.usersList;
      setUser(data);
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
      setUsersPaged(pagedList);
    }
    loadUsers();
  }, [itemsPerPage]);

  const startDelete = (id) => {
    history.push(`/user/delete/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getPage(page, users);
  };

  return (
    <div className="mt-4">
      <Title titulo="Lista de Usuários:" />
      <section className="align-baseline mt-4">
        <table className="table table-sm table-striped table-hover text-center">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Administrador</th>
              <th>Data Atualização</th>
              <th>Editar</th>
              <th>Apagar</th>
            </tr>
          </thead>
          <tbody>
            {usersPaged.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.is_admin ? 'Sim' : 'Não'}</td>
                <td>
                  {format(parseISO(user.updatedAt), 'dd/MM/YYY HH:mm', {
                    timezone: 'America/Sao_Paulo',
                  })}
                </td>
                <td>
                  <span className="fa fa-edit" />
                </td>
                <td>
                  <button
                    onClick={() => startDelete(user.id)}
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
                  to="/user/register"
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
