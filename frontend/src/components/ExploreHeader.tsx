import type React from "react";

const ExploreHeader: React.FC = () => {
    return (
        <header className="p-6 shadow flex justify-between items-center px-10 gap-[50px]">
            <h1 className="text-2xl font-bold">GitHub Repo Explorer</h1>
            <div className="space-x-4">
            <a href="/login" className="bg-white text-white font-bold py-2 px-4 rounded-md hover:bg-gray-300">Login</a>
            </div>
      </header>
    );
}

export default ExploreHeader;