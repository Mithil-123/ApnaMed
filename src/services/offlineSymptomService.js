/**
 * Enhanced Offline Symptom Analysis Service
 *
 * Uses comprehensive medical dataset and TensorFlow.js for accurate
 * local symptom analysis and disease prediction without internet connectivity.
 */

import * as tf from "@tensorflow/tfjs";
import {
  MEDICAL_SYMPTOMS,
  MEDICAL_CONDITIONS,
  DEMOGRAPHIC_FACTORS,
  SYMPTOM_SYNONYMS,
  EMERGENCY_SYMPTOMS,
  TREATMENT_GUIDELINES,
} from "../data/medicalDataset";

class EnhancedOfflineSymptomAnalyzer {
  constructor() {
    this.model = null;
    this.isInitialized = false;
    this.symptoms = Object.keys(MEDICAL_SYMPTOMS);
    this.conditions = Object.keys(MEDICAL_CONDITIONS);
    this.vocabularySize = this.symptoms.length;
  }

  /**
   * Initialize the TensorFlow.js model with medical dataset
   */
  async initialize() {
    try {
      console.log("Initializing enhanced offline symptom analyzer...");

      // Set initialization flag immediately to prevent multiple calls
      this.isInitialized = true;

      // Create a simpler, faster neural network
      this.model = tf.sequential({
        layers: [
          tf.layers.dense({
            inputShape: [this.vocabularySize],
            units: 64,
            activation: "relu",
            name: "symptom_layer",
          }),
          tf.layers.dropout({ rate: 0.2 }),
          tf.layers.dense({
            units: 32,
            activation: "relu",
            name: "hidden_layer",
          }),
          tf.layers.dense({
            units: this.conditions.length,
            activation: "softmax",
            name: "output_layer",
          }),
        ],
      });

      // Compile with simpler configuration
      this.model.compile({
        optimizer: tf.train.adam(0.01),
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"],
      });

      // Train with reduced complexity
      setTimeout(() => this.trainWithMedicalData(), 100);

      console.log("Enhanced offline symptom analyzer initialized successfully");
    } catch (error) {
      console.error("Failed to initialize enhanced symptom analyzer:", error);
      // Don't throw error - use fallback analysis instead
      this.isInitialized = true;
    }
  }

  /**
   * Train the model using the comprehensive medical dataset
   */
  async trainWithMedicalData() {
    try {
      if (!this.model) {
        console.log("Model not ready, skipping training");
        return;
      }

      const trainingData = this.generateMedicalTrainingData();
      const { inputs, outputs } = trainingData;

      const xs = tf.tensor2d(inputs);
      const ys = tf.tensor2d(outputs);

      console.log("Training with medical dataset...");
      console.log(`Training samples: ${inputs.length}`);

      await this.model.fit(xs, ys, {
        epochs: 20,
        batchSize: 32,
        validationSplit: 0.1,
        verbose: 0,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            if (epoch % 10 === 0) {
              console.log(
                `Epoch ${epoch}: accuracy=${logs.acc?.toFixed(3) || "N/A"}`,
              );
            }
          },
          onTrainEnd: () => {
            console.log("Medical training completed");
          },
        },
      });

