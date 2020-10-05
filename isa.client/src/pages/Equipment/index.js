import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { format, parseISO } from 'date-fns';
import Pagination from 'react-js-pagination';
import Title from '../../components/Title';
import EquipmentFilter from '../../components/Equipment/Filter/EquipmentFilter';
import api from '~/services/api';
import history from '~/services/history';

export default function Equipment() {
  const [equipments, setEquipment] = useState([]);
  const [equipmentsPaged, setEquipmentsPaged] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItens, setTotalItens] = useState();
  const [itemsPerPage] = useState(10);

  const getPage = (page, list) => {
    const pagedList = [];
    if (page === undefined) {
      page = 1;
    }
    const startIndex = (page - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage - 1;
    if (endIndex >= list.length) {
      endIndex = list.length - 1;
    }

    for (let i = startIndex; i <= endIndex; i += 1) {
      pagedList.push(list[i]);
    }
    setEquipmentsPaged(pagedList);
  };

  useEffect(() => {
    async function loadEquipments() {
      const response = await api.get('equipment');
      const data = response.data.equipmentList;
      setEquipment(data);
      setTotalItens(data.length);
      const pagedList = [];
      const startIndex = 0;
      let endIndex = itemsPerPage - 1;
      if (endIndex >= data.length) {
        endIndex = data.length - 1;
      }
      for (let i = startIndex; i <= endIndex; i += 1) {
        pagedList.push(data[i]);
      }
      setEquipmentsPaged(pagedList);
    }
    loadEquipments();
  }, [itemsPerPage]);

  const startEdit = (id) => {
    history.push(`/equipment/edit/${id}`);
  };

  const startDelete = (id) => {
    history.push(`/equipment/delete/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getPage(page, equipments);
  };

  return (
    <div className="mt-4">
      <Title titulo="Lista de Equipamentos:" />
      <EquipmentFilter />
      <section className="h-100 align-baseline">
        <table className="table table-sm table-striped table-hover text-center">
          <thead>
            <tr>
              <th>Equipamento</th>
              <th>Tag</th>
              <th>Tipo</th>
              <th>Localidade</th>
              <th>Ativo</th>
              <th>Data Cadastro</th>
              <th>Editar</th>
              <th>Apagar</th>
            </tr>
          </thead>
          <tbody>
            {equipmentsPaged.map((equipment) => (
              <tr key={equipment.id}>
                <td>{equipment.name}</td>
                <td>{equipment.tag}</td>
                <td>{equipment.type.title}</td>
                <td>{equipment.area.title}</td>
                <td>{equipment.is_active ? 'Sim' : 'Não'}</td>
                <td>
                  {format(parseISO(equipment.createdAt), 'dd/MM/YYY HH:mm', {
                    timezone: 'America/Sao_Paulo',
                  })}
                </td>
                <td>
                  <button
                    onClick={() => startEdit(equipment.id)}
                    type="button"
                    className="btn"
                  >
                    <span className="fa fa-edit" />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => startDelete(equipment.id)}
                    type="button"
                    className="btn"
                  >
                    <span className="fa fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <div className="col">
            <section className="align-baseline d-flex justify-content-start">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalItens || 1}
                pageRangeDisplayed={2}
                itemClass="page-item"
                linkClass="page-link"
                onChange={handlePageChange.bind(this)}
              />
            </section>
          </div>
          <div className="col">
            <div className="align-baseline d-flex justify-content-end">
              <div className="btn-group">
                <Link
                  to="/equipment/register"
                  type="button"
                  className="btn btn-secondary btn-sm"
                >
                  <BsFillPlusCircleFill size={16} color="#FFF" /> Adicionar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
