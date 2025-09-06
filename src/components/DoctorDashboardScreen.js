import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSignOutAlt, FaUserMd } from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  background-color: #E3F2FD;
`;

const Header = styled.div`
  background-color: #1976D2;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const DoctorInfo = styled.div`
  text-align: left;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const HeaderSubtitle = styled.p`
  font-size: 14px;
  color: #E3F2FD;
`;

const LogoutButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Content = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const DashboardCard = styled.button`
  background-color: white;
  border: 2px solid #2196F3;
  border-radius: 20px;
  padding: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border-color: #1976D2;
  }
  
  &:focus {
    outline: 3px solid #1976D2;
    outline-offset: 2px;
  }
`;

const CardIcon = styled.div`
  font-size: 50px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #1976D2;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #666666;
  line-height: 20px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatNumber = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #1976D2;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666666;
`;

/**
 * Doctor Dashboard Screen - Web Version
 * 
 * Main navigation hub for doctors with two primary functions:
 * 1. Start Consultations - Access patient queue and video calls
 * 2. View Patient Records - Search and access patient information
 */
const DoctorDashboardScreen = () => {
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    // Get doctor info from session storage
    const doctorId = sessionStorage.getItem('doctorId');
    const storedDoctorInfo = sessionStorage.getItem('doctorInfo');
    
    console.log('DoctorDashboardScreen - Retrieved doctorId:', doctorId);
    console.log('DoctorDashboardScreen - Retrieved doctorInfo:', storedDoctorInfo);
    
    if (!doctorId || !storedDoctorInfo) {
      console.log('No doctor info found, redirecting to login');
      navigate('/doctor/login');
      return;
    }

    try {
      const doctor = JSON.parse(storedDoctorInfo);
      setDoctorInfo(doctor);
    } catch (error) {
      console.error('Error parsing doctor info:', error);
      navigate('/doctor/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      sessionStorage.removeItem('doctorId');
      sessionStorage.removeItem('doctorInfo');
      navigate('/');
    }
  };

  const handleStartConsultations = () => {
    navigate('/doctor/consultation');
  };

  const handleViewPatientRecords = () => {
    navigate('/doctor/patient-records');
  };

  if (!doctorInfo) {
    return (
      <Container>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>Loading doctor information...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <FaUserMd />
          </div>
          <DoctorInfo>
            <HeaderTitle>Welcome, {doctorInfo.name}</HeaderTitle>
            <HeaderSubtitle>{doctorInfo.specialization} | {doctorInfo.experience} | Rating: {doctorInfo.rating}</HeaderSubtitle>
          </DoctorInfo>
        </HeaderLeft>
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </LogoutButton>
      </Header>

      <Content>
        <CardsContainer>
          <DashboardCard onClick={handleStartConsultations}>
            <CardIcon>📹▶️</CardIcon>
            <CardTitle>Start Consultations</CardTitle>
            <CardDescription>
              View patient queue and start video consultations
            </CardDescription>
          </DashboardCard>

          <DashboardCard onClick={handleViewPatientRecords}>
            <CardIcon>📁🔍</CardIcon>
            <CardTitle>View Patient Records</CardTitle>
            <CardDescription>
              Search and access patient medical records
            </CardDescription>
          </DashboardCard>
        </CardsContainer>

        <StatsContainer>
          <StatCard>
            <StatNumber>12</StatNumber>
            <StatLabel>Today's Consultations</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>8</StatNumber>
            <StatLabel>Pending Prescriptions</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>95%</StatNumber>
            <StatLabel>Patient Satisfaction</StatLabel>
          </StatCard>
        </StatsContainer>
      </Content>
    </Container>
  );
};

export default DoctorDashboardScreen;
