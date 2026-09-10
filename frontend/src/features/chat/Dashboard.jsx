import {useSelector} from 'react-redux'

const Dashboard = () => {
    const {user} = useSelector(state => state.auth.user);
  return (
    <div>
     {user}
    </div>
  )
}

export default Dashboard