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
          placeholder='Start System' />
          <input 
          type='text'
          name='endSystem'
          placeholder='End System' />
          <select name="safety" id="safety">
            <option value="shortest">Shortest</option>
            <option value="secure">Secure</option>
            <option value="insecure">Insecure</option>
          </select>
          <button type="submit">Search</button>
        </form>
      </div>    
    </React.Fragment>
  );
}

export default RoutePlotterForm;
