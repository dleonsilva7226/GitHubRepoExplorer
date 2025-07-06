import type React from "react";
// import { useAuth } from "../contexts/authContext";
import useAuthStore from "../store/authStore";

const LoggedInHeader: React.FC = () => {
    // const { logout } = useAuthStore();
    return (
        <header className="bg-zinc-900 text-white p-6 shadow flex justify-between items-center px-10 gap-[50px]">
            <h1 className="text-2xl font-bold">GitHub Repo Explorer</h1>
            <div className="space-x-4">
                
                <a 
                href="/favorites" 
                className="bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-300">
                    Favorites
                </a>
                <a href="/" className="bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-300">Explore</a>
                <a href="/login" className="bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-300">Logout</a>

            </div>
        </header>
    );
}

export default LoggedInHeader;