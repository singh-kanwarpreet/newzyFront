import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import LIST from './list.jsx';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

export default function Topic() {
  const { topic } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (category) => {
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER+`/news/category/${category}`);
        setData(response.data);
        setError(null);
      } catch (error) {
        console.error(`Error fetching ${category} data:`, error);
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false); 
      }
    };

    fetchData(topic);
  }, [topic]); 

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
      {data.length > 0 ? <LIST data={data} /> : <Alert key="secondary" variant="secondary">Data is not there</Alert>
  }
    </>
  );
}
