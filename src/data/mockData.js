/**
 * Mock Data and API Simulation Functions - Web Version
 *
 * This file contains all the mock data and simulated API calls for the ApnaMed web application.
 * In a real application, these would be replaced with actual API calls to a backend service.
 */

// Disease surveillance data - monthly infection rates
export const diseaseData = {
  Jan: {
    Dengue: 0.009,
    Malaria: 0.02,
    "Diarrheal Diseases": 0.027,
    Typhoid: 0.013,
    "Skin Infections": 0.019,
    Hypertension: 0.055,
    "Respiratory Illness": 0.071,
    Cancer: 0.002,
  },
  Feb: {
    Dengue: 0.011,
    Malaria: 0.016,
    "Diarrheal Diseases": 0.025,
    Typhoid: 0.009,
    "Skin Infections": 0.024,
    Hypertension: 0.049,
    "Respiratory Illness": 0.084,
    Cancer: 0.003,
  },
  Mar: {
    Dengue: 0.011,
    Malaria: 0.017,
    "Diarrheal Diseases": 0.03,
    Typhoid: 0.012,
    "Skin Infections": 0.021,
    Hypertension: 0.059,
    "Respiratory Illness": 0.041,
    Cancer: 0.002,
  },
  Apr: {
    Dengue: 0.018,
    Malaria: 0.028,
    "Diarrheal Diseases": 0.03,
    Typhoid: 0.019,
    "Skin Infections": 0.036,
    Hypertension: 0.055,
    "Respiratory Illness": 0.033,
    Cancer: 0.002,
  },
  May: {
    Dengue: 0.014,
    Malaria: 0.03,
    "Diarrheal Diseases": 0.032,
    Typhoid: 0.014,
    "Skin Infections": 0.038,
    Hypertension: 0.062,
    "Respiratory Illness": 0.039,
    Cancer: 0.003,
  },
  Jun: {
    Dengue: 0.017,
    Malaria: 0.02,
    "Diarrheal Diseases": 0.054,
    Typhoid: 0.014,
    "Skin Infections": 0.036,
    Hypertension: 0.057,
    "Respiratory Illness": 0.033,
    Cancer: 0.002,
  },
  Jul: {
    Dengue: 0.041,
    Malaria: 0.052,
    "Diarrheal Diseases": 0.054,
    Typhoid: 0.028,
    "Skin Infections": 0.02,
    Hypertension: 0.061,
    "Respiratory Illness": 0.032,
    Cancer: 0.003,
  },
  Aug: {
    Dengue: 0.043,
    Malaria: 0.052,
    "Diarrheal Diseases": 0.059,
    Typhoid: 0.028,
    "Skin Infections": 0.023,
    Hypertension: 0.058,
    "Respiratory Illness": 0.035,
    Cancer: 0.002,
  },
  Sep: {
    Dengue: 0.034,
    Malaria: 0.059,
    "Diarrheal Diseases": 0.032,
    Typhoid: 0.031,
    "Skin Infections": 0.024,
    Hypertension: 0.059,
    "Respiratory Illness": 0.034,
    Cancer: 0.003,
  },
  Oct: {
    Dengue: 0.02,
    Malaria: 0.019,
    "Diarrheal Diseases": 0.03,
    Typhoid: 0.015,
    "Skin Infections": 0.021,
    Hypertension: 0.071,
    "Respiratory Illness": 0.039,
    Cancer: 0.003,
  },
  Nov: {
    Dengue: 0.015,
    Malaria: 0.025,
    "Diarrheal Diseases": 0.028,
    Typhoid: 0.015,
    "Skin Infections": 0.019,
    Hypertension: 0.055,
    "Respiratory Illness": 0.045,
    Cancer: 0.003,
  },
  Dec: {
    Dengue: 0.02,
    Malaria: 0.028,
    "Diarrheal Diseases": 0.021,
    Typhoid: 0.014,
    "Skin Infections": 0.02,
    Hypertension: 0.068,
    "Respiratory Illness": 0.085,
    Cancer: 0.003,
  },
};

