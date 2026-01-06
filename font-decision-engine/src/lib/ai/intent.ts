export type RiskLevel = 'low' | 'medium' | 'high';

export type AIIntentSignal = {
  riskLevel: RiskLevel;
  detectedContexts: string[];
  confidence: number; // 0 to 1
};

// Keywords that trigger specific risk levels
const HIGH_RISK_KEYWORDS = [
  'ir', 'investor', 'pitch', 'deck', 'fundraising', 'series a', 'ipo',
  'legal', 'contract', 'agreement', 'terms', 'law', 'compliance',
  'government', 'public', 'official', 'report', 'audit', 'finance', 'fintech',
  'bank', 'medical', 'hospital', 'security', 'trust'
];

const MEDIUM_RISK_KEYWORDS = [
  'marketing', 'ad', 'social media', 'brand', 'identity', 'commerce',
  'shop', 'store', 'sales', 'presentation', 'proposal', 'client'
];

export function classifyRisk(text: string): AIIntentSignal {
  const lowerText = text.toLowerCase();
  const detectedContexts: string[] = [];

  // 1. Check High Risk
  let highRiskCount = 0;
  HIGH_RISK_KEYWORDS.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      detectedContexts.push(keyword);
      highRiskCount++;
    }
  });

  if (highRiskCount > 0) {
    return {
      riskLevel: 'high',
      detectedContexts: Array.from(new Set(detectedContexts)), // Deduplicate
      confidence: Math.min(0.6 + (highRiskCount * 0.1), 0.99) // Base 0.6, max 0.99
    };
  }

  // 2. Check Medium Risk
  let mediumRiskCount = 0;
  MEDIUM_RISK_KEYWORDS.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      detectedContexts.push(keyword);
      mediumRiskCount++;
    }
  });

  if (mediumRiskCount > 0) {
    return {
      riskLevel: 'medium',
      detectedContexts: Array.from(new Set(detectedContexts)),
      confidence: Math.min(0.4 + (mediumRiskCount * 0.1), 0.8)
    };
  }

  // 3. Default Low Risk
  return {
    riskLevel: 'low',
    detectedContexts: [],
    confidence: 0.2
  };
}
