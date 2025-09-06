import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TranslationWidget from './TranslationWidget';

const Container = styled.div`
  min-height: 100vh;
  background-color: #E3F2FD;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #1976D2;
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
  color: #E3F2FD;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

const WelcomeIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const WelcomeTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #1976D2;
  margin-bottom: 15px;
  text-align: center;
`;

const WelcomeText = styled.p`
  font-size: 14px;
  color: #666666;
  text-align: center;
  line-height: 20px;
  margin-bottom: 20px;
`;

const SampleSymptomsContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  max-width: 400px;
`;

const SampleSymptomsTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  color: #1976D2;
  margin-bottom: 8px;
`;

const SampleSymptomsText = styled.p`
  font-size: 13px;
  color: #666666;
  margin-bottom: 3px;
`;

const MessageContainer = styled.div`
  margin-bottom: 15px;
  max-width: 85%;
  ${props => props.isUser ? 'margin-left: auto;' : 'margin-right: auto;'}
`;

const MessageBubble = styled.div`
  background-color: ${props => props.isUser ? '#1976D2' : '#FFFFFF'};
  color: ${props => props.isUser ? '#FFFFFF' : '#333333'};
   border-radius: 15px;
  padding: 15px;
  box-shadow: ${props => props.isUser ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.1)'};
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const MessageIcon = styled.span`
  font-size: 16px;
  margin-right: 8px;
`;

const MessageTime = styled.span`
  font-size: 10px;
  color: #999999;
`;

const MessageText = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #FFFFFF;
  border-radius: 15px;
  margin-bottom: 15px;
  max-width: 85%;
  margin-right: auto;
`;

const LoadingText = styled.span`
  margin-left: 8px;
  font-size: 14px;
  color: #666666;
  font-style: italic;
`;

const InputContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-top: 1px solid #E0E0E0;
`;

const InputRow = styled.div`
  display: flex;
  align-items: flex-end;
  background-color: #F5F5F5;
  border-radius: 25px;
  padding: 15px;
  margin-bottom: 10px;
`;

const TextInput = styled.textarea`
  flex: 1;
  font-size: 14px;
  color: #333333;
  border: none;
  background: transparent;
  outline: none;
  resize: none;
  max-height: 100px;
  margin-right: 10px;
  font-family: inherit;
  
  &::placeholder {
    color: #999999;
  }
