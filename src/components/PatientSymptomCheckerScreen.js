import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TranslationWidget from "./TranslationWidget";
import enhancedOfflineSymptomAnalyzer from "../services/offlineSymptomService";
import networkStatusManager from "../utils/networkStatus";

const Container = styled.div`
  min-height: 100vh;
  background-color: #e3f2fd;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #1976d2;
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
  color: #e3f2fd;
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
  color: #1976d2;
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
  color: #1976d2;
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
  ${(props) => (props.isUser ? "margin-left: auto;" : "margin-right: auto;")}
`;

const MessageBubble = styled.div`
  background-color: ${(props) => (props.isUser ? "#1976D2" : "#FFFFFF")};
  color: ${(props) => (props.isUser ? "#FFFFFF" : "#333333")};
  border-radius: 15px;
  padding: 15px;
  box-shadow: ${(props) =>
    props.isUser ? "none" : "0 1px 2px rgba(0, 0, 0, 0.1)"};
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

  /* Preserve line breaks and whitespace */
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #ffffff;
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
  border-top: 1px solid #e0e0e0;
`;

const InputRow = styled.div`
  display: flex;
  align-items: flex-end;
  background-color: #f5f5f5;
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
  background-color: #1976d2;
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
    background-color: #1565c0;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const ActionButton = styled.button`
  background-color: ${(props) =>
    props.isVideoConsult ? "#1976D2" : "#E3F2FD"};
  color: ${(props) => (props.isVideoConsult ? "#FFFFFF" : "#1976D2")};
  border: 1px solid #1976d2;
  border-radius: 15px;
  padding: ${(props) => (props.isVideoConsult ? "12px 20px" : "8px 15px")};
  font-size: ${(props) => (props.isVideoConsult ? "14px" : "12px")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.isVideoConsult ? "#1565C0" : "#BBDEFB"};
    transform: ${(props) =>
      props.isVideoConsult ? "translateY(-1px)" : "none"};
  }
`;

const DisclaimerContainer = styled.div`
  padding: 10px 20px;
  background-color: #fff3e0;
  margin: 0 20px 10px 20px;
  border-radius: 10px;
  border-left: 4px solid #ff9800;
`;

const DisclaimerText = styled.p`
  font-size: 11px;
  color: #e65100;
  line-height: 16px;
`;

const EmergencyContainer = styled.div`
  padding: 0 20px 20px 20px;
`;

const EmergencyButton = styled.button`
  background-color: #f44336;
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
    background-color: #d32f2f;
  }
`;

const ModeToggleContainer = styled.div`
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModeToggleButton = styled.button`
  background-color: ${(props) => (props.isActive ? "#1976d2" : "white")};
  color: ${(props) => (props.isActive ? "white" : "#1976d2")};
  border: 1px solid #1976d2;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#1565c0" : "#e3f2fd")};
  }
`;

const NetworkStatus = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666;
`;

const StatusIndicator = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.isOnline ? "#4caf50" : "#f44336")};
  margin-right: 5px;
`;

const ConfidenceBar = styled.div`
  background-color: #f0f0f0;
  border-radius: 10px;
  height: 6px;
  margin: 8px 0;
  overflow: hidden;
`;

const ConfidenceLevel = styled.div`
  height: 100%;
  background-color: ${(props) => {
    if (props.confidence > 70) return "#4caf50";
    if (props.confidence > 50) return "#ff9800";
    return "#f44336";
  }};
  width: ${(props) => props.confidence}%;
  transition: width 0.3s ease;
`;

const ConfidenceText = styled.p`
  font-size: 11px;
  color: #666;
  margin: 0;
`;

const PredictionCard = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 12px;
  margin: 8px 0;
  border-left: 4px solid
    ${(props) => {
      if (props.confidence > 70) return "#4caf50";
      if (props.confidence > 50) return "#ff9800";
      return "#f44336";
    }};
