import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

import axios from '../../utils/api';
import Card from '../Card';
import Table from '../Table';

export default function index({ columns, endpoint, title }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(endpoint);
      setRows(response.data);
      setLoading(false);
    } catch (e) {
      toast.error('Falha na requisição...');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <Card title={title}>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Table columns={columns} rows={rows} />
        )}
      </Card>
    </Container>
  );
}
