import {useSelector} from 'react-redux'

const Dashboard = () => {
    const {user} = useSelector(state => state.auth);
    console.log(user)
  return (
    <div>
     Dashboard
    </div>
  )
}

export default Dashboard