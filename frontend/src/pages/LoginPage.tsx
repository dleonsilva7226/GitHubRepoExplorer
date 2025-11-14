// LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";

const LoginPage: React.FC = () => {
  const { updateLoginStatus } = useAuthStore();
  const [currEmail, setCurrEmail] = useState<string>("");
  const [currPassword, setCurrPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateLoginStatus(currEmail, currPassword);
      if (response) {
        // Navigate to home page instead of favorites to see the full UI
        navigate("/");
      } else {
        alert("Unable to log in");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unable to log in";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-[50px] min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <h1 className="text-3xl font-bold text-center">GitHub Repo Explorer</h1>

      <div className="bg-zinc-800 p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-zinc-700 focus:outline-none"
              placeholder="Enter your email"
              value={currEmail}
              onChange={(e) => setCurrEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-zinc-700 focus:outline-none"
              placeholder="Enter your password"
              value={currPassword}
              onChange={(e) => setCurrPassword(e.target.value)}
            />
          </div>
          <input 
            className="w-full bg-white text-black font-bold py-2 rounded-md hover:bg-gray-300" 
            type="submit" 
            value="Login" 
          />
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Don't an account? <a href="/register" className="underline">Register</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;