import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {

  return (
    <footer className="footer mt-auto py-3 bg-dark text-white ">
      <div className= "container text-center py-4">
        <ul >
            <span className= "border rounded p-2 px-3 mr-4 d-none d-md-inline-block">
                <Link to="mailto: sda.team200@gmail.com">
                Contact-Us <i className="fas fa-envelope"></i>
                </Link>
            </span>

            <span className= "border rounded p-2 px-3 mr-4 d-none d-md-inline-block">
                <Link to="/bot" >
                Chat-Bot <i className="fas fa-robot"></i>
                </Link>
            </span>
        </ul>
      </div>
  </footer>
  );
}

