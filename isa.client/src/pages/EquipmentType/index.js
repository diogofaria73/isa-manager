import React from 'react';

function EquipmentType() {
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h2 className="mt-4">Tipos de Equipamentos:</h2>
        <table className="table table-sm table-hover mt-4">
          <thead className="thead-light">
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Data Atualização</th>
              <th scope="col">Editar</th>
              <th scope="col">Excluir</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fancoil</td>
              <td>25/07/2020</td>
              <td>
                <button type="submit" className="btn btn-warning btn-sm">
                  Editar
                </button>
              </td>
              <td>
                <button type="submit" className="btn btn-danger btn-sm">
                  Deletar
                </button>
              </td>
            </tr>
            <tr>
              <td>Torre de Resfriamento</td>
              <td>25/07/2020</td>
              <td>
                <button type="submit" className="btn btn-warning btn-sm">
                  Editar
                </button>
              </td>
              <td>
                <button type="submit" className="btn btn-danger btn-sm">
                  Deletar
                </button>
              </td>
            </tr>
            <tr>
              <td>Chiller</td>
              <td>25/07/2020</td>
              <td>
                <button type="submit" className="btn btn-warning btn-sm">
                  Editar
                </button>
              </td>
              <td>
                <button type="submit" className="btn btn-danger btn-sm">
                  Deletar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default EquipmentType;
