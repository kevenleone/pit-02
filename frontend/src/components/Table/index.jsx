/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Table } from 'react-bootstrap';

export default function TableComponent({ columns = [], rows = [] }) {
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
        {rows.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.id}>
                {
                column.render ? column.render(row[column.id], row) : row[column.id]
              }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
