import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

const ItemDetails = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [recommend, setRecommend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const fetchItem = async () => {
      try {
        const response = await axios.get(process.env.SERVER+`/news/${id}`);
        setItem(response.data);
      } catch (error) {
        setError('Error fetching item details.');
        console.error('Error fetching item details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(process.env.SERVER+`/news/recommendation/${id}`);
        setRecommend(response.data);
      } catch (error) {
        setError('Error fetching recommendations.');
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [id]);

  if (loading) {
    return (
        <>
        <div className="center">
        <Spinner animation="grow" variant="dark" />
        </div> 
        </>
      )
  }

  if (error) {
    return <Alert key="danger" variant="danger">{error}</Alert>;
  }

  return (
    <>
      <div className="row d-flex justify-content-center mb-3 m-0">
        <Card style={{ width: '60%', border: 'none' }}>
          <Card.Text className="text-center fs-2">
            <b>{item?.title}</b>
          </Card.Text>
          <Card.Img variant="top" src={item?.image} style={{ height: '300px' }} />
          <Card.Body>
            <Card.Text>{item?.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>

      <hr />

      <div className="d-flex justify-content-between align-items-center">
        <h2 className="ms-5">Other Trending</h2>
        <form className="me-5">
          <Button variant="dark" style={{ marginTop: 'auto' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Link to={`/news/all/trend`} style={{ color: 'inherit', textDecoration: 'none' }}>
              View All
            </Link>
          </Button>
        </form>
      </div>

      <Container className="mt-5 p-0 m-0">
        <Row className="m-0 d-flex justify-content-center p-0">
          {recommend.map((otherItem) => (
            <Col key={otherItem._id} className="d-flex justify-content-center align-items-center mb-4 p-0">
              <Card style={{ width: '18rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Card.Img variant="top" src={otherItem.image} style={{ height: '12rem' }} />
                <Card.Body style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <Card.Title>{otherItem.title}</Card.Title>
                    <Card.Text>{otherItem.description}</Card.Text>
                  </div>
                  <Button variant="dark" style={{ marginTop: 'auto' }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <Link to={`/news/${otherItem._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      Read Full
                    </Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <br />
    </>
  );
};

export default ItemDetails;
