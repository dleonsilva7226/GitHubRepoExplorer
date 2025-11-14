import { endpointPrefix } from '.';
import type { Repo } from '../interfaces/ComponentTypes';

export const repositoryApi = () => {
// This function fetches repositories from the GitHub API for a given username.
    const fetchRepos = async (username: string): Promise<Repo[]> => {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error('User not found or GitHub API failed.');
        }

        const data = await response.json();
        //data transformer here
        return data.map((repo: { id: number; name: string; description: string | null; language: string | null; html_url: string; stargazers_count: number; updated_at: string }) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            language: repo.language,
            repoUrl: repo.html_url,
            starCount: repo.stargazers_count,
            lastUpdated: repo.updated_at // GitHub API provides updated_at field
        }));
    }

    const addFavoriteRepo = async (repo: Repo): Promise<Repo[]> => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated.');
        }

        const response = await fetch(`${endpointPrefix}/favorite-repos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                githubRepoId: repo.id,
                name: repo.name,
                description: repo.description || '',
                starCount: repo.starCount,
                language: repo.language || '',
                repoUrl: repo.repoUrl
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = 'Failed to add favorite repository.';
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorMessage;
            } catch {
                // If response isn't JSON, use default message
            }
            throw new Error(errorMessage);
        }
        const data = await response.json();
        // Backend now returns array directly, not { success, message }
        if (!Array.isArray(data)) {
            throw new Error('Invalid response format from server.');
        }
        // Backend returns: id, name, description, starCount, repoUrl, language, githubRepoId
        return data.map((repo: { githubRepoId?: number; id: number; name: string; description: string | null; language: string | null; repoUrl: string; starCount: number }) => ({
            id: repo.githubRepoId || repo.id, // Use githubRepoId as the main id
            name: repo.name || '',
            description: repo.description || '',
            language: repo.language || '',
            repoUrl: repo.repoUrl || '',
            starCount: repo.starCount || 0
        }));
    }

    const fetchFavoriteRepos = async (): Promise<Repo[]> => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated.');
        }
        const response = await fetch(`${endpointPrefix}/favorite-repos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = 'Failed to fetch favorite repositories.';
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorMessage;
            } catch {
                // If response isn't JSON, use default message
            }
            throw new Error(errorMessage);
        }
        const data = await response.json();
        // Handle empty array or null response
        if (!Array.isArray(data)) {
            return [];
        }
        // Backend returns: id, name, description, starCount, repoUrl, language, githubRepoId
        return data.map((repo: { githubRepoId?: number; id: number; name: string; description: string | null; language: string | null; repoUrl: string; starCount: number }) => ({
            id: repo.githubRepoId || repo.id, // Use githubRepoId as the main id
            name: repo.name || '',
            description: repo.description || '',
            language: repo.language || '',
            repoUrl: repo.repoUrl || '',
            starCount: repo.starCount || 0
        }));
    };

    const deleteFavoriteRepo = async (githubRepoId: number): Promise<Repo[]> => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated.');
        }
        const response = await fetch(`${endpointPrefix}/favorite-repos/${githubRepoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete favorite repository.');
        }
        const data = await response.json();
        // Backend now returns array directly, not { success, message }
        if (!Array.isArray(data)) {
            throw new Error('Invalid response format from server.');
        }
        // Backend returns: id, name, description, starCount, repoUrl, language, githubRepoId
        return data.map((repo: { githubRepoId?: number; id: number; name: string; description: string | null; language: string | null; repoUrl: string; starCount: number }) => ({
            id: repo.githubRepoId || repo.id, // Use githubRepoId as the main id
            name: repo.name || '',
            description: repo.description || '',
            language: repo.language || '',
            repoUrl: repo.repoUrl || '',
            starCount: repo.starCount || 0
        }));
    };



    return {
        addFavoriteRepo,
        deleteFavoriteRepo,
        fetchFavoriteRepos,
        fetchRepos
    };
}
