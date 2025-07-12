import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ChatRecommendation from '../components/chat/ChatRecommendation';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container>
      <h1 className='my-4'>Dashboard</h1>
      <p>Welcome {user?.username}!</p>
      {user?.role === 'student' && <ChatRecommendation />}
    </Container>
  );
};

export default Dashboard;