// Current disease surveillance data (simulated real-time data for September 2024)
export const currentDiseaseData = {
  Dengue: 0.03, // Normal range (Sep historical: 0.034)
  Malaria: 0.095, // EMERGENCY: Significantly elevated from Sep historical (0.059)
  "Diarrheal Diseases": 0.031, // Normal range (Sep historical: 0.032)
  Typhoid: 0.028, // Normal range (Sep historical: 0.031)
  "Skin Infections": 0.022, // Normal range (Sep historical: 0.024)
  Hypertension: 0.056, // Normal range (Sep historical: 0.059)
  "Respiratory Illness": 0.032, // Normal range (Sep historical: 0.034)
  Cancer: 0.003, // Normal range (Sep historical: 0.003)
};

// Warning thresholds (percentage above average)
export const warningThresholds = {
  Dengue: 0.5, // 50% above average
  Malaria: 0.5,
  "Diarrheal Diseases": 0.4,
  Typhoid: 0.6,
  "Skin Infections": 0.45,
  Hypertension: 0.3,
  "Respiratory Illness": 0.35,
  Cancer: 0.75,
};

// Mock patient data
export const mockPatients = [
  {
    id: "P001",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    avatar: "👨",
    symptoms: "Fever, cough",
    priority: "High",
    waitingTime: "5 mins",
    medicalHistory: ["Diabetes", "Hypertension"],
    allergies: ["Penicillin"],
    currentMedications: ["Metformin", "Lisinopril"],
    diagnosis: "Respiratory Illness",
  },
  {
    id: "P002",
    name: "Priya Sharma",
    age: 32,
    gender: "Female",
    avatar: "👩",
    symptoms: "Headache, nausea",
    priority: "Medium",
    waitingTime: "10 mins",
    medicalHistory: ["Migraine"],
    allergies: ["None"],
    currentMedications: ["Ibuprofen"],
    diagnosis: "Hypertension",
  },
  {
    id: "P003",
    name: "Amit Singh",
    age: 28,
    gender: "Male",
    avatar: "👨",
    symptoms: "Chest pain",
    priority: "High",
    waitingTime: "2 mins",
    medicalHistory: ["None"],
    allergies: ["Aspirin"],
    currentMedications: ["None"],
    diagnosis: "Dengue",
  },
  {
    id: "P004",
    name: "Sunita Devi",
    age: 38,
    gender: "Female",
    avatar: "👩",
    symptoms: "Stomach pain, diarrhea",
    priority: "Medium",
    waitingTime: "8 mins",
    medicalHistory: ["None"],
    allergies: ["None"],
    currentMedications: ["ORS"],
    diagnosis: "Diarrheal Diseases",
  },
  {
    id: "P005",
    name: "Vikram Joshi",
    age: 52,
    gender: "Male",
    avatar: "👨",
    symptoms: "High fever, body ache",
    priority: "High",
    waitingTime: "3 mins",
    medicalHistory: ["Arthritis"],
    allergies: ["Sulfa drugs"],
    currentMedications: ["Paracetamol"],
    diagnosis: "Malaria",
  },
  {
    id: "P006",
    name: "Meera Patel",
    age: 29,
    gender: "Female",
    avatar: "👩",
    symptoms: "Skin rash, itching",
    priority: "Low",
    waitingTime: "15 mins",
    medicalHistory: ["Eczema"],
    allergies: ["Latex"],
    currentMedications: ["Antihistamine"],
    diagnosis: "Skin Infections",
  },
  {
    id: "P007",
    name: "Arun Kumar",
    age: 41,
    gender: "Male",
    avatar: "👨",
    symptoms: "Fever, abdominal pain",
    priority: "Medium",
    waitingTime: "12 mins",
    medicalHistory: ["None"],
    allergies: ["None"],
    currentMedications: ["Paracetamol"],
    diagnosis: "Typhoid",
  },
  {
    id: "P008",
    name: "Kavita Singh",
    age: 35,
    gender: "Female",
    avatar: "👩",
    symptoms: "Fever, joint pain",
    priority: "High",
    waitingTime: "4 mins",
    medicalHistory: ["None"],
    allergies: ["Penicillin"],
    currentMedications: ["Ibuprofen"],
    diagnosis: "Dengue",
  },
  {
    id: "P009",
    name: "Ramesh Gupta",
    age: 48,
    gender: "Male",
    avatar: "👨",
    symptoms: "Persistent cough, fatigue",
    priority: "Medium",
    waitingTime: "7 mins",
    medicalHistory: ["Smoking history"],
    allergies: ["None"],
    currentMedications: ["Cough syrup"],
    diagnosis: "Respiratory Illness",
  },
  {
    id: "P010",
    name: "Anjali Reddy",
    age: 26,
    gender: "Female",
    avatar: "👩",
    symptoms: "Nausea, fever",
    priority: "Medium",
    waitingTime: "9 mins",
    medicalHistory: ["None"],
    allergies: ["None"],
    currentMedications: ["Anti-nausea medication"],
    diagnosis: "Malaria",
  },
];

