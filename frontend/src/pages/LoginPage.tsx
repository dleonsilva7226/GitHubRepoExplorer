// LoginPage.tsx
import React, { useState, useEffect } from "react";
import authenticationApi from "../api/authApi";
import { useNavigate } from "react-router";
import useUserStore from "../store/userStore";
import useAuthStore from "../store/authStore";

const LoginPage: React.FC = () => {
  const { loginUser } = authenticationApi();
  const { setIsAuthenticated, isAuthenticated } = useAuthStore();
  const { setUserEmail } = useUserStore();
  const [currEmail, setCurrEmail] = useState<string>("");
  const [currPassword, setCurrPassword] = useState<string>("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   //re-rendering every 15 seconds
  //   let intervalId = setInterval(()=>{
  //     console.log("Updating login status...");
  //     updateLoginStatus();
  //   }, 15000);

  //   //cleanup function
  //   const cleanup = () => {
  //     clearInterval(intervalId);
  //   }

  //   return cleanup;
  // }, []);

  // useEffect(() => {
  //   let intervalId = setInterval(()=>{
  //     console.log("Updating login status...");
  //     handleLogin();
  //   }, 10000);

  //   //cleanup function
  //   const cleanup = () => {
  //     clearInterval(intervalId);
  //   }

  //   return cleanup;
  // })

  // const handleLogin = () => {
  //   if (!isAuthenticated) {
  //     logout();
  //     return;
  //   }
  //   loginUser(currEmail, currPassword);
  //   navigate("/favorites");
  // }

  // const logout = (): void => {
  //       // Clear the token from local storage or any other storage mechanism you use
  //       localStorage.removeItem("token");
  //       if (!localStorage.getItem("token")) {
  //           console.log('Token removed from local storage.');
  //       }
  //       else {
  //           throw new Error('Logout failed. Token not removed.');
  //       }
  //       console.log('User logged out successfully.');
  //   }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const success: boolean = await loginUser(currEmail, currPassword);
  //   if (success) {
  //     setIsAuthenticated(true);
  //     navigate("/favorites");
  //   } else {
  //     alert("Unable to log in");
  //   }
  // }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await loginUser(currEmail, currPassword);
      if (success) {
        setIsAuthenticated(true);
        console.log("Value right when loggin in:" + isAuthenticated)
        setUserEmail(currEmail);

        navigate("/favorites");
      } else {
        alert("Unable to log in");
      }
    } catch (err: any) {
      alert(err.message || "Unable to log in");
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