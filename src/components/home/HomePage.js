import React, { useEffect, useState } from 'react';
import {v4 as uuid} from 'uuid';

import NewsApi from '../../api/NewsApi';

import CreateNews from './CreateNews';
import News from './News';

export default function HomePage() {

  const [ news, setNews ] = useState([]);

  const user_role = window.sessionStorage.getItem('role');

    function getAllNews() {
      NewsApi.getAllNews()
            .then((data) => {
                setNews(data.data);
                console.log(data);
            })
    }

    useEffect(() => {
        getAllNews();
    }, [])
    
    function deleteNews(newsId) {
        NewsApi.deleteNews(newsId)
            .then(() => {
                alert("News Deleted");
                getAllNews(); // to refresh the list immediately
            })
    }


  return (
    <div className="card">
      <div className="card-body text-center">
        {/* <h4 className="card-title">News</h4> */}
        <div className= "news-div">
        { user_role !== "teacher" ? null :
            (<CreateNews news={news} getAllNews={getAllNews}/> ) }

            { news.length === 0 ? "No news yet." :
                   news
                    .map((news) => 
                    <News key={uuid()} news={news} deleteNews={deleteNews} />
            )}
        </div>
      </div>
    </div>
  );
}