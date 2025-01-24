import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import VideoComponent from '../VideoComponent/VideoComponent';
import './Dashboard.css'

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  const formattedUsername = user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase();

  return (
    <main className="home-page-wrapper">
      <h1 className='home-page-title'>Welcome, &nbsp;{formattedUsername}</h1>
      <VideoComponent />
    </main>
  );
};

export default Dashboard;
