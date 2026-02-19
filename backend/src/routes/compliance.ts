import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { addComplianceHeaders, logComplianceActions } from '../middleware/compliance';

const router = Router();

// Apply compliance middleware to all routes
router.use(addComplianceHeaders);
router.use(logComplianceActions);

/**
 * Age verification endpoint
 * POST /api/compliance/verify-age
 * Required for all users on first app launch
 */
router.post('/verify-age', [
  body('birthYear').isInt({ min: 1900, max: new Date().getFullYear() - 21 }).withMessage('Must be 21 years or older'),
  body('confirmed').isBoolean().withMessage('Age confirmation required'),
  body('ipAddress').optional().isIP().withMessage('Valid IP address required'),
  body('country').optional().isAlpha().withMessage('Valid country code required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array(),
      complianceViolation: 'AGE_VERIFICATION_FAILED'
    });
  }

  const { birthYear, confirmed, ipAddress, country } = req.body;
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  // Strict age verification - must be 21+
  if (!confirmed || age < 21) {
    return res.status(403).json({
      error: 'Access denied',
      message: 'You must be 21 years or older to use this application',
      complianceViolation: 'AGE_REQUIREMENT_NOT_MET',
      minimumAge: 21,
      calculatedAge: age
    });
  }

  // Log successful age verification
  console.log(`[COMPLIANCE] Age verified - Age: ${age}, IP: ${ipAddress}, Country: ${country}`);

  res.json({
    verified: true,
    message: 'Age verification successful',
    timestamp: new Date().toISOString(),
    disclaimer: 'This app is for informational and journaling purposes only. We do not sell cigars or facilitate tobacco transactions.'
  });
});

/**
 * External link validation endpoint
 * POST /api/compliance/validate-link
 * Validates that purchase links are properly formatted for external opening
 */
router.post('/validate-link', [
  body('url').isURL().withMessage('Valid URL required'),
  body('retailer').isString().withMessage('Retailer name required'),
  body('cigarId').optional().isString().withMessage('Valid cigar ID required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { url, retailer, cigarId } = req.body;

  // Validate that URL is external (not internal app links)
  const internalDomains = ['localhost', 'cigar-buddy', 'app.cigar-buddy'];
  const urlDomain = new URL(url).hostname;
  
  if (internalDomains.some(domain => urlDomain.includes(domain))) {
    return res.status(400).json({
      error: 'Invalid link',
      message: 'Purchase links must be external',
      complianceViolation: 'INTERNAL_PURCHASE_LINK'
    });
  }

  // Approved retailer domains for affiliate links
  const approvedRetailers = [
    'jrcigars.com',
    'famous-smoke.com',
    'cigars.com',
    'holts.com',
    'coronacigar.com'
  ];

  const isApprovedRetailer = approvedRetailers.some(domain => urlDomain.includes(domain));

  res.json({
    valid: true,
    external: true,
    approvedRetailer: isApprovedRetailer,
    url: url,
    retailer: retailer,
    cigarId: cigarId,
    disclaimer: 'This link will open in your external browser. We may earn a commission from purchases.',
    instructions: 'Use UIApplication.shared.open() to open this link'
  });
});

/**
 * Content policy check endpoint
 * POST /api/compliance/check-content
 * Validates user-generated content against App Store policies
 */
router.post('/check-content', [
  body('content').isString().notEmpty().withMessage('Content is required'),
  body('type').isIn(['journal_entry', 'review', 'comment']).withMessage('Valid content type required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content, type } = req.body;
  const contentLower = content.toLowerCase();

  // Check for prohibited promotional language
  const prohibitedTerms = [
    'best cigar ever',
    'must smoke',
    'you should try',
    'amazing smoking experience',
    'perfect for beginners',
    'highly recommended for smokers'
  ];

  const violations = prohibitedTerms.filter(term => contentLower.includes(term));

  if (violations.length > 0) {
    return res.status(400).json({
      valid: false,
      complianceViolation: 'PROMOTIONAL_CONTENT',
      violations: violations,
      message: 'Content contains promotional language',
      suggestion: 'Use neutral, educational language to describe your personal experience'
    });
  }

  // Check for inappropriate content
  const inappropriateTerms = ['smoking is cool', 'start smoking', 'tobacco is good'];
  const inappropriateViolations = inappropriateTerms.filter(term => contentLower.includes(term));

  if (inappropriateViolations.length > 0) {
    return res.status(400).json({
      valid: false,
      complianceViolation: 'INAPPROPRIATE_CONTENT',
      violations: inappropriateViolations,
      message: 'Content violates tobacco promotion policies'
    });
  }

  res.json({
    valid: true,
    content: content,
    type: type,
    message: 'Content meets compliance standards'
  });
});

/**
 * Compliance status endpoint
 * GET /api/compliance/status
 * Returns current compliance status and requirements
 */
router.get('/status', (req, res) => {
  res.json({
    appStoreCompliance: {
      ageVerificationRequired: true,
      minimumAge: 21,
      externalLinksOnly: true,
      noTobaccoSales: true,
      educationalContentOnly: true
    },
    features: {
      photoIdentification: 'educational',
      journaling: 'personal',
      pairingSuggestions: 'informational',
      purchaseLinks: 'external_only'
    },
    disclaimers: {
      primary: 'This app is for informational and journaling purposes only.',
      purchase: 'We do not sell cigars or facilitate tobacco transactions.',
      affiliate: 'Some links may generate commissions for app maintenance.',
      age: 'Must be 21+ years old to use this application.'
    },
    lastUpdated: new Date().toISOString()
  });
});

export default router;
