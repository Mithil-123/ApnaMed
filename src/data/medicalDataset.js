/**
 * Medical Dataset - Disease Symptoms and Patient Profiles
 *
 * Based on medical literature and clinical data patterns.
 * This dataset contains real disease-symptom relationships for offline analysis.
 */

// Comprehensive symptom vocabulary with medical terminology
export const MEDICAL_SYMPTOMS = {
  // Constitutional symptoms
  fever: { id: 0, category: "constitutional", severity: "moderate" },
  fatigue: { id: 1, category: "constitutional", severity: "mild" },
  weight_loss: { id: 2, category: "constitutional", severity: "moderate" },
  night_sweats: { id: 3, category: "constitutional", severity: "moderate" },
  chills: { id: 4, category: "constitutional", severity: "mild" },
  malaise: { id: 5, category: "constitutional", severity: "mild" },

  // Respiratory symptoms
  cough: { id: 6, category: "respiratory", severity: "mild" },
  dyspnea: { id: 7, category: "respiratory", severity: "severe" },
  chest_pain: { id: 8, category: "respiratory", severity: "severe" },
  wheezing: { id: 9, category: "respiratory", severity: "moderate" },
  sputum_production: { id: 10, category: "respiratory", severity: "mild" },
  hemoptysis: { id: 11, category: "respiratory", severity: "severe" },
  sore_throat: { id: 12, category: "respiratory", severity: "mild" },
  rhinorrhea: { id: 13, category: "respiratory", severity: "mild" },
  nasal_congestion: { id: 14, category: "respiratory", severity: "mild" },

  // Gastrointestinal symptoms
  nausea: { id: 15, category: "gastrointestinal", severity: "mild" },
  vomiting: { id: 16, category: "gastrointestinal", severity: "moderate" },
  diarrhea: { id: 17, category: "gastrointestinal", severity: "moderate" },
  constipation: { id: 18, category: "gastrointestinal", severity: "mild" },
  abdominal_pain: {
    id: 19,
    category: "gastrointestinal",
    severity: "moderate",
  },
  bloating: { id: 20, category: "gastrointestinal", severity: "mild" },
  loss_of_appetite: { id: 21, category: "gastrointestinal", severity: "mild" },
  heartburn: { id: 22, category: "gastrointestinal", severity: "mild" },

  // Neurological symptoms
  headache: { id: 23, category: "neurological", severity: "moderate" },
  dizziness: { id: 24, category: "neurological", severity: "moderate" },
  confusion: { id: 25, category: "neurological", severity: "severe" },
  seizures: { id: 26, category: "neurological", severity: "severe" },
  weakness: { id: 27, category: "neurological", severity: "moderate" },
  numbness: { id: 28, category: "neurological", severity: "moderate" },
  memory_problems: { id: 29, category: "neurological", severity: "moderate" },
  tremor: { id: 30, category: "neurological", severity: "moderate" },

  // Cardiovascular symptoms
  palpitations: { id: 31, category: "cardiovascular", severity: "moderate" },
  syncope: { id: 32, category: "cardiovascular", severity: "severe" },
  edema: { id: 33, category: "cardiovascular", severity: "moderate" },
  claudication: { id: 34, category: "cardiovascular", severity: "moderate" },

  // Musculoskeletal symptoms
  joint_pain: { id: 35, category: "musculoskeletal", severity: "moderate" },
  muscle_pain: { id: 36, category: "musculoskeletal", severity: "mild" },
  back_pain: { id: 37, category: "musculoskeletal", severity: "moderate" },
  stiffness: { id: 38, category: "musculoskeletal", severity: "mild" },
  swelling: { id: 39, category: "musculoskeletal", severity: "mild" },

  // Dermatological symptoms
  rash: { id: 40, category: "dermatological", severity: "mild" },
  itching: { id: 41, category: "dermatological", severity: "mild" },
  skin_lesions: { id: 42, category: "dermatological", severity: "moderate" },
  hair_loss: { id: 43, category: "dermatological", severity: "mild" },

  // Genitourinary symptoms
  dysuria: { id: 44, category: "genitourinary", severity: "moderate" },
  frequency: { id: 45, category: "genitourinary", severity: "mild" },
  urgency: { id: 46, category: "genitourinary", severity: "moderate" },
  hematuria: { id: 47, category: "genitourinary", severity: "severe" },

  // Psychiatric symptoms
  anxiety: { id: 48, category: "psychiatric", severity: "moderate" },
  depression: { id: 49, category: "psychiatric", severity: "moderate" },
  insomnia: { id: 50, category: "psychiatric", severity: "mild" },
  irritability: { id: 51, category: "psychiatric", severity: "mild" },
};

