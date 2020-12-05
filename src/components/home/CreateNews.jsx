import React, { useState } from 'react';
import NewsApi from '../../api/NewsApi';

import ImageUploader from './ImageUploader';

export default function CreateNews(props) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    
    function createNews() {
        if (body === "") { return;}   //we dont want to post a news with no body.

        const newNews = {
            title: title,
            body: body,
            image: image,
        };

        console.log("HIII", newNews);

        NewsApi.createNews(newNews)
            .then((res) => {
                console.log(res);
                props.getAllNews();
                setTitle("");
                setBody("");
                setImage("");
            })
    }
    
    return (
        <div className="container col-sm-12 col-md-10 col-lg-8">
          <div className="form-group">
            <input className="form-control"
              placeholder={`Title of the news`}
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
                
            <textarea className="form-control"
              placeholder={`Body of the news`}
              value={body}
              onChange={event => setBody(event.target.value)}
            />

            <div className="col">
              <ImageUploader setUploading={true} setImgUrl={setImage} />
                {/* <div className="form-group"></div>
                  <button 
                    className="btn btn-secondary" 
                    value={image}
                    onClick={event => setImage(event.target.value)}>
                    Upload Image
                  </button> */}
                </div>
            </div>
            
            <div className="form-group">
              <button className="btn btn-primary  " onClick={createNews}>Publish</button>
            </div>
        </div>
    );

}