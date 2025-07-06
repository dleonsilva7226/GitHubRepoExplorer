import type { Repo } from '../interfaces/componentTypes'; // Adjust the import path as necessary
// Function to handle saving a repo to favorites

// const userApi = (): UserApiResponse => {

// }
// const handleSaveRepo = async (repo: Repo) => {
//   const {isAuthenticated} = useAuthStore(); // Assuming you have an auth store to check authentication status
  
//   if (!isAuthenticated) {
//     alert('Please log in to save favorites.');
//     return;
//   }

//   try {
//     await fetch('/user/favorites', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`, // or however you store your JWT
//       },
//       body: JSON.stringify({
//         githubRepoId: repo.id,
//         name: repo.name,
//         description: repo.description,
//         starCount: repo.starCount,
//         language: repo.language,
//         repoUrl: repo.repoUrl,

//       }),
//     });
//     alert('Repo saved!');
//   } catch (error) {
//     alert('Failed to save repo.');
//   }
// };

// export default handleSaveRepo;
