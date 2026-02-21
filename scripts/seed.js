/**
 * Database seed script — creates the plans table and inserts all 5 SEO plans.
 * Usage: node scripts/seed.js
 * Make sure DATABASE_URL is set in your .env.local or environment.
 */

const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const plans = [
  {
    slug: 'starter',
    name: 'Starter Spark',
    price: 10.00,
    description: 'Perfect for small businesses just starting their SEO journey.',
  },
  {
    slug: 'growth',
    name: 'Growth Engine',
    price: 20.00,
    description: 'Ideal for growing businesses ready to scale their online presence.',
  },
  {
    slug: 'pro',
    name: 'Pro Ranker',
    price: 40.00,
    description: 'Our most popular plan for serious businesses wanting top rankings.',
  },
  {
    slug: 'business',
    name: 'Business Dominator',
    price: 80.00,
    description: 'Comprehensive SEO domination for established businesses.',
  },
  {
    slug: 'ultimate',
    name: 'Ultimate Authority',
    price: 100.00,
    description: 'Maximum authority — the complete SEO powerhouse package.',
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS plans (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✓ Plans table created/verified');

    for (const plan of plans) {
      await client.query(
        `INSERT INTO plans (slug, name, price, description)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (slug) DO UPDATE
           SET name = EXCLUDED.name,
               price = EXCLUDED.price,
               description = EXCLUDED.description`,
        [plan.slug, plan.name, plan.price, plan.description]
      );
      console.log(`  ✓ Upserted plan: ${plan.name}`);
    }

    console.log('\n✅ Database seeded successfully!');
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
