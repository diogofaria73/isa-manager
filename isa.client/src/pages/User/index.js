import React, { Component, useRef } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import api from '../../services/api';

class User extends Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    const response = await api.get('user');

    const data = response.data.usersList.map((user) => ({
      ...user,
      // createdAt: format(equipment.createdAt, 'dd/MM/YYYY HH:mm', {
      //   locale: pt,
      //   timeZone: 'America/Sao_Paulo',
      // }),
    }));

    // format(addedDate, 'dd/MM/YYYY HH:mm', {
    //   timeZone: 'America/Sao_Paulo',
    // });
    this.setState({ users: data });
  }

  async handleDelete(user) {
    const response = await api.delete(`user/${user.id}`);
  }

  handleModal = (user) => {
    alert(`Abrindo o modal para editar o usuário ${user.id}`);
  };

  render() {
    const { users } = this.state;
    return (
      <div className="mt-4">
        <h3>Usuários:</h3>
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
                    <span
                      className="fa fa-edit"
                      onClick={() => this.handleModal(user)}
                    />
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

}

export default User;
