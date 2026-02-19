import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken, requireAgeVerification, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Age verification endpoint
router.post('/verify-age', [
  body('ageConfirmed').isBoolean().withMessage('Age confirmation must be boolean'),
  body('birthYear').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Valid birth year required')
], async (req: AuthenticatedRequest, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { ageConfirmed, birthYear } = req.body;
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (!ageConfirmed || age < 21) {
    return res.status(403).json({ 
      error: 'Must be 21 years or older to use this application',
      ageRequirement: true
    });
  }

  // Update user age verification status
  // TODO: Implement database update
  
  res.json({ 
    message: 'Age verification successful',
    verified: true
  });
});

// Get user profile
router.get('/profile', authenticateToken, requireAgeVerification, async (req: AuthenticatedRequest, res) => {
  try {
    // TODO: Fetch user profile from database
    const userProfile = {
      id: req.user?.id,
      email: req.user?.email,
      subscriptionStatus: req.user?.subscriptionStatus,
      ageVerified: true
    };

    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update user preferences
router.put('/preferences', authenticateToken, requireAgeVerification, [
  body('enableNotifications').optional().isBoolean(),
  body('enablePairingAlerts').optional().isBoolean(),
  body('shareJournal').optional().isBoolean()
], async (req: AuthenticatedRequest, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // TODO: Update user preferences in database
    res.json({ message: 'Preferences updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

export default router;
