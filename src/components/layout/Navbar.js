import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../calendar/Calendar';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        EduLane
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/posts" className="nav-link">
              Posts
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/lectures" className="nav-link">
              Lectures
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/assignments" className="nav-link">
              Assignments
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/private-messaging" className="nav-link">
              Private Messaging
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/chat" className="nav-link">
              Chat
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/userprofile" className="nav-link">
              User Profile
            </Link>
          </li>

          <li className="nav-item">
            <Link to="#" onClick={Calendar} className="nav-link">
              Calendar
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/filestorage" className="nav-link">
              File Storage
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/todo-list" className="nav-link">
              Todo-List
            </Link>
          </li>
        </ul>

        <button className="btn btn-outline-info my-2 my-sm-0" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
