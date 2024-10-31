import './header.css';
import React, { useState } from 'react';  // Import useState
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function NavScrollExample() {
  const [text, setText] = useState(''); // State for search input
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  // Search function
  const search = () => {
    
    navigate(`/news/search/${text}`);
   
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="d-flex justify-content-between flex-wrap align-items-center py-3 nav-ext mb-5 p-0">
      <div className="d-flex justify-content-center comp-name">
        <h3><Link to="/" className="nav-link ml-5">NEWZY</Link></h3>
      </div>
      <div>
        <ul className="nav"> 
          <li className="nav-item"><Link to="/sports" className="nav-link">Sports</Link></li>
          <li className="nav-item"><Link to="/Health" className="nav-link">Health</Link></li>
          <li className="nav-item"><Link to="/Politics" className="nav-link">Politics</Link></li>
          <li className="nav-item"><Link to="/Tech" className="nav-link">Technology</Link></li>
          <li className="nav-item"><Link to="/news/notes/data" className="nav-link">Notes</Link></li>
        </ul>
      </div>
      <div className="d-flex justify-content-between flex-wrap search">
        <div>
          <div className="d-flex align-items-center">
            <Form.Label className="mb-0 me-2">
              <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
            </Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Search" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && search()} 
            />
          </div>
        </div>
        <ul className="nav">
          {storedUser ? (
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>| &nbsp;Log Out</button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/auth/login" className="nav-link">| &nbsp;Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/auth/signup" className="nav-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavScrollExample;