`;

const PredictionTitle = styled.h4`
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: #333;
`;

const PredictionDescription = styled.p`
  font-size: 12px;
  color: #666;
  margin: 4px 0;
`;

const ExtractedSymptoms = styled.div`
  background-color: #e3f2fd;
  border-radius: 6px;
  padding: 8px;
  margin: 8px 0;
`;

const ExtractedSymptomsTitle = styled.p`
  font-size: 11px;
  font-weight: bold;
  color: #1976d2;
  margin: 0 0 4px 0;
`;

const SymptomTag = styled.span`
  background-color: #1976d2;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  margin: 2px 4px 2px 0;
  display: inline-block;
`;

const TipsContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  border-left: 4px solid #1976d2;
`;

const TipsTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 8px;
`;

const TipsText = styled.p`
  font-size: 12px;
  color: #666666;
  margin-bottom: 3px;
`;

/**
 * Utility function to format text with proper line breaks
 * Converts \n to <br /> for HTML rendering
 */
const formatTextWithLineBreaks = (text) => {
  if (!text) return "";
  return text
    .replace(/\n/g, "<br />")
    .replace(/\r\n/g, "<br />")
    .replace(/\r/g, "<br />");
};

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
      id: "welcome",
      text: formatTextWithLineBreaks(`Welcome to ApnaMed Medical Analysis!

I'm your AI medical assistant, ready to analyze your symptoms using advanced offline technology. I can help you understand your symptoms and provide evidence-based health guidance.

🤖 **Default Mode: Enhanced Offline Analysis**
• Works without internet connection
• Uses comprehensive medical database
• Provides confidence scores and detailed insights

**Example symptoms to describe:**
• "I have a severe headache and feel nauseous"
• "My chest hurts and I'm short of breath"
• "I have fever, cough, and body aches"
• "I feel dizzy and my heart is racing"

💡 You can switch to "Smarter Answers" mode for online AI analysis if needed.`),
      sender: "ai",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [useOfflineMode, setUseOfflineMode] = useState(true);
  const [isOfflineModelReady, setIsOfflineModelReady] = useState(false);

  useEffect(() => {
    // Initialize offline model
    initializeOfflineModel();

    // Setup network status monitoring
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  const initializeOfflineModel = async () => {
    try {
      console.log("Initializing enhanced offline symptom analyzer...");
      // Set ready immediately - the service will handle initialization internally
      setIsOfflineModelReady(true);

      // Initialize in background without blocking UI
      enhancedOfflineSymptomAnalyzer.initialize().catch((error) => {
        console.log(
          "Model training will continue in background:",
          error.message,
        );
      });

      console.log("Enhanced offline symptom analyzer ready for use");
    } catch (error) {
      console.error("Failed to initialize enhanced offline model:", error);
      // Still set ready so user can use rule-based analysis
      setIsOfflineModelReady(true);
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() === "") {
      alert("Please describe your symptoms");
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Check if we should use offline mode (default is offline)
      const shouldUseOnline =
        !useOfflineMode &&
        isOnline &&
        !networkStatusManager.shouldUseOfflineMode();

      console.log("Mode selection debug:", {
        useOfflineMode,
        isOnline,
        isOfflineModelReady,
        shouldUseOnline,
        networkShouldUseOffline: networkStatusManager.shouldUseOfflineMode(),
      });

      if (shouldUseOnline) {
        console.log("🌐 Using Smarter Answers analysis...");
        await handleOnlineAnalysis(userMessage.text);
      } else {
        console.log("🤖 Using enhanced offline symptom analysis...");
        await handleOfflineAnalysis(userMessage.text);
      }
    } catch (error) {
      console.error("Symptom analysis error:", error);

      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: formatTextWithLineBreaks(`❌ Error: ${error.message}

