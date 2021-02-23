import React from 'react';
import ListView from '../../components/ListView';

const User = () => {
  const columns = [
    {
      id: 'id',
      value: 'ID',
    },
    {
      id: 'user',
      value: 'User',
    },
    {
      id: 'email',
      value: 'Email',
    },
  ];

  return <ListView columns={columns} endpoint="/user" title="User" />;
};

export default User;
