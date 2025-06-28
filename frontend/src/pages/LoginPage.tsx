// LoginPage.tsx
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-[50px] min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold text-center">GitHub Repo Explorer</h1>

      <div className="bg-zinc-800 p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-5">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-zinc-700 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-zinc-700 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full bg-white text-black font-bold py-2 rounded-md hover:bg-gray-300">
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account? <a href="/register" className="underline">Register</a>
        </p>
      </div>
    </div>
  );
}