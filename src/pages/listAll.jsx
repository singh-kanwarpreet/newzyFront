import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Button } from 'react-bootstrap'; 
import { Link, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const CardLayout = () => {

  const { topic } = useParams();
  const req = topic !== "trend" ? import.meta.env.VITE_SERVER+`/news/category/${topic}` : import.meta.env.VITE_SERVER+`/news`;

  const [item, setItem] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    axios
      .get(req)
      .then((response) => {
        setItem(response.data);
        setLoad(false);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching item:', error);
        setLoad(false);
        setError('Error fetching data. Please try again later.');
      });
  }, [req]);

  if (load) {
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
    <div className="container">
      <div className="row">
        {item.map((item) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={item._id}>
            <div className="card h-100">
              <img
                src={item.image}
                className="card-img-top"
                alt={item.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p
                  className="card-text"
                  style={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {item.description}
                </p>
                <Button
                  variant="dark"
                  style={{ marginTop: 'auto' }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <Link
                    to={`/news/${item._id}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    Read Full
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardLayout;
