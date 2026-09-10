import { Children } from 'react';
import {useSelector} from 'react-redux'
import { Navigate } from 'react-router';

const Protected = ({children}) => {
    const {user} = useSelector(state => state.auth.user);
    const {loading} = useSelector(state => state.auth.user);
    
    if(loading){
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
  
    return children
}

export default Protected