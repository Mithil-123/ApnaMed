/**
 * Mock Data and API Simulation Functions - Web Version
 * 
 * This file contains all the mock data and simulated API calls for the ApnaMed web application.
 * In a real application, these would be replaced with actual API calls to a backend service.
 */

// Mock patient data
export const mockPatients = [
  {
    id: 'P001',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    avatar: '👨',
    symptoms: 'Fever, cough',
    priority: 'High',
    waitingTime: '5 mins',
    medicalHistory: ['Diabetes', 'Hypertension'],
    allergies: ['Penicillin'],
    currentMedications: ['Metformin', 'Lisinopril']
  },
  {
    id: 'P002',
    name: 'Priya Sharma',
    age: 32,
    gender: 'Female',
    avatar: '👩',
    symptoms: 'Headache, nausea',
    priority: 'Medium',
    waitingTime: '10 mins',
    medicalHistory: ['Migraine'],
    allergies: ['None'],
    currentMedications: ['Ibuprofen']
  },
  {
    id: 'P003',
    name: 'Amit Singh',
    age: 28,
    gender: 'Male',
    avatar: '👨',
    symptoms: 'Chest pain',
    priority: 'High',
    waitingTime: '2 mins',
    medicalHistory: ['None'],
    allergies: ['Aspirin'],
    currentMedications: ['None']
  }
];

// Mock doctor data
export const mockDoctors = [
  {
    id: 'D001',
    name: 'Dr. Anjali Patel',
    specialization: 'General Medicine',
    avatar: '👩‍⚕️',
    rating: 4.8,
    experience: '10 years',
    available: true
  },
  {
    id: 'D002',
    name: 'Dr. Rajesh Verma',
    specialization: 'Cardiology',
    avatar: '👨‍⚕️',
    rating: 4.9,
    experience: '15 years',
    available: true
  },
  {
    id: 'D003',
    name: 'Dr. Sunita Reddy',
    specialization: 'Pediatrics',
    avatar: '👩‍⚕️',
    rating: 4.7,
    experience: '8 years',
    available: true
  }
];

// Mock pharmacy data
export const mockPharmacies = [
  {
    id: 'PH001',
    name: 'Apollo Pharmacy',
    address: '123 Main Street, City Center',
    distance: '0.5 km',
    phone: '+91-9876543210',
    available: true,
    medicines: ['Paracetamol', 'Amoxicillin', 'Metformin']
  },
  {
    id: 'PH002',
    name: 'MedPlus Pharmacy',
    address: '456 Park Avenue, Downtown',
    distance: '1.2 km',
    phone: '+91-9876543211',
    available: true,
    medicines: ['Ibuprofen', 'Ciprofloxacin', 'Lisinopril']
  },
  {
    id: 'PH003',
    name: 'Wellness Pharmacy',
    address: '789 Health Plaza, Suburb',
    distance: '2.1 km',
    phone: '+91-9876543212',
    available: false,
    medicines: ['Aspirin', 'Omeprazole']
  }
];

// Mock prescription data
export const mockPrescriptions = [
  {
    id: 'RX001',
    patientId: 'P001',
    doctorId: 'D001',
    date: '2024-01-15',
    medicines: [
      {
        name: 'Paracetamol',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '5 days',
        instructions: 'Take with food'
      },
      {
        name: 'Amoxicillin',
        dosage: '250mg',
        frequency: 'Three times daily',
        duration: '7 days',
        instructions: 'Take before meals'
      }
    ],
    notes: 'Patient has fever and cough. Complete the full course of antibiotics.'
  },
  {
    id: 'RX002',
    patientId: 'P002',
    doctorId: 'D001',
    date: '2024-01-14',
    medicines: [
      {
        name: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'As needed',
        duration: '3 days',
        instructions: 'Take with water'
      }
    ],
    notes: 'For headache relief. Do not exceed 3 tablets per day.'
  }
];

