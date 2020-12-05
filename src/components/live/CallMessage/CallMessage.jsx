import React from 'react';

export default function CallMessage({ header, detail, isError }) {
  return (
    <div className={'call-message' + (isError ? ' error' : '')}>
      <p className="call-message-header">{header}</p>
      <p>{detail}</p>
    </div>
  );
}
