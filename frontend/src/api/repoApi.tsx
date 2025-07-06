import type { Repo } from '../interfaces/componentTypes';

// This function fetches repositories from the GitHub API for a given username.
const fetchRepos = async (username: string): Promise<Repo[]> => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) {
        throw new Error('User not found or GitHub API failed.');
    }

    const data = await response.json();
    //data transformer here
    return data.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        language: repo.language,
        repoUrl: repo.html_url,
        starCount: repo.stargazers_count
    }));
}

export default fetchRepos;






