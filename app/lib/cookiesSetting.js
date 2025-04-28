'use server';
import { cookies } from 'next/headers'; 

// Set cookies
const SetCookies = async ({ name, value }) => {
  const cookieStore = await cookies();  // Await cookies() as it's async now
  await cookieStore.set(name, value, { secure: true });
  return true;
};

// Get cookies
const GetCookies = async ({ name }) => {
  const cookieStore = await cookies();  // Await cookies() as it's async now
  const token = await cookieStore.get(name);  // Await the get method as well
  return token ? token.value : false;
};

// Delete cookies
const deleteCookies = async ({ name }) => {
  const cookieStore = await cookies();  // Await cookies() as it's async now
  const token = await cookieStore.get(name);  // Await the get method as well

  if (!token) return true;
  await cookieStore.delete(name);  // Await delete method
  return true;
};

export { SetCookies, GetCookies, deleteCookies };
