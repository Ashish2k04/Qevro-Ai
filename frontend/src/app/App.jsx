import { appRoutes } from './app/app.routes.jsx'
import { RouterProvider } from 'react-router'

const App = () => {
  return (
    <div>
        <RouterProvider router={appRoutes}/>
    </div>
  )
}

export default App