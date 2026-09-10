import {createBrowserRouter} from 'react-router';
import Login from '../features/auth/pages/Login.jsx';
import Register from '../features/auth/pages/Register.jsx';
import Dashboard from '../features/chat/Dashboard.jsx';

export const appRoutes = createBrowserRouter([
    {
        element: <Login/>,
        path: '/login'
    },
    {
        element: <Register/>,
        path: '/register'
    },
    {
        element: <h1>Home</h1>,
        path: '/'
    },
    {
        element: <Dashboard />,
        path: '/dashboard'
    }
])