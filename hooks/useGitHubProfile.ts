'use client';

import { useEffect, useState } from 'react';

interface GitHubUser {
  avatar_url: string;
  name: string | null;
  login: string;
  bio: string | null;
}

interface UseGitHubProfileReturn {
  avatarUrl: string;
  name: string;
  bio: string;
  isLoading: boolean;
  error: string | null;
}

const GITHUB_USERNAME = '60cod'; // Your GitHub username
const CACHE_KEY = 'github-profile-cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// Fallback defaults
const FALLBACK_VALUES = {
  name: 'Yugyeong Na',
  initials: 'YN',
  bio: 'Developer & Writer'
} as const;

// Cache interface
interface ProfileCache {
  data: GitHubUser;
  timestamp: number;
}

export function useGitHubProfile(): UseGitHubProfileReturn {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [name, setName] = useState<string>(FALLBACK_VALUES.name);
  const [bio, setBio] = useState<string>(FALLBACK_VALUES.bio);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubProfile() {
      try {
        setIsLoading(true);
        setError(null);

        // Check cache first
        const cached = getCachedProfile();
        if (cached) {
          if (isMounted) {
            updateState(cached);
            setIsLoading(false);
          }
          return;
        }

        // Fetch from GitHub API
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        });

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data: GitHubUser = await response.json();
        
        // Validate that we got meaningful data
        if (!data || (!data.avatar_url && !data.name && !data.login)) {
          throw new Error('Invalid GitHub profile data received');
        }
        
        // Cache the result
        setCachedProfile(data);
        
        if (isMounted) {
          updateState(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch GitHub profile');
          setIsLoading(false);
          
          // Use fallback values on error
          setAvatarUrl('');
          setName(FALLBACK_VALUES.name);
          setBio(FALLBACK_VALUES.bio);
        }
      }
    }

    fetchGitHubProfile();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  function updateState(data: GitHubUser) {
    setAvatarUrl(data.avatar_url || '');
    setName(data.name || data.login || FALLBACK_VALUES.name);
    setBio(data.bio || FALLBACK_VALUES.bio);
  }

  function getCachedProfile(): GitHubUser | null {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      
      const parsedCache: ProfileCache = JSON.parse(cached);
      const isExpired = Date.now() - parsedCache.timestamp > CACHE_DURATION;
      
      if (isExpired) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }
      
      return parsedCache.data;
    } catch {
      return null;
    }
  }

  function setCachedProfile(data: GitHubUser) {
    try {
      const cache: ProfileCache = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  return {
    avatarUrl,
    name,
    bio,
    isLoading,
    error,
  };
}