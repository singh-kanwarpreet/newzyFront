import HOMECONTENT from './homeContent.jsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [sportsData, setSportsData] = useState([]);
  const [techData, setTechData] = useState([]);
  const [politicsData, setPoliticsData] = useState([]);
  const [healthData, setHealthData] = useState([]);
  const [error, setError] = useState(null); 

  const fetchData = (category, setData) => {
    axios
      .get(process.env.SERVER+`/news/category/${category}`)
      .then((response) => {
        setLoading(false);
        setData(response.data);
        setError(null);
      })
      .catch((error) => {
        setLoading(false);
        setError(`Error fetching ${category} data: ${error.message}`);
        console.error(`Error fetching ${category} data:`, error);
      });
  };

  useEffect(() => {
    fetchData('sports', setSportsData);
  }, []);

  useEffect(() => {
    fetchData('Tech', setTechData);
  }, []);

  useEffect(() => {
    fetchData('Politics', setPoliticsData);
  }, []);

  useEffect(() => {
    fetchData('Health', setHealthData);
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

  return (
    <>
      {error && <Alert key="danger" variant="danger">Server Issue Please Try Again </Alert>}


      {sportsData.length > 0 && !error && <HOMECONTENT info={sportsData} />}
      {techData.length > 0 && !error && <HOMECONTENT info={techData} />}
      {politicsData.length > 0 && !error && <HOMECONTENT info={politicsData} />}
      {healthData.length > 0 && !error && <HOMECONTENT info={healthData} />}
    </>
  );
}
