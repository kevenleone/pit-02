import Index from './pages';
import User from './pages/User';
import EditUser from './pages/User/edit-user';
import Todos from './pages/Todos';
import Todo from './pages/Todos/Todo';
import Auth from './pages/Auth';

export default [
  {
    path: '/home',
    component: Index,
    name: 'Home',
    private: true,
  },
  {
    path: '/todo',
    component: Todos,
    name: 'Todo',
    private: true,
  },
  {
    path: '/todo/:id',
    component: Todo,
    name: 'Todo',
    header: false,
    private: true,
  },
  {
    path: '/user',
    component: User,
    name: 'User',
    private: true,
  },
  {
    path: '/user/:id',
    component: EditUser,
    name: 'User',
    header: false,
    private: true,
  },
  {
    path: '/login',
    component: Auth,
    header: false,
    name: 'Auth',
    private: false,
  },
];
