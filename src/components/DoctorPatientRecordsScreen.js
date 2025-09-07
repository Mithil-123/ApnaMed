import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  fetchPatientRecords,
  updatePatientRecords,
  addPrescription,
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

const SearchContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
`;

const SearchIcon = styled.span`
  font-size: 18px;
  margin-right: 10px;
  color: #1976d2;
`;

const SearchInput = styled.input`
  flex: 1;
  font-size: 16px;
  color: #333333;
  border: none;
  background: transparent;
  outline: none;

  &::placeholder {
    color: #999999;
  }
`;

const SearchButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const SearchButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.button`
  background-color: #e0e0e0;
  color: #666666;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #cccccc;
  }
`;

const RecordsContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const InfoLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #666666;
  width: 120px;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #333333;
  flex: 1;
`;

const ListItem = styled.div`
  margin-bottom: 5px;
  padding-left: 10px;
`;

const VisitItem = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  border-left: 3px solid #1976d2;
`;

const VisitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const VisitDate = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #1976d2;
`;

const VisitDoctor = styled.span`
  font-size: 12px;
  color: #666666;
`;

const VisitDetails = styled.div`
  font-size: 13px;
  color: #333333;
`;

const DemoContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  border-left: 4px solid #1976d2;
`;

const DemoTitle = styled.h4`
  font-size: 14px;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 8px;
`;

const DemoText = styled.p`
  font-size: 12px;
  color: #666666;
  margin-bottom: 3px;
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const EditButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }
`;

const EditContainer = styled.div`
  margin-top: 10px;
`;

const EditInput = styled.textarea`
  width: 100%;
  background-color: #f5f5f5;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  color: #333333;
  margin-bottom: 10px;
  resize: vertical;
  min-height: 60px;

  &:focus {
    outline: none;
    border: 2px solid #1976d2;
  }
`;

const EditButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const SaveButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  flex: 1;

  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  flex: 1;

  &:hover {
    background-color: #d32f2f;
  }
`;

const PrescriptionButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 20px;
  text-align: center;
`;

const ModalInput = styled.input`
  width: 100%;
  background-color: #f5f5f5;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  color: #333333;
  margin-bottom: 15px;

  &:focus {
    outline: none;
    border: 2px solid #1976d2;
  }
`;

const ModalTextArea = styled.textarea`
  width: 100%;
  background-color: #f5f5f5;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  color: #333333;
  margin-bottom: 15px;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border: 2px solid #1976d2;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ModalSaveButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  flex: 1;

  &:hover {
    background-color: #45a049;
  }
`;

const ModalCancelButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  flex: 1;

  &:hover {
    background-color: #d32f2f;
  }
`;

/**
 * Doctor Patient Records Screen - Web Version
 *
 * Allows doctors to search for and view patient medical records.
 * Features a search interface with magnifying glass icon and
 * detailed patient information display.
 */
const DoctorPatientRecordsScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [patientRecords, setPatientRecords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState({
    medicineName: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setError("Please enter a patient ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const records = await fetchPatientRecords(searchQuery.trim());

      if (records) {
        setPatientRecords(records);
      } else {
        setError("No patient records found for this ID");
        setPatientRecords(null);
      }
    } catch (error) {
      setError("Failed to fetch patient records");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setPatientRecords(null);
    setError("");
  };

  const startEditing = (field, currentValue) => {
    setEditingField(field);
    setEditValue(
      Array.isArray(currentValue) ? currentValue.join(", ") : currentValue,
    );
  };

  const saveEdit = async () => {
    if (!patientRecords || !editingField) {
      console.error("Cannot save: missing patientRecords or editingField", {
        patientRecords: !!patientRecords,
        editingField,
      });
      return;
    }

    console.log("Saving edit:", {
      editingField,
      editValue,
      patientId: patientRecords.patientId,
    });

    try {
      const updates = {};
      if (
        editingField === "medicalHistory" ||
        editingField === "allergies" ||
        editingField === "currentMedications"
      ) {
        updates[editingField] = editValue
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item);
        console.log("Array field update:", updates);
      } else if (editingField.startsWith("vitalSigns.")) {
        const vitalField = editingField.split(".")[1];
        updates.vitalSigns = {
          ...patientRecords.vitalSigns,
          [vitalField]: editValue,
          lastUpdated: new Date().toISOString().split("T")[0],
        };
        console.log("Vital signs update:", updates);
      } else {
        updates[editingField] = editValue;
        console.log("Simple field update:", updates);
      }

      console.log("Calling updatePatientRecords with:", {
        patientId: patientRecords.patientId,
        updates,
      });
      const updatedRecords = await updatePatientRecords(
        patientRecords.patientId,
        updates,
      );
      console.log("Update result:", updatedRecords);

      if (updatedRecords) {
        setPatientRecords(updatedRecords);
        setError("");
        alert("Patient records updated successfully");
        console.log("Records updated successfully");
      } else {
        console.error("updatePatientRecords returned null");
        setError("Failed to update patient records - no data returned");
      }
    } catch (error) {
      console.error("Error in saveEdit:", error);
      setError(`Failed to update patient records: ${error.message}`);
    } finally {
      setEditingField(null);
      setEditValue("");
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue("");
  };

  const addNewPrescription = async () => {
    if (!patientRecords) return;

    try {
      const prescription = {
        patientId: patientRecords.patientId,
        doctorId: "D001", // Current doctor
        medicines: [
          {
            name: prescriptionData.medicineName,
            dosage: prescriptionData.dosage,
            frequency: prescriptionData.frequency,
            duration: prescriptionData.duration,
            instructions: prescriptionData.instructions,
          },
        ],
        notes: `Prescribed by doctor for ${patientRecords.name}`,
      };

      await addPrescription(prescription);
      alert("Prescription added successfully");
      setShowPrescriptionModal(false);
      setPrescriptionData({
        medicineName: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      });
    } catch (error) {
      setError("Failed to add prescription");
    }
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Patient Records</HeaderTitle>
        <HeaderSubtitle>Search and view patient information</HeaderSubtitle>
      </Header>

      <Content>
        <SearchContainer>
          <SearchInputContainer>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
              type="text"
              placeholder="Enter Patient ID (e.g., P001)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </SearchInputContainer>

          <SearchButtons>
            <SearchButton onClick={handleSearch} disabled={loading}>
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </div>
              ) : (
                "🔍 Search"
              )}
            </SearchButton>
            <ClearButton onClick={clearSearch}>✕ Clear</ClearButton>
          </SearchButtons>
        </SearchContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {loading && (
          <LoadingContainer>
            <div>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "16px",
                  color: "#666666",
                }}
              >
                Loading patient records...
              </p>
            </div>
          </LoadingContainer>
        )}

        {patientRecords && (
          <RecordsContainer>
            <SectionCard>
              <SectionTitle>👤 Basic Information</SectionTitle>
              <InfoRow>
                <InfoLabel>Name:</InfoLabel>
                <InfoValue>{patientRecords.name}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Age:</InfoLabel>
                <InfoValue>{patientRecords.age} years</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Gender:</InfoLabel>
                <InfoValue>{patientRecords.gender}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Blood Group:</InfoLabel>
                <InfoValue>{patientRecords.bloodGroup}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Height:</InfoLabel>
                <InfoValue>{patientRecords.height}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Weight:</InfoLabel>
                <InfoValue>{patientRecords.weight}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>BMI:</InfoLabel>
                <InfoValue>{patientRecords.bmi}</InfoValue>
              </InfoRow>
            </SectionCard>

            <SectionCard>
              <SectionTitle>💓 Vital Signs</SectionTitle>
              <InfoRow>
                <InfoLabel>Blood Pressure:</InfoLabel>
                <InfoValue>{patientRecords.vitalSigns.bloodPressure}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Heart Rate:</InfoLabel>
                <InfoValue>{patientRecords.vitalSigns.heartRate}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Temperature:</InfoLabel>
                <InfoValue>{patientRecords.vitalSigns.temperature}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Last Updated:</InfoLabel>
                <InfoValue>{patientRecords.vitalSigns.lastUpdated}</InfoValue>
              </InfoRow>
            </SectionCard>

            <SectionCard>
              <SectionHeader>
                <SectionTitle>🏥 Medical History</SectionTitle>
                <EditButton
                  onClick={() =>
                    startEditing(
                      "medicalHistory",
                      patientRecords.medicalHistory,
                    )
                  }
                >
                  ✏️ Edit
                </EditButton>
              </SectionHeader>
              {editingField === "medicalHistory" ? (
                <EditContainer>
                  <EditInput
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Enter conditions separated by commas"
                    rows={3}
                  />
                  <EditButtons>
                    <SaveButton onClick={saveEdit}>Save</SaveButton>
                    <CancelButton onClick={cancelEdit}>Cancel</CancelButton>
                  </EditButtons>
                </EditContainer>
              ) : (
                <>
                  {patientRecords.medicalHistory.length > 0 ? (
                    patientRecords.medicalHistory.map((condition, index) => (
                      <ListItem key={index}>• {condition}</ListItem>
                    ))
                  ) : (
                    <InfoValue>No medical history recorded</InfoValue>
                  )}
                </>
              )}
            </SectionCard>

            <SectionCard>
              <SectionHeader>
                <SectionTitle>⚠️ Allergies</SectionTitle>
                <EditButton
                  onClick={() =>
                    startEditing("allergies", patientRecords.allergies)
                  }
                >
                  ✏️ Edit
                </EditButton>
              </SectionHeader>
              {editingField === "allergies" ? (
                <EditContainer>
                  <EditInput
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Enter allergies separated by commas"
                    rows={3}
                  />
                  <EditButtons>
                    <SaveButton onClick={saveEdit}>Save</SaveButton>
                    <CancelButton onClick={cancelEdit}>Cancel</CancelButton>
                  </EditButtons>
                </EditContainer>
              ) : (
                <>
                  {patientRecords.allergies.length > 0 ? (
                    patientRecords.allergies.map((allergy, index) => (
                      <ListItem
                        key={index}
                        style={{ color: "#F44336", fontWeight: "600" }}
                      >
                        • {allergy}
                      </ListItem>
                    ))
                  ) : (
                    <InfoValue>No known allergies</InfoValue>
                  )}
                </>
              )}
            </SectionCard>

            <SectionCard>
              <SectionHeader>
                <SectionTitle>💊 Current Medications</SectionTitle>
                <EditButton
                  onClick={() =>
                    startEditing(
                      "currentMedications",
                      patientRecords.currentMedications,
                    )
                  }
                >
                  ✏️ Edit
                </EditButton>
              </SectionHeader>
              {editingField === "currentMedications" ? (
                <EditContainer>
                  <EditInput
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Enter medications separated by commas"
                    rows={3}
                  />
                  <EditButtons>
                    <SaveButton onClick={saveEdit}>Save</SaveButton>
                    <CancelButton onClick={cancelEdit}>Cancel</CancelButton>
                  </EditButtons>
                </EditContainer>
              ) : (
                <>
                  {patientRecords.currentMedications.length > 0 ? (
                    patientRecords.currentMedications.map(
                      (medication, index) => (
                        <ListItem key={index}>• {medication}</ListItem>
                      ),
                    )
                  ) : (
                    <InfoValue>No current medications</InfoValue>
                  )}
                </>
              )}
            </SectionCard>

            <SectionCard>
              <SectionTitle>📅 Recent Visits</SectionTitle>
              {patientRecords.recentVisits.map((visit, index) => (
                <VisitItem key={index}>
                  <VisitHeader>
                    <VisitDate>{visit.date}</VisitDate>
                    <VisitDoctor>{visit.doctor}</VisitDoctor>
                  </VisitHeader>
                  <VisitDetails>Reason: {visit.reason}</VisitDetails>
                  <VisitDetails>Diagnosis: {visit.diagnosis}</VisitDetails>
                </VisitItem>
              ))}
            </SectionCard>

            <SectionCard>
              <SectionTitle>💊 Prescription Management</SectionTitle>
              <PrescriptionButton
                onClick={() => setShowPrescriptionModal(true)}
              >
                ➕ Add New Prescription
              </PrescriptionButton>
            </SectionCard>
          </RecordsContainer>
        )}

        {/* Prescription Modal */}
        {showPrescriptionModal && (
          <ModalOverlay onClick={() => setShowPrescriptionModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalTitle>Add New Prescription</ModalTitle>

              <ModalInput
                type="text"
                placeholder="Medicine Name"
                value={prescriptionData.medicineName}
                onChange={(e) =>
                  setPrescriptionData({
                    ...prescriptionData,
                    medicineName: e.target.value,
                  })
                }
              />

              <ModalInput
                type="text"
                placeholder="Dosage (e.g., 500mg)"
                value={prescriptionData.dosage}
                onChange={(e) =>
                  setPrescriptionData({
                    ...prescriptionData,
                    dosage: e.target.value,
                  })
                }
              />

              <ModalInput
                type="text"
                placeholder="Frequency (e.g., Twice daily)"
                value={prescriptionData.frequency}
                onChange={(e) =>
                  setPrescriptionData({
                    ...prescriptionData,
                    frequency: e.target.value,
                  })
                }
              />

              <ModalInput
                type="text"
                placeholder="Duration (e.g., 7 days)"
                value={prescriptionData.duration}
                onChange={(e) =>
                  setPrescriptionData({
                    ...prescriptionData,
                    duration: e.target.value,
                  })
                }
              />

              <ModalTextArea
                placeholder="Instructions (e.g., Take with food)"
                value={prescriptionData.instructions}
                onChange={(e) =>
                  setPrescriptionData({
                    ...prescriptionData,
                    instructions: e.target.value,
                  })
                }
                rows={3}
              />

              <ModalButtons>
                <ModalSaveButton onClick={addNewPrescription}>
                  Add Prescription
                </ModalSaveButton>
                <ModalCancelButton
                  onClick={() => setShowPrescriptionModal(false)}
                >
                  Cancel
                </ModalCancelButton>
              </ModalButtons>
            </ModalContent>
          </ModalOverlay>
        )}
      </Content>
    </Container>
  );
};

export default DoctorPatientRecordsScreen;
