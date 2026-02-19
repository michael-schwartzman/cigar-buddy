#!/bin/bash
set -e

echo "🏗️  Setting up Cigar Buddy development environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "18" ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Prerequisites checked"

# Start database services
echo "🐘 Starting PostgreSQL and Redis..."
docker-compose up -d postgres redis

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
timeout 60 bash -c 'until docker-compose exec -T postgres pg_isready -U cigar_user -d cigar_buddy_dev; do sleep 1; done'

if [ $? -ne 0 ]; then
    echo "❌ PostgreSQL failed to start within 60 seconds"
    exit 1
fi

echo "✅ Database services are running"

# Setup backend
echo "📦 Installing backend dependencies..."
cd backend

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Created .env file from .env.example"
    echo "⚠️  Please update .env with your API keys before running the app"
fi

# Install dependencies
npm install

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npm run db:generate

# Run database migrations
echo "🗄️  Running database migrations..."
npm run db:migrate

echo "✅ Backend setup complete"

cd ..

echo ""
echo "🎉 Development environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your API keys"
echo "2. Run 'npm run dev' in the backend directory to start the API server"
echo "3. Open Xcode and create the iOS project in the ios/ directory"
echo ""
echo "Useful commands:"
echo "- Start databases: docker-compose up -d"
echo "- Stop databases: docker-compose down"
echo "- View database: npm run db:studio (in backend directory)"
echo "- Reset database: docker-compose down -v && ./scripts/setup-dev.sh"
echo ""
