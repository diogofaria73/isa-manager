import React, { useState, useEffect } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import api from '~/services/api';

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

  return (
    <div className="mt-4">
      <h3>Lista de Usuários</h3>
      <section className="align-baseline mt-4">
        <table className="table table-sm table-striped table-hover">
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
                <td>{user.is_admin}</td>
                <td>{user.updatedAt}</td>
                <td>
                  <span className="fa fa-edit" />
                </td>
                <td>
                  <span className="fa fa-trash" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="align-baseline d-flex justify-content-end">
          <div className="btn-group">
            <button type="button" className="btn btn-secondary btn-sm">
              <BsFillPlusCircleFill size={16} color="#FFF" /> Adicionar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
