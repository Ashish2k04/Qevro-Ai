import {useSelector} from 'react-redux'
import { useEffect } from 'react';
import { useChat } from '../hooks/useChat';

const Dashboard = () => {
    const {user} = useSelector(state => state.auth);
    const {initializeSocketConnection} = useChat();
    console.log(user)

    useEffect(()=>{
      initializeSocketConnection();
    }, [])
  return (
    <div>
     Dashboard
    </div>
  )
}

export default Dashboard