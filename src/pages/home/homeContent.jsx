import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { Link } from 'react-router-dom';

function Content({ info }) {
  if (!info || info.length === 0) {
    return <Alert key="secondary" variant="secondary">Data is not there</Alert>;
  }

  return (
    <>
      <hr />
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className="ms-5">{info[0]?.category.toUpperCase()}</h3>
        <form className="me-5">
          <Button 
            variant="dark" 
            style={{ marginTop: 'auto' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
           <Link to={`/news/all/${info[0]?.category}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              View All
            </Link>
          </Button>
        </form>
      </div>

      <Container className="mt-5 p-0">
        <Row className="m-0 d-flex justify-content-center align-items-center">
          {/* Slice the first 3 items and map them */}
          {info.slice(0, 3).map((item, index) => (
            <Col key={index} className="d-flex justify-content-center mb-4">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" className="object-fit-cover" src={item.image} style={{ height: '12rem' }} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {item.description}
                  </Card.Text>
                  <Button 
                    variant="dark" 
                    style={{ marginTop: 'auto' }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {/* Link to the full article */}
                    <Link to={`/news/${item._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      Read Full
                    </Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Content;
