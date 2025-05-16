
import { clerkClient } from "@clerk/clerk-sdk-node";

// Function to manually set cookies
export const setCookie = (name: string, value: any, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  // Store raw value if it's a string or number
  const formattedValue =
    typeof value === "string" || typeof value === "number" ? value : JSON.stringify(value);

  document.cookie = `${name}=${formattedValue};expires=${expires.toUTCString()};path=/`;
};


// Get cookie on client side
export const getCookie = (cookieParam: string) => {

  if (typeof document === "undefined") {
    return null; // Return null if running on the server
  }

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

  if (name.includes("-")) {
    const length = name.split(" ")[0].length
    if(length > 2){
      return name.split(" ")[0].slice(0,2)
    } else {
      return name.split(" ")[0]
    }
  }

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};


export async function updateUserSubscription(userId: string, status: string) {
  await clerkClient.users.updateUser(userId, {
    publicMetadata: { subscriptionStatus: status },
  });
}


export async function createUser(email: string, role: string) {
  const user = await clerkClient.users.createUser({
    emailAddress: [email],
    publicMetadata: {
      role: role, // "agent" or "admin"
    },
    skipPasswordRequirement: true, // Important: no password needed!
  });

  // Optionally send email invite manually
  await clerkClient.invitations.createInvitation({
    emailAddress: email,
  });

  return user;
}


