// Admin authentication utilities
const PASSCODE = '123456'; // Change this to your desired passcode
const AUTH_KEY = 'admin_authenticated';
const AUTH_COOKIE = 'admin_auth';

export const validatePasscode = (passcode: string): boolean => {
  return passcode === PASSCODE;
};

export const setAuthenticated = () => {
  // Set in localStorage
  localStorage.setItem(AUTH_KEY, 'true');

  // Set cookie that expires in 24 hours
  const expires = new Date();
  expires.setHours(expires.getHours() + 24);
  document.cookie = `${AUTH_COOKIE}=true; expires=${expires.toUTCString()}; path=/`;
};

export const isAuthenticated = (): boolean => {
  // Check localStorage
  const localAuth = localStorage.getItem(AUTH_KEY) === 'true';

  // Check cookie
  const cookieAuth = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${AUTH_COOKIE}=`))
    ?.split('=')[1] === 'true';

  return localAuth && cookieAuth;
};

export const clearAuthentication = () => {
  // Clear localStorage
  localStorage.removeItem(AUTH_KEY);

  // Clear cookie
  document.cookie = `${AUTH_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