// Mock doctor data
export const mockDoctors = [
  {
    id: "D001",
    name: "Dr. Anjali Patel",
    specialization: "General Medicine",
    avatar: "👩‍⚕️",
    rating: 4.8,
    experience: "10 years",
    available: true,
    languages: ["English", "Hindi", "Gujarati"],
  },
  {
    id: "D002",
    name: "Dr. Rajesh Verma",
    specialization: "Cardiology",
    avatar: "👨‍⚕️",
    rating: 4.9,
    experience: "15 years",
    available: true,
    languages: ["English", "Hindi", "Punjabi"],
  },
  {
    id: "D003",
    name: "Dr. Sunita Reddy",
    specialization: "Pediatrics",
    avatar: "👩‍⚕️",
    rating: 4.7,
    experience: "8 years",
    available: true,
    languages: ["English", "Hindi", "Telugu", "Tamil"],
  },
  {
    id: "D004",
    name: "Dr. Ahmed Hassan",
    specialization: "Orthopedics",
    avatar: "👨‍⚕️",
    rating: 4.6,
    experience: "12 years",
    available: true,
    languages: ["English", "Arabic", "Urdu"],
  },
  {
    id: "D005",
    name: "Dr. Maria Fernandez",
    specialization: "Dermatology",
    avatar: "👩‍⚕️",
    rating: 4.9,
    experience: "7 years",
    available: false,
    languages: ["English", "Spanish", "Hindi"],
  },
  {
    id: "D006",
    name: "Dr. Vikram Joshi",
    specialization: "Neurology",
    avatar: "👨‍⚕️",
    rating: 4.8,
    experience: "18 years",
    available: true,
    languages: ["English", "Hindi", "Marathi", "Bengali"],
  },
  {
    id: "D007",
    name: "Dr. Lisa Chen",
    specialization: "Psychiatry",
    avatar: "👩‍⚕️",
    rating: 4.5,
    experience: "9 years",
    available: true,
    languages: ["English", "Mandarin", "Hindi"],
  },
];

// Mock pharmacy data
export const mockPharmacies = [
  {
    id: "PH001",
    name: "Apollo Pharmacy",
    address: "123 Main Street, City Center",
    distance: "0.5 km",
    phone: "+91-9876543210",
    available: true,
    medicines: ["Paracetamol", "Amoxicillin", "Metformin"],
  },
  {
    id: "PH002",
    name: "MedPlus Pharmacy",
    address: "456 Park Avenue, Downtown",
    distance: "1.2 km",
    phone: "+91-9876543211",
    available: true,
    medicines: ["Ibuprofen", "Ciprofloxacin", "Lisinopril"],
  },
  {
    id: "PH003",
    name: "Wellness Pharmacy",
    address: "789 Health Plaza, Suburb",
    distance: "2.1 km",
    phone: "+91-9876543212",
    available: false,
    medicines: ["Aspirin", "Omeprazole"],
  },
];

// Mock prescription data
export const mockPrescriptions = [
  {
    id: "RX001",
    patientId: "P001",
    doctorId: "D001",
    date: "2024-01-15",
    medicines: [
      {
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "Twice daily",
        duration: "5 days",
        instructions: "Take with food",
      },
      {
        name: "Amoxicillin",
        dosage: "250mg",
        frequency: "Three times daily",
        duration: "7 days",
        instructions: "Take before meals",
      },
    ],
    notes:
      "Patient has fever and cough. Complete the full course of antibiotics.",
  },
  {
    id: "RX002",
    patientId: "P002",
    doctorId: "D001",
    date: "2024-01-14",
    medicines: [
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "As needed",
        duration: "3 days",
        instructions: "Take with water",
      },
    ],
    notes: "For headache relief. Do not exceed 3 tablets per day.",
  },
];

