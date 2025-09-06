import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  translateText,
  SUPPORTED_LANGUAGES,
  getLanguageName,
  getLanguageFlag,
} from "../services/translationService";

const TranslationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e9ecef;
`;

const TranslationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  color: #495057;
`;

const LanguageSelector = styled.select`
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const TranslateButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const TranslatedText = styled.div`
  padding: 12px;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
  color: #495057;
  min-height: 40px;

  /* Preserve line breaks and whitespace */
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
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
 * Translation Widget Component
 *
 * Provides translation functionality for text content
 * Features:
 * - Language selection dropdown
 * - Translate button
 * - Translated text display
 * - Loading states and error handling
 */
const TranslationWidget = ({ text, onTranslationComplete }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState("");

  // Clear translated text when original text changes
  useEffect(() => {
    setTranslatedText("");
    setError("");
  }, [text]);

  const handleTranslate = async () => {
    if (!text || !text.trim()) {
      setError("No text to translate");
      return;
    }

    setIsTranslating(true);
    setError("");

    try {
      // Strip HTML tags from the original text for translation
      const plainTextForTranslation = text
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const result = await translateText(
        plainTextForTranslation,
        selectedLanguage,
      );

      // Apply line break formatting to the translated result
      setTranslatedText(formatTextWithLineBreaks(result));

      // Notify parent component if callback provided
      if (onTranslationComplete) {
        onTranslationComplete(result, selectedLanguage);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setTranslatedText("");
    setError("");
  };

  return (
    <TranslationContainer>
      <TranslationHeader>
        🌐 Translate to:
        <LanguageSelector
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </LanguageSelector>
        <TranslateButton
          onClick={handleTranslate}
          disabled={isTranslating || !text || !text.trim()}
        >
          {isTranslating ? (
            <>
              <LoadingSpinner />
              Translating...
            </>
          ) : (
            <>🔄 Translate</>
          )}
        </TranslateButton>
      </TranslationHeader>

      {translatedText && (
        <TranslatedText>
          <strong>
            {getLanguageFlag(selectedLanguage)}{" "}
            {getLanguageName(selectedLanguage)}:
          </strong>
          <br />
          <div dangerouslySetInnerHTML={{ __html: translatedText }} />
        </TranslatedText>
      )}

      {error && <ErrorMessage>⚠️ {error}</ErrorMessage>}
    </TranslationContainer>
  );
};

export default TranslationWidget;
