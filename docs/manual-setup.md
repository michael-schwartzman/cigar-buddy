# Development Setup - Manual Installation

If Docker is not available, you can set up the development environment manually.

## Prerequisites

1. **Node.js 18+**
   ```bash
   # Install via Homebrew (recommended on macOS)
   brew install node@18
   
   # Or download from nodejs.org
   ```

2. **PostgreSQL 15+**
   ```bash
   # Install via Homebrew
   brew install postgresql@15
   brew services start postgresql@15
   
   # Create database
   createdb cigar_buddy_dev
   ```

## Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   # Copy example environment file
   cp .env.example .env
   
   # Edit .env with your settings
   nano .env
   ```

3. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run migrations
   npm run db:migrate
   
   # Optional: Seed with sample data
   npm run db:seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## iOS Setup

1. **Open Xcode**
   - Launch Xcode 15+
   - Create new iOS project in `ios/` directory
   - Configure as described in `ios/README.md`

2. **Project Configuration**
   - Product Name: CigarBuddy
   - Bundle ID: com.yourcompany.cigarbuddy
   - Language: Swift
   - Interface: SwiftUI
   - Deployment Target: iOS 15.0+

3. **Add Required Capabilities**
   - Camera usage
   - Sign in with Apple
   - Background app refresh

## Testing

```bash
# Backend tests
cd backend
npm test

# iOS tests (in Xcode)
# Product → Test (⌘+U)
```

## Next Steps

1. **Update API Keys**: Add real API keys to `.env`
2. **Implement Age Gate**: Start with compliance features
3. **Camera Integration**: Add photo capture functionality
4. **Backend Integration**: Connect iOS app to API

## Troubleshooting

### Common Issues

1. **Node.js Version**: Ensure Node.js 18+ is installed
2. **PostgreSQL**: Make sure PostgreSQL service is running
3. **API Keys**: Placeholder keys will cause API failures
4. **Xcode**: Requires macOS and Apple Developer account
