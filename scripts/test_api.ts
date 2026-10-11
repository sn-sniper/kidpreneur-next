import * as dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'https://kidpreneur-next-backend.assaadhassan00021.workers.dev';

async function runTests() {
  console.log('--- Starting API Tests ---');

  // 1. Submit a Lab Registration
  console.log('\n[1] Submitting Lab Registration...');
  const regResponse = await fetch(`${BASE_URL}/api/register/lab`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      parentFullName: 'Test Parent',
      parentEmail: `parent_${Date.now()}@test.com`,
      childFullName: 'Test Child',
      childAge: 10,
      parentPhone: '1234567890'
    })
  });
  
  const regData = await regResponse.json();
  console.log('Registration Response:', regResponse.status, regData);
  
  if (!regData.success) {
    console.error('Failed to create registration');
    return;
  }
  const registrationId = regData.registrationId;

  // 2. Log in as Admin
  console.log('\n[2] Logging in as Admin...');
  const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@kidpreneur.local',
      password: 'adminpassword123'
    })
  });
  
  const loginData = await loginResponse.json();
  console.log('Login Response:', loginResponse.status, loginData);
  
  const setCookieHeader = loginResponse.headers.get('set-cookie');
  console.log('Cookie obtained:', !!setCookieHeader);

  // 3. Confirm Learner (Change Payment State & Fetch Creds)
  console.log('\n[3] Confirming Learner and Fetching Creds...');
  const confirmResponse = await fetch(`${BASE_URL}/api/admin/learners/confirm`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': setCookieHeader || ''
    },
    body: JSON.stringify({
      registrationId: registrationId
    })
  });

  const confirmData = await confirmResponse.json();
  console.log('Confirm Response:', confirmResponse.status, confirmData);
  
  console.log('\n--- API Tests Complete ---');
}

runTests().catch(console.error);
