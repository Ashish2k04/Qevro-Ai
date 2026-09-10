import { appRoutes } from './app.routes.jsx'
import { RouterProvider } from 'react-router'
import { useAuth } from '../features/auth/hook/useAuth.js'
import { useEffect } from 'react'

const App = () => {
  const auth = useAuth();
  useEffect(()=>{
     auth.handleGetMe();
  }, [])
  return (
    <div>
        <RouterProvider router={appRoutes}/>
    </div>
  )
}

export default App