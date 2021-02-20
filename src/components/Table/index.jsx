import React from 'react';
import { Table } from 'react-bootstrap';

export default function index({ columns = [], rows = [] }) {
  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>{column.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.id}>{row[column.id]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
