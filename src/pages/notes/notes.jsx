import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BasicExample() {
  const navigate = useNavigate();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 
  useEffect(() => {
    const email = localStorage.getItem('user');
    if (!email) {
     return navigate('/auth/signup');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "heading") {
      setHeading(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!heading || !description) {
      setError('Both fields are required.');
      return;
    }
    
    setLoading(true);
    setError('');

    const formData = {
      heading,
      description,
      email: localStorage.getItem('user'), // Retrieve email here
    };

    try {
      const response = await axios.post(import.meta.env.VITE_SERVER+'/notes', formData);
      if (response.status === 200) {
        console.log('Form submitted successfully');
        setHeading('');
        setDescription('');
      } else {
        console.error('Failed to submit form');
        setError('Failed to submit form.');
      }
    } catch (error) {
      console.error('Error submitting form', error);
      setError('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="offset-3">
      <Form style={{ width: '75%' }} onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Heading</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Heading"
            name="heading"
            value={heading}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="dark" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
    </div>
  );
}

export default BasicExample;
