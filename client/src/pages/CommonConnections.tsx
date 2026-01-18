import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ExternalLink, Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useGitHubUser, useGitHubFollowing, useGitHubFollowers, useGitHubUserStarred } from '@/lib/github';
import { useLocation } from 'wouter';
import { saveDeveloper, saveRepo, isDeveloperSaved, isRepoSaved } from '@/lib/storage';
import { Footer } from '@/components/Footer';

export default function CommonConnections() {
  const [, setLocation] = useLocation();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'followers' | 'common'>('common');

  const { user: currentUser } = useGitHubUser(selectedUser);
  const { following: currentFollowing } = useGitHubFollowing(selectedUser);
  const { followers: currentFollowers } = useGitHubFollowers(selectedUser);
  const { starred: currentStarred } = useGitHubUserStarred(selectedUser);

  // 计算共同关注的开发者
  const commonFollowing = useMemo(() => {
    if (currentFollowing.length === 0) return [];
    
    // 模拟其他用户的关注列表
    const otherUserFollowing = currentFollowing.slice(0, 10).map((u: any) => ({
      ...u,
      followers: Math.floor(Math.random() * 10000),
    }));

    // 找出共同关注
    const common = currentFollowing.filter((user: any) =>
      otherUserFollowing.some((other: any) => other.id === user.id)
    );

    // 排序
    if (sortBy === 'followers') {
      return common.sort((a: any, b: any) => b.followers - a.followers);
    } else {
      return common.sort((a: any, b: any) => b.followers - a.followers);
    }
  }, [currentFollowing, sortBy]);

  // 计算共同 Star 的仓库
  const commonStarred = useMemo(() => {
    if (currentStarred.length === 0) return [];

    // 模拟其他用户的 Star 列表
    const otherUserStarred = [
      {
        id: Math.random(),
        name: 'react',
        full_name: 'facebook/react',
        description: 'A JavaScript library for building user interfaces',
        html_url: 'https://github.com/facebook/react',
        stargazers_count: 200000,
        language: 'JavaScript',
      },
      {
        id: Math.random(),
        name: 'vue',
        full_name: 'vuejs/vue',
        description: 'The Progressive JavaScript Framework',
        html_url: 'https://github.com/vuejs/vue',
        stargazers_count: 200000,
        language: 'JavaScript',
      },
      ...currentStarred.slice(0, 3),
    ];

    // 找出共同 Star
    const common = currentStarred.filter((repo: any) =>
      otherUserStarred.some((other: any) => other.id === repo.id)
    );

    return common.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);
  }, [currentStarred]);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('已复制链接');
  };

  const handleSaveDeveloper = (dev: any) => {
    if (isDeveloperSaved(dev.id)) {
      toast.error('已收藏');
    } else {
      saveDeveloper(dev);
      toast.success('已收藏');
    }
  };

  const handleSaveRepo = (repo: any) => {
    if (isRepoSaved(repo.id)) {
      toast.error('已收藏');
    } else {
      saveRepo(repo);
      toast.success('已收藏');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            onClick={() => setLocation('/explorer')}
            variant="ghost"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">共同关联分析</h1>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="developers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="developers">
              共同关注的开发者 ({commonFollowing.length})
            </TabsTrigger>
            <TabsTrigger value="repos">
              共同 Star 的仓库 ({commonStarred.length})
            </TabsTrigger>
          </TabsList>

          {/* 共同关注的开发者 */}
          <TabsContent value="developers" className="mt-6">
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setSortBy('followers')}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  sortBy === 'followers'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                按粉丝数排序
              </button>
              <button
                onClick={() => setSortBy('common')}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  sortBy === 'common'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                按共同度排序
              </button>
            </div>

            {commonFollowing.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-500">暂无共同关注的开发者</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {commonFollowing.map((dev: any) => (
                  <Card key={dev.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <img
                        src={dev.avatar_url}
                        alt={dev.login}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {dev.name || dev.login}
                          </h3>
                          <span className="text-xs font-semibold text-orange-600">
                            👥 {dev.followers} 粉丝
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">@{dev.login}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleCopyUrl(`https://github.com/${dev.login}`)}
                          size="sm"
                          variant="outline"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <a
                          href={`https://github.com/${dev.login}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </a>
                        <Button
                          onClick={() => handleSaveDeveloper(dev)}
                          size="sm"
                          variant={isDeveloperSaved(dev.id) ? 'default' : 'outline'}
                        >
                          {isDeveloperSaved(dev.id) ? '已收藏' : '收藏'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* 共同 Star 的仓库 */}
          <TabsContent value="repos" className="mt-6">
            {commonStarred.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-500">暂无共同 Star 的仓库</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {commonStarred.map((repo: any) => (
                  <Card key={repo.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">{repo.name}</h3>
                          <span className="text-xs font-semibold text-orange-600">
                            ⭐ {repo.stargazers_count}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{repo.full_name}</p>
                        {repo.description && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                            {repo.description}
                          </p>
                        )}
                        {repo.language && (
                          <span className="inline-block mt-2 bg-gray-100 px-2 py-1 rounded text-xs">
                            {repo.language}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleCopyUrl(repo.html_url)}
                          size="sm"
                          variant="outline"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </a>
                        <Button
                          onClick={() => handleSaveRepo(repo)}
                          size="sm"
                          variant={isRepoSaved(repo.id) ? 'default' : 'outline'}
                        >
                          {isRepoSaved(repo.id) ? '已收藏' : '收藏'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
