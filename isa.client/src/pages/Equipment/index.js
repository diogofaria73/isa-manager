import React from 'react';
import Filter from './filter';

function Equipment() {
  return (
    <div className="container-lg">
      <Filter />
      <div className="table-responsive">
        <table className="table table-hover table-striped table-light table-bordered">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Tag</th>
              <th scope="col">Descrição</th>
              <th scope="col">Tipo de Equipamento</th>
              <th scope="col">Localidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Equipment;
