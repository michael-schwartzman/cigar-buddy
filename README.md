# Cigar Buddy

An App Store-compliant iOS app for cigar enthusiasts providing photo identification, journaling, and pairing suggestions.

## Features

- 📸 **Photo Identification**: Identify cigars by photographing their bands
- 📔 **Personal Journal**: Log smoking sessions with ratings and notes
- 🍷 **Pairing Suggestions**: AI-powered beverage and food recommendations
- 🔍 **Cigar Database**: Comprehensive searchable cigar information
- 🛒 **Purchase Links**: Direct links to authorized retailers (external)
- ⭐ **Premium Features**: Ad-free experience and advanced suggestions

## Compliance

This app is designed to be fully compliant with Apple App Store guidelines:
- Age verification (21+) required
- No in-app tobacco sales
- All purchase links open in external Safari
- Educational content only
- No tobacco advertising

## Project Structure

```
cigar/
├── ios/                 # iOS app (SwiftUI)
├── backend/             # Node.js API server
├── memory-bank/         # Project documentation
├── scripts/             # Development utilities
├── docs/                # Additional documentation
└── docker-compose.yml   # Local development environment
```

## Quick Start

### Prerequisites
- macOS with Xcode 15+
- Node.js 18+
- Docker Desktop
- Apple Developer Account

### Setup Development Environment

```bash
# Clone and setup
git clone <repository-url>
cd cigar

# Run development setup script
./scripts/setup-dev.sh

# Start backend API
cd backend
npm run dev

# Open iOS project in Xcode
open ios/CigarBuddy.xcodeproj
```

## Development

### Backend API
```bash
cd backend
npm run dev          # Start development server
npm run test         # Run tests
npm run db:studio    # Open database admin
```

### iOS App
- Open `ios/CigarBuddy.xcodeproj` in Xcode
- Build and run on simulator or device
- Requires backend API running locally

## Architecture

### Tech Stack
- **iOS**: SwiftUI + Core Data + AVFoundation
- **Backend**: Node.js + TypeScript + Express + Prisma
- **Database**: PostgreSQL
- **ML/AI**: Core ML + OpenAI + Google Vision
- **Auth**: Sign in with Apple + JWT

### Key Services
- Photo identification pipeline
- Journal entry management
- User authentication and sync
- Pairing suggestion engine
- Affiliate link management

## Deployment

### Development
- Local Docker containers for database
- Local Node.js server for API
- Xcode simulator/device for iOS

### Production
- iOS App Store distribution
- Cloud hosting for backend API
- Managed PostgreSQL database

## Contributing

1. Read the Memory Bank documentation in `memory-bank/`
2. Follow the coding standards in `.github/copilot-instructions.md`
3. Ensure all features maintain App Store compliance
4. Test thoroughly before submitting PRs

## License

Proprietary - All rights reserved

## Support

For development questions, see the Memory Bank documentation or create an issue.
