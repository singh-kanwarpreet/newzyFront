import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function AutoLayoutExample({ info }) {
  if (!info || info.length === 0) {
    return <Alert key="secondary" variant="secondary">Data is not there</Alert>;
  }
  return (
    <>
      <div className="d-flex justify-content-center">
        <Row className="m-0">
          <Col md={7} className="m-0 mt-5">
            <h3 className="text-start mb-4">Latest Release</h3>
            <Card style={{ width: '100%' }}>
              <Card.Img
                variant="top"
                src={info[4].image}
                style={{ width: '100%', height:'500px', objectFit: 'cover' }}
              />
              <Card.Body className="mb-5">
                <Card.Title>{info[4].title}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="dark" style={{ marginTop: 'auto' }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <Link to={`/news/${info[4]._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        Read Full
                      </Link>
        </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mt-5 ps-6 d-flex align-items-md-center flex-column">
            <div>
              <Button variant="dark" style={{ marginTop: 'auto' }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <Link to={`/news/all/trend`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        View All Trending News
                      </Link>
        </Button>
            </div>
            <Col className="mt-3 me-1 d-flex align-items-end flex-column">
              <Row className="ms-0 me-0 pe-0 n">
                {info.slice(5, 7).map((item, index) => (
                  <Col key={index}>
                    <Row className="ms-0 me-0 d-flex align-items-center flex-column">
                      <Col xs="auto">
                        <img
                          src={item.image}
                          alt="Responsive"
                          style={{ width: '245px', height: '245px', objectFit: 'cover' }}
                        />
                      </Col>
                      <Col md={7} style={{ width: '245px'}}>
                        <h6 className="fw-bold ps-0 mb-1">{item.title}</h6>
                        <p>{item.description}</p>
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AutoLayoutExample;