// Mock health records
export const mockHealthRecords = {
  'P001': {
    patientId: 'P001',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    bloodGroup: 'B+',
    height: '170 cm',
    weight: '75 kg',
    bmi: '25.9',
    vitalSigns: {
      bloodPressure: '140/90',
      heartRate: '85 bpm',
      temperature: '98.6°F',
      lastUpdated: '2024-01-15'
    },
    medicalHistory: ['Diabetes Type 2', 'Hypertension'],
    allergies: ['Penicillin', 'Shellfish'],
    currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
    recentVisits: [
      {
        date: '2024-01-15',
        doctor: 'Dr. Anjali Patel',
        reason: 'Fever and cough',
        diagnosis: 'Upper respiratory infection'
      },
      {
        date: '2024-01-01',
        doctor: 'Dr. Rajesh Verma',
        reason: 'Routine checkup',
        diagnosis: 'Stable condition'
      }
    ]
  },
  'P002': {
    patientId: 'P002',
    name: 'Priya Sharma',
    age: 32,
    gender: 'Female',
    bloodGroup: 'A+',
    height: '165 cm',
    weight: '60 kg',
    bmi: '22.0',
    vitalSigns: {
      bloodPressure: '120/80',
      heartRate: '72 bpm',
      temperature: '98.4°F',
      lastUpdated: '2024-01-14'
    },
    medicalHistory: ['Migraine'],
    allergies: ['None'],
    currentMedications: ['Ibuprofen 400mg'],
    recentVisits: [
      {
        date: '2024-01-14',
        doctor: 'Dr. Anjali Patel',
        reason: 'Headache and nausea',
        diagnosis: 'Migraine episode'
      }
    ]
  },
  'P003': {
    patientId: 'P003',
    name: 'Amit Singh',
    age: 28,
    gender: 'Male',
    bloodGroup: 'O+',
    height: '175 cm',
    weight: '70 kg',
    bmi: '22.9',
    vitalSigns: {
      bloodPressure: '110/70',
      heartRate: '68 bpm',
      temperature: '98.2°F',
      lastUpdated: '2024-01-13'
    },
    medicalHistory: ['None'],
    allergies: ['Aspirin'],
    currentMedications: ['None'],
    recentVisits: [
      {
        date: '2024-01-13',
        doctor: 'Dr. Rajesh Verma',
        reason: 'Chest pain',
        diagnosis: 'Muscle strain - no cardiac issues'
      }
    ]
  }
};

/**
 * Simulated API Functions
 * These functions simulate network calls with delays and return promises
 */

// Simulate network delay
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

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
  return mockPatients.filter(patient => patient.priority === 'High' || patient.priority === 'Medium');
};

/**
 * Fetch available doctors
 * @returns {Promise<Array>} Array of available doctors
 */
export const fetchAvailableDoctors = async () => {
  await simulateDelay(600);
  return mockDoctors.filter(doctor => doctor.available);
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
  return mockPrescriptions.filter(prescription => prescription.patientId === patientId);
};

/**
 * Find pharmacies that have a specific medicine
 * @param {string} medicineName - Name of the medicine
 * @returns {Promise<Array>} Array of pharmacies with the medicine
 */
export const findPharmaciesWithMedicine = async (medicineName) => {
  await simulateDelay(800);
  return mockPharmacies.filter(pharmacy => 
    pharmacy.medicines.some(med => 
      med.toLowerCase().includes(medicineName.toLowerCase())
    )
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
    date: new Date().toISOString().split('T')[0]
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
  console.log('updatePatientRecords called with:', { patientId, updates });
  await simulateDelay(600);
  
  if (mockHealthRecords[patientId]) {
    console.log('Found patient records for ID:', patientId);
    console.log('Current records:', mockHealthRecords[patientId]);
    console.log('Applying updates:', updates);
    
    mockHealthRecords[patientId] = {
      ...mockHealthRecords[patientId],
      ...updates
    };
    
    console.log('Updated records:', mockHealthRecords[patientId]);
    return mockHealthRecords[patientId];
  } else {
    console.error('No patient records found for ID:', patientId);
    console.log('Available patient IDs:', Object.keys(mockHealthRecords));
    return null;
  }
};
