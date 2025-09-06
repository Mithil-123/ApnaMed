import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MinimalVideoCall from "./MinimalVideoCall";

/**
 * Patient Video Call Screen - Web Version
 *
 * This screen uses 100ms.live for video calling functionality.
 * Features:
 * - Real-time video/audio streaming using 100ms.live
 * - Room-based communication with room codes and auth tokens
 * - Audio/video controls
 * - Doctor information display
 * - Connection status indicators
 */
const PatientVideoCallScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = location.state?.doctor || null;

  // Configuration - Replace with your actual values
  const ROOM_CODE =
    process.env.REACT_APP_HMS_ROOM_CODE || "your-room-code-here";
  const AUTH_TOKEN =
    process.env.REACT_APP_HMS_AUTH_TOKEN || "your-auth-token-here";

  // Use logged-in user's name or fallback to patient name
  const loggedInUser = localStorage.getItem("loggedInUser") || "Patient";
  const USER_NAME = `${loggedInUser}-Patient`;

  // Debug logging
  console.log("PatientVideoCallScreen - Environment Variables:");
  console.log("REACT_APP_HMS_ROOM_CODE:", process.env.REACT_APP_HMS_ROOM_CODE);
  console.log(
    "REACT_APP_HMS_AUTH_TOKEN:",
    process.env.REACT_APP_HMS_AUTH_TOKEN
      ? "SET (" + process.env.REACT_APP_HMS_AUTH_TOKEN.length + " chars)"
      : "NOT SET"
  );
  console.log("ROOM_CODE:", ROOM_CODE);
  console.log(
    "AUTH_TOKEN:",
    AUTH_TOKEN ? "SET (" + AUTH_TOKEN.length + " chars)" : "NOT SET"
  );
  console.log("USER_NAME:", USER_NAME);

  const handleEndCall = () => {
    navigate("/patient/dashboard");
  };

  return (
    <MinimalVideoCall
      roomCode={ROOM_CODE}
      authToken={AUTH_TOKEN}
      userName={USER_NAME}
      onEndCall={handleEndCall}
      isDoctor={false}
    />
  );
};

export default PatientVideoCallScreen;
