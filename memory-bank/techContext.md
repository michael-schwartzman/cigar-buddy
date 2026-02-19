# Tech Context - Cigar Buddy

## Technology Stack

### iOS App
- **Language**: Swift 5.9+
- **Framework**: SwiftUI + UIKit (camera components)
- **Minimum iOS**: 15.0+
- **Camera**: AVFoundation + Vision Framework
- **ML**: Core ML for local processing
- **Storage**: Core Data + CloudKit sync
- **Networking**: URLSession + async/await
- **Authentication**: Sign in with Apple + Firebase Auth
- **Payments**: StoreKit 2
- **Ads**: Google AdMob with category filtering

### Backend
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js + Helmet (security)
- **Database**: PostgreSQL 15+ with prisma ORM
- **Authentication**: JWT + OAuth providers
- **File Storage**: AWS S3 for images
- **ML Services**: 
  - OpenAI GPT-4 for pairing suggestions
  - Google Vision API for OCR fallback
  - Custom Core ML model for band recognition
- **Deployment**: Docker + AWS ECS/Lambda

### Web App (Optional)
- **Framework**: React 18 + TypeScript
- **Build**: Vite + ESBuild
- **UI**: Tailwind CSS + Headless UI
- **State**: React Query + Zustand
- **Authentication**: Same JWT system as iOS

## Development Environment

### Prerequisites
```bash
# iOS Development
- Xcode 15+
- iOS Simulator
- Apple Developer Account

# Backend Development  
- Node.js 18+
- Docker Desktop
- PostgreSQL (local or Docker)
- AWS CLI (for S3/deployment)

# Web Development
- Node.js 18+
- Modern browser with dev tools
```

### Environment Variables
```bash
# Backend
DATABASE_URL=postgresql://...
JWT_SECRET=...
OPENAI_API_KEY=...
GOOGLE_VISION_API_KEY=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
ADMOB_APP_ID=...

# iOS (Info.plist)
OPENAI_API_KEY
BACKEND_BASE_URL
ADMOB_APP_ID
```

## External Dependencies

### APIs & Services
- **OpenAI**: Pairing suggestions and cigar descriptions
- **Google Vision**: OCR for cigar band text extraction
- **AdMob**: Non-tobacco ad serving
- **Sign in with Apple**: User authentication
- **Affiliate Networks**: Commission Junction, ShareASale

### Third-Party Libraries
- **iOS**: 
  - Alamofire (networking)
  - Kingfisher (image loading)
  - SwiftUI-Introspect (UI utilities)
- **Backend**:
  - Prisma (ORM)
  - Passport (OAuth)
  - Multer (file uploads)
  - Rate-limiter-flexible

## Performance Constraints
- **Image Processing**: Max 5MB photos, compress before upload
- **LLM Costs**: Cache pairing suggestions, batch similar requests
- **Database**: Index on search fields, pagination for large datasets
- **Mobile Data**: Offline-first design, background sync only

## Security Requirements
- **Data Encryption**: AES-256 for local storage
- **API Security**: JWT tokens, rate limiting, input validation
- **Privacy**: No tracking without consent, GDPR compliance
- **App Store**: Age verification, content rating 17+
