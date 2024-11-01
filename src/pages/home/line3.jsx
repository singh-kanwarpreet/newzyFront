import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'; // Import Card from react-bootstrap
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function AutoLayoutExample({ info }) {
  if (!info || info.length === 0) {
    return <Alert key="secondary" variant="secondary">Data is not there</Alert>;
  }
  return (
    <Container className="mt-5 p-0">
      <Row className="m-0 d-flex justify-content-center align-items-center">
        {info.slice(1, 4).map((item, index) => (
          <Col key={index} className="d-flex justify-content-center mb-4">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.image} style={{ height: '12rem', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  {item.description.substring(0, 50) + "..."} {/* Truncated description */}
                </Card.Text>
                <Button
                  variant="dark"
                  style={{ marginTop: 'auto' }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
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
  );
}

export default AutoLayoutExample;