// Mock health records
export const mockHealthRecords = {
  P001: {
    patientId: "P001",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    bloodGroup: "B+",
    height: "170 cm",
    weight: "75 kg",
    bmi: "25.9",
    vitalSigns: {
      bloodPressure: "140/90",
      heartRate: "85 bpm",
      temperature: "98.6°F",
      lastUpdated: "2024-01-15",
    },
    medicalHistory: ["Diabetes Type 2", "Hypertension"],
    allergies: ["Penicillin", "Shellfish"],
    currentMedications: ["Metformin 500mg", "Lisinopril 10mg"],
    recentVisits: [
      {
        date: "2024-01-15",
        doctor: "Dr. Anjali Patel",
        reason: "Fever and cough",
        diagnosis: "Respiratory Illness",
      },
      {
        date: "2024-01-01",
        doctor: "Dr. Rajesh Verma",
        reason: "Routine checkup",
        diagnosis: "Stable condition",
      },
    ],
  },
  P002: {
    patientId: "P002",
    name: "Priya Sharma",
    age: 32,
    gender: "Female",
    bloodGroup: "A+",
    height: "165 cm",
    weight: "60 kg",
    bmi: "22.0",
    vitalSigns: {
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      temperature: "98.4°F",
      lastUpdated: "2024-01-14",
    },
    medicalHistory: ["Migraine"],
    allergies: ["None"],
    currentMedications: ["Ibuprofen 400mg"],
    recentVisits: [
      {
        date: "2024-01-14",
        doctor: "Dr. Anjali Patel",
        reason: "Headache and nausea",
        diagnosis: "Hypertension",
      },
    ],
  },
  P003: {
    patientId: "P003",
    name: "Amit Singh",
    age: 28,
    gender: "Male",
    bloodGroup: "O+",
    height: "175 cm",
    weight: "70 kg",
    bmi: "22.9",
    vitalSigns: {
      bloodPressure: "110/70",
      heartRate: "68 bpm",
      temperature: "98.2°F",
      lastUpdated: "2024-01-13",
    },
    medicalHistory: ["None"],
    allergies: ["Aspirin"],
    currentMedications: ["None"],
    recentVisits: [
      {
        date: "2024-01-13",
        doctor: "Dr. Rajesh Verma",
        reason: "Chest pain",
        diagnosis: "Dengue",
      },
    ],
  },
  P004: {
    patientId: "P004",
    name: "Sunita Devi",
    age: 38,
    gender: "Female",
    bloodGroup: "AB+",
    height: "160 cm",
    weight: "65 kg",
    bmi: "25.4",
    vitalSigns: {
      bloodPressure: "130/85",
      heartRate: "78 bpm",
      temperature: "99.2°F",
      lastUpdated: "2024-01-16",
    },
    medicalHistory: ["None"],
    allergies: ["None"],
    currentMedications: ["ORS"],
    recentVisits: [
      {
        date: "2024-01-16",
        doctor: "Dr. Anjali Patel",
        reason: "Stomach pain and diarrhea",
        diagnosis: "Diarrheal Diseases",
      },
    ],
  },
  P005: {
    patientId: "P005",
    name: "Vikram Joshi",
    age: 52,
    gender: "Male",
    bloodGroup: "O-",
    height: "168 cm",
    weight: "80 kg",
    bmi: "28.3",
    vitalSigns: {
      bloodPressure: "150/95",
      heartRate: "90 bpm",
      temperature: "101.4°F",
      lastUpdated: "2024-01-16",
    },
    medicalHistory: ["Arthritis"],
    allergies: ["Sulfa drugs"],
    currentMedications: ["Paracetamol"],
    recentVisits: [
      {
        date: "2024-01-16",
        doctor: "Dr. Rajesh Verma",
        reason: "High fever and body ache",
        diagnosis: "Malaria",
      },
    ],
  },
  P006: {
    patientId: "P006",
    name: "Meera Patel",
    age: 29,
    gender: "Female",
    bloodGroup: "A-",
    height: "162 cm",
    weight: "55 kg",
    bmi: "21.0",
    vitalSigns: {
      bloodPressure: "115/75",
      heartRate: "70 bpm",
      temperature: "98.8°F",
      lastUpdated: "2024-01-15",
    },
    medicalHistory: ["Eczema"],
    allergies: ["Latex"],
    currentMedications: ["Antihistamine"],
    recentVisits: [
      {
        date: "2024-01-15",
        doctor: "Dr. Maria Fernandez",
        reason: "Skin rash and itching",
        diagnosis: "Skin Infections",
      },
    ],
  },
  P007: {
    patientId: "P007",
    name: "Arun Kumar",
    age: 41,
    gender: "Male",
    bloodGroup: "B-",
    height: "172 cm",
    weight: "78 kg",
    bmi: "26.4",
    vitalSigns: {
      bloodPressure: "135/88",
      heartRate: "82 bpm",
      temperature: "100.6°F",
      lastUpdated: "2024-01-16",
    },
    medicalHistory: ["None"],
    allergies: ["None"],
    currentMedications: ["Paracetamol"],
    recentVisits: [
      {
        date: "2024-01-16",
        doctor: "Dr. Anjali Patel",
        reason: "Fever and abdominal pain",
        diagnosis: "Typhoid",
      },
    ],
  },
  P008: {
    patientId: "P008",
    name: "Kavita Singh",
    age: 35,
    gender: "Female",
    bloodGroup: "O+",
    height: "158 cm",
    weight: "62 kg",
    bmi: "24.8",
    vitalSigns: {
      bloodPressure: "125/82",
      heartRate: "88 bpm",
      temperature: "102.1°F",
      lastUpdated: "2024-01-16",
    },
    medicalHistory: ["None"],
    allergies: ["Penicillin"],
    currentMedications: ["Ibuprofen"],
    recentVisits: [
      {
        date: "2024-01-16",
        doctor: "Dr. Rajesh Verma",
        reason: "Fever and joint pain",
        diagnosis: "Dengue",
      },
    ],
  },
  P009: {
    patientId: "P009",
    name: "Ramesh Gupta",
    age: 48,
    gender: "Male",
    bloodGroup: "AB-",
    height: "174 cm",
    weight: "85 kg",
    bmi: "28.1",
    vitalSigns: {
      bloodPressure: "145/92",
      heartRate: "86 bpm",
      temperature: "99.8°F",
      lastUpdated: "2024-01-15",
    },
    medicalHistory: ["Smoking history"],
    allergies: ["None"],
    currentMedications: ["Cough syrup"],
    recentVisits: [
      {
        date: "2024-01-15",
        doctor: "Dr. Sunita Reddy",
        reason: "Persistent cough and fatigue",
        diagnosis: "Respiratory Illness",
      },
    ],
  },
  P010: {
    patientId: "P010",
    name: "Anjali Reddy",
    age: 26,
    gender: "Female",
    bloodGroup: "A+",
    height: "164 cm",
    weight: "58 kg",
    bmi: "21.6",
    vitalSigns: {
      bloodPressure: "118/76",
      heartRate: "74 bpm",
      temperature: "100.9°F",
      lastUpdated: "2024-01-16",
    },
    medicalHistory: ["None"],
    allergies: ["None"],
    currentMedications: ["Anti-nausea medication"],
    recentVisits: [
      {
        date: "2024-01-16",
        doctor: "Dr. Anjali Patel",
        reason: "Nausea and fever",
        diagnosis: "Malaria",
      },
    ],
  },
};

