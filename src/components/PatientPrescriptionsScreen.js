import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  fetchMyPrescriptions,
  findPharmaciesWithMedicine,
  fetchMyHealthRecords,
} from "../data/mockData";

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

const PrescriptionCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #1976d2;
`;

const PrescriptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PrescriptionDate = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #1976d2;
`;

const PrescriptionId = styled.div`
  font-size: 12px;
  color: #666666;
`;

const DoctorName = styled.div`
  font-size: 16px;
  color: #333333;
  margin-bottom: 15px;
`;

const MedicinesContainer = styled.div`
  margin-bottom: 15px;
`;

const MedicinesTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 10px;
`;

const MedicineItem = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
`;

const MedicineInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const MedicineIcon = styled.span`
  font-size: 20px;
  margin-right: 10px;
  margin-top: 2px;
`;

const MedicineDetails = styled.div`
  flex: 1;
`;

const MedicineName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 3px;
`;

const MedicineDosage = styled.div`
  font-size: 14px;
  color: #333333;
  margin-bottom: 2px;
`;

const MedicineFrequency = styled.div`
  font-size: 14px;
  color: #333333;
  margin-bottom: 2px;
`;

const MedicineDuration = styled.div`
  font-size: 14px;
  color: #666666;
  margin-bottom: 3px;
`;

const MedicineInstructions = styled.div`
  font-size: 13px;
  color: #666666;
  font-style: italic;
`;

const FindPharmacyButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 8px 15px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }
`;

const NotesContainer = styled.div`
  background-color: #e3f2fd;
  border-radius: 8px;
  padding: 12px;
`;

const NotesTitle = styled.h4`
  font-size: 14px;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 5px;
`;

const NotesText = styled.p`
  font-size: 13px;
  color: #333333;
  line-height: 18px;
`;

const PharmacySection = styled.div`
  margin-top: 20px;
`;

const PharmacySectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const PharmacySectionTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #1976d2;
  flex: 1;
`;

const ClearButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 15px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const PharmacyCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const PharmacyHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const PharmacyIcon = styled.span`
  font-size: 20px;
  margin-right: 10px;
`;

const PharmacyInfo = styled.div`
  flex: 1;
`;

const PharmacyName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 2px;
`;

const PharmacyDistance = styled.div`
  font-size: 12px;
  color: #666666;
`;

const AvailabilityBadge = styled.div`
  background-color: ${(props) => (props.available ? "#1976D2" : "#F44336")};
  color: white;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
`;

const PharmacyAddress = styled.div`
  font-size: 13px;
  color: #333333;
  margin-bottom: 5px;
`;

const PharmacyPhone = styled.div`
  font-size: 13px;
  color: #666666;
  margin-bottom: 10px;
`;

const CallButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 8px 15px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
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

const QuickActionsContainer = styled.div`
  margin-top: 20px;
`;

const QuickActionsTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 15px;
`;

const QuickActionButton = styled.button`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #1976d2;
  border-radius: 10px;
  padding: 15px 20px;
  margin-bottom: 10px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #e3f2fd;
  }
`;

const QuickActionIcon = styled.span`
  font-size: 20px;
  margin-right: 15px;
`;

const QuickActionText = styled.span`
  font-size: 16px;
  color: #333333;
  font-weight: 600;
