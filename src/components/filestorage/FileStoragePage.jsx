import React, { useEffect, useState } from 'react';
import FileStorageApi from '../../api/FileStorageApi';
import FileStorageForm from '../filestorage/FileStorageForm';
import FileStorage from './FileStorage';

export default function FileStoragePage() {
  const [files, setFiles] = useState([]);

  const getAll = () => {
    FileStorageApi.getAllFiles().then(res => {
      setFiles(res.data);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  const uploadFile = async fileData => {
    const res = await FileStorageApi.uploadFile(fileData);
    alert('File Uploaded');
    setFiles([...files, res.data]);
  };

  const deleteFile = async fileId => {
    await FileStorageApi.deleteFile(fileId);
    alert('File Deleted');
    getAll();
  };

  return (
    <div>
      <FileStorageForm uploadFile={uploadFile} />
      {files.length === 0
        ? 'No Files Uploaded.'
        : files.map(file => (
            <FileStorage key={file.id} file={file} onFileDelete={deleteFile} />
          ))}
    </div>
  );
}
