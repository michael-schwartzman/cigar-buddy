import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var appState: AppState
    
    var body: some View {
        ZStack {
            if appState.isAgeVerified {
                // Main app content
                MainTabView()
            } else {
                // Age verification required
                Color.clear
            }
            
            // Age gate modal (always appears on top when needed)
            if appState.showAgeGate {
                AgeVerificationView()
                    .transition(.opacity)
            }
        }
        .animation(.easeInOut, value: appState.showAgeGate)
    }
}

struct MainTabView: View {
    var body: some View {
        TabView {
            JournalView()
                .tabItem {
                    Image(systemName: "book.fill")
                    Text("Journal")
                }
            
            CameraView()
                .tabItem {
                    Image(systemName: "camera.fill")
                    Text("Identify")
                }
            
            SearchView()
                .tabItem {
                    Image(systemName: "magnifyingglass")
                    Text("Search")
                }
            
            ProfileView()
                .tabItem {
                    Image(systemName: "person.fill")
                    Text("Profile")
                }
        }
        .accentColor(.brown)
    }
}

// MARK: - Placeholder Views
struct JournalView: View {
    var body: some View {
        NavigationView {
            VStack {
                Text("📔 Your Cigar Journal")
                    .font(.title)
                    .padding()
                
                Text("Log your cigar experiences and track your preferences")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding()
                
                Spacer()
                
                // Compliance disclaimer
                VStack(spacing: 8) {
                    Text("Educational Purpose Only")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    
                    Text(ComplianceConstants.primaryDisclaimer)
                        .font(.caption2)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                }
                .padding(.bottom)
            }
            .navigationTitle("Journal")
        }
    }
}

struct CameraView: View {
    var body: some View {
        NavigationView {
            VStack {
                Text("📸 Cigar Identification")
                    .font(.title)
                    .padding()
                
                Text("Take a photo of a cigar band to identify it")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding()
                
                Spacer()
                
                Button("Open Camera") {
                    // Camera functionality will be implemented later
                    print("Camera functionality coming soon")
                }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                
                Spacer()
            }
            .navigationTitle("Identify")
        }
    }
}

struct SearchView: View {
    var body: some View {
        NavigationView {
            VStack {
                Text("🔍 Cigar Database")
                    .font(.title)
                    .padding()
                
                Text("Search and discover cigar information")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding()
                
                Spacer()
            }
            .navigationTitle("Search")
        }
    }
}

struct ProfileView: View {
    @EnvironmentObject private var appState: AppState
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("👤 Profile")
                    .font(.title)
                    .padding()
                
                VStack(spacing: 12) {
                    HStack {
                        Text("Age Verified:")
                        Spacer()
                        Image(systemName: appState.isAgeVerified ? "checkmark.circle.fill" : "xmark.circle.fill")
                            .foregroundColor(appState.isAgeVerified ? .green : .red)
                    }
                    
                    HStack {
                        Text("Subscription:")
                        Spacer()
                        Text(appState.subscriptionStatus.capitalized)
                            .foregroundColor(.secondary)
                    }
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(10)
                .padding(.horizontal)
                
                Spacer()
                
                // Compliance information
                VStack(spacing: 16) {
                    Text("Compliance Information")
                        .font(.headline)
                        .foregroundColor(.secondary)
                    
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundColor(.green)
                            Text("21+ Age Verification Required")
                        }
                        
                        HStack {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundColor(.green)
                            Text("Educational Content Only")
                        }
                        
                        HStack {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundColor(.green)
                            Text("No Tobacco Sales")
                        }
                        
                        HStack {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundColor(.green)
                            Text("External Purchase Links")
                        }
                    }
                    .font(.caption)
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(10)
                .padding(.horizontal)
                
                Spacer()
            }
            .navigationTitle("Profile")
        }
    }
}

#Preview {
    ContentView()
        .environmentObject(AppState())
}
