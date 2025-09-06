import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  useHMSActions,
  useHMSStore,
  selectPeers,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectIsConnectedToRoom,
  selectLocalPeer,
} from "@100mslive/react-sdk";

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #e3f2fd;
  min-height: 100vh;
`;

const Header = styled.div`
  background-color: #1976d2;
  color: white;
  padding: 20px;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
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

const ConnectionStatus = styled.div`
  background-color: ${(props) => (props.connected ? "#4CAF50" : "#F44336")};
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
`;

const VideoCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.15);
  text-align: center;
  border: 2px solid ${(props) => (props.isLocal ? "#1976D2" : "#E0E0E0")};
`;

const VideoElement = styled.video`
  width: 100%;
  max-width: 300px;
  height: 200px;
  background-color: #f5f5f5;
  border-radius: 10px;
  border: 2px solid #1976d2;
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
  border-radius: 10px;
  border: 2px solid #1976d2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #1976d2;
  font-size: 14px;
`;

const PeerName = styled.h3`
  margin-top: 10px;
  color: #1976d2;
  font-size: 16px;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const ControlButton = styled.button`
  background-color: ${(props) => {
    if (props.endCall) return "#F44336";
    if (props.disabled) return "#CCCCCC";
    return props.active ? "#4CAF50" : "#1976D2";
  }};
  color: white;
  border: none;
  border-radius: 25px;
  padding: 15px 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${(props) => {
      if (props.endCall) return "#D32F2F";
      if (props.disabled) return "#CCCCCC";
      return props.active ? "#45A049" : "#1565C0";
    }};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) =>
      props.disabled
        ? "0 2px 8px rgba(0, 0, 0, 0.1)"
        : "0 4px 12px rgba(0, 0, 0, 0.2)"};
  }

  &:focus {
    outline: 3px solid #1976d2;
    outline-offset: 2px;
  }
`;

const PrescriptionSection = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.15);
  border: 1px solid #e0e0e0;
`;

const SectionTitle = styled.h2`
  color: #1976d2;
  margin-bottom: 15px;
  font-size: 18px;
`;

const PrescriptionInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  resize: vertical;
  margin-bottom: 15px;

  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

const AddButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1565c0;
  }
`;

const PrescriptionsList = styled.div`
  margin-top: 20px;
`;

const PrescriptionItem = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  border-left: 4px solid #1976d2;
`;

const PrescriptionText = styled.p`
  margin-bottom: 5px;
  color: #333;
`;

const PrescriptionTime = styled.small`
  color: #666;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #1976d2;
  font-size: 16px;
`;

const ErrorContainer = styled.div`
  background-color: #ffebee;
  border: 1px solid #f44336;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  color: #d32f2f;
  text-align: center;
