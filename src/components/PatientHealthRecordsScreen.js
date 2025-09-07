import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchMyHealthRecords } from "../data/mockData";

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

const RefreshButton = styled.button`
  background-color: white;
  color: #1976d2;
  border: 1px solid #1976d2;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #e3f2fd;
  }
`;

const SectionCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const SectionIcon = styled.span`
  font-size: 20px;
  margin-right: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #1976d2;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
`;

const InfoLabel = styled.div`
  font-size: 12px;
  color: #666666;
  margin-bottom: 5px;
`;

const InfoValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
`;

const VitalSignsContainer = styled.div`
  margin-bottom: 15px;
`;

const VitalSignItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

const VitalSignIcon = styled.span`
  font-size: 24px;
  margin-right: 15px;
`;

const VitalSignDetails = styled.div`
  flex: 1;
`;

const VitalSignLabel = styled.div`
  font-size: 14px;
  color: #666666;
  margin-bottom: 3px;
`;

const VitalSignValue = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #1976d2;
`;

const LastUpdated = styled.div`
  font-size: 12px;
  color: #999999;
  font-style: italic;
  text-align: center;
`;

const ConditionItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const ConditionIcon = styled.span`
  font-size: 16px;
  margin-right: 10px;
`;

const ConditionText = styled.div`
  font-size: 14px;
  color: #333333;
  flex: 1;
`;

const AllergyItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px 12px;
  background-color: #ffebee;
  border-radius: 8px;
  border-left: 3px solid #f44336;
`;

const AllergyIcon = styled.span`
  font-size: 16px;
  margin-right: 10px;
`;

const AllergyText = styled.div`
  font-size: 14px;
  color: #f44336;
  font-weight: 600;
  flex: 1;
`;

const MedicationItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px 12px;
  background-color: #e3f2fd;
  border-radius: 8px;
  border-left: 3px solid #1976d2;
`;

const MedicationIcon = styled.span`
  font-size: 16px;
  margin-right: 10px;
`;

const MedicationText = styled.div`
  font-size: 14px;
  color: #1976d2;
  font-weight: 600;
  flex: 1;
`;

const VisitItem = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
`;

const VisitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const VisitDate = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #1976d2;
`;

const VisitDoctor = styled.div`
  font-size: 14px;
  color: #666666;
`;

const VisitDetails = styled.div`
  margin-top: 5px;
`;

const VisitReason = styled.div`
  font-size: 13px;
  color: #333333;
  margin-bottom: 3px;
`;

const VisitDiagnosis = styled.div`
  font-size: 13px;
  color: #666666;
  font-style: italic;
`;

const NoDataText = styled.div`
  font-size: 14px;
  color: #999999;
  font-style: italic;
`;

const EmergencyContainer = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const EmergencyButton = styled.button`
  background-color: #f44336;
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
    background-color: #d32f2f;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const NoDataContainer = styled.div`
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 15px;
`;

const NoDataIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
`;

const NoDataTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #666666;
  margin-bottom: 8px;
`;

const NoDataSubtext = styled.p`
  font-size: 14px;
  color: #999999;
  line-height: 20px;
