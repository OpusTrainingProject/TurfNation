// export const signInUser = async (email, password) => {
//   try {
//     const response = await fetch("http://localhost:8888/auth/signin", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       const errorMessage = await response.text();
//       throw new Error(errorMessage || "Sign-in failed");
//     }

//     const data = await response.json();
//     return data; // expected to contain token or user details
//   } catch (error) {
//     console.error("Error during sign in:", error);
//     throw error;
//   }
// };

// services/authService.js
// src/services/authservice/SignIn.js
export const signInUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8888/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Sign-in failed");
    }

    // ✅ Handle both JSON and plain text (JWT) responses
    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text(); // <-- backend returns token string
    }

    return data;
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
};
