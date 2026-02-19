# System Patterns - Cigar Buddy

## Architecture Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   iOS App       │    │   Web App       │    │   Backend API   │
│   (SwiftUI)     │◄──►│   (React)       │◄──►│   (Node.js)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                       ┌─────────────────┐             │
                       │   ML Services   │◄────────────┤
                       │   (Image/LLM)   │             │
                       └─────────────────┘             │
                                                        │
                       ┌─────────────────┐             │
                       │   Database      │◄────────────┘
                       │   (PostgreSQL)  │
                       └─────────────────┘
```

## Core Components

### iOS App (Primary)
- **SwiftUI** for modern declarative UI
- **AVFoundation** for camera capture
- **Vision Framework** for image processing
- **StoreKit** for IAP management
- **Core Data** for local caching

### Backend Services
- **Authentication**: JWT-based with Apple/Google OAuth
- **Cigar Database**: Structured metadata (brand, vitola, origin, etc.)
- **ML Pipeline**: Image classification + OCR for band recognition
- **Pairing Engine**: LLM-powered suggestions with caching
- **Sync Service**: User data synchronization

### Data Flow Patterns
1. **Photo Identification**: Camera → Vision → ML Service → Database Lookup
2. **Journal Entry**: UI Form → Local Storage → Background Sync → Cloud
3. **Pairing Generation**: Cigar Data → LLM Service → Cache → Display

## Key Design Decisions

### Compliance Architecture
- **Age Gate**: Local storage flag + server validation
- **External Links**: `UIApplication.shared.open()` for all purchase links
- **Ad Filtering**: SDK-level category exclusions
- **Data Privacy**: Encrypted local storage + secure cloud sync

### Performance Patterns
- **Offline-First**: Core features work without connectivity
- **Lazy Loading**: Images and heavy data loaded on demand
- **Caching Strategy**: Aggressive caching for ML results and pairing suggestions
- **Background Sync**: Queue-based synchronization

### Scalability Considerations
- **Microservices**: Separate ML processing from core API
- **CDN**: Image and static asset delivery
- **Database Indexing**: Optimized for search and filtering
- **Rate Limiting**: API protection and cost control
