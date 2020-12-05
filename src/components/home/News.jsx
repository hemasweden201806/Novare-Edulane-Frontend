import React from 'react';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function News({ news, deleteNews }) {

  const user_role = window.sessionStorage.getItem('role');


  return (
    <div className="card news-card">
      <div className="card-body">
        <div>
          <h3 color="textSecondary">{news.title}</h3>
          <img src={news.image} alt="News" width="70%" />
          <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {news.body}
          </Typography>
          </CardContent>
        </div>
        {  user_role !== "teacher" ? null : 
        (<button className="btn btn-light" onClick={() => deleteNews(news.id)}>
            Delete
        </button> )}
      </div>
    </div>
  );
}
