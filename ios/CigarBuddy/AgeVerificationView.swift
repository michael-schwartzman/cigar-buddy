import SwiftUI

struct AgeVerificationView: View {
    @EnvironmentObject private var appState: AppState
    @State private var birthYear: String = ""
    @State private var agreedToTerms: Bool = false
    @State private var showError: Bool = false
    @State private var errorMessage: String = ""
    @State private var isLoading: Bool = false
    
    private let currentYear = Calendar.current.component(.year, from: Date())
    
    var body: some View {
        ZStack {
            // Background overlay
            Color.black.opacity(0.8)
                .ignoresSafeArea()
            
            // Age verification card
            VStack(spacing: 24) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "exclamationmark.shield.fill")
                        .font(.system(size: 50))
                        .foregroundColor(.orange)
                    
                    Text("Age Verification Required")
                        .font(.title2)
                        .fontWeight(.bold)
                    
                    Text("This app is intended for users 21 years or older")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                }
                
                Divider()
                
                // Form
                VStack(spacing: 16) {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Birth Year")
                            .font(.headline)
                        
                        TextField("Enter your birth year", text: $birthYear)
                            .textFieldStyle(.roundedBorder)
                            .keyboardType(.numberPad)
                    }
                    
                    VStack(alignment: .leading, spacing: 8) {
                        HStack(alignment: .top, spacing: 12) {
                            Button(action: { agreedToTerms.toggle() }) {
                                Image(systemName: agreedToTerms ? "checkmark.square.fill" : "square")
                                    .foregroundColor(agreedToTerms ? .blue : .gray)
                            }
                            
                            VStack(alignment: .leading, spacing: 4) {
                                Text("I confirm that I am 21 years or older")
                                    .font(.subheadline)
                                
                                Text("Required for App Store compliance")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                        }
                    }
                }
                
                // Error message
                if showError {
                    Text(errorMessage)
                        .font(.caption)
                        .foregroundColor(.red)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                }
                
                // Compliance disclaimer
                VStack(spacing: 8) {
                    Text("Important Notice")
                        .font(.headline)
                        .foregroundColor(.secondary)
                    
                    Text(ComplianceConstants.primaryDisclaimer)
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(8)
                
                // Buttons
                HStack(spacing: 16) {
                    Button("Cancel") {
                        // Exit app - age verification is mandatory
                        exit(0)
                    }
                    .buttonStyle(.bordered)
                    .foregroundColor(.red)
                    
                    Button("Verify Age") {
                        verifyAge()
                    }
                    .buttonStyle(.borderedProminent)
                    .disabled(!canVerify)
                    .opacity(canVerify ? 1.0 : 0.6)
                }
            }
            .padding(24)
            .background(Color(.systemBackground))
            .cornerRadius(16)
            .padding(.horizontal, 20)
            .shadow(radius: 20)
            
            // Loading overlay
            if isLoading {
                Color.black.opacity(0.3)
                    .ignoresSafeArea()
                
                ProgressView("Verifying...")
                    .padding()
                    .background(Color(.systemBackground))
                    .cornerRadius(8)
            }
        }
    }
    
    private var canVerify: Bool {
        !birthYear.isEmpty && agreedToTerms && !isLoading
    }
    
    private func verifyAge() {
        guard let year = Int(birthYear) else {
            showErrorMessage("Please enter a valid birth year")
            return
        }
        
        let age = currentYear - year
        
        guard age >= ComplianceConstants.minimumAge else {
            showErrorMessage("You must be \(ComplianceConstants.minimumAge) years or older to use this app")
            return
        }
        
        guard year >= 1900 && year <= currentYear - 18 else {
            showErrorMessage("Please enter a valid birth year")
            return
        }
        
        isLoading = true
        
        // Simulate API call for age verification
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            completeAgeVerification(birthYear: year)
        }
    }
    
    private func completeAgeVerification(birthYear: Int) {
        // Store age verification locally
        UserDefaults.standard.set(true, forKey: ComplianceConstants.appStorageAgeKey)
        UserDefaults.standard.set(birthYear, forKey: ComplianceConstants.appStorageBirthYearKey)
        
        // Log compliance action
        print("[COMPLIANCE] Age verified - Birth Year: \(birthYear), Age: \(currentYear - birthYear)")
        
        // Update app state
        appState.isAgeVerified = true
        appState.showAgeGate = false
        isLoading = false
        
        // In production, this would also call the backend API to store verification
        // POST /api/compliance/verify-age
    }
    
    private func showErrorMessage(_ message: String) {
        errorMessage = message
        showError = true
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 3.0) {
            showError = false
        }
    }
}

// MARK: - External Link Handler
struct ExternalLinkView: View {
    let url: String
    let retailer: String
    let productName: String
    
    var body: some View {
        VStack(spacing: 16) {
            Text("External Link")
                .font(.headline)
            
            Text("This will open \(retailer) in your browser")
                .font(.subheadline)
                .foregroundColor(.secondary)
            
            Text(productName)
                .font(.body)
                .fontWeight(.medium)
                .multilineTextAlignment(.center)
            
            VStack(spacing: 8) {
                Text("Affiliate Disclosure")
                    .font(.caption)
                    .fontWeight(.medium)
                
                Text(ComplianceConstants.affiliateDisclosure)
                    .font(.caption2)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
            .padding()
            .background(Color(.systemGray6))
            .cornerRadius(8)
            
            HStack(spacing: 16) {
                Button("Cancel") {
                    // Dismiss
                }
                .buttonStyle(.bordered)
                
                Button("Open in Browser") {
                    // CRITICAL: Always use UIApplication.shared.open for purchase links
                    // This ensures App Store compliance
                    ComplianceConstants.openExternalLink(url)
                }
                .buttonStyle(.borderedProminent)
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(radius: 10)
    }
}

#Preview {
    AgeVerificationView()
        .environmentObject(AppState())
}
