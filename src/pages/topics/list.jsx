import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';

export default function List({ data }) {
  if (!data || data.length === 0) {
    return <Alert key="secondary" variant="secondary">Data is not there</Alert>;
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  let lastIndex = currentPage * itemsPerPage;
  let firstIndex = lastIndex - itemsPerPage;
  let ar = data.slice(firstIndex, lastIndex);

  const next = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prev = () => {
    if (currentPage !== 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item 
        key={number} 
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <>
    <div className="container">
  <div className="row justify-content-center">
    {ar.map((obj, index) => (
      <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
        <Card style={{ width: '100%' }}> {/* Adjust width to 100% of column */}
          <Card.Img
            variant="top"
            src={obj.image}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title>{obj.title}</Card.Title>
            <Card.Text>{obj.description}</Card.Text>
            <Button variant="primary"><Link to={`/news/${obj._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>Read Full</Link></Button>
          </Card.Body>
        </Card>
      </div>
    ))}
  </div>
</div>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '1rem' }}>
  <div style={{ marginBottom: '1rem' }}>
    <Button
      variant="primary"
      onClick={prev}
      disabled={currentPage === 1}
      style={{ marginRight: '1rem' }}
    >
      Previous
    </Button>
    <Button
      variant="primary"
      onClick={next}
      disabled={currentPage === totalPages}
    >
      Next
    </Button>
  </div>
  <Pagination>{items}</Pagination>
</div>

    </>
  );
}
