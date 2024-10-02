import React from 'react';
import Signup from './Components/Signup';
import Login from './Components/Login';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const App = () => {
  return (
    <PageWrapper>
      <Signup />
      <Login />
    </PageWrapper>
  );
};

export default App;