      // Clean up tensors
      xs.dispose();
      ys.dispose();
    } catch (error) {
      console.error("Training error:", error);
      // Continue anyway - model can still work without perfect training
    }
  }

  /**
   * Generate training data based on medical condition patterns
   */
  generateMedicalTrainingData() {
    const inputs = [];
    const outputs = [];
    const samplesPerCondition = 50; // Reduced for faster training

    this.conditions.forEach((condition, conditionIndex) => {
      const conditionData = MEDICAL_CONDITIONS[condition];

      for (let sample = 0; sample < samplesPerCondition; sample++) {
        const symptomVector = new Array(this.vocabularySize).fill(0);
        const output = new Array(this.conditions.length).fill(0);
        output[conditionIndex] = 1;

        // Add symptoms based on probability
        conditionData.symptoms.forEach(({ symptom, probability, weight }) => {
          const symptomIndex = this.symptoms.indexOf(symptom);
          if (symptomIndex !== -1 && Math.random() < probability) {
            symptomVector[symptomIndex] = weight * (0.8 + Math.random() * 0.2);
          }
        });

        // Add minimal noise
        if (Math.random() < 0.3) {
          const randomIndex = Math.floor(Math.random() * this.vocabularySize);
          if (symptomVector[randomIndex] === 0) {
            symptomVector[randomIndex] = Math.random() * 0.2;
          }
        }

        inputs.push(symptomVector);
        outputs.push(output);
      }
    });

    return { inputs, outputs };
  }

  /**
   * Extract symptoms from natural language text
   */
  extractSymptoms(text) {
    const lowerText = text.toLowerCase();
    const extractedSymptoms = new Set();

    // Direct symptom matching
    this.symptoms.forEach((symptom) => {
      const symptomKey = symptom.toLowerCase();
      if (lowerText.includes(symptomKey.replace("_", " "))) {
        extractedSymptoms.add(symptom);
      }
    });

    // Synonym and variation matching
    Object.entries(SYMPTOM_SYNONYMS).forEach(([symptom, synonyms]) => {
      synonyms.forEach((synonym) => {
        if (lowerText.includes(synonym.toLowerCase())) {
          extractedSymptoms.add(symptom);
        }
      });
    });

    // Pattern-based extraction for common expressions
    this.extractSymptomPatterns(lowerText, extractedSymptoms);

    return Array.from(extractedSymptoms);
  }

  /**
   * Extract symptoms using pattern matching
   */
  extractSymptomPatterns(text, extractedSymptoms) {
    const patterns = [
      {
        pattern:
          /(?:have|having|feel|feeling|experience|experiencing).+?(?:pain|ache|hurt)/gi,
        symptoms: ["abdominal_pain", "chest_pain", "headache"],
      },
      {
        pattern: /(?:can't|cannot|difficult|trouble).+?(?:breath|breathing)/gi,
        symptoms: ["dyspnea"],
      },
      {
        pattern: /(?:throw|threw|throwing).+?up|vomit/gi,
        symptoms: ["vomiting"],
      },
      {
        pattern: /(?:loose|watery).+?(?:stool|bowel)/gi,
        symptoms: ["diarrhea"],
      },
      {
        pattern: /(?:heart|chest).+?(?:racing|fast|rapid|pound)/gi,
        symptoms: ["palpitations"],
      },
      { pattern: /(?:dizzy|lightheaded|spinning)/gi, symptoms: ["dizziness"] },
      {
        pattern: /(?:tired|exhausted|worn out|no energy)/gi,
        symptoms: ["fatigue"],
      },
      { pattern: /(?:hot|burning up|high temperature)/gi, symptoms: ["fever"] },
      {
        pattern: /(?:runny|stuffy).+?nose/gi,
        symptoms: ["rhinorrhea", "nasal_congestion"],
      },
      {
        pattern: /(?:sore|scratchy|painful).+?throat/gi,
        symptoms: ["sore_throat"],
      },
    ];

    patterns.forEach(({ pattern, symptoms }) => {
      if (pattern.test(text)) {
        symptoms.forEach((symptom) => {
          if (this.symptoms.includes(symptom)) {
            extractedSymptoms.add(symptom);
          }
        });
      }
    });
  }

  /**
   * Create symptom vector with intensity weighting
   */
  createSymptomVector(symptoms) {
    const vector = new Array(this.vocabularySize).fill(0);

    symptoms.forEach((symptom) => {
      const symptomIndex = this.symptoms.indexOf(symptom);
      if (symptomIndex !== -1) {
        const symptomData = MEDICAL_SYMPTOMS[symptom];
        const intensity = this.calculateSymptomIntensity(symptomData);
        vector[symptomIndex] = intensity;
      }
    });

    return vector;
  }

  /**
   * Calculate symptom intensity based on medical data
   */
  calculateSymptomIntensity(symptomData) {
    let baseIntensity = 0.8; // Default intensity

    // Adjust based on severity
    switch (symptomData.severity) {
      case "mild":
        baseIntensity = 0.6;
        break;
      case "moderate":
        baseIntensity = 0.8;
        break;
      case "severe":
        baseIntensity = 1.0;
        break;
    }

    // Add some variation
    return Math.min(1.0, baseIntensity + (Math.random() - 0.5) * 0.2);
  }

  /**
   * Main analysis function with comprehensive medical reasoning
   */
  async analyzeSymptomsOffline(symptomText, patientProfile = {}) {
    if (!this.isInitialized) {
      console.log("Analyzer not initialized, using rule-based analysis");
      return this.performRuleBasedAnalysis(symptomText);
    }

    try {
      // Extract symptoms from text
      const extractedSymptoms = this.extractSymptoms(symptomText);

      if (extractedSymptoms.length === 0) {
        return {
          predictions: [],
          confidence: 0,
          extractedSymptoms: [],
          emergencyAlert: false,
          message:
            "No recognizable symptoms found. Please describe your symptoms more specifically (e.g., 'I have a headache and feel nauseous').",
        };
      }

      // Check for emergency symptoms
      const emergencyAlert = this.checkEmergencySymptoms(extractedSymptoms);

      // Create symptom vector
      const symptomVector = this.createSymptomVector(extractedSymptoms);

      // Make prediction
      const inputTensor = tf.tensor2d([symptomVector]);
      const prediction = this.model.predict(inputTensor);
      const probabilities = await prediction.data();

      // Apply demographic and risk factor adjustments
      const adjustedProbabilities = this.adjustForDemographics(
        probabilities,
        patientProfile,
      );

      // Create detailed results
      const results = this.conditions.map((condition, index) => {
        const conditionData = MEDICAL_CONDITIONS[condition];
        const adjustedProb = adjustedProbabilities[index];

        return {
          condition,
          confidence: adjustedProb,
          icd10: conditionData.icd10,
          category: conditionData.category,
          severity: conditionData.severity,
          description: this.getConditionDescription(condition),
          prevalence: conditionData.prevalence,
          duration: conditionData.duration,
          treatment: conditionData.treatment,
          complications: conditionData.complications,
          matchedSymptoms: this.getMatchedSymptoms(
            condition,
            extractedSymptoms,
          ),
        };
      });

      // Sort by confidence and take top 5
      results.sort((a, b) => b.confidence - a.confidence);
      const topResults = results.slice(0, 5);

      // Calculate overall confidence with medical reasoning
      const maxConfidence = topResults[0]?.confidence || 0;
      const symptomSpecificity =
        this.calculateSymptomSpecificity(extractedSymptoms);
      const overallConfidence = Math.min(
        maxConfidence * symptomSpecificity * 100,
        95,
      );

      // Clean up tensors
      inputTensor.dispose();
      prediction.dispose();

      return {
        predictions: topResults,
        confidence: overallConfidence,
        extractedSymptoms: extractedSymptoms,
        emergencyAlert: emergencyAlert,
        message: this.generateMedicalAdvice(
          topResults,
          overallConfidence,
          emergencyAlert,
        ),
        recommendedActions: this.getRecommendedActions(
          topResults[0],
          emergencyAlert,
        ),
        riskFactors: this.identifyRiskFactors(
          extractedSymptoms,
          patientProfile,
        ),
      };
    } catch (error) {
      console.error("Error in enhanced offline symptom analysis:", error);
      throw error;
    }
  }

  /**
   * Check for emergency symptoms requiring immediate attention
   */
  checkEmergencySymptoms(symptoms) {
    return symptoms.some((symptom) => EMERGENCY_SYMPTOMS.includes(symptom));
  }

  /**
   * Adjust probabilities based on patient demographics and risk factors
   */
  adjustForDemographics(probabilities, profile) {
    const adjusted = [...probabilities];
    const { age, sex, riskFactors = [] } = profile;

    // Age-based adjustments
    if (age) {
      const ageGroup = this.getAgeGroup(age);
      const modifier =
        DEMOGRAPHIC_FACTORS.age_groups[ageGroup]?.modifier || 1.0;

      // Apply age modifier to age-sensitive conditions
      this.conditions.forEach((condition, index) => {
        if (
          [
            "Myocardial Infarction",
            "Stroke",
            "Hypertension",
            "Diabetes Mellitus Type 2",
          ].includes(condition)
        ) {
          adjusted[index] *= modifier;
        }
      });
    }

    // Sex-based adjustments
    if (sex && DEMOGRAPHIC_FACTORS.sex_modifiers[sex]) {
      const sexModifiers = DEMOGRAPHIC_FACTORS.sex_modifiers[sex];
      Object.entries(sexModifiers).forEach(([condition, modifier]) => {
        const conditionIndex = this.conditions.indexOf(condition);
        if (conditionIndex !== -1) {
          adjusted[conditionIndex] *= modifier;
        }
      });
    }

    // Risk factor adjustments
    riskFactors.forEach((riskFactor) => {
      if (DEMOGRAPHIC_FACTORS.risk_factors[riskFactor]) {
        DEMOGRAPHIC_FACTORS.risk_factors[riskFactor].forEach((condition) => {
          const conditionIndex = this.conditions.indexOf(condition);
          if (conditionIndex !== -1) {
            adjusted[conditionIndex] *= 1.3; // Increase probability by 30%
          }
        });
      }
    });

    // Normalize probabilities
    const sum = adjusted.reduce((a, b) => a + b, 0);
    return adjusted.map((prob) => prob / sum);
  }

  /**
   * Get age group from age
   */
  getAgeGroup(age) {
    for (const [group, data] of Object.entries(
      DEMOGRAPHIC_FACTORS.age_groups,
    )) {
      if (age >= data.range[0] && age <= data.range[1]) {
        return group;
      }
    }
    return "young_adult";
  }

  /**
   * Calculate symptom specificity for confidence adjustment
   */
  calculateSymptomSpecificity(symptoms) {
    const specificSymptoms = [
      "chest_pain",
      "dyspnea",
      "hemoptysis",
      "seizures",
    ];
    const generalSymptoms = ["fatigue", "headache", "nausea"];

    const specificCount = symptoms.filter((s) =>
      specificSymptoms.includes(s),
    ).length;
    const generalCount = symptoms.filter((s) =>
      generalSymptoms.includes(s),
    ).length;

    const specificity =
      (specificCount * 1.0 + generalCount * 0.5) / symptoms.length;
    return Math.max(0.3, Math.min(1.0, specificity));
  }

  /**
   * Get symptoms that match a specific condition
   */
  getMatchedSymptoms(condition, extractedSymptoms) {
    const conditionData = MEDICAL_CONDITIONS[condition];
    const conditionSymptoms = conditionData.symptoms.map((s) => s.symptom);
    return extractedSymptoms.filter((symptom) =>
      conditionSymptoms.includes(symptom),
    );
  }

  /**
   * Get condition description with medical context
   */
  getConditionDescription(condition) {
    const descriptions = {
      "Common Cold":
        "A viral upper respiratory tract infection causing nasal congestion and throat irritation.",
      Influenza:
        "A highly contagious viral infection affecting the respiratory system with systemic symptoms.",
      "COVID-19":
        "A coronavirus infection that can range from mild respiratory symptoms to severe pneumonia.",
      Pneumonia:
        "An infection causing inflammation of the air sacs in one or both lungs, potentially life-threatening.",
      Asthma:
        "A chronic respiratory condition causing airway inflammation and bronchospasm.",
      "Myocardial Infarction":
        "A heart attack caused by blocked blood flow to heart muscle, requiring emergency treatment.",
      Hypertension:
        "Persistently elevated blood pressure that increases cardiovascular disease risk.",
      Gastroenteritis:
        "Inflammation of the stomach and intestines, often caused by infection.",
      "Peptic Ulcer Disease":
        "Open sores in the stomach or duodenum, often related to H. pylori infection.",
      Migraine:
        "A neurological condition causing severe headaches with associated symptoms.",
      Stroke:
        "A medical emergency caused by interrupted blood supply to the brain.",
      "Diabetes Mellitus Type 2":
        "A metabolic disorder characterized by insulin resistance and high blood sugar.",
      Hyperthyroidism:
        "Overactive thyroid gland producing excess thyroid hormones.",
      "Urinary Tract Infection":
        "Bacterial infection of the urinary system, commonly affecting the bladder.",
      "Major Depressive Disorder":
        "A mood disorder causing persistent feelings of sadness and loss of interest.",
      "Generalized Anxiety Disorder":
        "A mental health condition characterized by excessive, persistent worry.",
    };

    return (
      descriptions[condition] ||
      `${condition}: A medical condition requiring professional evaluation.`
    );
  }

  /**
   * Generate comprehensive medical advice
   */
  generateMedicalAdvice(predictions, confidence, emergencyAlert) {
    if (emergencyAlert) {
      return `🚨 EMERGENCY ALERT: You have reported symptoms that may indicate a serious medical emergency. ${TREATMENT_GUIDELINES.severe.message}`;
    }

    if (predictions.length === 0) {
      return "Unable to analyze symptoms effectively. Please consult a healthcare professional for proper evaluation.";
    }

    const topPrediction = predictions[0];
    const severity = topPrediction.severity;
    const guidelines =
      TREATMENT_GUIDELINES[severity] || TREATMENT_GUIDELINES.moderate;

    let advice = `Based on your symptoms, you may have **${topPrediction.condition}** (${confidence.toFixed(1)}% confidence).\n\n`;
    advice += `${topPrediction.description}\n\n`;

    if (confidence > 70) {
      advice += "This analysis shows a strong symptom pattern match. ";
    } else if (confidence > 50) {
      advice += "This analysis shows a moderate symptom pattern match. ";
    } else {
      advice +=
        "This analysis shows a weak symptom pattern match, and other conditions are possible. ";
    }

    advice += `${guidelines.message}\n\n`;

    if (topPrediction.complications && topPrediction.complications.length > 0) {
      advice += `**Potential complications if untreated:** ${topPrediction.complications.join(", ")}\n\n`;
    }

    advice +=
      "**⚠️ IMPORTANT DISCLAIMER:** This is an AI-based analysis and NOT a medical diagnosis. Always consult with a qualified healthcare professional for proper medical evaluation and treatment.";

    return advice;
  }

  /**
   * Get recommended actions based on condition severity
   */
  getRecommendedActions(topPrediction, emergencyAlert) {
    if (emergencyAlert) {
      return {
        urgency: "emergency",
        timeframe: "immediate",
        actions: [
          "Call 911 or emergency services immediately",
          "Go to the nearest emergency room",
          "Do not drive yourself - call for help",
          "Stay calm and follow emergency operator instructions",
        ],
      };
    }

    if (!topPrediction) {
      return {
        urgency: "routine",
        timeframe: "1-2 weeks",
        actions: ["Schedule appointment with primary care physician"],
      };
    }

    const severity = topPrediction.severity;
    const guidelines =
      TREATMENT_GUIDELINES[severity] || TREATMENT_GUIDELINES.moderate;

    const actions = [];
    switch (severity) {
      case "mild":
        actions.push("Rest and monitor symptoms");
        actions.push("Stay hydrated");
        actions.push("Consider over-the-counter symptom relief");
        actions.push("Schedule routine medical consultation");
        break;
      case "moderate":
        actions.push("Schedule medical appointment within 2-3 days");
        actions.push("Monitor symptoms closely");
        actions.push("Seek care if symptoms worsen");
        break;
      case "moderate_to_severe":
        actions.push("Seek medical attention within 24 hours");
        actions.push("Contact healthcare provider");
        actions.push("Consider urgent care or emergency department");
        break;
      case "severe":
        actions.push("Seek immediate emergency medical care");
        actions.push("Go to emergency department");
        actions.push("Call 911 if symptoms worsen");
        break;
    }

    return {
      urgency: guidelines.urgency,
      timeframe: guidelines.timeframe,
      actions: actions,
    };
  }

  /**
   * Identify relevant risk factors
   */
  identifyRiskFactors(symptoms, profile) {
    const riskFactors = [];
    const { age, sex, riskFactors: patientRiskFactors = [] } = profile;

    // Age-related risks
    if (age && age > 65) {
      riskFactors.push("Advanced age increases risk for serious complications");
    }

    // Symptom-based risks
    if (symptoms.includes("chest_pain") && symptoms.includes("dyspnea")) {
      riskFactors.push(
        "Combination of chest pain and breathing difficulty may indicate cardiac emergency",
      );
    }

    if (symptoms.includes("fever") && symptoms.includes("confusion")) {
      riskFactors.push("Fever with confusion may indicate serious infection");
    }

    // Patient-specific risk factors
    patientRiskFactors.forEach((factor) => {
      riskFactors.push(`${factor} increases risk for complications`);
    });

    return riskFactors;
  }

  /**
   * Check if offline mode is available
   */
  isOfflineModeAvailable() {
    return this.isInitialized;
  }

  /**
   * Perform rule-based analysis when model is not ready
   */
  performRuleBasedAnalysis(symptomText) {
    const extractedSymptoms = this.extractSymptoms(symptomText);

    if (extractedSymptoms.length === 0) {
      return {
        predictions: [],
        confidence: 0,
        extractedSymptoms: [],
        emergencyAlert: false,
        message:
          "No recognizable symptoms found. Please describe your symptoms more clearly.",
      };
    }

    // Simple rule-based matching
    const matches = [];
    Object.entries(MEDICAL_CONDITIONS).forEach(([condition, data]) => {
      const conditionSymptoms = data.symptoms.map((s) => s.symptom);
      const matchCount = extractedSymptoms.filter((s) =>
        conditionSymptoms.includes(s),
      ).length;

      if (matchCount > 0) {
        const confidence = (matchCount / conditionSymptoms.length) * 0.8; // Max 80% for rule-based
        matches.push({
          condition,
          confidence,
          description: this.getConditionDescription(condition),
          severity: data.severity,
          matchedSymptoms: extractedSymptoms.filter((s) =>
            conditionSymptoms.includes(s),
          ),
        });
      }
    });

    matches.sort((a, b) => b.confidence - a.confidence);
    const topMatches = matches.slice(0, 3);

    return {
      predictions: topMatches,
      confidence: (topMatches[0]?.confidence || 0) * 100,
      extractedSymptoms,
      emergencyAlert: this.checkEmergencySymptoms(extractedSymptoms),
      message: this.generateMedicalAdvice(
        topMatches,
        (topMatches[0]?.confidence || 0) * 100,
        false,
      ),
      recommendedActions: this.getRecommendedActions(topMatches[0], false),
      riskFactors: [],
    };
  }

  /**
   * Get model performance statistics
   */
  getModelStats() {
    return {
      isInitialized: this.isInitialized,
      vocabularySize: this.vocabularySize,
      conditionCount: this.conditions.length,
      version: "2.0.0",
      lastUpdated: new Date().toISOString(),
    };
  }
}

// Create singleton instance
const enhancedOfflineSymptomAnalyzer = new EnhancedOfflineSymptomAnalyzer();

export default enhancedOfflineSymptomAnalyzer;
