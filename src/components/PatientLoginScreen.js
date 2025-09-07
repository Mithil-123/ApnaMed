import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUser, FaArrowLeft, FaSignInAlt } from "react-icons/fa";

const Container = styled.div`
  min-height: 100vh;
  background-color: #e3f2fd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  margin-bottom: 40px;
`;

const BackButton = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #1565c0;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Title = styled.h1`
  color: #1976d2;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin: 0;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const IconContainer = styled.div`
  background: #e3f2fd;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
`;

const Icon = styled(FaUser)`
  font-size: 40px;
  color: #1976d2;
`;

const Subtitle = styled.h2`
  color: #1976d2;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 10px 0;
`;

const Description = styled.p`
  color: #666;
  font-size: 16px;
  margin: 0 0 30px 0;
  line-height: 1.5;
`;

const InputGroup = styled.div`
  margin-bottom: 30px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  color: #1976d2;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #1976d2;
  }

  &::placeholder {
    color: #999;
  }
`;

const LoginButton = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #1565c0;
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  border-left: 4px solid #c62828;
`;

const HelpText = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #e3f2fd;
  border-radius: 10px;
  border-left: 4px solid #1976d2;
`;

const HelpTitle = styled.h4`
  color: #1976d2;
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
`;

const HelpList = styled.ul`
  color: #1976d2;
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  line-height: 1.4;
`;

const HelpItem = styled.li`
  margin-bottom: 4px;
`;

const PatientLoginScreen = () => {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    if (!patientId.trim()) {
      setError("Please enter your Patient ID");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call to validate patient ID
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock patient validation - in real app, this would be an API call
      const validPatientIds = ["P001", "P002", "P003", "P004", "P005"];

      if (validPatientIds.includes(patientId.trim().toUpperCase())) {
        // Store patient ID in session storage for the session
        const storedId = patientId.trim().toUpperCase();
        sessionStorage.setItem("patientId", storedId);

        // Store patient name for video calls
        const patientName = `Patient-${storedId}`;
        localStorage.setItem("loggedInUser", patientName);

        console.log("Patient ID stored:", storedId);
        console.log("Patient name stored:", patientName);
        console.log("Navigating to /patient/dashboard");
        navigate("/patient/dashboard");
      } else {
        setError("Invalid Patient ID. Please check your ID and try again.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <FaArrowLeft />
        </BackButton>
        <Title>ApnaMed</Title>
        <div style={{ width: "50px" }}></div>
      </Header>

      <LoginCard>
        <IconContainer>
          <Icon />
        </IconContainer>

        <Subtitle>Patient Login</Subtitle>
        <Description>
          Enter your Patient ID to access your health records and services
        </Description>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <InputGroup>
          <Label htmlFor="patientId">Patient ID</Label>
          <Input
            id="patientId"
            type="text"
            placeholder="Enter your Patient ID (e.g., P001)"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
        </InputGroup>

        <LoginButton onClick={handleLogin} disabled={isLoading}>
          <FaSignInAlt />
          {isLoading ? "Logging in..." : "Login"}
        </LoginButton>
      </LoginCard>
    </Container>
  );
};

export default PatientLoginScreen;
