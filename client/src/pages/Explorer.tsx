import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Github, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useGitHubUser, useGitHubFollowing, useGitHubFollowers, useGitHubUserRepos } from '@/lib/github';
import { useLocation } from 'wouter';
import { UserProfileCard } from '@/components/UserProfileCard';
import { SocialRelationList } from '@/components/SocialRelationList';
import { SocialGraph } from '@/components/SocialGraph';
import { isDeveloperSaved, saveDeveloper, removeSavedDeveloper } from '@/lib/storage';
import { enrichUsersWithCommonFollowing } from '@/lib/analysis';

export default function Explorer() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [followingPage, setFollowingPage] = useState(1);
  const [followersPage, setFollowersPage] = useState(1);
  const [followingSortBy, setFollowingSortBy] = useState<'followers' | 'common' | 'activity'>('followers');
  const [followersSortBy, setFollowersSortBy] = useState<'followers' | 'common' | 'activity'>('followers');
  const [reposPage, setReposPage] = useState(1);

  // 获取用户信息
  const { user, isLoading: userLoading, error: userError } = useGitHubUser(selectedUser);
  const { following, isLoading: followingLoading } = useGitHubFollowing(selectedUser, followingPage);
  const { followers, isLoading: followersLoading } = useGitHubFollowers(selectedUser, followersPage);
  const { repos, isLoading: reposLoading } = useGitHubUserRepos(selectedUser, reposPage);

  // 处理搜索
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedUser(searchQuery.trim());
      setFollowingPage(1);
      setFollowersPage(1);
      setReposPage(1);
    } else {
      toast.error('请输入用户名');
    }
  };

  // 处理收藏
  const handleSaveUser = () => {
    if (user) {
      if (isDeveloperSaved(user.id)) {
        removeSavedDeveloper(user.id);
        toast.success('已取消收藏');
      } else {
        saveDeveloper(user);
        toast.success('已收藏');
      }
    }
  };

  // 为用户列表添加共同关注数
  const enrichedFollowing = useMemo(() => {
    return enrichUsersWithCommonFollowing(following, following);
  }, [following]);

  const enrichedFollowers = useMemo(() => {
    return enrichUsersWithCommonFollowing(followers, following);
  }, [followers, following]);

  // 构建图谱数据
  const graphData = useMemo(() => {
    if (!user || following.length === 0) {
      return { nodes: [], links: [] };
    }

    const nodes = [
      {
        id: user.login,
        name: user.name || user.login,
        avatar: user.avatar_url,
        followers: user.followers,
        following: user.following,
        repos: user.public_repos,
      },
      ...following.slice(0, 10).map((u: any) => ({
        id: u.login,
        name: u.name || u.login,
        avatar: u.avatar_url,
        followers: u.followers,
        following: u.following,
        repos: u.public_repos,
      })),
    ];

    const links = following.slice(0, 10).map((u: any) => ({
      source: user.login,
      target: u.login,
      commonFollowing: Math.floor(Math.random() * 10) + 1, // 示例数据
    }));

    return { nodes, links };
  }, [user, following]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 头部导航 */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Github className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">GitHub 社交图谱</h1>
            </div>
            <button
              onClick={() => setLocation('/favorites')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="我的收藏"
            >
              <Heart className="w-5 h-5 text-red-600" />
            </button>
          </div>

          {/* 搜索栏 */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="输入 GitHub 用户名..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="gap-2">
              <Search className="w-4 h-4" />
              搜索
            </Button>
          </form>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {!selectedUser ? (
          <div className="text-center py-12">
            <Github className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">欢迎使用 GitHub 社交图谱</h2>
            <p className="text-gray-600 mb-6">输入 GitHub 用户名开始探索开发者的社交网络</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 用户画像 */}
            <UserProfileCard
              user={user}
              isLoading={userLoading}
              onSave={handleSaveUser}
              isSaved={user ? isDeveloperSaved(user.id) : false}
            />

            {/* 导航按钮 */}
            <div className="flex gap-2 mb-6">
              <Button
                onClick={() => setLocation('/recommendations')}
                variant="outline"
                className="gap-2"
              >
                🌟 智能推荐
              </Button>
              <Button
                onClick={() => setLocation('/common-connections')}
                variant="outline"
                className="gap-2"
              >
                🔗 共同关联
              </Button>
            </div>

            {/* 标签页 */}
            <Tabs defaultValue="social" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="social">社交关系</TabsTrigger>
                <TabsTrigger value="graph">社交图谱</TabsTrigger>
                <TabsTrigger value="repos">仓库统计</TabsTrigger>
              </TabsList>

              {/* 社交关系标签页 */}
              <TabsContent value="social" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <SocialRelationList
                    title="关注列表"
                    users={enrichedFollowing}
                    isLoading={followingLoading}
                    onLoadMore={() => setFollowingPage(prev => prev + 1)}
                    hasMore={enrichedFollowing.length >= 30}
                    sortBy={followingSortBy}
                    onSortChange={setFollowingSortBy}
                  />
                  <SocialRelationList
                    title="粉丝列表"
                    users={enrichedFollowers}
                    isLoading={followersLoading}
                    onLoadMore={() => setFollowersPage(prev => prev + 1)}
                    hasMore={enrichedFollowers.length >= 30}
                    sortBy={followersSortBy}
                    onSortChange={setFollowersSortBy}
                  />
                </div>
              </TabsContent>

              {/* 社交图谱标签页 */}
              <TabsContent value="graph" className="mt-6">
                <SocialGraph
                  nodes={graphData.nodes}
                  links={graphData.links}
                  isLoading={followingLoading}
                  isMobile={isMobile}
                />
              </TabsContent>

              {/* 仓库统计标签页 */}
              <TabsContent value="repos" className="mt-6">
                <div className="space-y-6">
                  {/* 仓库总数统计 */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-blue-600">共 {user?.public_repos || 0} 个公开仓库</span>
                      <span className="text-gray-600 ml-2">（当前显示第 {reposPage} 页）</span>
                    </p>
                  </div>

                  {/* 仓库列表 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {repos.map((repo: any) => (
                      <div
                        key={repo.id}
                        className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{repo.name}</h3>
                            <p className="text-sm text-gray-600">{repo.description}</p>
                          </div>
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            →
                          </a>
                        </div>
                        <div className="flex gap-4 text-xs text-gray-600">
                          {repo.language && (
                            <span className="bg-gray-100 px-2 py-1 rounded">{repo.language}</span>
                          )}
                          <span>⭐ {repo.stargazers_count}</span>
                          <span>🔀 {repo.forks_count}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 分页按钮 */}
                  <div className="flex justify-center gap-4 pt-4">
                    <Button
                      onClick={() => setReposPage(Math.max(1, reposPage - 1))}
                      disabled={reposPage === 1 || reposLoading}
                      variant="outline"
                    >
                      上一页
                    </Button>
                    <span className="flex items-center text-sm text-gray-600">
                      第 {reposPage} 页
                    </span>
                    <Button
                      onClick={() => setReposPage(reposPage + 1)}
                      disabled={repos.length < 30 || reposLoading}
                      variant="outline"
                    >
                      下一页
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
}
