import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TOPCARD from './topCard.jsx';
import LINE3 from './line3.jsx';
import LATESTRELEASE from './latestRelease.jsx';
import CATEGORY from './category.jsx';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function HomePage() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    axios
      .get(process.env.SERVER+'/news/')
      .then((response) => {
        setItem(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching item data:', error);
        setLoading(false);
        setError(`Error fetching data: ${error.message}`);
      });
  }, []);

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

  if (!item || item.length === 0) {
    return <Alert key="secondary" variant="secondary" className="m-auto">Data is not there</Alert>;
  }

  return (
    <>
      {item && item.length > 0 && <TOPCARD info={item} />}
      {item && item.length > 0 && <LINE3 info={item} />}
      {item && item.length > 0 && <LATESTRELEASE info={item} />}

      <CATEGORY />
    
 
    </>
  );
}
