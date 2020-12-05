import React, { useState, useEffect } from 'react';
import AssignmentApi from '../../api/AssignmentApi';

import FileUploader from '../filestorage/FileUploader';

export default function CreateAssignment(props) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const [uploadResponse, setUploadResponse] = useState(null);

  function createAssignment() {
    if (link === '') {
      return;
    } //we dont want to post an assignment with no links.

    const newAssignment = {
      title: title,
      link: link
    };

    AssignmentApi.createAssignment(newAssignment).then(res => {
      console.log(res);
      props.getAllAssignments();
      setLink('');
      setTitle('');
    });
  }

  useEffect(() => {
    if (uploadResponse === null) {
      return;
    }
    console.log("Hiiiii",uploadResponse);
    setTitle(uploadResponse.original_filename) ;
    setLink(uploadResponse.secure_url);

    setUploadResponse(null);
  }, [uploadResponse]);

  return (
    <div className="container col-sm-12 col-md-10 col-lg-8">
      <div className="form-group">
        <p className="form-control">Upload a file from your local-storage?</p>
        <FileUploader setUploadResponse={setUploadResponse} />
      </div>
      
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <textarea
          className="form-control"
          placeholder={`Link to the assignment`}
          value={link}
          onChange={event => setLink(event.target.value)}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-primary  " onClick={createAssignment}>
          Publish
        </button>
      </div>
    </div>
  );
}
