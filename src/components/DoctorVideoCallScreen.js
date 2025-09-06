import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MinimalVideoCall from "./MinimalVideoCall";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #d0e9ff, #f0f9ff);
`;

const DoctorVideoCallScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient || null;

  const ROOM_CODE =
    process.env.REACT_APP_HMS_ROOM_CODE || "your-room-code-here";
  const AUTH_TOKEN =
    process.env.REACT_APP_HMS_AUTH_TOKEN || "your-auth-token-here";

  const loggedInUser = localStorage.getItem("loggedInUser") || "Doctor";
  const USER_NAME = `${loggedInUser}-Doctor`;

  const handleEndCall = () => {
    navigate("/doctor/dashboard");
  };

  return (
    <Container>
      <MinimalVideoCall
        roomCode={ROOM_CODE}
        authToken={AUTH_TOKEN}
        userName={USER_NAME}
        onEndCall={handleEndCall}
        isDoctor={true}
        patient={patient}
      />
    </Container>
  );
};

export default DoctorVideoCallScreen;
