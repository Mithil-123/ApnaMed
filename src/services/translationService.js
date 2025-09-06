/**
 * Translation Service
 *
 * Provides translation functionality using Google Translate API
 * For demo purposes, we'll use a free translation service
 */

// Free translation API endpoint (for demo purposes)
const TRANSLATE_API_URL = "https://api.mymemory.translated.net/get";

/**
 * Translate text to target language
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code (e.g., 'es', 'fr', 'hi')
 * @param {string} sourceLang - Source language code (default: 'en')
 * @returns {Promise<string>} Translated text
 */
export const translateText = async (text, targetLang, sourceLang = "en") => {
  try {
    if (!text || !targetLang) {
      throw new Error("Text and target language are required");
    }

    // If target language is same as source, return original text
    if (targetLang === sourceLang) {
      return text;
    }

    const response = await fetch(
      `${TRANSLATE_API_URL}?q=${encodeURIComponent(
        text
      )}&langpair=${sourceLang}|${targetLang}`
    );

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData) {
      return data.responseData.translatedText;
    } else {
      throw new Error("Translation failed");
    }
  } catch (error) {
    console.error("Translation error:", error);
    // Fallback: return original text with error message
    return `${text} [Translation failed: ${error.message}]`;
  }
};

/**
 * Supported languages for translation
 */
export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
];

/**
 * Get language name by code
 * @param {string} code - Language code
 * @returns {string} Language name
 */
export const getLanguageName = (code) => {
  const language = SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
  return language ? language.name : code;
};

/**
 * Get language flag by code
 * @param {string} code - Language code
 * @returns {string} Language flag emoji
 */
export const getLanguageFlag = (code) => {
  const language = SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
  return language ? language.flag : "🌐";
};
