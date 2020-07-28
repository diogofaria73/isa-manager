import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        GAROTO
      </Link>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              KPIs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Consumo Energético
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
        </ul>
      </div>
    </nav>
  );
}
