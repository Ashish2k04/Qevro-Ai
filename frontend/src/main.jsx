import { createRoot } from 'react-dom/client'
import '../src/app/index.css'     
import { appRoutes } from './app/app.routes.jsx'
import { RouterProvider } from 'react-router'

createRoot(document.getElementById('root')).render(
    <RouterProvider router={appRoutes}/>
)