// Medical conditions with symptom patterns and clinical data
export const MEDICAL_CONDITIONS = {
  // Respiratory Conditions
  "Common Cold": {
    icd10: "J00",
    category: "respiratory",
    severity: "mild",
    prevalence: 0.8,
    symptoms: [
      { symptom: "rhinorrhea", probability: 0.98, weight: 1.0 },
      { symptom: "nasal_congestion", probability: 0.95, weight: 0.95 },
      { symptom: "sore_throat", probability: 0.75, weight: 0.7 },
      { symptom: "cough", probability: 0.6, weight: 0.6 },
      { symptom: "fever", probability: 0.15, weight: 0.2 },
      { symptom: "fatigue", probability: 0.4, weight: 0.4 },
      { symptom: "headache", probability: 0.25, weight: 0.3 },
    ],
    duration: "7-10 days",
    treatment: "symptomatic",
    complications: ["sinusitis", "otitis media"],
  },

  Influenza: {
    icd10: "J11.1",
    category: "respiratory",
    severity: "moderate",
    prevalence: 0.1,
    symptoms: [
      { symptom: "fever", probability: 0.9, weight: 0.95 },
      { symptom: "fatigue", probability: 0.95, weight: 1.0 },
      { symptom: "muscle_pain", probability: 0.85, weight: 0.9 },
      { symptom: "headache", probability: 0.8, weight: 0.85 },
      { symptom: "cough", probability: 0.75, weight: 0.7 },
      { symptom: "chills", probability: 0.8, weight: 0.8 },
      { symptom: "sore_throat", probability: 0.5, weight: 0.5 },
      { symptom: "nausea", probability: 0.2, weight: 0.25 },
    ],
    duration: "5-14 days",
    treatment: "antiviral (if early), symptomatic",
    complications: ["pneumonia", "myocarditis", "encephalitis"],
  },

  "COVID-19": {
    icd10: "U07.1",
    category: "respiratory",
    severity: "moderate_to_severe",
    prevalence: 0.15,
    symptoms: [
      { symptom: "fever", probability: 0.85, weight: 0.85 },
      { symptom: "cough", probability: 0.8, weight: 0.85 },
      { symptom: "fatigue", probability: 0.75, weight: 0.75 },
      { symptom: "dyspnea", probability: 0.45, weight: 0.9 },
      { symptom: "loss_of_appetite", probability: 0.55, weight: 0.6 },
      { symptom: "muscle_pain", probability: 0.5, weight: 0.55 },
      { symptom: "headache", probability: 0.5, weight: 0.5 },
      { symptom: "sore_throat", probability: 0.35, weight: 0.4 },
      { symptom: "diarrhea", probability: 0.25, weight: 0.3 },
      { symptom: "nausea", probability: 0.2, weight: 0.25 },
    ],
    duration: "2-6 weeks",
    treatment: "supportive, oxygen, antivirals",
    complications: ["ARDS", "multiorgan failure", "long COVID"],
  },

  Pneumonia: {
    icd10: "J18.9",
    category: "respiratory",
    severity: "severe",
    prevalence: 0.05,
    symptoms: [
      { symptom: "fever", probability: 0.85, weight: 0.85 },
      { symptom: "cough", probability: 0.9, weight: 0.9 },
      { symptom: "dyspnea", probability: 0.75, weight: 0.95 },
      { symptom: "chest_pain", probability: 0.65, weight: 0.75 },
      { symptom: "fatigue", probability: 0.7, weight: 0.6 },
      { symptom: "chills", probability: 0.6, weight: 0.55 },
      { symptom: "sputum_production", probability: 0.55, weight: 0.65 },
      { symptom: "confusion", probability: 0.15, weight: 0.8 },
    ],
    duration: "1-3 weeks",
    treatment: "antibiotics, oxygen support",
    complications: ["sepsis", "pleural effusion", "lung abscess"],
  },

  Asthma: {
    icd10: "J45.9",
    category: "respiratory",
    severity: "variable",
    prevalence: 0.08,
    symptoms: [
      { symptom: "wheezing", probability: 0.8, weight: 0.95 },
      { symptom: "dyspnea", probability: 0.95, weight: 1.0 },
      { symptom: "cough", probability: 0.75, weight: 0.8 },
      { symptom: "chest_pain", probability: 0.4, weight: 0.5 },
      { symptom: "anxiety", probability: 0.35, weight: 0.3 },
    ],
    duration: "chronic with acute episodes",
    treatment: "bronchodilators, corticosteroids",
    complications: ["status asthmaticus", "respiratory failure"],
  },

  // Cardiovascular Conditions
  "Myocardial Infarction": {
    icd10: "I21.9",
    category: "cardiovascular",
    severity: "severe",
    prevalence: 0.03,
    symptoms: [
      { symptom: "chest_pain", probability: 0.9, weight: 1.0 },
      { symptom: "dyspnea", probability: 0.6, weight: 0.85 },
      { symptom: "nausea", probability: 0.45, weight: 0.6 },
      { symptom: "vomiting", probability: 0.3, weight: 0.5 },
      { symptom: "palpitations", probability: 0.25, weight: 0.4 },
      { symptom: "anxiety", probability: 0.5, weight: 0.5 },
      { symptom: "syncope", probability: 0.1, weight: 0.9 },
      { symptom: "fatigue", probability: 0.4, weight: 0.35 },
    ],
    duration: "acute onset",
    treatment: "emergency revascularization",
    complications: ["cardiogenic shock", "arrhythmias", "heart failure"],
  },

  Hypertension: {
    icd10: "I10",
    category: "cardiovascular",
    severity: "mild_to_moderate",
    prevalence: 0.25,
    symptoms: [
      { symptom: "headache", probability: 0.25, weight: 0.4 },
      { symptom: "dizziness", probability: 0.2, weight: 0.35 },
      { symptom: "fatigue", probability: 0.15, weight: 0.3 },
      { symptom: "palpitations", probability: 0.15, weight: 0.3 },
      { symptom: "chest_pain", probability: 0.1, weight: 0.4 },
    ],
    duration: "chronic",
    treatment: "lifestyle modifications, antihypertensives",
    complications: ["stroke", "heart disease", "kidney disease"],
  },

  // Gastrointestinal Conditions
  Gastroenteritis: {
    icd10: "K59.1",
    category: "gastrointestinal",
    severity: "mild_to_moderate",
    prevalence: 0.12,
    symptoms: [
      { symptom: "diarrhea", probability: 0.9, weight: 1.0 },
      { symptom: "nausea", probability: 0.8, weight: 0.85 },
      { symptom: "vomiting", probability: 0.65, weight: 0.75 },
      { symptom: "abdominal_pain", probability: 0.75, weight: 0.8 },
      { symptom: "fever", probability: 0.35, weight: 0.4 },
      { symptom: "fatigue", probability: 0.5, weight: 0.45 },
      { symptom: "loss_of_appetite", probability: 0.6, weight: 0.55 },
    ],
    duration: "3-7 days",
    treatment: "supportive care, hydration",
    complications: ["dehydration", "electrolyte imbalance"],
  },

  "Peptic Ulcer Disease": {
    icd10: "K27.9",
    category: "gastrointestinal",
    severity: "moderate",
    prevalence: 0.06,
    symptoms: [
      { symptom: "abdominal_pain", probability: 0.95, weight: 1.0 },
      { symptom: "heartburn", probability: 0.6, weight: 0.65 },
      { symptom: "nausea", probability: 0.45, weight: 0.5 },
      { symptom: "bloating", probability: 0.4, weight: 0.4 },
      { symptom: "loss_of_appetite", probability: 0.35, weight: 0.4 },
      { symptom: "weight_loss", probability: 0.2, weight: 0.5 },
    ],
    duration: "chronic with acute episodes",
    treatment: "PPIs, H. pylori eradication",
    complications: ["bleeding", "perforation", "gastric outlet obstruction"],
  },

  // Neurological Conditions
  Migraine: {
    icd10: "G43.9",
    category: "neurological",
    severity: "moderate_to_severe",
    prevalence: 0.15,
    symptoms: [
      { symptom: "headache", probability: 1.0, weight: 1.0 },
      { symptom: "nausea", probability: 0.8, weight: 0.8 },
      { symptom: "vomiting", probability: 0.25, weight: 0.7 },
      { symptom: "dizziness", probability: 0.4, weight: 0.45 },
      { symptom: "fatigue", probability: 0.6, weight: 0.5 },
    ],
    duration: "4-72 hours",
    treatment: "NSAIDs, triptans, preventive medications",
    complications: ["status migrainosus", "medication overuse headache"],
  },

  Stroke: {
    icd10: "I64",
    category: "neurological",
    severity: "severe",
    prevalence: 0.02,
    symptoms: [
      { symptom: "weakness", probability: 0.9, weight: 1.0 },
      { symptom: "confusion", probability: 0.65, weight: 0.85 },
      { symptom: "headache", probability: 0.45, weight: 0.6 },
      { symptom: "dizziness", probability: 0.35, weight: 0.5 },
      { symptom: "numbness", probability: 0.8, weight: 0.9 },
      { symptom: "seizures", probability: 0.08, weight: 0.95 },
    ],
    duration: "acute onset with permanent effects",
    treatment: "emergency thrombolysis, rehabilitation",
    complications: ["paralysis", "aphasia", "cognitive impairment"],
  },

  // Endocrine Conditions
  "Diabetes Mellitus Type 2": {
    icd10: "E11.9",
    category: "endocrine",
    severity: "moderate",
    prevalence: 0.11,
    symptoms: [
      { symptom: "frequency", probability: 0.6, weight: 0.75 },
      { symptom: "fatigue", probability: 0.55, weight: 0.6 },
      { symptom: "weight_loss", probability: 0.3, weight: 0.65 },
      { symptom: "loss_of_appetite", probability: 0.25, weight: 0.4 },
      { symptom: "weakness", probability: 0.4, weight: 0.5 },
    ],
    duration: "chronic progressive",
    treatment: "lifestyle modifications, metformin, insulin",
    complications: ["nephropathy", "retinopathy", "neuropathy"],
  },

  Hyperthyroidism: {
    icd10: "E05.9",
    category: "endocrine",
    severity: "moderate",
    prevalence: 0.02,
    symptoms: [
      { symptom: "palpitations", probability: 0.75, weight: 0.85 },
      { symptom: "weight_loss", probability: 0.7, weight: 0.8 },
      { symptom: "fatigue", probability: 0.6, weight: 0.5 },
      { symptom: "anxiety", probability: 0.55, weight: 0.6 },
      { symptom: "tremor", probability: 0.5, weight: 0.75 },
      { symptom: "insomnia", probability: 0.45, weight: 0.5 },
      { symptom: "diarrhea", probability: 0.25, weight: 0.4 },
    ],
    duration: "chronic until treated",
    treatment: "antithyroid medications, radioiodine",
    complications: ["thyroid storm", "atrial fibrillation", "osteoporosis"],
  },

  // Infectious Diseases
  "Urinary Tract Infection": {
    icd10: "N39.0",
    category: "infectious",
    severity: "mild_to_moderate",
    prevalence: 0.08,
    symptoms: [
      { symptom: "dysuria", probability: 0.85, weight: 1.0 },
      { symptom: "frequency", probability: 0.8, weight: 0.9 },
      { symptom: "urgency", probability: 0.75, weight: 0.85 },
      { symptom: "fever", probability: 0.25, weight: 0.5 },
      { symptom: "abdominal_pain", probability: 0.45, weight: 0.5 },
      { symptom: "fatigue", probability: 0.3, weight: 0.3 },
    ],
    duration: "3-7 days with treatment",
    treatment: "antibiotics, increased fluid intake",
    complications: ["pyelonephritis", "sepsis"],
  },

  // Mental Health Conditions
  "Major Depressive Disorder": {
    icd10: "F32.9",
    category: "psychiatric",
    severity: "moderate_to_severe",
    prevalence: 0.09,
    symptoms: [
      { symptom: "depression", probability: 1.0, weight: 1.0 },
      { symptom: "fatigue", probability: 0.9, weight: 0.85 },
      { symptom: "insomnia", probability: 0.7, weight: 0.7 },
      { symptom: "loss_of_appetite", probability: 0.55, weight: 0.6 },
      { symptom: "anxiety", probability: 0.65, weight: 0.65 },
      { symptom: "irritability", probability: 0.45, weight: 0.45 },
      { symptom: "memory_problems", probability: 0.4, weight: 0.4 },
    ],
    duration: "episodic, chronic if untreated",
    treatment: "antidepressants, psychotherapy",
    complications: ["suicide risk", "functional impairment"],
  },

  "Generalized Anxiety Disorder": {
    icd10: "F41.1",
    category: "psychiatric",
    severity: "moderate",
    prevalence: 0.06,
    symptoms: [
      { symptom: "anxiety", probability: 1.0, weight: 1.0 },
      { symptom: "fatigue", probability: 0.6, weight: 0.5 },
      { symptom: "insomnia", probability: 0.7, weight: 0.75 },
      { symptom: "irritability", probability: 0.55, weight: 0.55 },
      { symptom: "muscle_pain", probability: 0.4, weight: 0.4 },
      { symptom: "headache", probability: 0.45, weight: 0.45 },
      { symptom: "palpitations", probability: 0.5, weight: 0.65 },
    ],
    duration: "chronic with fluctuations",
    treatment: "anxiolytics, CBT, SSRIs",
    complications: ["panic disorder", "substance abuse", "depression"],
  },
};

