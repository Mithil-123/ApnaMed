import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mockDoctors } from "../data/mockData";

const Container = styled.div`
  min-height: 100vh;
  background-color: #e3f2fd;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #1976d2;
  padding: 30px 20px;
  text-align: center;
  color: white;
`;

const HeaderTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const HeaderSubtitle = styled.p`
  font-size: 16px;
  color: #e3f2fd;
  font-weight: 300;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const FormCard = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
  border: 2px solid transparent;

  &:focus-within {
    border-color: #1976d2;
  }
`;

const InputIcon = styled.span`
  font-size: 20px;
  color: #1976d2;
  margin-right: 15px;
`;

const TextInput = styled.input`
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

const LoginButton = styled.button`
  width: 100%;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 18px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1565c0;
  }

  &:focus {
    outline: 3px solid #1976d2;
    outline-offset: 2px;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const DemoContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  border-left: 4px solid #1976d2;
`;

const DemoTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 10px;
`;

const DemoText = styled.p`
  font-size: 14px;
  color: #666666;
  margin-bottom: 5px;
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
`;

/**
 * Doctor Login Screen - Web Version
 *
 * Simple login interface for doctors with icon-based input fields.
 * Features responsive design and accessibility improvements.
 */
const DoctorLoginScreen = () => {
  const navigate = useNavigate();
  const [doctorId, setDoctorId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (doctorId.trim() === "" || password.trim() === "") {
      setError("Please enter both Doctor ID and Password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock doctor authentication - check if doctor ID exists
      const validDoctorIds = mockDoctors.map((doctor) => doctor.id);
      const doctor = mockDoctors.find(
        (d) => d.id === doctorId.trim().toUpperCase()
      );

      if (doctor && password.trim().length > 0) {
        // Store doctor info in session storage
        sessionStorage.setItem("doctorId", doctorId.trim().toUpperCase());
        sessionStorage.setItem("doctorInfo", JSON.stringify(doctor));

        // Store doctor name for video calls
        const doctorName = doctor.name || `Doctor-${doctorId}`;
        localStorage.setItem("loggedInUser", doctorName);

        console.log("Doctor logged in:", doctor);
        console.log("Doctor name stored:", doctorName);
        navigate("/doctor/dashboard");
      } else {
        setError(
          "Invalid Doctor ID or Password. Please check your credentials."
        );
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Doctor Login</HeaderTitle>
        <HeaderSubtitle>Access your medical portal</HeaderSubtitle>
      </Header>

      <FormContainer>
        <FormCard>
          <form onSubmit={handleLogin}>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <InputContainer>
              <InputIcon>👤</InputIcon>
              <TextInput
                type="text"
                placeholder="Doctor ID"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                autoComplete="username"
                aria-label="Doctor ID"
              />
            </InputContainer>

            <InputContainer>
              <InputIcon>🔒</InputIcon>
              <TextInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                aria-label="Password"
              />
            </InputContainer>

            <LoginButton type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </LoginButton>
          </form>

          <DemoContainer>
            <DemoTitle>Demo Doctor IDs:</DemoTitle>
            <DemoText>D001 - Dr. Anjali Patel (General Medicine)</DemoText>
            <DemoText>D002 - Dr. Rajesh Verma (Cardiology)</DemoText>
            <DemoText>D003 - Dr. Sunita Reddy (Pediatrics)</DemoText>
            <DemoText>Password: Any password (demo mode)</DemoText>
          </DemoContainer>
        </FormCard>
      </FormContainer>
    </Container>
  );
};

export default DoctorLoginScreen;
