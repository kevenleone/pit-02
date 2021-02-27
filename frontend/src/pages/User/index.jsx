/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ListView from '../../components/ListView';
import api from '../../utils/api';

const User = ({ history }) => {
  const [refetchCount, setRefetchCount] = useState(0);

  const onRemoveUser = async (user) => {
    try {
      await api.delete(`/user/${user._id}`);
      toast.info('Usuário removido');
      setRefetchCount(refetchCount + 1);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const columns = [
    {
      id: 'name',
      value: 'User',
    },
    {
      id: 'password',
      value: 'Password',
    },
    {
      id: 'email',
      value: 'Email',
    },
    {
      id: 'action',
      value: 'Action',
      render: (_, user) => (
        <>
          <Button onClick={() => history.push(`/user/${user._id}`)}>
            Editar
          </Button>
          <Button
            onClick={() => onRemoveUser(user)}
            className="ml-3"
            variant="danger"
          >
            Remover
          </Button>
        </>
      ),
    },
  ];

  return (
    <ListView
      refetchCount={refetchCount}
      AddButton={() => (
        <Button onClick={() => history.push('/user/new')} variant="primary">
          New User
        </Button>
      )}
      columns={columns}
      endpoint="/user"
      title="User"
    />
  );
};

export default User;
