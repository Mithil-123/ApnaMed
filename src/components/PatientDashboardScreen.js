import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

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

const PatientInfo = styled.div`
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
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const DashboardCard = styled.button`
  background-color: white;
  border: 2px solid #2196F3;
  border-radius: 20px;
  padding: 25px;
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

const CardIconContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const CardIcon = styled.div`
  font-size: 40px;
  margin-bottom: 5px;
`;

const CardIconSecondary = styled.div`
  position: absolute;
  bottom: 0;
  right: -5px;
  font-size: 16px;
  background-color: white;
  border-radius: 8px;
  padding: 2px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #1976D2;
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  font-size: 13px;
  color: #666666;
  line-height: 18px;
  margin-bottom: 12px;
`;

const CardBadge = styled.div`
  background-color: #E3F2FD;
  padding: 8px 12px;
  border-radius: 12px;
  display: inline-block;
`;

const CardBadgeText = styled.span`
  font-size: 11px;
  color: #1976D2;
  font-weight: 600;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #1976D2;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #666666;
`;

const EmergencyContainer = styled.div`
  text-align: center;
`;

const EmergencyButton = styled.button`
  background-color: #F44336;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #D32F2F;
  }
`;

/**
 * Patient Dashboard Screen - Web Version
 * 
 * Main navigation hub for patients with four primary functions:
 * 1. Video Consultation - Connect with doctors via video call
 * 2. My Health Records - View personal medical records
 * 3. My Prescriptions - View prescriptions and find pharmacies
 * 4. Symptom Checker - AI-powered symptom analysis
 */
const PatientDashboardScreen = () => {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState(null);

  useEffect(() => {
    // Get patient ID from session storage
    const patientId = sessionStorage.getItem('patientId');
    console.log('PatientDashboardScreen - Retrieved patientId:', patientId);
    
    if (!patientId) {
      console.log('No patient ID found, redirecting to login');
      // Redirect to login if no patient ID
      navigate('/patient/login');
      return;
    }

    // Mock patient data - in real app, this would be an API call
    const mockPatients = {
      'P001': { id: 'P001', name: 'Rajesh Kumar', age: 45, gender: 'Male' },
      'P002': { id: 'P002', name: 'Priya Sharma', age: 32, gender: 'Female' },
      'P003': { id: 'P003', name: 'Amit Patel', age: 28, gender: 'Male' },
      'P004': { id: 'P004', name: 'Sunita Singh', age: 55, gender: 'Female' },
      'P005': { id: 'P005', name: 'Vikram Gupta', age: 38, gender: 'Male' },
    };

    const patientData = mockPatients[patientId] || { id: patientId, name: 'Patient', age: 'N/A', gender: 'N/A' };
    console.log('Setting patient info:', patientData);
    setPatientInfo(patientData);
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      sessionStorage.removeItem('patientId');
      navigate('/');
    }
  };

  const handleVideoConsultation = () => {
    navigate('/patient/video-consultation');
  };

  const handleHealthRecords = () => {
    navigate('/patient/health-records');
  };

  const handlePrescriptions = () => {
    navigate('/patient/prescriptions');
  };

  const handleSymptomChecker = () => {
    navigate('/patient/symptom-checker');
  };

  const handleEmergency = () => {
    // In a real app, this would trigger emergency protocols
    alert('Emergency contact activated! Please call your local emergency number.');
  };

  if (!patientInfo) {
    return (
      <Container>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>Loading patient information...</p>
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
            <FaUser />
          </div>
          <PatientInfo>
            <HeaderTitle>Welcome, {patientInfo.name}</HeaderTitle>
            <HeaderSubtitle>Patient ID: {patientInfo.id} | {patientInfo.age} years, {patientInfo.gender}</HeaderSubtitle>
          </PatientInfo>
        </HeaderLeft>
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </LogoutButton>
      </Header>

      <Content>
        <CardsContainer>
          <DashboardCard onClick={handleVideoConsultation}>
            <CardIconContainer>
              <CardIcon>📹</CardIcon>
            </CardIconContainer>
            <CardTitle>Video Consultation</CardTitle>
            <CardDescription>
              Connect with doctors for live video consultations
            </CardDescription>
            <CardBadge>
              <CardBadgeText>3 doctors available</CardBadgeText>
            </CardBadge>
          </DashboardCard>

          <DashboardCard onClick={handleHealthRecords}>
            <CardIconContainer>
              <CardIcon>📁</CardIcon>
              <CardIconSecondary>❤️</CardIconSecondary>
            </CardIconContainer>
            <CardTitle>My Health Records</CardTitle>
            <CardDescription>
              View your medical history and health information
            </CardDescription>
            <CardBadge>
              <CardBadgeText>View records</CardBadgeText>
            </CardBadge>
          </DashboardCard>

          <DashboardCard onClick={handlePrescriptions}>
            <CardIconContainer>
              <CardIcon>💊</CardIcon>
            </CardIconContainer>
            <CardTitle>My Prescriptions</CardTitle>
            <CardDescription>
              View prescriptions and find nearby pharmacies
            </CardDescription>
            <CardBadge>
              <CardBadgeText>2 active prescriptions</CardBadgeText>
            </CardBadge>
          </DashboardCard>

          <DashboardCard onClick={handleSymptomChecker}>
            <CardIconContainer>
              <CardIcon>🔍</CardIcon>
              <CardIconSecondary>👤</CardIconSecondary>
            </CardIconContainer>
            <CardTitle>Symptom Checker</CardTitle>
            <CardDescription>
              AI-powered analysis of your symptoms
            </CardDescription>
            <CardBadge>
              <CardBadgeText>AI Assistant</CardBadgeText>
            </CardBadge>
          </DashboardCard>
        </CardsContainer>

        <StatsContainer>
          <StatCard>
            <StatNumber>5</StatNumber>
            <StatLabel>Total Consultations</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>2</StatNumber>
            <StatLabel>Active Prescriptions</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>98%</StatNumber>
            <StatLabel>Health Score</StatLabel>
          </StatCard>
        </StatsContainer>

        <EmergencyContainer>
          <EmergencyButton onClick={handleEmergency}>
            🚨 Emergency Contact
          </EmergencyButton>
        </EmergencyContainer>
      </Content>
    </Container>
  );
};

export default PatientDashboardScreen;