`;

const SendButton = styled.button`
  background-color: #1976D2;
  color: white;
  border: none;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #1565C0;
  }
  
  &:disabled {
    background-color: #CCCCCC;
    cursor: not-allowed;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const ActionButton = styled.button`
  background-color: ${props => props.isVideoConsult ? '#1976D2' : '#E3F2FD'};
  color: ${props => props.isVideoConsult ? '#FFFFFF' : '#1976D2'};
  border: 1px solid #1976D2;
  border-radius: 15px;
  padding: ${props => props.isVideoConsult ? '12px 20px' : '8px 15px'};
  font-size: ${props => props.isVideoConsult ? '14px' : '12px'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.isVideoConsult ? '#1565C0' : '#BBDEFB'};
    transform: ${props => props.isVideoConsult ? 'translateY(-1px)' : 'none'};
  }
`;

const DisclaimerContainer = styled.div`
  padding: 10px 20px;
  background-color: #FFF3E0;
  margin: 0 20px 10px 20px;
  border-radius: 10px;
  border-left: 4px solid #FF9800;
`;

const DisclaimerText = styled.p`
  font-size: 11px;
  color: #E65100;
  line-height: 16px;
`;

const EmergencyContainer = styled.div`
  padding: 0 20px 20px 20px;
`;

const EmergencyButton = styled.button`
  background-color: #F44336;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #D32F2F;
  }
`;

/**
 * Patient Symptom Checker Screen - Web Version
 * 
 * AI-powered symptom analysis using OpenAI's Chat Completions API.
 * Features:
 * - Chat interface for describing symptoms
 * - AI analysis and recommendations
 * - Visual icons for better accessibility
 * - Emergency alerts for serious symptoms
 */
const PatientSymptomCheckerScreen = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      text: `👋 Welcome to ApnaMed AI Symptom Checker!

I'm here to help you understand your symptoms and provide general health guidance. Please describe what you're experiencing in detail.

Examples:
• "I have a headache and feel dizzy"
• "My stomach hurts and I feel nauseous"
• "I have a fever and body aches"

⚠️ Remember: This is for informational purposes only and should not replace professional medical advice.`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (inputText.trim() === '') {
      alert('Please describe your symptoms');
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      console.log('Using OpenAI API with key:', apiKey ? 'Configured' : 'Not configured');
      
      if (!apiKey || apiKey === 'your-openai-api-key-here') {
        throw new Error('OpenAI API key not configured. Please add your API key to the .env file.');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a helpful medical AI assistant for ApnaMed. 
              Analyze the user's symptoms and provide:
              1. Possible conditions (with confidence levels)
              2. Recommended next steps
              3. When to seek immediate medical attention
              4. General health advice

              Keep responses concise, empathetic, and easy to understand.
              Always remind users that this is not a substitute for professional medical advice.
              If symptoms seem serious, strongly recommend immediate medical attention.`
            },
            {
              role: 'user',
              content: userMessage.text
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: data.choices[0].message.content,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('OpenAI API Error:', error);

      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: `❌ Error: ${error.message}

Please check:
• Your OpenAI API key is correctly configured in the .env file
• You have sufficient API credits
• Your internet connection is working

⚠️ This is not a substitute for professional medical advice.`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      setMessages([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Symptom Checker</HeaderTitle>
        <HeaderSubtitle>AI-powered health analysis</HeaderSubtitle>
      </Header>

      <MessagesContainer>
        {messages.length === 0 ? (
          <WelcomeContainer>
            <WelcomeIcon>🔍</WelcomeIcon>
            <WelcomeTitle>Welcome to Symptom Checker</WelcomeTitle>
            <WelcomeText>
              Describe your symptoms and I'll help analyze them using AI.
              Remember, this is not a substitute for professional medical advice.
            </WelcomeText>
            <SampleSymptomsContainer>
              <SampleSymptomsTitle>💡 Example symptoms:</SampleSymptomsTitle>
              <SampleSymptomsText>• Headache and fever</SampleSymptomsText>
              <SampleSymptomsText>• Chest pain and shortness of breath</SampleSymptomsText>
              <SampleSymptomsText>• Stomach pain and nausea</SampleSymptomsText>
            </SampleSymptomsContainer>
          </WelcomeContainer>
        ) : (
          messages.map((message) => (
            <div key={message.id}>
              <MessageContainer isUser={message.sender === 'user'}>
                <MessageBubble isUser={message.sender === 'user'}>
                  <MessageHeader>
                    <MessageIcon>
                      {message.sender === 'user' ? '👤' : '🤖'}
                    </MessageIcon>
                    <MessageTime>{message.timestamp}</MessageTime>
                  </MessageHeader>
                  <MessageText>{message.text}</MessageText>
                </MessageBubble>
              </MessageContainer>
              
              {/* Add translation widget for AI messages */}
              {message.sender === 'ai' && (
                <TranslationWidget 
                  text={message.text}
                  onTranslationComplete={(translatedText, language) => {
                    console.log(`Translated to ${language}:`, translatedText);
                  }}
                />
              )}
            </div>
          ))
        )}
        
        {isLoading && (
          <LoadingContainer>
            <div style={{ fontSize: '16px', color: '#1976D2' }}>⏳</div>
            <LoadingText>Analyzing your symptoms...</LoadingText>
          </LoadingContainer>
        )}
      </MessagesContainer>

      <InputContainer>
        <InputRow>
          <TextInput
            placeholder="Describe your symptoms..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            maxLength={500}
          />
          <SendButton 
            onClick={sendMessage}
            disabled={isLoading || inputText.trim() === ''}
          >
            ✈️
          </SendButton>
        </InputRow>
        
        <ActionButtons>
          <ActionButton onClick={clearChat}>
            🗑️ Clear Chat
          </ActionButton>
          <ActionButton 
            isVideoConsult={true}
            onClick={() => navigate('/patient/video-consultation')}
          >
            🎥 Video Consult Doctor
          </ActionButton>
        </ActionButtons>
      </InputContainer>

      <DisclaimerContainer>
        <DisclaimerText>
          ⚠️ This AI symptom checker is for informational purposes only and should not replace professional medical advice. 
          If you have serious symptoms, please consult a doctor immediately.
        </DisclaimerText>
      </DisclaimerContainer>

      <EmergencyContainer>
        <EmergencyButton onClick={() => alert('Emergency contact activated!')}>
          🚨 Emergency Contact
        </EmergencyButton>
      </EmergencyContainer>
    </Container>
  );
};

export default PatientSymptomCheckerScreen;