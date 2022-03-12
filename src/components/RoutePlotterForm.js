import React from 'react';

function RoutePlotterForm(props) {
  const searchStyle = {
    maxWidth: "fit-content",
    margin: "0 auto"
  }

  return (
    <React.Fragment>
      <div style={searchStyle}>
        <form onSubmit={props.handleRouteSearch}>
          <input 
          type='text'
          name='startSystem'
          placeholder='Start System'
          className="form-control route" />
          <input 
          type='text'
          name='endSystem'
          placeholder='End System'
          className="form-control route" />
          <select name="safety" id="safety" className="form-select route">
            <option value="shortest">Shortest</option>
            <option value="secure">Secure</option>
            <option value="insecure">Insecure</option>
          </select>
          <button type="submit" className="btn btn-secondary">Search</button>
        </form>
      </div>    
    </React.Fragment>
  );
}

export default RoutePlotterForm;
