import React, { useState, useEffect } from 'react';
import LectureApi from '../../api/LectureApi';

import FileUploader from '../filestorage/FileUploader';

export default function CreateLecture(props) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    const [uploadResponse, setUploadResponse] = useState(null);
    
    function createLecture() {
        if (link === "") { return;}   //we dont want to post a Lecture with no links.

        const newLecture = {
            title: title,
            link: link,
        };

        LectureApi.createLecture(newLecture)
            .then((res) => {
                console.log(res);
                props.getAllLectures();
                setLink("");
                setTitle("");
            })
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
                <input className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <textarea className="form-control"
                    placeholder={`Link to the lecture`}
                    value={link}
                    onChange={event => setLink(event.target.value)}
                />
                
            </div>
            
            <div className="form-group">
                <button className="btn btn-primary  " onClick={createLecture}>Publish</button>
            </div>
        </div>
    );

}