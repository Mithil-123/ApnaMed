import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
  selectPeers,
  selectLocalPeer,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  useVideo,
} from "@100mslive/react-sdk";
import MedicalRecordsModal from "./MedicalRecordsModal";
import { fetchPatientRecords, updatePatientRecords } from "../data/mockData";

// --- Styled Components ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f7fafc;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  padding: 1.5rem 2rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #4a5568;
  }
`;

const Status = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  margin-bottom: 2rem;
  font-weight: 500;
  color: ${(props) => (props.connected ? "#2f855a" : "#c53030")};
  background-color: ${(props) => (props.connected ? "#c6f6d5" : "#fed7d7")};

  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) => (props.connected ? "#38a169" : "#e53e3e")};
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AudioButton = styled(Button)`
  background-color: ${(props) => (props.enabled ? "#3182ce" : "#718096")};
  &:hover:not(:disabled) {
    background-color: ${(props) => (props.enabled ? "#2b6cb0" : "#4a5568")};
  }
`;

const VideoButton = styled(Button)`
  background-color: ${(props) => (props.enabled ? "#3182ce" : "#718096")};
  &:hover:not(:disabled) {
    background-color: ${(props) => (props.enabled ? "#2b6cb0" : "#4a5568")};
  }
`;

const LeaveButton = styled(Button)`
  background-color: #e53e3e;
  &:hover:not(:disabled) {
    background-color: #c53030;
  }
`;

const RecordsButton = styled(Button)`
  background-color: #3182ce;
  &:hover:not(:disabled) {
    background-color: #2b6cb0;
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const VideoCard = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  border: 2px solid ${(props) => (props.isLocal ? "#3182ce" : "#e2e8f0")};
`;

const VideoElement = styled.video`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e8f0;
  color: #4a5568;
  font-size: 1rem;
`;

const PeerName = styled.div`
  padding: 0.75rem 1rem;
  font-weight: 500;
  color: #2d3748;
  background-color: #f7fafc;
  border-top: 1px solid #e2e8f0;
`;

const Error = styled.div`
  padding: 1rem;
  border-radius: 0.375rem;
  background-color: #fed7d7;
  color: #c53030;
  font-weight: 500;
`;

// --- Components ---

const VideoComponent = ({ trackId, isLocal = false }) => {
  const { videoRef } = useVideo({ trackId });
  return <VideoElement ref={videoRef} autoPlay muted={isLocal} playsInline />;
};

const MinimalVideoCall = ({
  roomCode,
  authToken,
  userName,
  onEndCall = () => {},
  isDoctor,
  patient,
}) => {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);
  const localPeer = useHMSStore(selectLocalPeer);
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRecordsModalOpen, setIsRecordsModalOpen] = useState(false);
  const [selectedPatientRecords, setSelectedPatientRecords] = useState(null);

  const handleShowRecords = async () => {
    if (patient && patient.id) {
      const records = await fetchPatientRecords(patient.id);
      setSelectedPatientRecords(records);
      setIsRecordsModalOpen(true);
    }
  };

  const handleSaveRecords = async (patientId, updates) => {
    await updatePatientRecords(patientId, updates);
    const records = await fetchPatientRecords(patientId);
    setSelectedPatientRecords(records);
  };

  const joinRoom = async () => {
    if (!roomCode || !authToken) {
      setError("Room code and auth token are required.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await hmsActions.join({ userName, authToken, roomCode });
    } catch (err) {
      setError(`Failed to join room: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const leaveRoom = async () => {
    try {
      await hmsActions.leave();
      onEndCall();
    } catch (err) {
      console.error("Leave failed:", err);
    }
  };

  const toggleAudio = async () => {
    await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
  };

  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
  };

  useEffect(() => {
    joinRoom();
  }, []);

  return (
    <Container>
      <Header>
        <h1>Video Consultation</h1>
        <p>ApnaMed Telemedicine Platform</p>
      </Header>

      <Status connected={isConnected}>
        {isConnected ? "Connected" : "Not Connected"}
      </Status>

      {error && <Error>{error}</Error>}

      <ControlsContainer>
        <AudioButton
          onClick={toggleAudio}
          disabled={!isConnected}
          enabled={isLocalAudioEnabled}
        >
          {isLocalAudioEnabled ? "Mute" : "Unmute"}
        </AudioButton>
        <VideoButton
          onClick={toggleVideo}
          disabled={!isConnected}
          enabled={isLocalVideoEnabled}
        >
          {isLocalVideoEnabled ? "Hide Video" : "Show Video"}
        </VideoButton>
        {isDoctor && (
          <RecordsButton onClick={handleShowRecords} disabled={!isConnected}>
            Show Medical Records
          </RecordsButton>
        )}
        <LeaveButton onClick={leaveRoom} disabled={!isConnected}>
          Leave Room
        </LeaveButton>
      </ControlsContainer>

      {isConnected && (
        <VideoGrid>
          <VideoCard isLocal={true}>
            {localPeer?.videoTrack ? (
              <VideoComponent trackId={localPeer.videoTrack} isLocal={true} />
            ) : (
              <VideoPlaceholder>Your video is off</VideoPlaceholder>
            )}
            <PeerName>{localPeer?.name || userName} (You)</PeerName>
          </VideoCard>

          {peers
            .filter((peer) => peer.id !== localPeer?.id)
            .map((peer) => (
              <VideoCard key={peer.id}>
                {peer.videoTrack ? (
                  <VideoComponent trackId={peer.videoTrack} />
                ) : (
                  <VideoPlaceholder>
                    {peer.name}'s video is off
                  </VideoPlaceholder>
                )}
                <PeerName>{peer.name}</PeerName>
              </VideoCard>
            ))}
        </VideoGrid>
      )}

      {isRecordsModalOpen && (
        <MedicalRecordsModal
          records={selectedPatientRecords}
          onClose={() => setIsRecordsModalOpen(false)}
          onSave={handleSaveRecords}
          patientId={patient?.id}
        />
      )}
    </Container>
  );
};

export default MinimalVideoCall;
