import React from 'react';
import './FileStorage.css';

export default function FileStorage({ file, onFileDelete }) {
  return (
    <div className="card card-filestorage">
      <div className="card-body">
        <span>
          <a className="file-link" target="_blank" rel="noreferrer" href={file.link}>
            {file.fileName}
          </a>
        </span>
        <button className="btn btn-danger" onClick={() => onFileDelete(file.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
