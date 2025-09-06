import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchAvailableDoctors } from '../data/mockData';

const Container = styled.div`
  min-height: 100vh;
  background-color: #E3F2FD;
`;

const Header = styled.div`
  background-color: #1976D2;
  color: white;
  padding: 20px;
  text-align: center;
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

const Content = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CountContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CountText = styled.p`
  font-size: 14px;
  color: #1976D2;
  font-weight: 600;
`;

const DoctorCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #1976D2;
`;

const DoctorHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-right: 15px;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #E3F2FD;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #4CAF50;
  border-radius: 8px;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OnlineText = styled.span`
  font-size: 8px;
  color: white;
`;

const DoctorInfo = styled.div`
  flex: 1;
`;

const DoctorName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #1976D2;
  margin-bottom: 5px;
`;

const DoctorSpecialization = styled.p`
  font-size: 14px;
  color: #666666;
  margin-bottom: 3px;
`;

const DoctorExperience = styled.p`
  font-size: 12px;
  color: #999999;
  margin-bottom: 5px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RatingIcon = styled.span`
  font-size: 14px;
  margin-right: 3px;
`;

const RatingText = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #FF9800;
`;


const ConsultButton = styled.button`
  background-color: ${props => props.available ? '#1976D2' : '#CCCCCC'};
  color: white;
  border: none;
  border-radius: 25px;
  padding: 20px 40px;
  font-size: 20px;
  font-weight: bold;
  cursor: ${props => props.available ? 'pointer' : 'not-allowed'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 20px auto;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.available ? '#1565C0' : '#CCCCCC'};
    transform: ${props => props.available ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.available ? '0 6px 16px rgba(25, 118, 210, 0.4)' : '0 4px 12px rgba(25, 118, 210, 0.3)'};
  }
  
  &:active {
    transform: ${props => props.available ? 'translateY(0px)' : 'none'};
  }
`;

const RefreshButton = styled.button`
  background-color: white;
  color: #1976D2;
  border: 1px solid #1976D2;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    background-color: #E3F2FD;
  }
`;

const TipsContainer = styled.div`
  background-color: #F5F5F5;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  border-left: 4px solid #1976D2;
`;

const TipsTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  color: #1976D2;
  margin-bottom: 8px;
`;

const TipsText = styled.p`
  font-size: 12px;
  color: #666666;
  margin-bottom: 3px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 15px;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
`;

const EmptyTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #666666;
  margin-bottom: 8px;
`;

const EmptyText = styled.p`
  font-size: 14px;
  color: #999999;
`;

/**
 * Patient Video Consultation Screen - Web Version
 * 
 * Displays a list of available doctors for video consultation.
 * Each doctor shows their avatar, name, specialization, rating, and availability.
 * Patients can tap on a doctor to start a video consultation.
 */
const PatientVideoConsultationScreen = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAvailableDoctors();
  }, []);

  const loadAvailableDoctors = async () => {
    try {
      setLoading(true);
      const availableDoctors = await fetchAvailableDoctors();
      setDoctors(availableDoctors);
    } catch (error) {
      console.error('Failed to load available doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartConsultation = (doctor) => {
    if (doctor.available) {
      navigate('/patient/video-call', { state: { doctor } });
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderTitle>Video Consultation</HeaderTitle>
          <HeaderSubtitle>Loading available doctors...</HeaderSubtitle>
        </Header>
        <LoadingContainer>
          <div>
            <div style={{ fontSize: '24px', color: '#2E7D32' }}>⏳</div>
            <p style={{ marginTop: '10px', fontSize: '16px', color: '#666666' }}>
              Loading available doctors...
            </p>
          </div>
        </LoadingContainer>
      </Container>
    );
  }

  const availableCount = doctors.filter(doctor => doctor.available).length;

  return (
    <Container>
      <Header>
        <HeaderTitle>Video Consultation</HeaderTitle>
        <HeaderSubtitle>Choose a doctor for consultation</HeaderSubtitle>
      </Header>

      <Content>
        <CountContainer>
          <CountText>
            {availableCount} doctors available now
          </CountText>
        </CountContainer>

        <RefreshButton onClick={loadAvailableDoctors}>
          🔄 Refresh Doctors
        </RefreshButton>

        {doctors.length === 0 ? (
          <EmptyState>
            <EmptyIcon>👨‍⚕️</EmptyIcon>
            <EmptyTitle>No doctors available</EmptyTitle>
            <EmptyText>Please check back later for available doctors.</EmptyText>
          </EmptyState>
        ) : (
          doctors.map((doctor) => (
            <DoctorCard key={doctor.id}>
              <DoctorHeader>
                <AvatarContainer>
                  <Avatar>{doctor.avatar}</Avatar>
                  {doctor.available && (
                    <OnlineIndicator>
                      <OnlineText>●</OnlineText>
                    </OnlineIndicator>
                  )}
                </AvatarContainer>

                <DoctorInfo>
                  <DoctorName>{doctor.name}</DoctorName>
                  <DoctorSpecialization>{doctor.specialization}</DoctorSpecialization>
                  <DoctorExperience>{doctor.experience} experience</DoctorExperience>
                  
                  <RatingContainer>
                    <RatingIcon>⭐</RatingIcon>
                    <RatingText>{doctor.rating}</RatingText>
                  </RatingContainer>
                </DoctorInfo>
              </DoctorHeader>

              <ConsultButton 
                available={doctor.available}
                onClick={() => handleStartConsultation(doctor)}
              >
                {doctor.available ? '🎥 Start Video Consultation' : '⏰ Not Available'}
              </ConsultButton>
            </DoctorCard>
          ))
        )}

        <TipsContainer>
          <TipsTitle>💡 Consultation Tips:</TipsTitle>
          <TipsText>• Ensure good internet connection</TipsText>
          <TipsText>• Find a quiet, well-lit space</TipsText>
          <TipsText>• Have your symptoms ready to describe</TipsText>
        </TipsContainer>
      </Content>
    </Container>
  );
};

export default PatientVideoConsultationScreen;
