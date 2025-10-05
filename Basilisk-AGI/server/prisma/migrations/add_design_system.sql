-- Migration: Add designSystem column to SiteConfig
-- This migration adds the designSystem field to store the selected design system

-- For MongoDB, this is handled automatically by Prisma when you run prisma db push
-- But here's the equivalent operation for reference:

-- db.site_config.updateMany(
--   {},
--   { $set: { designSystem: "neobrutalism" } }
-- )

-- This file serves as documentation for the schema change
-- Run: npx prisma db push
-- to apply the schema changes to your MongoDB database