/**
 * Simulated API Functions
 * These functions simulate network calls with delays and return promises
 */

// Simulate network delay
const simulateDelay = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch patient records by patient ID
 * @param {string} patientId - The patient's ID
 * @returns {Promise<Object>} Patient's health records
 */
export const fetchPatientRecords = async (patientId) => {
  await simulateDelay(800);
  return mockHealthRecords[patientId] || null;
};

/**
 * Fetch all patients in the queue
 * @returns {Promise<Array>} Array of patients waiting for consultation
 */
export const fetchPatientQueue = async () => {
  await simulateDelay(500);
  return mockPatients.filter(
    (patient) => patient.priority === "High" || patient.priority === "Medium",
  );
};

/**
 * Fetch available doctors
 * @returns {Promise<Array>} Array of available doctors
 */
export const fetchAvailableDoctors = async () => {
  await simulateDelay(600);
  return mockDoctors.filter((doctor) => doctor.available);
};

/**
 * Fetch patient's health records
 * @param {string} patientId - The patient's ID
 * @returns {Promise<Object>} Patient's health records
 */
export const fetchMyHealthRecords = async (patientId) => {
  await simulateDelay(700);
  return mockHealthRecords[patientId] || null;
};

/**
 * Fetch patient's prescriptions
 * @param {string} patientId - The patient's ID
 * @returns {Promise<Array>} Array of prescriptions
 */
export const fetchMyPrescriptions = async (patientId) => {
  await simulateDelay(600);
  return mockPrescriptions.filter(
    (prescription) => prescription.patientId === patientId,
  );
};

