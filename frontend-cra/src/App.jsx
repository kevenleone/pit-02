import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

import Card from './components/Card';

const App = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="p-4">
      <h1>Olá Mundo</h1>

      <Alert show={show} onClose={() => setShow(!show)} dismissible variant="primary">
        Oi Alerta 2
      </Alert>

      <Card title="Pitang">
        <h3>Testando...</h3>
      </Card>

      <Card title="Pitang 2">
        <h3>Testando... 123</h3>
      </Card>

      <Card title="Pitang 3">
        <h3>Testando... 123</h3>
      </Card>
    </div>
  );
};

export default App;
