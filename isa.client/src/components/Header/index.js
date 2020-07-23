import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        ISA
      </Link>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/equipment" className="nav-link">
              Equipamentos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/type" className="nav-link">
              Tipos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/area" className="nav-link">
              Área Operacional
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user" className="nav-link">
              Usuários
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
