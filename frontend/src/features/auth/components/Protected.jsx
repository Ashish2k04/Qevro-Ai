import {useSelector} from 'react-redux'
import { Navigate } from 'react-router';

const Protected = ({children}) => {
    const {user, loading} = useSelector(state => state.auth);
    
    if(loading){
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to={'/login'} replace/>
    }
  
    return children
}

export default Protected