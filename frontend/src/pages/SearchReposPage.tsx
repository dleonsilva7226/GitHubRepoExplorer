// import React from 'react';
// import SearchBar from '../components/SearchBar';
// import RepoList from '../components/RepoList';
// import Loading from '../components/Loading';
// import ErrorMessage from '../components/ErrorMessage';
// import useRepoStore from '../store/repoStore';
// import ExploreHeader from '../components/ExploreHeader';

// const SearchReposPage: React.FC = () => {
//   const {username, repos, loading, error, handleFetchRepos, handleSaveRepo, setUsername} = useRepoStore();
//   const { isAuthenticated } = useAuthStore();

//   return (
//     // <div>
//     // <ExploreHeader /> 
//     // <div className="flex flex-col w-full items-center justify-center min-h-screen bg-zinc-900">
    

//     <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-sm w-[650px]"> 

    
//       <div className="max-w-3xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="text-center">
//           {/* <h1 className="text-2xl font-bold text-gray-900">Search repos by username and save your favorite</h1> */}
//           <h3 className="text-xl text-black font-bold mt-2">Search repos by username and save your favorites</h3>
//         </div>

//         {/* Search Bar */}
//         <SearchBar
//           username={username}
//           setUsername={setUsername}
//           onSearch={handleFetchRepos}
//         />

//         {/* Repo List */}
//         {loading && <Loading />}
//         {error && <ErrorMessage message={error} />}
//         {!loading && !error && repos.length > 0 && (
//           <div className="space-y-5">
//             <RepoList repos={repos} onSave={handleSaveRepo} isAuthenticated={isAuthenticated} />
//           </div>
//         )}

//       </div>
//     </div>
//     // </div>
    
//     // </div>
//   );
// };

// export default SearchReposPage;
