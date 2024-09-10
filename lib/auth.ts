// import dotenv from 'dotenv';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';

// dotenv.config();

// const url = process.env.DEVELOPMENT_URL || "http://localhost:8080";

// export const register = async (formData: { username: string; email: string; password: string; type: string }) => {
//   try {
//     const response = await fetch(`${url}/auth/register`, {
//       method: "POST",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       return data.payload;
//     }

//     throw new Error(data.message);
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const login = async (formData: { username: string; password: string }) => {
//   try {
//     const response = await fetch(`${url}/auth/login`, {
//       method: "POST",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       localStorage.setItem("token", data.token);
//       return data.payload;
//     }

//     throw new Error(data.message);
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }
