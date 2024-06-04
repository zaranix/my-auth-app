const { test, expect } = require('@playwright/test');

test.describe('Authentication API', () => {
  test('should register a new user', async ({ request, browserName }) => {
    const response = await request.post('/auth/register', {
      data: {
        username: `testuser_${browserName}`,
        password: `testpassword_${browserName}`,
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.message).toBe('User registered successfully');
  });

  test('should login and receive a token', async ({ request , browserName}) => {
    await request.post('/auth/register', {
      data: {
        username: `testuser2${browserName}`,
        password: `testpassword${browserName}`,
      },
    });

    const response = await request.post('/auth/login', {
      data: {
        username: `testuser2${browserName}`,
        password: `testpassword${browserName}`,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
  });

  test('should access protected route', async ({ request , browserName }) => {
    await request.post('/auth/register', {
      data: {
        username: `testuser3${browserName}`,
        password: `testpassword${browserName}`,
      },
    });

    const loginResponse = await request.post('/auth/login', {
      data: {
        username: `testuser3${browserName}`,
        password: `testpassword${browserName}`,
      },
    });

    const token = (await loginResponse.json()).token;

    const response = await request.get('/auth/protected', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.message).toBe('This is a protected route');
  });
});