⚠️ This is not a substitute for professional medical advice.`),
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOfflineAnalysis = async (symptomText) => {
    try {
      const result =
        await enhancedOfflineSymptomAnalyzer.analyzeSymptomsOffline(
          symptomText,
        );

      let responseText = `🤖 **Medical Analysis** (Overall Confidence: ${result.confidence.toFixed(1)}%)\n\n`;

      if (result.emergencyAlert) {
        responseText += `🚨 **EMERGENCY ALERT** - Seek immediate medical attention!\n\n`;
      }

      if (result.extractedSymptoms.length > 0) {
        responseText += `**Detected Symptoms:** ${result.extractedSymptoms.join(", ")}\n\n`;
      }

      if (result.predictions.length > 0) {
        responseText += `**Top Medical Conditions:**\n\n`;
        result.predictions.slice(0, 3).forEach((pred, index) => {
          responseText += `**${index + 1}. ${pred.condition}** (${(pred.confidence * 100).toFixed(1)}% match)\n`;
          responseText += `   📋 ${pred.description}\n`;
          responseText += `   🏥 ICD-10: ${pred.icd10 || "N/A"}\n`;
          responseText += `   ⚠️ Severity: ${pred.severity}\n`;
          responseText += `   ⏱️ Duration: ${pred.duration}\n`;
          if (pred.matchedSymptoms && pred.matchedSymptoms.length > 0) {
            responseText += `   ✅ Matched symptoms: ${pred.matchedSymptoms.join(", ")}\n`;
          }
          responseText += `\n`;
        });
      }

      if (
        result.recommendedActions &&
        result.recommendedActions.actions.length > 0
      ) {
        responseText += `**Recommended Actions (${result.recommendedActions.urgency}):**\n`;
        result.recommendedActions.actions.forEach((action) => {
          responseText += `• ${action}\n`;
        });
        responseText += `\n`;
      }

      if (result.riskFactors && result.riskFactors.length > 0) {
        responseText += `**Risk Factors:**\n`;
        result.riskFactors.forEach((factor) => {
          responseText += `⚠️ ${factor}\n`;
        });
        responseText += `\n`;
      }

      responseText += result.message;

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: formatTextWithLineBreaks(responseText),
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
        isOffline: true,
        offlineData: result,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      throw new Error(`Offline analysis failed: ${error.message}`);
    }
  };

  const handleOnlineAnalysis = async (symptomText) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    console.log(
      "Using OpenAI API with key:",
      apiKey ? "Configured" : "Not configured",
    );

    if (!apiKey || apiKey === "your-openai-api-key-here") {
      throw new Error(
        "OpenAI API key not configured. Please add your API key to the .env file.",
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an advanced AI medical assistant for ApnaMed with enhanced diagnostic capabilities.

              As "Smarter Answers", you provide comprehensive symptom analysis with:
              - Advanced pattern recognition and medical reasoning
              - Evidence-based diagnostic suggestions with confidence levels
              - Risk stratification and urgency assessment
              - Personalized medical advice based on symptom severity
              - Treatment recommendations and follow-up guidance

              Instructions:
              - Analyze symptom patterns using medical knowledge
              - Provide detailed differential diagnosis with confidence percentages
              - Include severity assessment and urgency level
              - Recommend appropriate care settings (home care, clinic, ER)
              - Consider epidemiological factors and patient demographics
              - Provide clear next steps and warning signs to watch for
              - Always emphasize: "This is AI analysis, not a medical diagnosis. Consult a healthcare professional."
              - For severe/emergency symptoms: strongly recommend immediate medical attention`,
          },
          {
            role: "user",
            content: symptomText,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `OpenAI API Error: ${response.status} - ${errorData.error?.message || response.statusText}`,
      );
    }

    const data = await response.json();
    const aiMessage = {
      id: (Date.now() + 1).toString(),
      text: formatTextWithLineBreaks(data.choices[0].message.content),
      sender: "ai",
      timestamp: new Date().toLocaleTimeString(),
      isOffline: false,
    };

    setMessages((prev) => [...prev, aiMessage]);
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear all messages?")) {
      setMessages([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Medical Symptom Analyzer</HeaderTitle>
        <HeaderSubtitle>
          Enhanced offline medical analysis with AI insights
        </HeaderSubtitle>
      </Header>

      <ModeToggleContainer>
        <NetworkStatus>
          <StatusIndicator isOnline={isOnline} />
          {useOfflineMode
            ? "Offline Mode"
            : isOnline
              ? "Smarter Answers Ready"
              : "Offline (No Internet)"}
        </NetworkStatus>

        <div>
          <ModeToggleButton
            isActive={useOfflineMode}
            onClick={() => setUseOfflineMode(true)}
          >
            🤖 Offline Mode
          </ModeToggleButton>
          <ModeToggleButton
            isActive={!useOfflineMode}
            onClick={() => setUseOfflineMode(false)}
            disabled={!isOnline}
          >
            🌐 Smarter Answers
          </ModeToggleButton>
        </div>
      </ModeToggleContainer>

      <MessagesContainer>
        {messages.length === 0 ? (
          <WelcomeContainer>
            <WelcomeIcon>🔍</WelcomeIcon>
            <WelcomeTitle>Enhanced Medical Analysis</WelcomeTitle>
            <WelcomeText>
              Describe your symptoms and get comprehensive medical analysis
              using our advanced offline AI system. Includes confidence scores,
              risk assessment, and detailed medical guidance.
            </WelcomeText>
            <SampleSymptomsContainer>
              <SampleSymptomsTitle>
                💡 Try describing symptoms like:
              </SampleSymptomsTitle>
              <SampleSymptomsText>
                • "I have severe chest pain and trouble breathing"
              </SampleSymptomsText>
              <SampleSymptomsText>
                • "My head hurts badly and I feel dizzy and nauseous"
              </SampleSymptomsText>
              <SampleSymptomsText>
                • "I have high fever, cough, and body aches"
              </SampleSymptomsText>
            </SampleSymptomsContainer>
          </WelcomeContainer>
        ) : (
          messages.map((message) => (
            <div key={message.id}>
              <MessageContainer isUser={message.sender === "user"}>
                <MessageBubble isUser={message.sender === "user"}>
                  <MessageHeader>
                    <MessageIcon>
                      {message.sender === "user" ? "👤" : "🤖"}
                    </MessageIcon>
                    <MessageTime>{message.timestamp}</MessageTime>
                  </MessageHeader>
                  <MessageText
                    dangerouslySetInnerHTML={{
                      __html:
                        message.sender === "user"
                          ? formatTextWithLineBreaks(message.text)
                          : message.text,
                    }}
                  />

                  {message.isOffline && message.offlineData && (
                    <>
                      {message.offlineData.extractedSymptoms.length > 0 && (
                        <ExtractedSymptoms>
                          <ExtractedSymptomsTitle>
                            Detected Symptoms:
                          </ExtractedSymptomsTitle>
                          {message.offlineData.extractedSymptoms.map(
                            (symptom, index) => (
                              <SymptomTag key={index}>{symptom}</SymptomTag>
                            ),
                          )}
                        </ExtractedSymptoms>
                      )}

                      {message.offlineData.predictions
                        .slice(0, 3)
                        .map((prediction, index) => (
                          <PredictionCard
                            key={index}
                            confidence={prediction.confidence * 100}
                          >
                            <PredictionTitle>
                              {prediction.condition}
                              {prediction.icd10 && ` (${prediction.icd10})`}
                            </PredictionTitle>
                            <ConfidenceBar>
                              <ConfidenceLevel
                                confidence={prediction.confidence * 100}
                              />
                            </ConfidenceBar>
                            <ConfidenceText>
                              Match: {(prediction.confidence * 100).toFixed(1)}%
                              {prediction.prevalence &&
                                ` • Prevalence: ${(prediction.prevalence * 100).toFixed(1)}%`}
                            </ConfidenceText>
                            <PredictionDescription>
                              {prediction.description}
                            </PredictionDescription>
                            {prediction.matchedSymptoms &&
                              prediction.matchedSymptoms.length > 0 && (
                                <PredictionDescription>
                                  <strong>Matched symptoms:</strong>{" "}
                                  {prediction.matchedSymptoms.join(", ")}
                                </PredictionDescription>
                              )}
                            {prediction.duration && (
                              <PredictionDescription>
                                <strong>Duration:</strong> {prediction.duration}
                              </PredictionDescription>
                            )}
                            {prediction.treatment && (
                              <PredictionDescription>
                                <strong>Treatment:</strong>{" "}
                                {prediction.treatment}
                              </PredictionDescription>
                            )}
                          </PredictionCard>
                        ))}

                      {message.offlineData.emergencyAlert && (
                        <PredictionCard confidence={100}>
                          <PredictionTitle
                            style={{ color: "#f44336" }}
                          ></PredictionTitle>
                          <PredictionDescription
                            style={{ color: "#f44336", fontWeight: "bold" }}
                          >
                            Your symptoms may indicate a medical emergency. Seek
                            immediate medical attention.
                          </PredictionDescription>
                        </PredictionCard>
                      )}

                      {message.offlineData.recommendedActions && (
                        <PredictionCard confidence={80}>
                          <PredictionTitle>
                            📋 Recommended Actions (
                            {message.offlineData.recommendedActions.urgency})
                          </PredictionTitle>
                          <PredictionDescription>
                            <strong>Timeframe:</strong>{" "}
                            {message.offlineData.recommendedActions.timeframe}
                          </PredictionDescription>
                          {message.offlineData.recommendedActions.actions.map(
                            (action, idx) => (
                              <PredictionDescription key={idx}>
                                • {action}
                              </PredictionDescription>
                            ),
                          )}
                        </PredictionCard>
                      )}
                    </>
                  )}
                </MessageBubble>
              </MessageContainer>

              {/* Add translation widget for AI messages */}
              {message.sender === "ai" && (
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
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            <LoadingText>
              {useOfflineMode
                ? "Running comprehensive medical analysis..."
                : "Connecting to Smarter Answers AI..."}
            </LoadingText>
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
            disabled={isLoading || inputText.trim() === ""}
          >
            ✈️
          </SendButton>
        </InputRow>

        <ActionButtons>
          <ActionButton onClick={clearChat}>🗑️ Clear Chat</ActionButton>
          <ActionButton
            isVideoConsult={true}
            onClick={() => navigate("/patient/video-consultation")}
          >
            🎥 Video Consult Doctor
          </ActionButton>
        </ActionButtons>
      </InputContainer>

      <DisclaimerContainer>
        <DisclaimerText>
          ⚠️ Enhanced AI Medical Analysis: This advanced offline system provides
          comprehensive symptom analysis with confidence scores and medical
          insights. For informational purposes only - not a substitute for
          professional medical diagnosis. Always consult healthcare
          professionals for medical decisions.
        </DisclaimerText>
      </DisclaimerContainer>

      <TipsContainer>
        <TipsTitle>💡 Enhanced Analysis Features:</TipsTitle>
        <TipsText>
          • Works completely offline with comprehensive medical database
        </TipsText>
        <TipsText>• Provides confidence scores and risk assessments</TipsText>
        <TipsText>
          • Includes ICD-10 codes and detailed condition information
        </TipsText>
        <TipsText>
          • Switch to "Smarter Answers" for online AI assistance
        </TipsText>
      </TipsContainer>

      <EmergencyContainer>
        <EmergencyButton onClick={() => alert("Emergency contact activated!")}>
          🚨 Emergency Contact
        </EmergencyButton>
      </EmergencyContainer>
    </Container>
  );
};

export default PatientSymptomCheckerScreen;
