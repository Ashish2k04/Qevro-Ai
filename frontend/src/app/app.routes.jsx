import {createBrowserRouter} from 'react-router';
import Login from '../features/auth/pages/Login.jsx';
import Register from '../features/auth/pages/Register.jsx';

export const appRoutes = createBrowserRouter([
    {
        element: <Login/>,
        path: '/login'
    },
    {
        element: <Register/>,
        path: '/register'
    }
])