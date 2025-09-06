import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background-color: #E8F5E8;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #2E7D32;
  color: white;
  padding: 20px;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const PlaceholderCard = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
`;

const PlaceholderIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const PlaceholderTitle = styled.h2`
  font-size: 24px;
  color: #2E7D32;
  margin-bottom: 15px;
`;

const PlaceholderText = styled.p`
  font-size: 16px;
  color: #666666;
  line-height: 24px;
  margin-bottom: 30px;
`;

const BackButton = styled.button`
  background-color: #2E7D32;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background-color: #1B5E20;
  }
`;

// Placeholder components for screens that need full implementation
export const DoctorConsultationScreen = () => {
  const navigate = useNavigate();
  
  return (
    <Container>
      <Header>
        <HeaderTitle>Patient Queue</HeaderTitle>
      </Header>
      <Content>
        <PlaceholderCard>
          <PlaceholderIcon>👥</PlaceholderIcon>
          <PlaceholderTitle>Patient Queue</PlaceholderTitle>
          <PlaceholderText>
            This screen will show the list of patients waiting for consultation.
            Each patient will display their avatar, name, symptoms, and priority level.
          </PlaceholderText>
          <BackButton onClick={() => navigate('/doctor/dashboard')}>
            ← Back to Dashboard
          </BackButton>
        </PlaceholderCard>
      </Content>
    </Container>
  );
};

export const DoctorPatientRecordsScreen = () => {
  const navigate = useNavigate();
  
  return (
    <Container>
      <Header>
        <HeaderTitle>Patient Records</HeaderTitle>
      </Header>
      <Content>
        <PlaceholderCard>
          <PlaceholderIcon>📋</PlaceholderIcon>
          <PlaceholderTitle>Patient Records Search</PlaceholderTitle>
          <PlaceholderText>
            This screen will allow doctors to search for and view patient medical records.
            Features include search functionality and detailed patient information display.
          </PlaceholderText>
          <BackButton onClick={() => navigate('/doctor/dashboard')}>
            ← Back to Dashboard
          </BackButton>
        </PlaceholderCard>
      </Content>
    </Container>
  );
};

export const PatientDashboardScreen = () => {
  const navigate = useNavigate();
  
  return (
    <Container>
      <Header>
        <HeaderTitle>Patient Portal</HeaderTitle>
      </Header>
      <Content>
        <PlaceholderCard>
          <PlaceholderIcon>👤</PlaceholderIcon>
          <PlaceholderTitle>Patient Dashboard</PlaceholderTitle>
          <PlaceholderText>
            This screen will provide access to all patient features including
            video consultations, health records, prescriptions, and symptom checker.
          </PlaceholderText>
          <BackButton onClick={() => navigate('/')}>
            ← Back to Role Selection
          </BackButton>
        </PlaceholderCard>
      </Content>
    </Container>
  );
};

export const PatientVideoConsultationScreen = () => {
  const navigate = useNavigate();
  
  return (
    <Container>
      <Header>
        <HeaderTitle>Video Consultation</HeaderTitle>
      </Header>
      <Content>
        <PlaceholderCard>
          <PlaceholderIcon>👨‍⚕️</PlaceholderIcon>
          <PlaceholderTitle>Available Doctors</PlaceholderTitle>
          <PlaceholderText>
            This screen will show a list of available doctors for video consultation.
            Each doctor will display their specialization, rating, and availability.
          </PlaceholderText>
          <BackButton onClick={() => navigate('/patient/dashboard')}>
            ← Back to Dashboard
          </BackButton>
        </PlaceholderCard>
      </Content>
    </Container>
  );
};

export const PatientHealthRecordsScreen = () => {
  const navigate = useNavigate();
  
  return (
    <Container>
      <Header>
        <HeaderTitle>My Health Records</HeaderTitle>
      </Header>
      <Content>
        <PlaceholderCard>
          <PlaceholderIcon>📁❤️</PlaceholderIcon>
          <PlaceholderTitle>Health Records</PlaceholderTitle>
          <PlaceholderText>
            This screen will display the patient's personal health records including
            medical history, allergies, current medications, and recent visits.
          </PlaceholderText>
          <BackButton onClick={() => navigate('/patient/dashboard')}>
            ← Back to Dashboard
          </BackButton>
        </PlaceholderCard>
      </Content>
    </Container>
  );
};

export const PatientPrescriptionsScreen = () => {
  const navigate = useNavigate();
  
  return (
    <Container>
      <Header>
        <HeaderTitle>My Prescriptions</HeaderTitle>
      </Header>
      <Content>
        <PlaceholderCard>
          <PlaceholderIcon>💊</PlaceholderIcon>
          <PlaceholderTitle>Prescriptions & Pharmacy</PlaceholderTitle>
          <PlaceholderText>
            This screen will show the patient's prescriptions and allow them to
            find nearby pharmacies that have the prescribed medicines.
          </PlaceholderText>
          <BackButton onClick={() => navigate('/patient/dashboard')}>
            ← Back to Dashboard
          </BackButton>
        </PlaceholderCard>
      </Content>
    </Container>
  );
};

export const PatientSymptomCheckerScreen = () => {
  const navigate = useNavigate();
  
  return (
    <Container>
      <Header>
        <HeaderTitle>Symptom Checker</HeaderTitle>
      </Header>
      <Content>
        <PlaceholderCard>
          <PlaceholderIcon>🔍👤</PlaceholderIcon>
          <PlaceholderTitle>AI Symptom Checker</PlaceholderTitle>
          <PlaceholderText>
            This screen will provide AI-powered symptom analysis using OpenAI.
            Patients can describe their symptoms and receive analysis and recommendations.
          </PlaceholderText>
          <BackButton onClick={() => navigate('/patient/dashboard')}>
            ← Back to Dashboard
          </BackButton>
        </PlaceholderCard>
      </Content>
    </Container>
  );
};
