import React from 'react';

function Filter() {
  return (
    <form>
      <div className="row">
        <div className="col-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="col-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="col-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
      </div>
    </form>
  );
}

export default Filter;
