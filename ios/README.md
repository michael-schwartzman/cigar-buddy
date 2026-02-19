# Cigar Buddy iOS App

## Overview
Native iOS app built with SwiftUI providing cigar identification, journaling, and pairing suggestions.

## Requirements
- iOS 15.0+
- Xcode 15+
- Apple Developer Account

## Project Setup

### 1. Create Xcode Project
```bash
# Open Xcode and create a new project with these settings:
# - Template: iOS App
# - Product Name: CigarBuddy
# - Bundle Identifier: com.yourcompany.cigarbuddy
# - Language: Swift
# - Interface: SwiftUI
# - Use Core Data: Yes
# - Include Tests: Yes
```

### 2. Configure Project Settings
- Deployment Target: iOS 15.0
- Signing & Capabilities:
  - Add Camera usage description
  - Add Sign in with Apple capability
  - Add Background App Refresh (for sync)

### 3. Required Permissions (Info.plist)
```xml
<key>NSCameraUsageDescription</key>
<string>Cigar Buddy uses the camera to identify cigars from photos of their bands.</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>Cigar Buddy can optionally record the location where you enjoyed your cigar for your personal journal.</string>
```

### 4. Key Dependencies
- No external dependencies required initially
- Use built-in frameworks:
  - SwiftUI (UI)
  - AVFoundation (Camera)
  - Vision (Image Processing)
  - Core Data (Local Storage)
  - StoreKit (IAP)

## Architecture

### App Structure
```
CigarBuddy/
├── App/
│   ├── CigarBuddyApp.swift
│   └── ContentView.swift
├── Features/
│   ├── Authentication/
│   ├── Onboarding/
│   ├── Camera/
│   ├── Journal/
│   ├── Search/
│   └── Profile/
├── Core/
│   ├── Models/
│   ├── Services/
│   ├── Utilities/
│   └── Extensions/
└── Resources/
    ├── Assets.xcassets
    └── CoreData.xcdatamodeld
```

### Key Components
1. **Onboarding**: Age verification and app introduction
2. **Camera**: Photo capture and ML processing
3. **Journal**: Entry creation and browsing
4. **Search**: Cigar discovery and information
5. **Profile**: User settings and subscription

## Development Guidelines

### Code Style
- Use SwiftUI for all new UI
- UIKit only for camera integration
- Follow Apple's Human Interface Guidelines
- Use async/await for network operations
- Implement proper error handling

### Compliance Requirements
- Age gate on first launch (21+ verification)
- All purchase links open in external Safari
- Educational language throughout
- No tobacco sales or promotion

## Getting Started

1. Complete backend setup first
2. Create Xcode project with above specifications
3. Implement basic navigation structure
4. Add age verification flow
5. Integrate with backend API

## Testing Strategy

- Unit tests for business logic
- UI tests for critical flows
- Manual testing for camera features
- Compliance testing before submission
