import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BsArrowBarRight } from 'react-icons/bs';
import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
  // const dispatch = useDispatch();

  // function handleLogout() {
  //   dispatch(signOut());
  // }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          ISA
        </Link>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
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
            {/* <li className="nav-item">
              <a onClick={handleLogout()}>
                <BsArrowBarRight size={16} color="#FFF" />
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
