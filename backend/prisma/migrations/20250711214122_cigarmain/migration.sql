-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "appleId" TEXT,
    "googleId" TEXT,
    "name" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "ageVerified" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionStatus" TEXT NOT NULL DEFAULT 'free',
    "subscriptionEndDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "enableNotifications" BOOLEAN NOT NULL DEFAULT true,
    "enablePairingAlerts" BOOLEAN NOT NULL DEFAULT true,
    "shareJournal" BOOLEAN NOT NULL DEFAULT false,
    "shareWishlist" BOOLEAN NOT NULL DEFAULT false,
    "enablePhotoProcessing" BOOLEAN NOT NULL DEFAULT true,
    "enablePairingSuggestions" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cigars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "origin" TEXT,
    "vitola" TEXT,
    "wrapper" TEXT,
    "binder" TEXT,
    "filler" TEXT,
    "strength" TEXT,
    "flavorProfile" TEXT[],
    "msrp" DOUBLE PRECISION,
    "description" TEXT,
    "imageUrl" TEXT,
    "searchVector" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cigars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journal_entries" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cigarId" TEXT NOT NULL,
    "smokedAt" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "companions" TEXT[],
    "duration" INTEGER,
    "rating" INTEGER NOT NULL,
    "notes" TEXT,
    "weather" TEXT,
    "occasion" TEXT,
    "beverage" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "journal_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pairings" (
    "id" TEXT NOT NULL,
    "cigarId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0.8,
    "source" TEXT NOT NULL DEFAULT 'ai',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pairings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cigarId" TEXT NOT NULL,
    "notes" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affiliate_links" (
    "id" TEXT NOT NULL,
    "cigarId" TEXT,
    "retailer" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "lastChecked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "affiliate_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_appleId_key" ON "users"("appleId");

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_userId_key" ON "user_preferences"("userId");

-- CreateIndex
CREATE INDEX "cigars_brand_name_idx" ON "cigars"("brand", "name");

-- CreateIndex
CREATE INDEX "cigars_origin_idx" ON "cigars"("origin");

-- CreateIndex
CREATE INDEX "cigars_strength_idx" ON "cigars"("strength");

-- CreateIndex
CREATE INDEX "journal_entries_userId_smokedAt_idx" ON "journal_entries"("userId", "smokedAt");

-- CreateIndex
CREATE INDEX "journal_entries_cigarId_idx" ON "journal_entries"("cigarId");

-- CreateIndex
CREATE INDEX "pairings_cigarId_category_idx" ON "pairings"("cigarId", "category");

-- CreateIndex
CREATE INDEX "wishlist_userId_priority_idx" ON "wishlist"("userId", "priority");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_userId_cigarId_key" ON "wishlist"("userId", "cigarId");

-- CreateIndex
CREATE INDEX "affiliate_links_cigarId_retailer_idx" ON "affiliate_links"("cigarId", "retailer");

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_cigarId_fkey" FOREIGN KEY ("cigarId") REFERENCES "cigars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pairings" ADD CONSTRAINT "pairings_cigarId_fkey" FOREIGN KEY ("cigarId") REFERENCES "cigars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_cigarId_fkey" FOREIGN KEY ("cigarId") REFERENCES "cigars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
