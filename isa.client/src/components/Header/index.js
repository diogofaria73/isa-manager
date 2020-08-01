import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BsArrowBarRight } from 'react-icons/bs';
import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Garoto
        </Link>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto align-content-between">
            <li className="nav-item">
              <a className="nav-link">KPIs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/consumption">Consumo</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Cadastros
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/area">
                  Áreas
                </a>
                <a className="dropdown-item" href="/equipment">
                  Equipamentos
                </a>
                <a className="dropdown-item" href="/parameter">
                  Parâmetros
                </a>
                <a className="dropdown-item" href="/type">
                  Tipo de Equipamentos
                </a>
                <a className="dropdown-item" href="/user">
                  Usuários
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a onClick={handleLogout} className="nav-link">
                <BsArrowBarRight />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
