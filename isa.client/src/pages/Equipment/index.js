import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Equipment() {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    async function loadEquipments() {
      const response = await api.get('equipment');

      // const data = response.data.map((equipment) => ({
      //   ...equipment,
      //   timeDistance: format(parseISO(equipment.createdAt), {
      //     addSuffix: true,
      //     locale: pt,
      //   }),
      // }));

      setEquipments(response.data);
    }

    loadEquipments();
  }, []);

  return (
    <div>
      <section className=" form-group mt-5 d-flex justify-content-between">
        <div className="row align-content-between">
          <div className="col-md-4">
            <div className="input-group-sm mb-auto">
              <input
                className="form-control"
                placeholder="Tag do Equipamento"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group-sm mb-3">
              <input
                className="form-control"
                placeholder="Tipo do Equipamento"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group-sm mb-3">
              <input className="form-control" placeholder="Status" />
            </div>
          </div>
          <div className="col-md-1">
            <div className="btn-group">
              <button type="button" className="btn btn-primary btn-sm">
                Pesquisar
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="align-baseline">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Tag</th>
              <th>Tipo</th>
              <th>Localidade</th>
              <th>Editar</th>
              <th>Apagar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Teste</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>
                <span className="fa fa-edit" />
              </td>
              <td>
                <span className="fa fa-trash" />
              </td>
            </tr>
            <tr>
              <td>Teste</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>
                <span className="fa fa-edit" />
              </td>
              <td>
                <span className="fa fa-trash" />
              </td>
            </tr>
            <tr>
              <td>Teste</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>
                <span className="fa fa-edit" />
              </td>
              <td>
                <span className="fa fa-trash" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
