/**
 * 100ms.live JWT Token Validator
 * 
 * Utility functions to validate and debug JWT tokens for 100ms.live integration
 */

/**
 * Validates if a token is in proper JWT format
 * @param {string} token - The JWT token to validate
 * @returns {boolean} - True if token is valid JWT format
 */
export const isValidJWTFormat = (token) => {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }
  
  // Check if each part is base64 encoded
  try {
    parts.forEach(part => {
      if (part.length === 0) {
        throw new Error('Empty part');
      }
      // Add padding if needed for base64 decoding
      const paddedPart = part + '='.repeat((4 - part.length % 4) % 4);
      atob(paddedPart);
    });
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Decodes JWT payload (without verification)
 * @param {string} token - The JWT token
 * @returns {object|null} - Decoded payload or null if invalid
 */
export const decodeJWTPayload = (token) => {
  if (!isValidJWTFormat(token)) {
    return null;
  }
  
  try {
    const parts = token.split('.');
    const payload = parts[1];
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    const decodedPayload = atob(paddedPayload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding JWT payload:', error);
    return null;
  }
};

/**
 * Validates 100ms.live specific token requirements
 * @param {string} token - The JWT token
 * @returns {object} - Validation result with details
 */
export const validate100msToken = (token) => {
  const result = {
    isValid: false,
    errors: [],
    payload: null
  };
  
  // Check JWT format
  if (!isValidJWTFormat(token)) {
    result.errors.push('Token is not in proper JWT format (expected 3 parts separated by dots)');
    return result;
  }
  
  // Decode payload
  const payload = decodeJWTPayload(token);
  if (!payload) {
    result.errors.push('Unable to decode JWT payload');
    return result;
  }
  
  result.payload = payload;
  
  // Check required fields for 100ms.live
  const requiredFields = ['sub', 'role', 'exp'];
  requiredFields.forEach(field => {
    if (!payload[field]) {
      result.errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Check expiration
  if (payload.exp) {
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      result.errors.push('Token has expired');
    }
  }
  
  // Check role
  if (payload.role && !['doctor', 'patient', 'host', 'guest'].includes(payload.role)) {
    result.errors.push(`Invalid role: ${payload.role}. Expected: doctor, patient, host, or guest`);
  }
  
  result.isValid = result.errors.length === 0;
  return result;
};

/**
 * Debug function to log token information
 * @param {string} token - The JWT token to debug
 */
export const debugToken = (token) => {
  console.group('🔍 JWT Token Debug');
  console.log('Token:', token);
  console.log('Is Valid JWT Format:', isValidJWTFormat(token));
  
  const validation = validate100msToken(token);
  console.log('Validation Result:', validation);
  
  if (validation.payload) {
    console.log('Token Payload:', validation.payload);
    console.log('Expires:', new Date(validation.payload.exp * 1000).toLocaleString());
    console.log('Role:', validation.payload.role);
    console.log('Subject:', validation.payload.sub);
  }
  
  if (validation.errors.length > 0) {
    console.error('Validation Errors:', validation.errors);
  }
  
  console.groupEnd();
};
