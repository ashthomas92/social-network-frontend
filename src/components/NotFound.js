import React from 'react';

export default class NotFound extends React.Component {
  render(){
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2>404, page not found</h2>
        <p>Woops, there's nothing here!</p>
      </div>
    );
  }
}
