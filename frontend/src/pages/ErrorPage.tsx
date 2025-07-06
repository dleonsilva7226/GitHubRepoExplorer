import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <div className="bg-zinc-800 p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-lg text-gray-300">Something went wrong or the page failed to load.</p>
        <a href="/" className="mt-6 inline-block bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-300">
          Go Home
        </a>
      </div>
    </div>
  );
}



export default ErrorPage;