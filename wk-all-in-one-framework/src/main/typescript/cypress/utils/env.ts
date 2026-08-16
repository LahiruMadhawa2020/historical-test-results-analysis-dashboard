const apiUrl = process.env.WK_API_URL ?? 'https://jsonplaceholder.typicode.com/';
const appUrl = process.env.WK_APPLICATION_URL ?? 'https://opensource-demo.orangehrmlive.com/';
const username = process.env.WK_APPLICATION_USERNAME ?? 'Admin';
const password = process.env.WK_APPLICATION_PASSWORD ?? 'admin123';

export { apiUrl, appUrl, username, password };
