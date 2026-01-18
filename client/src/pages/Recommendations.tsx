import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ExternalLink, Copy, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useGitHubUser, useGitHubFollowing, useGitHubUserStarred } from '@/lib/github';
import { recommendDevelopers, recommendRepos } from '@/lib/analysis';
import { useLocation } from 'wouter';
import { saveDeveloper, saveRepo, isDeveloperSaved, isRepoSaved } from '@/lib/storage';
import { Footer } from '@/components/Footer';

export default function Recommendations() {
  const [, setLocation] = useLocation();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const { user } = useGitHubUser(selectedUser);
  const { following } = useGitHubFollowing(selectedUser);
  const { starred } = useGitHubUserStarred(selectedUser);

  // 生成开发者推荐
  const developerRecommendations = useMemo(() => {
    if (!user || following.length === 0) return [];
    
    // 模拟所有用户数据（实际应该从 API 获取）
    const allUsers = [
      ...following,
      {
        id: Math.random(),
        login: 'torvalds',
        name: 'Linus Torvalds',
        avatar_url: 'https://avatars.githubusercontent.com/u/1024025?v=4',
        followers: 100000,
        following: 50,
        public_repos: 100,
      },
      {
        id: Math.random(),
        login: 'gvanrossum',
        name: 'Guido van Rossum',
        avatar_url: 'https://avatars.githubusercontent.com/u/6524?v=4',
        followers: 50000,
        following: 100,
        public_repos: 50,
      },
    ];

    return recommendDevelopers(user, following, [], allUsers);
  }, [user, following]);

  // 生成仓库推荐
  const repoRecommendations = useMemo(() => {
    if (starred.length === 0) return [];
    
    // 模拟仓库数据
    const followingRepos = [
      ...starred.slice(0, 5),
      {
        id: Math.random(),
        name: 'kubernetes',
        full_name: 'kubernetes/kubernetes',
        description: 'Production-Grade Container Orchestration',
        html_url: 'https://github.com/kubernetes/kubernetes',
        stargazers_count: 100000,
        language: 'Go',
        updated_at: new Date().toISOString(),
      },
      {
        id: Math.random(),
        name: 'tensorflow',
        full_name: 'tensorflow/tensorflow',
        description: 'An Open Source Machine Learning Framework',
        html_url: 'https://github.com/tensorflow/tensorflow',
        stargazers_count: 180000,
        language: 'C++',
        updated_at: new Date().toISOString(),
      },
    ];

    return recommendRepos(starred, followingRepos);
  }, [starred]);

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
          <h1 className="text-2xl font-bold text-gray-900">智能推荐</h1>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="developers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="developers">
              推荐开发者 ({developerRecommendations.length})
            </TabsTrigger>
            <TabsTrigger value="repos">
              推荐仓库 ({repoRecommendations.length})
            </TabsTrigger>
          </TabsList>

          {/* 开发者推荐 */}
          <TabsContent value="developers" className="mt-6">
            {developerRecommendations.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-500">暂无推荐的开发者</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {developerRecommendations.map(({ user: dev, reason, score }) => (
                  <Card key={dev.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <img
                        src={dev.avatar_url}
                        alt={dev.login}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {dev.name || dev.login}
                            </h3>
                            <p className="text-sm text-gray-600">@{dev.login}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-blue-600">
                              匹配度 {Math.round(score * 100)}%
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 text-xs text-gray-600 mb-3">
                          <span>👥 {dev.followers} 粉丝</span>
                          <span>📦 {dev.public_repos} 仓库</span>
                        </div>

                        <div className="mb-3 p-2 bg-indigo-50 rounded border border-indigo-200">
                          <p className="text-xs text-indigo-700">
                            <span className="font-semibold">推荐理由：</span> {reason}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleCopyUrl(`https://github.com/${dev.login}`)}
                            size="sm"
                            variant="outline"
                            className="flex-1 gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            复制
                          </Button>
                          <a
                            href={`https://github.com/${dev.login}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button size="sm" className="w-full gap-1">
                              <ExternalLink className="w-3 h-3" />
                              访问
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
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* 仓库推荐 */}
          <TabsContent value="repos" className="mt-6">
            {repoRecommendations.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-500">暂无推荐的仓库</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {repoRecommendations.map(({ repo, reason, score }) => (
                  <Card key={repo.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{repo.name}</h3>
                        <p className="text-sm text-gray-600">{repo.full_name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-blue-600">
                          匹配度 {Math.round(score * 100)}%
                        </div>
                      </div>
                    </div>

                    {repo.description && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {repo.description}
                      </p>
                    )}

                    <div className="flex gap-2 text-xs text-gray-600 mb-3">
                      {repo.language && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {repo.language}
                        </span>
                      )}
                      <span>⭐ {repo.stargazers_count}</span>
                    </div>

                    <div className="mb-3 p-2 bg-indigo-50 rounded border border-indigo-200">
                      <p className="text-xs text-indigo-700">
                        <span className="font-semibold">推荐理由：</span> {reason}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleCopyUrl(repo.html_url)}
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        复制
                      </Button>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button size="sm" className="w-full gap-1">
                          <ExternalLink className="w-3 h-3" />
                          访问
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
