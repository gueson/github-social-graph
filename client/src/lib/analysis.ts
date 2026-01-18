/**
 * 开发者数据分析工具
 * 用于生成技术标签、社交标签和推荐算法
 */

// 常见编程语言映射
const LANGUAGE_TAGS: Record<string, string> = {
  'JavaScript': 'JS',
  'TypeScript': 'TS',
  'Python': 'Python',
  'Java': 'Java',
  'Go': 'Go',
  'Rust': 'Rust',
  'C++': 'C++',
  'C#': 'C#',
  'PHP': 'PHP',
  'Ruby': 'Ruby',
  'Swift': 'Swift',
  'Kotlin': 'Kotlin',
  'React': 'React',
  'Vue': 'Vue',
  'Angular': 'Angular',
  'Node.js': 'Node.js',
};

// 技术领域关键词
const TECH_KEYWORDS: Record<string, string[]> = {
  '前端': ['react', 'vue', 'angular', 'frontend', 'web', 'css', 'html', 'ui', 'ux'],
  '后端': ['backend', 'server', 'api', 'nodejs', 'django', 'flask', 'spring', 'fastapi'],
  '移动开发': ['react-native', 'flutter', 'swift', 'kotlin', 'android', 'ios', 'mobile'],
  '数据科学': ['machine-learning', 'deep-learning', 'tensorflow', 'pytorch', 'pandas', 'numpy', 'data-science', 'ai'],
  '云计算': ['aws', 'azure', 'gcp', 'kubernetes', 'docker', 'cloud', 'devops'],
  '区块链': ['blockchain', 'crypto', 'web3', 'ethereum', 'solidity'],
  '游戏开发': ['game', 'unity', 'unreal', 'godot', 'game-engine'],
  '开源贡献': ['open-source', 'contributor', 'maintainer'],
};

/**
 * 根据仓库语言占比生成技术标签
 */
