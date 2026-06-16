import { useState, useEffect } from 'react';

export function useGithubRepos(username = import.meta.env.VITE_GITHUB_USERNAME) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
          {
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
              'X-GitHub-Api-Version': '2022-11-28'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch repos');
        }
        
        const data = await response.json();
        
        // Filter and format repos
        const formattedRepos = data
          .filter(repo => !repo.fork) // Exclude forked repos
          .map(repo => ({
            id: repo.id,
            name: repo.name,
            title: repo.name.split('-').map(word =>
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' '),
            description: repo.description || '',
            tech: repo.topics || [],
            language: repo.language,
            stars: repo.stargazers_count,
            github: repo.html_url,
            demo: repo.homepage || null,
            updated: repo.pushed_at || repo.updated_at,
            fork: repo.fork,
            parent: repo.parent ? { full_name: repo.parent.full_name, html_url: repo.parent.html_url } : null,
          }))
          .sort((a, b) => new Date(b.updated) - new Date(a.updated)); // Sort by most recent
        
        setRepos(formattedRepos);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (username) {
      fetchRepos();
    }
  }, [username]);

  return { repos, loading, error };
}