# Copilot Instructions - Cigar Buddy

This file provides guidance for AI coding agents working on the Cigar Buddy iOS/Web app.

## Project Overview

**Cigar Buddy** is an App Store-compliant cigar companion app providing photo identification, journaling, and pairing suggestions without facilitating tobacco sales.

## Core Commands

```bash
# iOS Development
xcodebuild -scheme CigarBuddy build
xcodebuild test -scheme CigarBuddy

# Backend Development
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run test suite
npm run test:watch   # Run tests in watch mode
npm run lint         # Check code style
npm run lint:fix     # Fix linting issues
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed development data

# Development Setup
docker-compose up -d postgres  # Start local database
npm run setup:dev              # Initialize development environment
```

## Architecture

### Core Components
- **iOS App**: SwiftUI + UIKit for camera functionality
- **Backend API**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **ML Services**: Core ML (local) + OpenAI/Google Vision (cloud)
- **Authentication**: JWT + Sign in with Apple

### Data Stores
- **PostgreSQL**: User data, cigars, journal entries, pairings
- **Core Data**: Local caching and offline support
- **S3**: Image storage and ML model assets
- **Redis**: Session management and ML result caching

### External APIs
- **OpenAI GPT-4**: Pairing suggestions and descriptions
- **Google Vision**: OCR fallback for band text extraction
- **AdMob**: Non-tobacco ad serving
- **Apple IAP**: Premium subscription management

## Critical Compliance Rules

### App Store Compliance (MANDATORY)
- **Age Gate**: Must verify 21+ on first launch
- **External Links**: ALL purchase links open in Safari via `UIApplication.shared.open()`
- **No Tobacco Sales**: App cannot facilitate tobacco transactions
- **Educational Language**: Use neutral, informational tone only
- **Ad Filtering**: Exclude tobacco, alcohol, gambling categories

### Implementation Requirements
- Age verification modal with local storage persistence
- External link handler for all affiliate URLs
- Content review for App Store compliance
- Legal disclaimers in UI and Privacy Policy

## Style Guide

### Swift/iOS
- Use SwiftUI for new UI components
- UIKit only for camera and complex integrations
- Follow Apple Human Interface Guidelines
- Async/await for all network operations
- Core Data for local persistence

### TypeScript/Backend
- Strict TypeScript configuration
- Prisma for database operations
- Express middleware for security (Helmet, CORS)
- JWT for API authentication
- Comprehensive error handling with proper HTTP status codes

### Database
- Use Prisma schema for all database changes
- Include proper indexes for search functionality
- Implement soft deletes for user data
- Follow GDPR compliance for data retention

## Performance Requirements

- Photo identification: <3 seconds
- Journal entry save: <1 second
- Search results: <500ms
- App launch: <2 seconds cold start
- ML API costs: <$0.10 per pairing suggestion

## Security Guidelines

- AES-256 encryption for local data storage
- JWT tokens with proper expiration
- Input validation on all API endpoints
- Rate limiting for ML-powered features
- No sensitive data in logs or analytics

## Testing Standards

- Unit tests for all business logic
- Integration tests for API endpoints
- UI tests for critical user flows
- Compliance testing for App Store requirements
- Performance testing for ML pipelines

## Development Notes

- Memory Bank documentation in `/memory-bank/` folder contains project context
- Read Memory Bank files before starting any new features
- Update task progress in `/memory-bank/tasks/` folder
- All features must pass compliance review before merge

## Agent Rules

### Memory Bank Integration
- Always read relevant Memory Bank files before starting work
- Update task progress and documentation after significant changes
- Use **update memory bank** command when project context changes significantly

### Compliance First
- Every feature must be reviewed against App Store guidelines
- Never implement in-app tobacco purchasing or sales
- All purchase flows must redirect to external Safari browser
- Include appropriate disclaimers and age verification