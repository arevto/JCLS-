/**
 * ============================================================================
 * JCLS Church Website — Database Migration & Setup Script
 * ============================================================================
 *
 * Runs schema.sql and seed.sql against PostgreSQL.
 *
 * Usage:
 *   node db/setup.js
 *
 * Environment variables:
 *   DATABASE_URL or (PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env if present
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const { Pool } = pg;

function getDbConfig() {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
    };
  }

  return {
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT || '5432', 10),
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || '',
    database: process.env.PGDATABASE || 'jcls_church',
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
  };
}

async function run() {
  console.log('====================================================');
  console.log('   JCLS Church Website — Database Setup & Migration');
  console.log('====================================================\n');

  const config = getDbConfig();

  if (!process.env.DATABASE_URL && !process.env.PGPASSWORD) {
    console.log('ℹ Note: No PGPASSWORD or DATABASE_URL found in .env.');
    console.log('Please configure your PostgreSQL credentials in .env:\n');
    console.log('  PGUSER=postgres');
    console.log('  PGPASSWORD=your_password_here');
    console.log('  PGDATABASE=jcls_church\n');
    console.log('Or provide a cloud connection string:');
    console.log('  DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require\n');
    console.log('See .env.example for complete options.');
    process.exit(1);
  }
  console.log(`Connecting to PostgreSQL database: ${dbName}...`);

  const pool = new Pool(config);

  try {
    const client = await pool.connect();
    console.log('✓ Successfully connected to PostgreSQL server!\n');

    // 1. Run schema.sql
    console.log('Applying database schema (db/schema.sql)...');
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await client.query(schemaSql);
    console.log('✓ Schema applied successfully.\n');

    // 2. Run seed.sql
    console.log('Seeding initial church content (db/seed.sql)...');
    const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    await client.query(seedSql);
    console.log('✓ Seed data populated successfully.\n');

    // 3. Verify counts
    const tables = [
      'ministries',
      'events',
      'messages',
      'leadership',
      'visitor_connections',
      'planned_visits',
      'prayer_requests',
      'contact_inquiries',
      'administrators'
    ];

    console.log('Table Record Verification:');
    for (const table of tables) {
      const res = await client.query(`SELECT COUNT(*) FROM ${table}`);
      console.log(`  - ${table.padEnd(22)} : ${res.rows[0].count} records`);
    }

    client.release();
    await pool.end();

    console.log('\n✓ Database initialization completed successfully!');
    console.log('\nNext steps:');
    console.log('  1. Create an administrator account:');
    console.log('     node db/create-admin.js <email> <password> "<full_name>"');
    console.log('  2. Start development server:');
    console.log('     npm run dev\n');

  } catch (err) {
    console.error('\n✗ Database setup failed:');
    console.error(err.message);

    if (err.code === '3D000') {
      console.log(`\nNote: The database "${config.database}" does not exist yet.`);
      console.log(`Please create it first in pgAdmin or run:`);
      console.log(`  psql -U ${config.user} -c "CREATE DATABASE ${config.database};"`);
    } else if (err.code === '28P01') {
      console.log('\nNote: Password authentication failed.');
      console.log('Please check your PGPASSWORD in .env or provide your PostgreSQL password.');
    } else if (err.code === 'ECONNREFUSED') {
      console.log('\nNote: Connection refused.');
      console.log('Please make sure your PostgreSQL service is running on the specified port.');
    }

    process.exit(1);
  }
}

run();