`;

/**
 * Patient Prescriptions Screen - Web Version
 *
 * Displays the patient's prescriptions and allows them to find pharmacies
 * that have the prescribed medicines. Features:
 * - List of active prescriptions with medicine details
 * - Pharmacy locator for each medicine
 * - Visual icons for medicines and pharmacies
 * - Prescription history and details
 */
const PatientPrescriptionsScreen = () => {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [healthRecords, setHealthRecords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loadingPharmacies, setLoadingPharmacies] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Using P001 as demo patient ID
      const patientPrescriptions = await fetchMyPrescriptions("P001");
      setPrescriptions(patientPrescriptions);
      const records = await fetchMyHealthRecords("P001");
      setHealthRecords(records);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const findPharmacies = async (medicineName) => {
    try {
      setLoadingPharmacies(true);
      setSelectedMedicine(medicineName);
      const availablePharmacies = await findPharmaciesWithMedicine(
        medicineName
      );
      setPharmacies(availablePharmacies);
    } catch (error) {
      console.error("Failed to find pharmacies:", error);
    } finally {
      setLoadingPharmacies(false);
    }
  };

  const clearPharmacySearch = () => {
    setSelectedMedicine(null);
    setPharmacies([]);
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderTitle>My Prescriptions</HeaderTitle>
          <HeaderSubtitle>Loading your prescriptions...</HeaderSubtitle>
        </Header>
        <LoadingContainer>
          <div>
            <div style={{ fontSize: "24px", color: "#1976D2" }}>⏳</div>
            <p
              style={{ marginTop: "10px", fontSize: "16px", color: "#666666" }}
            >
              Loading your prescriptions...
            </p>
          </div>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>My Prescriptions</HeaderTitle>
        <HeaderSubtitle>View prescriptions and find pharmacies</HeaderSubtitle>
      </Header>

      <Content>
        <RefreshButton onClick={loadData}>
          🔄 Refresh Prescriptions
        </RefreshButton>

        {healthRecords && (
          <PrescriptionCard>
            <MedicinesTitle>💊 Current Medications</MedicinesTitle>
            {healthRecords.currentMedications.length > 0 ? (
              <ul>
                {healthRecords.currentMedications.map((med, index) => (
                  <li key={index}>{med}</li>
                ))}
              </ul>
            ) : (
              <p>No current medications on record.</p>
            )}
          </PrescriptionCard>
        )}

        {prescriptions.length > 0 ? (
          prescriptions.map((prescription) => (
            <PrescriptionCard key={prescription.id}>
              <PrescriptionHeader>
                <PrescriptionDate>{prescription.date}</PrescriptionDate>
                <PrescriptionId>ID: {prescription.id}</PrescriptionId>
              </PrescriptionHeader>

              <DoctorName>👨‍⚕️ Dr. {prescription.doctorId}</DoctorName>

              <MedicinesContainer>
                <MedicinesTitle>💊 Prescribed Medicines:</MedicinesTitle>
                {prescription.medicines.map((medicine, index) => (
                  <MedicineItem key={index}>
                    <MedicineInfo>
                      <MedicineIcon>💊</MedicineIcon>
                      <MedicineDetails>
                        <MedicineName>{medicine.name}</MedicineName>
                        <MedicineDosage>{medicine.dosage}</MedicineDosage>
                        <MedicineFrequency>
                          {medicine.frequency}
                        </MedicineFrequency>
                        <MedicineDuration>
                          Duration: {medicine.duration}
                        </MedicineDuration>
                        {medicine.instructions && (
                          <MedicineInstructions>
                            Instructions: {medicine.instructions}
                          </MedicineInstructions>
                        )}
                      </MedicineDetails>
                    </MedicineInfo>
                    <FindPharmacyButton
                      onClick={() => findPharmacies(medicine.name)}
                    >
                      🏪 Find Pharmacy
                    </FindPharmacyButton>
                  </MedicineItem>
                ))}
              </MedicinesContainer>

              {prescription.notes && (
                <NotesContainer>
                  <NotesTitle>📝 Doctor's Notes:</NotesTitle>
                  <NotesText>{prescription.notes}</NotesText>
                </NotesContainer>
              )}
            </PrescriptionCard>
          ))
        ) : (
          <EmptyState>
            <EmptyIcon>💊</EmptyIcon>
            <EmptyTitle>No prescriptions found</EmptyTitle>
            <EmptyText>Consult with a doctor to get prescriptions</EmptyText>
          </EmptyState>
        )}

        {selectedMedicine && (
          <PharmacySection>
            <PharmacySectionHeader>
              <PharmacySectionTitle>
                🏪 Pharmacies with "{selectedMedicine}"
              </PharmacySectionTitle>
              <ClearButton onClick={clearPharmacySearch}>✕</ClearButton>
            </PharmacySectionHeader>

            {loadingPharmacies ? (
              <LoadingContainer>
                <div>
                  <div style={{ fontSize: "20px", color: "#1976D2" }}>⏳</div>
                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "14px",
                      color: "#666666",
                    }}
                  >
                    Finding pharmacies...
                  </p>
                </div>
              </LoadingContainer>
            ) : pharmacies.length > 0 ? (
              pharmacies.map((pharmacy) => (
                <PharmacyCard key={pharmacy.id}>
                  <PharmacyHeader>
                    <PharmacyIcon>🏪</PharmacyIcon>
                    <PharmacyInfo>
                      <PharmacyName>{pharmacy.name}</PharmacyName>
                      <PharmacyDistance>
                        📍 {pharmacy.distance}
                      </PharmacyDistance>
                    </PharmacyInfo>
                    <AvailabilityBadge available={pharmacy.available}>
                      {pharmacy.available ? "Available" : "Unavailable"}
                    </AvailabilityBadge>
                  </PharmacyHeader>

                  <PharmacyAddress>📍 {pharmacy.address}</PharmacyAddress>
                  <PharmacyPhone>📞 {pharmacy.phone}</PharmacyPhone>

                  {pharmacy.available && (
                    <CallButton>📞 Call Pharmacy</CallButton>
                  )}
                </PharmacyCard>
              ))
            ) : (
              <EmptyState>
                <EmptyIcon>🏪</EmptyIcon>
                <EmptyTitle>No pharmacies found</EmptyTitle>
                <EmptyText>No pharmacies found with this medicine</EmptyText>
              </EmptyState>
            )}
          </PharmacySection>
        )}

        <QuickActionsContainer>
          <QuickActionsTitle>🚀 Quick Actions</QuickActionsTitle>
          <QuickActionButton
            onClick={() => navigate("/patient/video-consultation")}
          >
            <QuickActionIcon>📹</QuickActionIcon>
            <QuickActionText>Book Consultation</QuickActionText>
          </QuickActionButton>
          <QuickActionButton
            onClick={() => navigate("/patient/health-records")}
          >
            <QuickActionIcon>📋</QuickActionIcon>
            <QuickActionText>View Health Records</QuickActionText>
          </QuickActionButton>
        </QuickActionsContainer>
      </Content>
    </Container>
  );
};

export default PatientPrescriptionsScreen;
