import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import api from '~/services/api';
import history from '~/services/history';

export default function User() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('user');
      const data = response.data.usersList;
      setUser(data);
    }
    loadUsers();
  }, []);

  const startDelete = (id) => {
    history.push(`/user/delete/${id}`);
  };

  return (
    <div className="mt-4">
      <h3>Lista de Usuários</h3>
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
            {users.map((user) => (
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
                  <Link
                    onClick={() => startDelete(user.id)}
                    type="button"
                    className="btn"
                  >
                    <span className="fa fa-trash" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      </section>
    </div>
  );
}
