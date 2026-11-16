require('dotenv/config');

function requireEnv(key, fallback = '') {
  return process.env[key] || fallback;
}

const AUTH = {
  EMPLOYEE_ID: requireEnv('EMPLOYEE_ID', 'EMP001'),
  PASSWORD: requireEnv('PASSWORD', 'password'),
  WRONG_PASSWORD: 'WrongPass@999',
  WRONG_EMPLOYEE_ID: 'EMP00000',
};

const SITE = {
  DEMO_SITE: process.env.DEMO_SITE_NAME ?? 'DEMO SITE',
};

module.exports = { AUTH, SITE };
