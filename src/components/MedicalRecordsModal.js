import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  float: right;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const MedicalRecordsModal = ({ records, onClose, onSave, patientId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecords, setEditedRecords] = useState(records);

  useEffect(() => {
    setEditedRecords(records);
  }, [records]);

  if (!records) {
    return null;
  }

  const handleSave = () => {
    onSave(patientId, editedRecords);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedRecords(records);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecords((prev) => ({ ...prev, [name]: value.split("\n") }));
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Medical Records for {records.name}</h2>
        {isEditing ? (
          <>
            <p>
              <strong>Age:</strong> {records.age}
            </p>
            <p>
              <strong>Gender:</strong> {records.gender}
            </p>
            <p>
              <strong>Blood Group:</strong> {records.bloodGroup}
            </p>
            <h3>Medical History</h3>
            <textarea
              name="medicalHistory"
              defaultValue={editedRecords.medicalHistory.join("\n")}
              onChange={handleChange}
              rows={4}
              style={{ width: "100%" }}
            />
            <h3>Allergies</h3>
            <textarea
              name="allergies"
              defaultValue={editedRecords.allergies.join("\n")}
              onChange={handleChange}
              rows={4}
              style={{ width: "100%" }}
            />
            <h3>Current Medications</h3>
            <textarea
              name="currentMedications"
              defaultValue={editedRecords.currentMedications.join("\n")}
              onChange={handleChange}
              rows={4}
              style={{ width: "100%" }}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <p>
              <strong>Age:</strong> {records.age}
            </p>
            <p>
              <strong>Gender:</strong> {records.gender}
            </p>
            <p>
              <strong>Blood Group:</strong> {records.bloodGroup}
            </p>
            <h3>Medical History</h3>
            <ul>
              {records.medicalHistory.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3>Allergies</h3>
            <ul>
              {records.allergies.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3>Current Medications</h3>
            <ul>
              {records.currentMedications.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3>Recent Visits</h3>
            {records.recentVisits.map((visit, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                }}
              >
                <p>
                  <strong>Date:</strong> {visit.date}
                </p>
                <p>
                  <strong>Doctor:</strong> {visit.doctor}
                </p>
                <p>
                  <strong>Reason:</strong> {visit.reason}
                </p>
                <p>
                  <strong>Diagnosis:</strong> {visit.diagnosis}
                </p>
              </div>
            ))}
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default MedicalRecordsModal;