// Patient demographic factors that influence disease probability
export const DEMOGRAPHIC_FACTORS = {
  age_groups: {
    pediatric: { range: [0, 17], modifier: 1.0 },
    young_adult: { range: [18, 39], modifier: 1.0 },
    middle_age: { range: [40, 64], modifier: 1.2 },
    elderly: { range: [65, 100], modifier: 1.5 },
  },

  sex_modifiers: {
    male: {
      "Myocardial Infarction": 1.5,
      Hypertension: 1.2,
      Stroke: 1.3,
    },
    female: {
      Migraine: 3.0,
      "Urinary Tract Infection": 4.0,
      "Major Depressive Disorder": 1.7,
      Hyperthyroidism: 5.0,
    },
  },

  risk_factors: {
    smoking: ["Common Cold", "Influenza", "COVID-19", "Pneumonia", "Asthma"],
    diabetes: [
      "Myocardial Infarction",
      "Hypertension",
      "Stroke",
      "Urinary Tract Infection",
    ],
    obesity: ["Diabetes Mellitus Type 2", "Hypertension", "Stroke"],
    family_history: ["Diabetes Mellitus Type 2", "Hypertension", "Migraine"],
  },
};

// Symptom synonyms and variations for better text recognition
export const SYMPTOM_SYNONYMS = {
  fever: ["temperature", "hot", "burning up", "pyrexia", "febrile"],
  fatigue: ["tired", "exhausted", "weak", "lethargic", "worn out"],
  dyspnea: ["shortness of breath", "breathless", "difficulty breathing", "SOB"],
  chest_pain: ["chest discomfort", "chest pressure", "chest tightness"],
  headache: ["head pain", "cephalgia", "head hurts", "migraine"],
  nausea: ["sick", "queasy", "nauseated", "sick to stomach"],
  vomiting: ["throwing up", "being sick", "emesis"],
  diarrhea: ["loose stools", "watery stools", "runs"],
  abdominal_pain: ["stomach pain", "belly pain", "tummy ache"],
  dizziness: ["lightheaded", "vertigo", "spinning"],
  palpitations: ["heart racing", "rapid heartbeat", "heart pounding"],
  joint_pain: ["arthralgia", "joint aches", "joint stiffness"],
  muscle_pain: ["myalgia", "muscle aches", "sore muscles"],
  cough: ["coughing", "hack", "tussis"],
  sore_throat: ["throat pain", "pharyngitis", "throat irritation"],
  rhinorrhea: ["runny nose", "nasal discharge", "snot"],
  dysuria: ["painful urination", "burning urination", "urinary pain"],
  frequency: ["frequent urination", "urinary frequency"],
  urgency: ["urgent urination", "urinary urgency"],
  insomnia: ["sleep problems", "sleeplessness", "trouble sleeping"],
  anxiety: ["nervousness", "worry", "panic", "stress"],
  depression: ["sadness", "low mood", "feeling down"],
  confusion: ["disorientation", "mental fog", "unclear thinking"],
  weakness: ["muscle weakness", "feeling weak", "loss of strength"],
  weight_loss: ["losing weight", "unintentional weight loss"],
  loss_of_appetite: ["poor appetite", "not hungry", "decreased appetite"],
};

