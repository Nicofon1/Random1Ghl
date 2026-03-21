-- CreateTable
CREATE TABLE "global_settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "primaryColor" TEXT NOT NULL DEFAULT '#000000',
    "secondaryColor" TEXT NOT NULL DEFAULT '#ffffff',
    "accentColor" TEXT NOT NULL DEFAULT '#8b5cf6',
    "fontDisplay" TEXT NOT NULL DEFAULT 'Inter',
    "fontBody" TEXT NOT NULL DEFAULT 'Inter',
    "iconSize" TEXT NOT NULL DEFAULT '24px',
    "iconWeight" TEXT NOT NULL DEFAULT 'regular',
    "iconColor" TEXT NOT NULL DEFAULT '#000000',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "custom_blocks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "css" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "previewImage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
