import React, { useState } from "react";
import authenticationApi from "../api/authApi";
import { useNavigate } from "react-router";

const RegisterPage: React.FC = () => {
  const { registerUser } = authenticationApi();
  const [currEmail, setCurrEmail] = useState<string>("");
  const [currPassword, setCurrPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await registerUser(currEmail, currPassword);
    const token: string | null = localStorage.getItem("token");
    if (token === null) {
      alert("Unable to log in");
      return;
    }
    alert("Registration successful! Your account has been created.");
  }

  return (
    <div className="flex flex-col gap-[50px] min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center">GitHub Repo Explorer</h1>

      <div className="bg-zinc-800 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
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
              placeholder="Create a password"
              value={currPassword}
              onChange={(e) => setCurrPassword(e.target.value)}
            />
          </div>
            <input 
              className="w-full bg-white text-black font-bold py-2 rounded-md hover:bg-gray-300" 
              type="submit" 
              value="Register"
            />
          {/* <button className="w-full bg-white text-black font-bold py-2 rounded-md hover:bg-gray-300" onClick={handleSubmit}>
            Register
          </button> */}
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account? <a href="/login" className="underline">Login</a>
        </p>
      </div>
    </div>
  );
}


export default RegisterPage;

