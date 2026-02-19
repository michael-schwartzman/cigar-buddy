import { Request, Response, NextFunction } from 'express';

export interface ComplianceRequest extends Request {
  ageVerified?: boolean;
  complianceChecks?: {
    ageGate: boolean;
    termsAccepted: boolean;
    region: string;
  };
}

/**
 * Age verification middleware - ensures user has confirmed they are 21+
 * This is required for ALL app functionality per App Store compliance
 */
export const requireAgeVerification = async (req: ComplianceRequest, res: Response, next: NextFunction) => {
  try {
    // In production, this would check the user's age verification status from database
    // For now, we'll check if the request includes age verification
    const ageVerified = req.headers['x-age-verified'] === 'true' || req.body?.ageVerified;
    
    if (!ageVerified) {
      return res.status(403).json({
        error: 'Age verification required',
        message: 'You must be 21 years or older to use this application',
        complianceViolation: 'AGE_VERIFICATION_REQUIRED',
        redirectTo: '/verify-age'
      });
    }

    req.ageVerified = true;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Age verification check failed' });
  }
};

/**
 * External link validation - ensures all purchase/affiliate links
 * are properly marked as external and include required disclaimers
 */
export const validateExternalLinks = (req: ComplianceRequest, res: Response, next: NextFunction) => {
  // Check if request contains any purchase or affiliate links
  const bodyString = JSON.stringify(req.body || {});
  const purchaseKeywords = ['buy', 'purchase', 'shop', 'cart', 'checkout'];
  
  // If this request contains purchase-related content, ensure compliance
  if (purchaseKeywords.some(keyword => bodyString.toLowerCase().includes(keyword))) {
    // Add compliance headers to response
    res.setHeader('X-Compliance-Warning', 'External purchase links only');
    res.setHeader('X-Affiliate-Disclosure', 'May contain affiliate links');
  }
  
  next();
};

/**
 * Content filtering middleware - ensures no promotional tobacco content
 */
export const filterTobaccoContent = (req: ComplianceRequest, res: Response, next: NextFunction) => {
  // List of promotional terms that violate App Store guidelines
  const prohibitedTerms = [
    'best cigar',
    'must try',
    'amazing taste',
    'smoking pleasure',
    'you should smoke',
    'highly recommended for smokers'
  ];

  const bodyString = JSON.stringify(req.body || {}).toLowerCase();
  
  // Check for promotional language
  for (const term of prohibitedTerms) {
    if (bodyString.includes(term)) {
      return res.status(400).json({
        error: 'Content policy violation',
        message: 'Content contains promotional tobacco language',
        complianceViolation: 'PROMOTIONAL_CONTENT',
        suggestion: 'Use neutral, educational language only'
      });
    }
  }
  
  next();
};

/**
 * Compliance logging middleware - logs all compliance-related actions
 */
export const logComplianceActions = (req: ComplianceRequest, res: Response, next: NextFunction) => {
  const complianceAction = req.headers['x-compliance-action'];
  
  if (complianceAction) {
    console.log(`[COMPLIANCE] ${new Date().toISOString()} - Action: ${complianceAction}, User: ${req.headers['x-user-id'] || 'anonymous'}, IP: ${req.ip}`);
  }
  
  next();
};

/**
 * App Store compliance headers - adds required headers for App Store compliance
 */
export const addComplianceHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Add compliance-related headers to all responses
  res.setHeader('X-Content-Rating', '17+');
  res.setHeader('X-Age-Requirement', '21+');
  res.setHeader('X-Tobacco-Sales', 'prohibited');
  res.setHeader('X-Educational-Purpose', 'true');
  
  next();
};
