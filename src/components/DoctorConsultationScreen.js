import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchPatientQueue } from "../data/mockData";

const Container = styled.div`
  min-height: 100vh;
  background-color: #e3f2fd;
`;

const Header = styled.div`
  background-color: #1976d2;
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
  color: #e3f2fd;
`;

const Content = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PatientCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid
    ${(props) => {
      switch (props.priority) {
        case "High":
          return "#F44336";
        case "Medium":
          return "#FF9800";
        case "Low":
          return "#4CAF50";
        default:
          return "#666666";
      }
    }};
`;

const PatientHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #e3f2fd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-right: 15px;
`;

const PatientInfo = styled.div`
  flex: 1;
`;

const PatientName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 5px;
`;

const PatientDetails = styled.p`
  font-size: 14px;
  color: #666666;
  margin-bottom: 3px;
`;

const PriorityBadge = styled.div`
  background-color: ${(props) => {
    switch (props.priority) {
      case "High":
        return "#F44336";
      case "Medium":
        return "#FF9800";
      case "Low":
        return "#4CAF50";
      default:
        return "#666666";
    }
  }};
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
  margin-left: 10px;
`;

const StartButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;

  &:hover {
    background-color: #1565c0;
  }
`;

const RefreshButton = styled.button`
  background-color: white;
  color: #1976d2;
  border: 1px solid #1976d2;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #e3f2fd;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #666666;
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
 * Doctor Consultation Screen - Web Version
 *
 * Displays the list of patients waiting for consultation.
 * Each patient shows their avatar, name, symptoms, and priority level.
 * Doctors can tap on a patient to start a video consultation.
 */
const DoctorConsultationScreen = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatientQueue();
  }, []);

  const loadPatientQueue = async () => {
    try {
      setLoading(true);
      const patientQueue = await fetchPatientQueue();
      setPatients(patientQueue);
    } catch (error) {
      console.error("Failed to load patient queue:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartConsultation = (patient) => {
    navigate("/doctor/video-call", { state: { patient } });
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderTitle>Patient Queue</HeaderTitle>
          <HeaderSubtitle>Loading patients...</HeaderSubtitle>
        </Header>
        <LoadingContainer>
          <div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <LoadingText>Loading patient queue...</LoadingText>
          </div>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>Patient Queue</HeaderTitle>
        <HeaderSubtitle>{patients.length} patients waiting</HeaderSubtitle>
      </Header>

      <Content>
        <RefreshButton onClick={loadPatientQueue}>
          🔄 Refresh Queue
        </RefreshButton>

        {patients.length === 0 ? (
          <EmptyState>
            <EmptyIcon>👥</EmptyIcon>
            <EmptyTitle>No patients waiting</EmptyTitle>
            <EmptyText>
              All patients have been seen. Check back later for new
              consultations.
            </EmptyText>
          </EmptyState>
        ) : (
          patients.map((patient) => (
            <PatientCard key={patient.id} priority={patient.priority}>
              <PatientHeader>
                <Avatar>{patient.avatar}</Avatar>
                <PatientInfo>
                  <PatientName>{patient.name}</PatientName>
                  <PatientDetails>
                    Age: {patient.age} • {patient.gender}
                  </PatientDetails>
                  <PatientDetails>Symptoms: {patient.symptoms}</PatientDetails>
                  <PatientDetails>
                    Waiting: {patient.waitingTime}
                  </PatientDetails>
                </PatientInfo>
                <PriorityBadge priority={patient.priority}>
                  {patient.priority}
                </PriorityBadge>
              </PatientHeader>

              <StartButton onClick={() => handleStartConsultation(patient)}>
                📹 Start Consultation
              </StartButton>
            </PatientCard>
          ))
        )}
      </Content>
    </Container>
  );
};

export default DoctorConsultationScreen;
