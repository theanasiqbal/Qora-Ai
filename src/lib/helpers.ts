// Function to manually set cookies
export const setCookie = (name: string, value: any, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${JSON.stringify(
    value
  )};expires=${expires.toUTCString()};path=/`;
};

// Get cookie on client side
export const getCookie = (cookieParam: string) => {
  const cookies = document.cookie.split(";");
  const cookieObj = cookies.find((cookie) =>
    cookie.trim().startsWith(`${cookieParam}=`)
  );

  if (cookieObj) {
    try {
      const cookieVal = cookieObj.split("=")[1];
      if (cookieVal) {
        return JSON.parse(cookieVal);
      } else {
        console.warn(`${cookieParam} cookie value is undefined`);
      }
    } catch (error) {
      console.error(`Error parsing ${cookieParam} Cookie:`, error);
    }
  } else {
    console.warn(`${cookieParam} cookie not found`);
  }
  return null;
};
// Clear cookie
export const clearCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Get initials from name
export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};
