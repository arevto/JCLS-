/**
 * ============================================================================
 * JCLS Church Website — Administrator Setup Script
 * ============================================================================
 *
 * Securely creates or updates an administrator account in PostgreSQL.
 * Also prints the SHA-256 password hash for the optional VITE_ADMIN_PASSWORD_HASH
 * environment variable.
 *
 * Usage:
 *   node db/create-admin.js <email> <password> "<full_name>" [role]
 *
 * Example:
 *   node db/create-admin.js admin@jclschurch.org MySecurePassword2026! "Church Administrator"
 */

import crypto from 'node:crypto';
import path from 'node:path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const { Pool } = pg;

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

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
  const args = process.argv.slice(2);
  const email = (args[0] || '').trim().toLowerCase();
  const password = args[1];
  const fullName = args[2] || 'Church Administrator';
  const role = args[3] || 'admin';

  if (!email || !password) {
    console.log('====================================================');
    console.log('   JCLS Church Website — Create Administrator');
    console.log('====================================================\n');
    console.log('Usage:');
    console.log('  node db/create-admin.js <email> <password> "<full_name>" [role]\n');
    console.log('Example:');
    console.log('  node db/create-admin.js pastor@jclschurch.org SafePassword123! "Rev. Zaldy Ordonio" superadmin\n');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('✗ Error: Password must be at least 8 characters long.');
    process.exit(1);
  }

  const passwordHash = hashPassword(password);

  console.log('====================================================');
  console.log('   JCLS Church Website — Creating Administrator');
  console.log('====================================================\n');
  console.log(`Email     : ${email}`);
  console.log(`Name      : ${fullName}`);
  console.log(`Role      : ${role}`);
  console.log(`SHA-256   : ${passwordHash}\n`);

  const pool = new Pool(getDbConfig());

  try {
    const client = await pool.connect();

    const query = `
      INSERT INTO administrators (email, password_hash, full_name, role, is_active)
      VALUES ($1, $2, $3, $4, TRUE)
      ON CONFLICT (email) DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role,
        is_active = TRUE,
        updated_at = NOW()
      RETURNING id, email, full_name, role, created_at;
    `;

    const res = await client.query(query, [email, passwordHash, fullName, role]);
    const admin = res.rows[0];

    console.log('✓ Administrator created/updated successfully in PostgreSQL database:');
    console.log(`  ID        : ${admin.id}`);
    console.log(`  Email     : ${admin.email}`);
    console.log(`  Full Name : ${admin.full_name}`);
    console.log(`  Role      : ${admin.role}`);

    client.release();
    await pool.end();

    console.log('\n----------------------------------------------------');
    console.log('ENVIRONMENT CONFIGURATION NOTE:');
    console.log('To allow login via the client dashboard, set in your .env:');
    console.log(`VITE_ADMIN_PASSWORD_HASH=${passwordHash}`);
    console.log('----------------------------------------------------\n');

  } catch (err) {
    console.error('\n✗ Database connection failed:');
    console.error(err.message);
    console.log('\nHowever, your SHA-256 hash was generated successfully:');
    console.log(`VITE_ADMIN_PASSWORD_HASH=${passwordHash}`);
    console.log('You can put this line directly into your .env file to enable immediate admin login!\n');
    process.exit(1);
  }
}

run();