`;

/**
 * Patient Health Records Screen - Web Version
 *
 * Displays the patient's personal health records including:
 * - Basic information (age, blood group, BMI)
 * - Vital signs (blood pressure, heart rate, temperature)
 * - Medical history and allergies
 * - Current medications
 * - Recent visits and consultations
 */
const PatientHealthRecordsScreen = () => {
  const navigate = useNavigate();
  const [healthRecords, setHealthRecords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHealthRecords();
  }, []);

  const loadHealthRecords = async () => {
    try {
      setLoading(true);
      const patientId = sessionStorage.getItem("patientId");
      if (patientId) {
        const records = await fetchMyHealthRecords(patientId);
        setHealthRecords(records);
      } else {
        navigate("/patient/login");
      }
    } catch (error) {
      console.error("Failed to load health records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmergency = () => {
    alert(
      "Emergency contact activated! Please call your local emergency number.",
    );
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderTitle>My Health Records</HeaderTitle>
          <HeaderSubtitle>Loading your health records...</HeaderSubtitle>
        </Header>
        <LoadingContainer>
          <div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p
              style={{ marginTop: "10px", fontSize: "16px", color: "#666666" }}
            >
              Loading your health records...
            </p>
          </div>
        </LoadingContainer>
      </Container>
    );
  }

  if (!healthRecords) {
    return (
      <Container>
        <Header>
          <HeaderTitle>My Health Records</HeaderTitle>
          <HeaderSubtitle>No health records found</HeaderSubtitle>
        </Header>
        <Content>
          <NoDataContainer>
            <NoDataIcon>📋</NoDataIcon>
            <NoDataTitle>No health records found</NoDataTitle>
            <NoDataSubtext>
              Contact your doctor to add your health information
            </NoDataSubtext>
          </NoDataContainer>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>My Health Records</HeaderTitle>
        <HeaderSubtitle>Your complete medical information</HeaderSubtitle>
      </Header>

      <Content>
        <RefreshButton onClick={loadHealthRecords}>
          🔄 Refresh Records
        </RefreshButton>

        <SectionCard>
          <SectionHeader>
            <SectionIcon>👤</SectionIcon>
            <SectionTitle>Basic Information</SectionTitle>
          </SectionHeader>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Name</InfoLabel>
              <InfoValue>{healthRecords.name}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Age</InfoLabel>
              <InfoValue>{healthRecords.age} years</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Gender</InfoLabel>
              <InfoValue>{healthRecords.gender}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Blood Group</InfoLabel>
              <InfoValue>{healthRecords.bloodGroup}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Height</InfoLabel>
              <InfoValue>{healthRecords.height}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Weight</InfoLabel>
              <InfoValue>{healthRecords.weight}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>BMI</InfoLabel>
              <InfoValue>{healthRecords.bmi}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </SectionCard>

        <SectionCard>
          <SectionHeader>
            <SectionIcon>💓</SectionIcon>
            <SectionTitle>Vital Signs</SectionTitle>
          </SectionHeader>
          <VitalSignsContainer>
            <VitalSignItem>
              <VitalSignIcon>🩸</VitalSignIcon>
              <VitalSignDetails>
                <VitalSignLabel>Blood Pressure</VitalSignLabel>
                <VitalSignValue>
                  {healthRecords.vitalSigns.bloodPressure}
                </VitalSignValue>
              </VitalSignDetails>
            </VitalSignItem>
            <VitalSignItem>
              <VitalSignIcon>❤️</VitalSignIcon>
              <VitalSignDetails>
                <VitalSignLabel>Heart Rate</VitalSignLabel>
                <VitalSignValue>
                  {healthRecords.vitalSigns.heartRate}
                </VitalSignValue>
              </VitalSignDetails>
            </VitalSignItem>
            <VitalSignItem>
              <VitalSignIcon>🌡️</VitalSignIcon>
              <VitalSignDetails>
                <VitalSignLabel>Temperature</VitalSignLabel>
                <VitalSignValue>
                  {healthRecords.vitalSigns.temperature}
                </VitalSignValue>
              </VitalSignDetails>
            </VitalSignItem>
          </VitalSignsContainer>
          <LastUpdated>
            Last updated: {healthRecords.vitalSigns.lastUpdated}
          </LastUpdated>
        </SectionCard>

        <SectionCard>
          <SectionHeader>
            <SectionIcon>🏥</SectionIcon>
            <SectionTitle>Medical History</SectionTitle>
          </SectionHeader>
          {healthRecords.medicalHistory.length > 0 ? (
            healthRecords.medicalHistory.map((condition, index) => (
              <ConditionItem key={index}>
                <ConditionIcon>📋</ConditionIcon>
                <ConditionText>{condition}</ConditionText>
              </ConditionItem>
            ))
          ) : (
            <NoDataText>No medical history recorded</NoDataText>
          )}
        </SectionCard>

        <SectionCard>
          <SectionHeader>
            <SectionIcon>⚠️</SectionIcon>
            <SectionTitle>Allergies</SectionTitle>
          </SectionHeader>
          {healthRecords.allergies.length > 0 ? (
            healthRecords.allergies.map((allergy, index) => (
              <AllergyItem key={index}>
                <AllergyIcon>🚨</AllergyIcon>
                <AllergyText>{allergy}</AllergyText>
              </AllergyItem>
            ))
          ) : (
            <NoDataText>No known allergies</NoDataText>
          )}
        </SectionCard>

        <SectionCard>
          <SectionHeader>
            <SectionIcon>💊</SectionIcon>
            <SectionTitle>Current Medications</SectionTitle>
          </SectionHeader>
          {healthRecords.currentMedications.length > 0 ? (
            healthRecords.currentMedications.map((medication, index) => (
              <MedicationItem key={index}>
                <MedicationIcon>💊</MedicationIcon>
                <MedicationText>{medication}</MedicationText>
              </MedicationItem>
            ))
          ) : (
            <NoDataText>No current medications</NoDataText>
          )}
        </SectionCard>

        <SectionCard>
          <SectionHeader>
            <SectionIcon>📅</SectionIcon>
            <SectionTitle>Recent Visits</SectionTitle>
          </SectionHeader>
          {healthRecords.recentVisits.map((visit, index) => (
            <VisitItem key={index}>
              <VisitHeader>
                <VisitDate>{visit.date}</VisitDate>
                <VisitDoctor>{visit.doctor}</VisitDoctor>
              </VisitHeader>
              <VisitDetails>
                <VisitReason>📋 Reason: {visit.reason}</VisitReason>
                <VisitDiagnosis>🔍 Diagnosis: {visit.diagnosis}</VisitDiagnosis>
              </VisitDetails>
            </VisitItem>
          ))}
        </SectionCard>

        <EmergencyContainer>
          <EmergencyButton onClick={handleEmergency}>
            🚨 Emergency Contact
          </EmergencyButton>
        </EmergencyContainer>
      </Content>
    </Container>
  );
};

export default PatientHealthRecordsScreen;
