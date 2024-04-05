import { LoginFormData } from "./pages/login/LoginPage";
import { RegisterFormData } from "./pages/signin/SignInPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const regiserUser = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw new Error(data.message);
  }
};

export const loginUser = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw new Error(data.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error("Token Invalid");
  }

  return data;
};

export const logOutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
   
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error("Error during signout");
  }

  return data;
};