`;

/**
 * HMS Video Call Component
 *
 * A 100ms.live integrated video calling component.
 * Features:
 * - Real-time video/audio streaming using 100ms.live
 * - Room-based communication with room codes and auth tokens
 * - Audio/video controls
 * - Prescription management during calls (for doctors)
 * - Responsive design
 */
const HMSVideoCall = ({
  isDoctor = false,
  patientInfo = null,
  doctorInfo = null,
  onEndCall = () => {},
  roomCode = null,
  authToken = null,
  userName = "User",
}) => {
  const hmsActions = useHMSActions();
  const peers = useHMSStore(selectPeers);
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const localPeer = useHMSStore(selectLocalPeer);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [newPrescription, setNewPrescription] = useState("");
  const localVideoRef = useRef(null);

  // Join room on component mount
  useEffect(() => {
    const joinRoom = async () => {
      if (!roomCode || !authToken) {
        setError("Room code and auth token are required");
        return;
      }

      // Skip all token validation - proceed directly to join
      console.log("Proceeding with join attempt - no validation");

      setIsLoading(true);
      setError(null);

      try {
        console.log("Attempting to join room with:", {
          userName,
          roomCode,
          authTokenLength: authToken.length,
          authTokenStart: authToken.substring(0, 20) + "...",
        });

        const joinConfig = {
          userName: userName,
          authToken: authToken,
          roomCode: roomCode,
        };

        console.log("Join config:", {
          ...joinConfig,
          authToken: authToken.substring(0, 20) + "...", // Hide full token in logs
        });

        await hmsActions.join(joinConfig);
        console.log("Successfully joined 100ms room");
      } catch (err) {
        console.error("Failed to join room:", err);
        console.error("Error details:", {
          message: err.message,
          code: err.code,
          stack: err.stack,
        });

        if (err.message.includes("JWT") || err.message.includes("token")) {
          setError(
            `Token error: ${err.message}. Please verify your auth token from 100ms.live dashboard.`
          );
        } else if (err.message.includes("room")) {
          setError(`Room error: ${err.message}. Please check your room code.`);
        } else {
          setError(`Failed to join room: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    joinRoom();
  }, [roomCode, authToken, userName, hmsActions]);

  // Leave room on component unmount
  useEffect(() => {
    return () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [isConnected, hmsActions]);

  const toggleAudio = () => {
    hmsActions.setEnabledTrack("audio", !isLocalAudioEnabled);
  };

  const toggleVideo = () => {
    hmsActions.setEnabledTrack("video", !isLocalVideoEnabled);
  };

  const handleEndCall = () => {
    hmsActions.leave();
    onEndCall();
  };

  const addPrescription = () => {
    if (newPrescription.trim()) {
      const prescription = {
        id: Date.now(),
        text: newPrescription.trim(),
        timestamp: new Date().toLocaleTimeString(),
      };
      setPrescriptions((prev) => [...prev, prescription]);
      setNewPrescription("");
    }
  };

  if (isLoading) {
    return (
      <VideoContainer>
        <LoadingContainer>
          <div>🔄 Connecting to video call...</div>
        </LoadingContainer>
      </VideoContainer>
    );
  }

  if (error) {
    return (
      <VideoContainer>
        <ErrorContainer>
          <h3>❌ Connection Error</h3>
          <p>{error}</p>
          <ControlButton onClick={handleEndCall}>
            🏠 Return to Dashboard
          </ControlButton>
        </ErrorContainer>
      </VideoContainer>
    );
  }

  return (
    <VideoContainer>
      <Header>
        <HeaderTitle>
          {isDoctor ? "Doctor Consultation" : "Patient Consultation"}
        </HeaderTitle>
        <HeaderSubtitle>
          {isDoctor
            ? `Consulting with ${patientInfo?.name || "Patient"}`
            : `Consulting with ${doctorInfo?.name || "Doctor"}`}
        </HeaderSubtitle>
      </Header>

      <ConnectionStatus connected={isConnected}>
        {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
      </ConnectionStatus>

      <VideoGrid>
        {/* Local Video */}
        <VideoCard isLocal={true}>
          {localPeer?.videoTrack ? (
            <VideoElement
              ref={(el) => {
                if (el && localPeer.videoTrack) {
                  el.srcObject = localPeer.videoTrack;
                }
              }}
              autoPlay
              muted
              playsInline
            />
          ) : (
            <VideoPlaceholder>📹 Your video will appear here</VideoPlaceholder>
          )}
          <PeerName>{localPeer?.name || userName} (You)</PeerName>
        </VideoCard>

        {/* Remote Videos */}
        {peers
          .filter((peer) => peer.id !== localPeer?.id)
          .map((peer) => (
            <VideoCard key={peer.id} isLocal={false}>
              <VideoElement
                ref={(el) => {
                  if (el && peer.videoTrack) {
                    el.srcObject = peer.videoTrack;
                  }
                }}
                autoPlay
                playsInline
              />
              <PeerName>{peer.name}</PeerName>
            </VideoCard>
          ))}
      </VideoGrid>

      <ControlsContainer>
        <ControlButton
          onClick={toggleAudio}
          active={isLocalAudioEnabled}
          disabled={!isConnected}
        >
          {isLocalAudioEnabled ? "🎤" : "🎤❌"}
          {isLocalAudioEnabled ? "Mute" : "Unmute"}
        </ControlButton>

        <ControlButton
          onClick={toggleVideo}
          active={isLocalVideoEnabled}
          disabled={!isConnected}
        >
          {isLocalVideoEnabled ? "📹" : "📹❌"}
          {isLocalVideoEnabled ? "Hide Video" : "Show Video"}
        </ControlButton>

        <ControlButton onClick={handleEndCall} endCall={true}>
          📞 End Call
        </ControlButton>
      </ControlsContainer>

      {/* Prescription Section - Only for Doctors */}
      {isDoctor && (
        <PrescriptionSection>
          <SectionTitle>💊 Current Medications</SectionTitle>
          {patientInfo?.currentMedications?.length > 0 ? (
            <ul>
              {patientInfo.currentMedications.map((med, index) => (
                <li key={index}>{med}</li>
              ))}
            </ul>
          ) : (
            <p>No current medications on record.</p>
          )}
          <SectionTitle>📋 Add Prescription</SectionTitle>
          <PrescriptionInput
            value={newPrescription}
            onChange={(e) => setNewPrescription(e.target.value)}
            placeholder="Enter prescription details..."
            disabled={!isConnected}
          />
          <AddButton onClick={addPrescription} disabled={!isConnected}>
            ➕ Add Prescription
          </AddButton>

          {prescriptions.length > 0 && (
            <PrescriptionsList>
              <SectionTitle>📝 Prescriptions Added</SectionTitle>
              {prescriptions.map((prescription) => (
                <PrescriptionItem key={prescription.id}>
                  <PrescriptionText>{prescription.text}</PrescriptionText>
                  <PrescriptionTime>
                    Added at {prescription.timestamp}
                  </PrescriptionTime>
                </PrescriptionItem>
              ))}
            </PrescriptionsList>
          )}
        </PrescriptionSection>
      )}
    </VideoContainer>
  );
};

export default HMSVideoCall;
