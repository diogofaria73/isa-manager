import React from 'react';
import api from '../../services/api';

class DashboardFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    operationalAreas: [],
    equipmentTypes: [],
    equipments:[],
  };

  async componentDidMount() {
    var response = await api.get('operationalArea');

    var data = response.data.operationalAreaList.map((operationalArea) => ({
      ...operationalArea,
    }));

    this.setState({ operationalAreas: data });

    response = await api.get('equipmentType');

    data = response.data.equipmentTypesList.map((equipmentType) => ({
      ...equipmentType,
    }));

    this.setState({ equipmentTypes: data });

    response = await api.get('equipment');

    data = response.data.equipmentList.map((equipmentType) => ({
      ...equipmentType,
    }));

    this.setState({ equipments: data });

  }

  handleChange(event) {
    // this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('xxxxxxx: ' + this.state.value);
    // event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className=".form-control">
        <label>Áreas Operacionais: </label>
        <select value={this.state.value} onChange={this.handleChange} class="form-control">
          { this.state.operationalAreas.map((operationalArea) => (
            <option value={operationalArea.id}>{operationalArea.name}</option>
          ))}
        </select>
        <label>Tipos de Equipamentos: </label>
        <select value={this.state.value} onChange={this.handleChange} class="form-control">
          { this.state.equipmentTypes.map((equipmentType) => (
            <option value={equipmentType.id}>{equipmentType.name}</option>
          ))}
        </select>
        <label>Equipamentos: </label>
        <select value={this.state.value} onChange={this.handleChange} class="form-control">
          { this.state.equipments.map((equipment) => (
            <option value={equipment.id}>{equipment.name}</option>
          ))}
        </select>
        <br></br>
        <input type="submit" value="Filtrar" />
      </form>
    );
  }
}

export default DashboardFilter;
