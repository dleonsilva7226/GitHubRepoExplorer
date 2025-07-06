import React from "react";
import Header from "../components/HomepageHeader";
import SearchReposBar from "../components/SearchRepoBar";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center text-center mt-32 px-4">
        <SearchReposBar/>
      </main>
    </div>
  );
}

export default HomePage;