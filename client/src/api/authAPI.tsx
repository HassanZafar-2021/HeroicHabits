import { UserLogin } from "../interfaces/UserLogin";

// ✅ Set API base URL for local & deployed environments
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://heroichabits.onrender.com";

// ✅ Login Function
const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      // ✅ Fixed API path
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return await response.json(); // ✅ Return parsed response data
  } catch (err) {
    console.error("Login error:", err);
    throw new Error("Could not authenticate user");
  }
};

// ✅ Signup Function
const signup = async (userInfo: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      // ✅ Fixed API path
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed");
    }

    return await response.json();
  } catch (err) {
    console.error("Signup error:", err);
    throw new Error("Could not register user");
  }
};

export { login, signup };
