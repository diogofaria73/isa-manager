import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

class EquipmentFilter extends Component {
  render() {
    return (
      <div>
        <section className=" form-group mt-5 d-flex justify-content-between">
          <div className="row align-content-between">
            <div className="col-lg-4">
              <div className="input-group-sm mb-auto">
                <input
                  className="form-control"
                  placeholder="Tag do Equipamento"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="input-group-sm mb-3">
                <input
                  className="form-control"
                  placeholder="Tipo do Equipamento"
                />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="input-group-sm mb-3">
                <input className="form-control" placeholder="Status" />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="btn-group">
                <button type="button" className="btn btn-secondary btn-sm">
                  <BsSearch size={12} color="#FFF" /> Buscar
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default EquipmentFilter;
