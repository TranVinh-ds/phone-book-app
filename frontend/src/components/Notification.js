import React from 'react';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div style={error}>{message}</div>;
};

const error = {
  color: 'red',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
};

export default Notification;
