// 本地存储键名
const STORAGE_KEYS = {
  SAVED_DEVELOPERS: 'github-social-graph:saved-developers',
  SAVED_REPOS: 'github-social-graph:saved-repos',
  SEARCH_HISTORY: 'github-social-graph:search-history',
};

export interface SavedDeveloper {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  savedAt: number;
}

export interface SavedRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
  url: string;
  stargazers_count: number;
  language: string;
  savedAt: number;
}

// 收藏开发者
export function saveDeveloper(developer: any): void {
  try {
    const saved = getSavedDevelopers();
    const exists = saved.some(d => d.id === developer.id);
    
    if (!exists) {
      saved.push({
        ...developer,
        savedAt: Date.now(),
      });
      localStorage.setItem(STORAGE_KEYS.SAVED_DEVELOPERS, JSON.stringify(saved));
    }
  } catch (error) {
    console.error('Failed to save developer:', error);
  }
}

// 取消收藏开发者
export function removeSavedDeveloper(developerId: number): void {
  try {
    const saved = getSavedDevelopers();
    const filtered = saved.filter(d => d.id !== developerId);
    localStorage.setItem(STORAGE_KEYS.SAVED_DEVELOPERS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to remove saved developer:', error);
  }
}

// 获取所有收藏的开发者
export function getSavedDevelopers(): SavedDeveloper[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED_DEVELOPERS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get saved developers:', error);
    return [];
  }
}

// 检查开发者是否已收藏
export function isDeveloperSaved(developerId: number): boolean {
  try {
    const saved = getSavedDevelopers();
    return saved.some(d => d.id === developerId);
  } catch (error) {
    console.error('Failed to check saved developer:', error);
    return false;
  }
}

// 收藏仓库
export function saveRepo(repo: any): void {
  try {
    const saved = getSavedRepos();
    const exists = saved.some(r => r.id === repo.id);
    
    if (!exists) {
      saved.push({
        ...repo,
        savedAt: Date.now(),
      });
      localStorage.setItem(STORAGE_KEYS.SAVED_REPOS, JSON.stringify(saved));
    }
  } catch (error) {
    console.error('Failed to save repo:', error);
  }
}

// 取消收藏仓库
export function removeSavedRepo(repoId: number): void {
  try {
    const saved = getSavedRepos();
    const filtered = saved.filter(r => r.id !== repoId);
    localStorage.setItem(STORAGE_KEYS.SAVED_REPOS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to remove saved repo:', error);
  }
}

// 获取所有收藏的仓库
export function getSavedRepos(): SavedRepo[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED_REPOS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get saved repos:', error);
    return [];
  }
}

// 检查仓库是否已收藏
export function isRepoSaved(repoId: number): boolean {
  try {
    const saved = getSavedRepos();
    return saved.some(r => r.id === repoId);
  } catch (error) {
    console.error('Failed to check saved repo:', error);
    return false;
  }
}

// 添加搜索历史
export function addSearchHistory(query: string): void {
  try {
    const history = getSearchHistory();
    const filtered = history.filter(h => h !== query);
    filtered.unshift(query);
    const limited = filtered.slice(0, 20); // 只保留最近 20 条
    localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(limited));
  } catch (error) {
    console.error('Failed to add search history:', error);
  }
}

// 获取搜索历史
export function getSearchHistory(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get search history:', error);
    return [];
  }
}

// 清除搜索历史
export function clearSearchHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
  } catch (error) {
    console.error('Failed to clear search history:', error);
  }
}