// Emergency symptoms that require immediate medical attention
export const EMERGENCY_SYMPTOMS = [
  "chest_pain",
  "dyspnea",
  "seizures",
  "syncope",
  "confusion",
  "hemoptysis",
  "hematuria",
];

// Treatment recommendations by severity
export const TREATMENT_GUIDELINES = {
  mild: {
    urgency: "routine",
    timeframe: "1-2 weeks",
    setting: "primary care",
    message:
      "Consider scheduling a routine appointment with your primary care physician.",
  },
  moderate: {
    urgency: "prompt",
    timeframe: "1-3 days",
    setting: "primary care or urgent care",
    message: "You should see a healthcare provider within the next few days.",
  },
  moderate_to_severe: {
    urgency: "urgent",
    timeframe: "24 hours",
    setting: "urgent care or emergency department",
    message: "Seek medical attention within 24 hours.",
  },
  severe: {
    urgency: "emergency",
    timeframe: "immediate",
    setting: "emergency department",
    message:
      "⚠️ SEEK IMMEDIATE EMERGENCY MEDICAL CARE. Call 911 or go to the nearest emergency room.",
  },
};

export default {
  MEDICAL_SYMPTOMS,
  MEDICAL_CONDITIONS,
  DEMOGRAPHIC_FACTORS,
  SYMPTOM_SYNONYMS,
  EMERGENCY_SYMPTOMS,
  TREATMENT_GUIDELINES,
};
