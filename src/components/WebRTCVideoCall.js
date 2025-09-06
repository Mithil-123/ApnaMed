import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #E8F5E8;
  min-height: 100vh;
`;

const Header = styled.div`
  background-color: #2E7D32;
  color: white;
  padding: 20px;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const HeaderSubtitle = styled.p`
  font-size: 14px;
  color: #E8F5E8;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const VideoElement = styled.video`
  width: 100%;
  max-width: 300px;
  height: 200px;
  background-color: #F5F5F5;
  border-radius: 10px;
  border: 2px solid #2E7D32;
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background-color: #F5F5F5;
  border-radius: 10px;
  border: 2px solid #2E7D32;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #2E7D32;
`;

const PeerName = styled.h3`
  margin-top: 10px;
  color: #2E7D32;
  font-size: 16px;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const ControlButton = styled.button`
  background-color: ${props => props.endCall ? '#F44336' : '#2E7D32'};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 15px 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.endCall ? '#D32F2F' : '#1B5E20'};
  }
  
  &:focus {
    outline: 3px solid #2E7D32;
    outline-offset: 2px;
  }
  
  &:disabled {
    background-color: #CCCCCC;
    cursor: not-allowed;
  }
`;

const PrescriptionSection = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #2E7D32;
  margin-bottom: 15px;
  font-size: 18px;
`;

const PrescriptionInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 15px;
  border: 2px solid #E0E0E0;
  border-radius: 10px;
  font-size: 14px;
  resize: vertical;
  margin-bottom: 15px;
  
  &:focus {
    outline: none;
    border-color: #2E7D32;
  }
`;

const AddButton = styled.button`
  background-color: #2E7D32;
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
  
  &:hover {
    background-color: #1B5E20;
  }
`;

const PrescriptionsList = styled.div`
  margin-top: 20px;
`;

const PrescriptionItem = styled.div`
  background-color: #F5F5F5;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  border-left: 4px solid #2E7D32;
`;

const PrescriptionText = styled.p`
  margin-bottom: 5px;
  color: #333;
`;

const PrescriptionTime = styled.small`
  color: #666;
`;

/**
 * WebRTC Video Call Component
 * 
 * A web-based video calling component using WebRTC for peer-to-peer communication.
 * Features:
 * - Local and remote video streams
 * - Audio/video controls
 * - Prescription management during calls
 * - Responsive design for various screen sizes
 */
const WebRTCVideoCall = ({ 
  isDoctor = false, 
  patientInfo = null, 
  doctorInfo = null,
  onEndCall = () => {}
}) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionText, setPrescriptionText] = useState('');
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    initializeVideoCall();
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const initializeVideoCall = async () => {
    try {
      // Get user media (camera and microphone)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setLocalStream(stream);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // In a real implementation, you would establish a peer connection here
      // For demo purposes, we'll simulate a remote stream
      simulateRemoteStream();
      
    } catch (error) {
      console.error('Error accessing media devices:', error);
      // Fallback to placeholder video
    }
  };

  const simulateRemoteStream = () => {
    // Simulate remote video stream for demo
    setTimeout(() => {
      setRemoteStream({ id: 'remote-stream' });
    }, 2000);
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    onEndCall();
  };

  const addPrescription = () => {
    if (prescriptionText.trim() === '') return;

    const newPrescription = {
      id: Date.now().toString(),
      text: prescriptionText.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setPrescriptions(prev => [...prev, newPrescription]);
    setPrescriptionText('');
  };

  const currentUser = isDoctor ? 'Dr. Patel' : 'Patient';
  const otherUser = isDoctor ? (patientInfo?.name || 'Patient') : (doctorInfo?.name || 'Dr. Patel');

  return (
    <VideoContainer>
      <Header>
        <HeaderTitle>Live Consultation</HeaderTitle>
        <HeaderSubtitle>
          {isDoctor ? `Patient: ${otherUser}` : `Doctor: ${otherUser}`}
        </HeaderSubtitle>
      </Header>

      <VideoGrid>
        <VideoCard>
          <h3>👤 {currentUser}</h3>
          {localStream ? (
            <VideoElement
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
            />
          ) : (
            <VideoPlaceholder>
              <div>📹</div>
              <div>Local Video</div>
            </VideoPlaceholder>
          )}
        </VideoCard>

        <VideoCard>
          <h3>👤 {otherUser}</h3>
          {remoteStream ? (
            <VideoElement
              ref={remoteVideoRef}
              autoPlay
              playsInline
            />
          ) : (
            <VideoPlaceholder>
              <div>📹</div>
              <div>Remote Video</div>
            </VideoPlaceholder>
          )}
        </VideoCard>
      </VideoGrid>

      <ControlsContainer>
        <ControlButton onClick={toggleAudio}>
          {isAudioEnabled ? '🎤' : '🔇'} 
          {isAudioEnabled ? 'Mute' : 'Unmute'}
        </ControlButton>
        
        <ControlButton onClick={toggleVideo}>
          {isVideoEnabled ? '📹' : '📷'} 
          {isVideoEnabled ? 'Video Off' : 'Video On'}
        </ControlButton>
        
        <ControlButton endCall onClick={endCall}>
          📞 End Call
        </ControlButton>
      </ControlsContainer>

      {isDoctor && (
        <PrescriptionSection>
          <SectionTitle>Add Prescription</SectionTitle>
          
          <PrescriptionInput
            placeholder="Enter prescription details..."
            value={prescriptionText}
            onChange={(e) => setPrescriptionText(e.target.value)}
            rows={3}
          />
          
          <AddButton onClick={addPrescription}>
            ➕ Add Prescription
          </AddButton>

          {prescriptions.length > 0 && (
            <PrescriptionsList>
              <h3>Added Prescriptions:</h3>
              {prescriptions.map((prescription) => (
                <PrescriptionItem key={prescription.id}>
                  <PrescriptionText>{prescription.text}</PrescriptionText>
                  <PrescriptionTime>{prescription.timestamp}</PrescriptionTime>
                </PrescriptionItem>
              ))}
            </PrescriptionsList>
          )}
        </PrescriptionSection>
      )}
    </VideoContainer>
  );
};

export default WebRTCVideoCall;
