import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { HMSRoomProvider } from "@100mslive/react-sdk";

// Import screens
import RoleSelectionScreen from "./components/RoleSelectionScreen";
import DoctorLoginScreen from "./components/DoctorLoginScreen";
import DoctorDashboardScreen from "./components/DoctorDashboardScreen";
import DoctorConsultationScreen from "./components/DoctorConsultationScreen";
import DoctorPatientRecordsScreen from "./components/DoctorPatientRecordsScreen";
import DoctorVideoCallScreen from "./components/DoctorVideoCallScreen";
import PatientLoginScreen from "./components/PatientLoginScreen";
import PatientDashboardScreen from "./components/PatientDashboardScreen";
import PatientVideoConsultationScreen from "./components/PatientVideoConsultationScreen";
import PatientVideoCallScreen from "./components/PatientVideoCallScreen";
import PatientHealthRecordsScreen from "./components/PatientHealthRecordsScreen";
import PatientPrescriptionsScreen from "./components/PatientPrescriptionsScreen";
import PatientSymptomCheckerScreen from "./components/PatientSymptomCheckerScreen";

// Global styles for the web application
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #E3F2FD;
    color: #333;
    line-height: 1.6;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /* Accessibility improvements */
  button:focus,
  input:focus,
  select:focus,
  textarea:focus {
    outline: 2px solid #1976D2;
    outline-offset: 2px;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    body {
      background-color: #FFFFFF;
      color: #000000;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

/**
 * Main App Component - Web Version
 *
 * This is the root component for the web-based ApnaMed application.
 * Features:
 * - React Router for navigation
 * - Styled Components for styling
 * - Global accessibility styles
 * - Responsive design for various screen sizes
 * - Support for high contrast and reduced motion preferences
 */
const App = () => {
  return (
    <HMSRoomProvider>
      <AppContainer>
        <GlobalStyle />
        <Router>
          <Routes>
            {/* Entry Point */}
            <Route path="/" element={<RoleSelectionScreen />} />

            {/* Doctor Portal Routes */}
            <Route path="/doctor/login" element={<DoctorLoginScreen />} />
            <Route
              path="/doctor/dashboard"
              element={<DoctorDashboardScreen />}
            />
            <Route
              path="/doctor/consultation"
              element={<DoctorConsultationScreen />}
            />
            <Route
              path="/doctor/video-call"
              element={<DoctorVideoCallScreen />}
            />
            <Route
              path="/doctor/patient-records"
              element={<DoctorPatientRecordsScreen />}
            />

            {/* Patient Portal Routes */}
            <Route path="/patient/login" element={<PatientLoginScreen />} />
            <Route
              path="/patient/dashboard"
              element={<PatientDashboardScreen />}
            />
            <Route
              path="/patient/video-consultation"
              element={<PatientVideoConsultationScreen />}
            />
            <Route
              path="/patient/video-call"
              element={<PatientVideoCallScreen />}
            />
            <Route
              path="/patient/health-records"
              element={<PatientHealthRecordsScreen />}
            />
            <Route
              path="/patient/prescriptions"
              element={<PatientPrescriptionsScreen />}
            />
            <Route
              path="/patient/symptom-checker"
              element={<PatientSymptomCheckerScreen />}
            />
          </Routes>
        </Router>
      </AppContainer>
    </HMSRoomProvider>
  );
};

export default App;
