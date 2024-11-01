import './header.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavScrollExample() {
  const [text, setText] = useState(''); // State for search input
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  // Search function
  const search = () => {
    navigate(`/news/search/${text}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#2b2d42', color: 'white' }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" style={{ color: 'white', flex: 1 }}>
          <h3>NEWZY</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="text-white bg-white" style={{ backgroundColor: 'white !important' }} />
        <Navbar.Collapse id="navbarScroll" className="text-white " >
          <Nav className="me-auto my-2 my-lg-0"  navbarScroll >
            <Nav.Link as={Link} to="/" style={{ color: 'white', textAlign: 'center' }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/sports" style={{ color: 'white', textAlign: 'center' }}>Sports</Nav.Link>
            <Nav.Link as={Link} to="/Health" style={{ color: 'white' , textAlign: 'center'}}>Health</Nav.Link>
            <Nav.Link as={Link} to="/Politics" style={{ color: 'white', textAlign: 'center' }}>Politics</Nav.Link>
            <Nav.Link as={Link} to="/Tech" style={{ color: 'white' , textAlign: 'center'}}>Technology</Nav.Link>
            <Nav.Link as={Link} to="/news/notes/data" style={{ color: 'white', textAlign: 'center' }}>Notes</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={(e) => { e.preventDefault(); search(); }}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              value={text}
              onChange={(e) => setText(e.target.value)}
              aria-label="Search"
              style={{ backgroundColor: 'white', color: '#2b2d42' }} // White background, dark text
            />
            <Button variant="outline-light" onClick={search}>Search</Button>
          </Form>
          <Nav className="ms-auto">
            {storedUser ? (
              <Nav.Link onClick={handleLogout} style={{ color: 'white' }}>Log Out</Nav.Link>
            ) : (
              <>
              <div className="d-flex " style={{ color: 'white', textAlign: 'center' }}>
                <Nav.Link as={Link} to="/auth/login" className="me-3" style={{ color: 'white' }}>Login</Nav.Link>
                <Nav.Link as={Link} to="/auth/signup" style={{ color: 'white' }}>Register</Nav.Link>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
    