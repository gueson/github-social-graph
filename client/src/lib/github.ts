import useSWR from 'swr';
import { toast } from 'react-hot-toast';

const GITHUB_API_BASE = 'https://api.github.com';

// 创建 fetcher 用于 GitHub 公共 API
const fetcher = async (url: string) => {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  };

  const res = await fetch(url, { headers });

  // 处理 GitHub API 限流
  if (res.status === 403) {
    const remaining = res.headers.get('x-ratelimit-remaining');
    const reset = res.headers.get('x-ratelimit-reset');
    
    if (remaining === '0' && reset) {
      const resetTime = new Date(parseInt(reset) * 1000);
      toast.error(`API 请求已达限制，请在 ${resetTime.toLocaleTimeString()} 后重试`);
    }
    throw new Error('API 请求限制');
  }

  if (!res.ok) {
    throw new Error(`GitHub API 错误: ${res.status}`);
  }

  return res.json();
};

// 获取用户信息
export function useGitHubUser(username: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    username ? `${GITHUB_API_BASE}/users/${username}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 分钟内不重复请求
      focusThrottleInterval: 300000, // 5 分钟内不重复请求
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    user: data,
    isLoading,
    error,
    mutate,
  };
}

// 获取用户关注列表
export function useGitHubFollowing(username: string | null, page = 1) {
  const { data, error, isLoading, mutate } = useSWR(
    username ? `${GITHUB_API_BASE}/users/${username}/following?page=${page}&per_page=30` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      focusThrottleInterval: 300000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    following: data || [],
    isLoading,
    error,
    mutate,
  };
}

// 获取用户粉丝列表
export function useGitHubFollowers(username: string | null, page = 1) {
  const { data, error, isLoading, mutate } = useSWR(
    username ? `${GITHUB_API_BASE}/users/${username}/followers?page=${page}&per_page=30` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      focusThrottleInterval: 300000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    followers: data || [],
    isLoading,
    error,
    mutate,
  };
}

// 获取用户仓库列表
export function useGitHubUserRepos(username: string | null, page = 1) {
  const { data, error, isLoading, mutate } = useSWR(
    username ? `${GITHUB_API_BASE}/users/${username}/repos?page=${page}&per_page=30&sort=stars&direction=desc` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      focusThrottleInterval: 300000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    repos: data || [],
    isLoading,
    error,
    mutate,
  };
}

// 获取用户 Star 的仓库列表
export function useGitHubUserStarred(username: string | null, page = 1) {
  const { data, error, isLoading, mutate } = useSWR(
    username ? `${GITHUB_API_BASE}/users/${username}/starred?page=${page}&per_page=30&sort=stars&direction=desc` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      focusThrottleInterval: 300000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    starred: data || [],
    isLoading,
    error,
    mutate,
  };
}

// 获取仓库信息
export function useGitHubRepo(owner: string | null, repo: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    owner && repo ? `${GITHUB_API_BASE}/repos/${owner}/${repo}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      focusThrottleInterval: 300000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    repo: data,
    isLoading,
    error,
    mutate,
  };
}

// 获取仓库语言统计
export function useGitHubRepoLanguages(owner: string | null, repo: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    owner && repo ? `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      focusThrottleInterval: 300000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    languages: data || {},
    isLoading,
    error,
    mutate,
  };
}

// 获取用户事件流（用于活跃度分析）
export function useGitHubUserEvents(username: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    username ? `${GITHUB_API_BASE}/users/${username}/events/public?per_page=30` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      focusThrottleInterval: 300000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    events: data || [],
    isLoading,
    error,
    mutate,
  };
}

// 搜索用户
export function useGitHubSearchUsers(query: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    query ? `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}&per_page=10` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      focusThrottleInterval: 300000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    results: data?.items || [],
    isLoading,
    error,
    mutate,
  };
}
