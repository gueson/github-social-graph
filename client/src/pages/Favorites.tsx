import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Trash2, ExternalLink, Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getSavedDevelopers, getSavedRepos, removeSavedDeveloper, removeSavedRepo } from '@/lib/storage';
import { useLocation } from 'wouter';

export default function Favorites() {
  const [, setLocation] = useLocation();
  const [savedDevelopers, setSavedDevelopers] = useState(getSavedDevelopers());
  const [savedRepos, setSavedRepos] = useState(getSavedRepos());

  const handleRemoveDeveloper = (id: number) => {
    removeSavedDeveloper(id);
    setSavedDevelopers(getSavedDevelopers());
    toast.success('已移除收藏');
  };

  const handleRemoveRepo = (id: number) => {
    removeSavedRepo(id);
    setSavedRepos(getSavedRepos());
    toast.success('已移除收藏');
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('已复制链接');
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
          <h1 className="text-2xl font-bold text-gray-900">我的收藏</h1>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="developers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="developers">
              收藏的开发者 ({savedDevelopers.length})
            </TabsTrigger>
            <TabsTrigger value="repos">
              收藏的仓库 ({savedRepos.length})
            </TabsTrigger>
          </TabsList>

          {/* 开发者标签页 */}
          <TabsContent value="developers" className="mt-6">
            {savedDevelopers.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-500 mb-4">还没有收藏任何开发者</p>
                <Button onClick={() => setLocation('/explorer')}>
                  去探索
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {savedDevelopers.map(dev => (
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
                            <h3 className="font-semibold text-gray-900">{dev.name || dev.login}</h3>
                            <p className="text-sm text-gray-600">@{dev.login}</p>
                          </div>
                          <Button
                            onClick={() => handleRemoveDeveloper(dev.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        {dev.bio && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{dev.bio}</p>
                        )}
                        <div className="flex gap-2 text-xs text-gray-600 mb-3">
                          <span>👥 {dev.followers} 粉丝</span>
                          <span>📦 {dev.public_repos} 仓库</span>
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
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* 仓库标签页 */}
          <TabsContent value="repos" className="mt-6">
            {savedRepos.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-500 mb-4">还没有收藏任何仓库</p>
                <Button onClick={() => setLocation('/explorer')}>
                  去探索
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {savedRepos.map(repo => (
                  <Card key={repo.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{repo.name}</h3>
                        <p className="text-sm text-gray-600">{repo.full_name}</p>
                      </div>
                      <Button
                        onClick={() => handleRemoveRepo(repo.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {repo.description && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{repo.description}</p>
                    )}
                    <div className="flex gap-2 text-xs text-gray-600 mb-3">
                      {repo.language && (
                        <span className="bg-gray-100 px-2 py-1 rounded">{repo.language}</span>
                      )}
                      <span>⭐ {repo.stargazers_count}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleCopyUrl(repo.url)}
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        复制
                      </Button>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button size="sm" className="w-full gap-1">
                          <ExternalLink className="w-3 h-3" />
                          访问
                        </Button>
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
