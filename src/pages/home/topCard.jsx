import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './home.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Home({ info }) {
  if (!info || info.length === 0) {
    return <Alert key="secondary" variant="secondary">Data is not there</Alert>;
  }
  return (
    <Container fluid className="mt-3 ps-0 p-0 pe-0">
      <Row className="ms-0 me-0 p-0">
        <Col md={12} lg={7} className="p-0"> 
          <img src={info[0].image} className="img-fluid top" alt="Responsive" />
        </Col>
        <Col md={12} lg={5}> {/* Adjust to full width on md */}
          <div className="ms-3 mt-2">
            <h5 className="mb-3 fw-bold">&#x2022; Hot Topic</h5>
            <h3 className="mb-5 fw-bold">{info[0].title}</h3>
            <p className="mb-3 fw-bold">{info[0].description}</p>
            <Button
              className="btn btn-dark btn-sm"
              style={{ marginTop: 'auto', width: '20%' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Link to={`/news/${info[0]._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                Read Top News
              </Link>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