/**
 * Find pharmacies that have a specific medicine
 * @param {string} medicineName - Name of the medicine
 * @returns {Promise<Array>} Array of pharmacies with the medicine
 */
export const findPharmaciesWithMedicine = async (medicineName) => {
  await simulateDelay(800);
  return mockPharmacies.filter((pharmacy) =>
    pharmacy.medicines.some((med) =>
      med.toLowerCase().includes(medicineName.toLowerCase()),
    ),
  );
};

/**
 * Add a new prescription
 * @param {Object} prescription - Prescription data
 * @returns {Promise<Object>} Created prescription
 */
export const addPrescription = async (prescription) => {
  await simulateDelay(500);
  const newPrescription = {
    id: `RX${Date.now()}`,
    ...prescription,
    date: new Date().toISOString().split("T")[0],
  };
  mockPrescriptions.push(newPrescription);
  return newPrescription;
};

/**
 * Update patient records
 * @param {string} patientId - Patient ID
 * @param {Object} updates - Updates to apply
 * @returns {Promise<Object>} Updated patient records
 */
export const updatePatientRecords = async (patientId, updates) => {
  console.log("updatePatientRecords called with:", { patientId, updates });
  await simulateDelay(600);

  if (mockHealthRecords[patientId]) {
    console.log("Found patient records for ID:", patientId);
    console.log("Current records:", mockHealthRecords[patientId]);
    console.log("Applying updates:", updates);

    mockHealthRecords[patientId] = {
      ...mockHealthRecords[patientId],
      ...updates,
    };

    console.log("Updated records:", mockHealthRecords[patientId]);
    return mockHealthRecords[patientId];
  } else {
    console.error("No patient records found for ID:", patientId);
    console.log("Available patient IDs:", Object.keys(mockHealthRecords));
    return null;
  }
};

/**
 * Calculate disease averages from historical data
 * @returns {Object} Average infection rates by disease
 */
export const calculateDiseaseAverages = () => {
  const diseases = Object.keys(diseaseData.Jan);
  const months = Object.keys(diseaseData);
  const averages = {};

  diseases.forEach((disease) => {
    let total = 0;
    months.forEach((month) => {
      total += diseaseData[month][disease];
    });
    averages[disease] = total / months.length;
  });

  return averages;
};

/**
 * Check for disease warnings based on current vs historical data
 * @returns {Promise<Array>} Array of warnings for diseases above threshold
 */
export const checkDiseaseWarnings = async () => {
  await simulateDelay(300);

  const averages = calculateDiseaseAverages();
  const warnings = [];

  Object.keys(currentDiseaseData).forEach((disease) => {
    const currentRate = currentDiseaseData[disease];
    const averageRate = averages[disease];
    const threshold = warningThresholds[disease];

    const increasePercentage = (currentRate - averageRate) / averageRate;

    if (increasePercentage > threshold) {
      warnings.push({
        disease,
        currentRate,
        averageRate,
        increasePercentage: (increasePercentage * 100).toFixed(1),
        severity:
          increasePercentage > 0.75
            ? "High"
            : increasePercentage > 0.5
              ? "Medium"
              : "Low",
        timestamp: new Date().toISOString(),
      });
    }
  });

  return warnings;
};

/**
 * Get disease surveillance data
 * @returns {Promise<Object>} Disease surveillance data with current and historical rates
 */
export const getDiseaseData = async () => {
  await simulateDelay(400);

  const averages = calculateDiseaseAverages();

  return {
    historical: diseaseData,
    current: currentDiseaseData,
    averages,
    thresholds: warningThresholds,
  };
};

/**
 * Get patient count by disease from current patients
 * @returns {Object} Count of patients by disease
 */
export const getPatientCountByDisease = () => {
  const counts = {};

  // Initialize counts
  Object.keys(currentDiseaseData).forEach((disease) => {
    counts[disease] = 0;
  });

  // Count patients by diagnosis
  mockPatients.forEach((patient) => {
    if (patient.diagnosis && counts.hasOwnProperty(patient.diagnosis)) {
      counts[patient.diagnosis]++;
    }
  });

  return counts;
};

/**
 * Transform historical diseaseData into chart-friendly format
 * @returns {Array} Array of objects like [{month, Dengue, Malaria, ...}, ...]
 */
export const getChartData = () => {
  return Object.entries(diseaseData).map(([month, diseases]) => ({
    month,
    ...diseases,
  }));
};
