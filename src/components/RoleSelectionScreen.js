import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background-color: #E3F2FD;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #1976D2;
  padding: 40px 20px;
  text-align: center;
  color: white;
`;

const AppTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AppSubtitle = styled.p`
  font-size: 1rem;
  color: #E3F2FD;
  font-weight: 300;
`;

const CardsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  gap: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const RoleCard = styled.button`
  background-color: #FFFFFF;
  border: 2px solid #2196F3;
  border-radius: 20px;
  padding: 40px;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border-color: #1976D2;
  }
  
  &:focus {
    outline: 3px solid #1976D2;
    outline-offset: 2px;
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    height: 300px;
    padding: 30px;
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #E3F2FD;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const RoleIcon = styled.span`
  font-size: 40px;
`;

const RoleTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1976D2;
  margin-bottom: 10px;
  text-align: center;
`;

const RoleDescription = styled.p`
  font-size: 14px;
  color: #666666;
  text-align: center;
  line-height: 20px;
`;

const Footer = styled.div`
  text-align: center;
  padding: 20px;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #666666;
  font-style: italic;
`;

/**
 * Role Selection Screen - Web Version
 * 
 * Entry point of the ApnaMed web application.
 * Users can choose between Patient and Doctor roles.
 * Features responsive design and accessibility improvements.
 */
const RoleSelectionScreen = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === 'patient') {
      navigate('/patient/login');
    } else if (role === 'doctor') {
      navigate('/doctor/login');
    }
  };

  return (
    <Container>
      <Header>
        <AppTitle>ApnaMed</AppTitle>
        <AppSubtitle>Your Health, Our Priority</AppSubtitle>
      </Header>

      <CardsContainer>
        <RoleCard 
          onClick={() => handleRoleSelection('patient')}
          aria-label="Select Patient Portal"
        >
          <IconContainer>
            <RoleIcon>👤</RoleIcon>
          </IconContainer>
          <RoleTitle>Patient</RoleTitle>
          <RoleDescription>
            Access your health records, book consultations, and get prescriptions
          </RoleDescription>
        </RoleCard>

        <RoleCard 
          onClick={() => handleRoleSelection('doctor')}
          aria-label="Select Doctor Portal"
        >
          <IconContainer>
            <RoleIcon>👨‍⚕️</RoleIcon>
          </IconContainer>
          <RoleTitle>Doctor</RoleTitle>
          <RoleDescription>
            Manage consultations, view patient records, and prescribe medications
          </RoleDescription>
        </RoleCard>
      </CardsContainer>

      <Footer>
        <FooterText>Choose your role to continue</FooterText>
      </Footer>
    </Container>
  );
};

export default RoleSelectionScreen;
