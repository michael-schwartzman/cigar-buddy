import SwiftUI

@main
struct CigarBuddyApp: App {
    @StateObject private var appState = AppState()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
                .onAppear {
                    checkAgeVerification()
                }
        }
    }
    
    private func checkAgeVerification() {
        // Check if user has already verified their age
        let ageVerified = UserDefaults.standard.bool(forKey: "age_verified")
        appState.isAgeVerified = ageVerified
        
        if !ageVerified {
            appState.showAgeGate = true
        }
    }
}

class AppState: ObservableObject {
    @Published var isAgeVerified: Bool = false
    @Published var showAgeGate: Bool = false
    @Published var isAuthenticated: Bool = false
    @Published var subscriptionStatus: String = "free"
}

// MARK: - Compliance Constants
struct ComplianceConstants {
    static let minimumAge = 21
    static let appStorageAgeKey = "age_verified"
    static let appStorageBirthYearKey = "birth_year"
    
    // App Store compliance disclaimers
    static let primaryDisclaimer = "This app is for informational and journaling purposes only. We do not sell cigars or facilitate tobacco transactions."
    static let ageRequirement = "You must be 21 years or older to use this application."
    static let affiliateDisclosure = "Some retailer links may generate commissions to support app development."
    
    // External link handling
    static func openExternalLink(_ urlString: String) {
        guard let url = URL(string: urlString) else { return }
        
        // Always use UIApplication.shared.open for purchase links
        // This ensures compliance with App Store guidelines
        UIApplication.shared.open(url)
    }
}