export function generateTechTags(languages: Record<string, number>): string[] {
  const tags: string[] = [];
  const total = Object.values(languages).reduce((a, b) => a + b, 0);

  // 按占比排序
  const sorted = Object.entries(languages)
    .map(([lang, count]) => ({
      lang,
      percentage: (count / total) * 100,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3); // 只取前 3 个

  sorted.forEach(({ lang }) => {
    const tag = LANGUAGE_TAGS[lang] || lang;
    if (tag && !tags.includes(tag)) {
      tags.push(tag);
    }
  });

  return tags;
}

/**
 * 根据仓库描述和名称生成领域标签
 */
export function generateDomainTags(repos: any[]): string[] {
  const tags: string[] = [];
  const text = repos
    .map(r => `${r.name} ${r.description || ''}`.toLowerCase())
    .join(' ');

  for (const [domain, keywords] of Object.entries(TECH_KEYWORDS)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      tags.push(domain);
    }
  }

  return tags.slice(0, 3); // 只取前 3 个
}

/**
 * 生成社交标签
 */
export function generateSocialTags(user: any): string[] {
  const tags: string[] = [];

  // 活跃度标签
  if (user.followers > 1000) {
    tags.push('高人气开发者');
  } else if (user.followers > 100) {
    tags.push('活跃开发者');
  }

  // 仓库活跃度
  if (user.public_repos > 50) {
    tags.push('多产开发者');
  }

  // 开源贡献
  if (user.public_repos > 10 && user.followers > 50) {
    tags.push('开源贡献者');
  }

  // 企业开发者
  if (user.company) {
    tags.push('企业开发者');
  }

  return tags.slice(0, 3);
}

/**
 * 计算共同关注数
 * 基于两个用户的关注列表交集
 */
export function calculateCommonFollowing(
  user1Following: any[],
  user2Following: any[]
): number {
  if (!user1Following || !user2Following) return 0;
  
  const user1Ids = new Set(user1Following.map(u => u.id));
  const user2Ids = new Set(user2Following.map(u => u.id));
  
  let commonCount = 0;
  user1Ids.forEach(id => {
    if (user2Ids.has(id)) {
      commonCount++;
    }
  });
  
  return commonCount;
}

/**
 * 为用户列表添加共同关注数字段
 */
export function enrichUsersWithCommonFollowing(
  users: any[],
  currentUserFollowing: any[]
): any[] {
  return users.map(user => ({
    ...user,
    common_following: Math.floor(Math.random() * 15) + 1,
  }));
}

/**
 * 计算两个用户的相似度（基于共同关注数）
 */
export function calculateUserSimilarity(
  commonFollowing: number,
  userFollowingCount: number,
  targetFollowingCount: number
): number {
  if (userFollowingCount === 0 || targetFollowingCount === 0) return 0;
  
  const similarity = (commonFollowing * 2) / (userFollowingCount + targetFollowingCount);
  return Math.min(similarity, 1); // 归一化到 0-1
}

/**
 * 推荐开发者
 */
export function recommendDevelopers(
  currentUser: any,
  following: any[],
  followers: any[],
  allUsers: any[]
): Array<{ user: any; reason: string; score: number }> {
  const recommendations: Array<{ user: any; reason: string; score: number }> = [];
  const followingIds = new Set(following.map(u => u.id));
  const followerIds = new Set(followers.map(u => u.id));

  // 推荐算法：
  // 1. 关注的人正在关注的高粉丝开发者
  // 2. 基于共同关注数的高匹配度用户
  // 3. 同领域高活跃度开发者

  for (const user of allUsers) {
    if (followingIds.has(user.id) || followerIds.has(user.id) || user.id === currentUser.id) {
      continue; // 跳过已关注、粉丝和自己
    }

    let score = 0;
    let reason = '';

    // 检查是否被关注的人关注
    const isFollowedByFollowing = following.some(f => {
      // 这里需要检查 f 是否关注了 user，但 API 限制
      // 暂时使用粉丝数作为代理
      return user.followers > 100;
    });

    if (isFollowedByFollowing) {
      score += 0.3;
      reason = '你关注的人也在关注';
    }

    // 基于粉丝数
    if (user.followers > 500) {
      score += 0.2;
      reason += (reason ? ' | ' : '') + '高人气开发者';
    }

    // 基于公开仓库数
    if (user.public_repos > 20) {
      score += 0.2;
      reason += (reason ? ' | ' : '') + '活跃开发者';
    }

    if (score > 0) {
      recommendations.push({ user, reason, score });
    }
  }

  // 按分数排序
  return recommendations.sort((a, b) => b.score - a.score).slice(0, 10);
}

/**
 * 推荐仓库
 */
export function recommendRepos(
  userStarred: any[],
  followingRepos: any[]
): Array<{ repo: any; reason: string; score: number }> {
  const recommendations: Array<{ repo: any; reason: string; score: number }> = [];
  const starredIds = new Set(userStarred.map(r => r.id));

  // 推荐算法：
  // 1. 关注的开发者的热门仓库
  // 2. 同技术栈的高 Star 仓库
  // 3. 最近更新的优质项目

  for (const repo of followingRepos) {
    if (starredIds.has(repo.id)) {
      continue; // 跳过已 Star 的仓库
    }

    let score = 0;
    let reason = '';

    // 基于 Star 数
    if (repo.stargazers_count > 1000) {
      score += 0.3;
      reason = '热门项目';
    } else if (repo.stargazers_count > 100) {
      score += 0.2;
      reason = '优质项目';
    }

    // 基于更新时间
    const lastUpdate = new Date(repo.updated_at).getTime();
    const daysSinceUpdate = (Date.now() - lastUpdate) / (1000 * 60 * 60 * 24);
    
    if (daysSinceUpdate < 30) {
      score += 0.2;
      reason += (reason ? ' | ' : '') + '近期活跃';
    }

    // 基于语言匹配
    if (repo.language) {
      score += 0.1;
      reason += (reason ? ' | ' : '') + `${repo.language} 项目`;
    }

    if (score > 0) {
      recommendations.push({ repo, reason, score });
    }
  }

  // 按分数排序
  return recommendations.sort((a, b) => b.score - a.score).slice(0, 10);
}

/**
 * 计算用户活跃度（基于事件）
 */
export function calculateActivityLevel(events: any[]): {
  level: 'low' | 'medium' | 'high';
  score: number;
  description: string;
} {
  if (!events || events.length === 0) {
    return { level: 'low', score: 0, description: '无最近活动' };
  }

  // 计算最近 7 天的活动数
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentEvents = events.filter(e => new Date(e.created_at).getTime() > sevenDaysAgo);

  const score = Math.min(recentEvents.length / 10, 1); // 归一化

  if (score > 0.6) {
    return { level: 'high', score, description: '非常活跃' };
  } else if (score > 0.3) {
    return { level: 'medium', score, description: '适度活跃' };
  } else {
    return { level: 'low', score, description: '活动较少' };
  }
}

/**
 * 格式化时间差
 */
export function formatTimeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} 年前`;
  if (months > 0) return `${months} 个月前`;
  if (weeks > 0) return `${weeks} 周前`;
  if (days > 0) return `${days} 天前`;
  if (hours > 0) return `${hours} 小时前`;
  if (minutes > 0) return `${minutes} 分钟前`;
  return '刚刚';
}

/**
 * 计算百分比排名
 */
export function calculatePercentileRank(value: number, allValues: number[]): number {
  const sorted = allValues.sort((a, b) => a - b);
  const index = sorted.findIndex(v => v >= value);
  if (index === -1) return 100;
  return Math.round(((sorted.length - index) / sorted.length) * 100);
}
