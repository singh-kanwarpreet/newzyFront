import Table from 'react-bootstrap/Table';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Button from 'react-bootstrap/Button';

function SmallExample() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const email = localStorage.getItem('user');
        if (!email) {
          return setError('Please Login First');
        }

        const response = await axios.post(import.meta.env.VITE_SERVER+'/notes/data', { email });
        setNotes(response.data);
      } catch (error) {
        setError('Error fetching item details.');
        console.error('Error fetching item details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, []);

  const downloadPDF = () => {
    const input = document.getElementById('table-to-pdf');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const topMargin = 20;
      let position = topMargin;

      pdf.setFontSize(16);
      pdf.text('Notes', 10, position);
      position += 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('notes.pdf');
    }).catch((error) => {
      console.error('Error generating PDF:', error);
    });
  };

  if (loading) {
    return (
      <div className="center">
        <Spinner animation="grow" variant="dark" />
      </div>
    );
  }

  if (error) {
    return <Alert key="danger" variant="danger">{error}</Alert>;
  }

  return (
    <div style={{ width: "75%" }} className="offset-1 mt-5">
      <Button variant="dark" className="mb-4" onClick={downloadPDF}>
        Download PDF
      </Button>
      {notes.length > 0 ? (
        <Table id="table-to-pdf" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Heading</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={index}>
                <td>{note.heading}</td>
                <td>{note.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert key="danger" variant="danger">No notes available</Alert>
      )}
    </div>
  );
}

export default SmallExample;
