export const TestConfig = {
  baseUrl: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
  username: process.env.USERNAME || 'Admin',
  password: process.env.PASSWORD || 'admin123',
  headless: process.env.HEADLESS !== 'false',
  timeout: parseInt(process.env.TIMEOUT || '30000'),
};
