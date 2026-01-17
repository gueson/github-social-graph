import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, ExternalLink, Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { saveDeveloper, removeSavedDeveloper, isDeveloperSaved } from '@/lib/storage';

interface SocialRelationListProps {
  title: string;
  users: any[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  sortBy?: 'followers' | 'common' | 'activity';
  onSortChange?: (sort: 'followers' | 'common' | 'activity') => void;
}

export function SocialRelationList({
  title,
  users,
  isLoading,
  onLoadMore,
  hasMore,
  sortBy = 'followers',
  onSortChange,
}: SocialRelationListProps) {
  // 根据排序方式对用户列表进行排序（必须在组件顶部调用）
  const sortedUsers = useMemo(() => {
    if (!users || users.length === 0) return [];
    
    const sorted = [...users];
    if (sortBy === 'followers') {
      sorted.sort((a: any, b: any) => (b.followers || 0) - (a.followers || 0));
    } else if (sortBy === 'common') {
      sorted.sort((a: any, b: any) => (b.common_following || 0) - (a.common_following || 0));
    }
    return sorted;
  }, [users, sortBy]);

  const [savedUsers, setSavedUsers] = useState<Set<number>>(() => {
    const ids = users.filter(u => isDeveloperSaved(u.id)).map(u => u.id);
    return new Set(ids);
  });

  const isSaved = (userId: number) => savedUsers.has(userId);

  const handleSave = (user: any) => {
    if (savedUsers.has(user.id)) {
      removeSavedDeveloper(user.id);
      setSavedUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(user.id);
        return newSet;
      });
      toast.success('已取消收藏');
    } else {
      saveDeveloper(user);
      setSavedUsers(prev => {
        const newSet = new Set<number>();
        prev.forEach(id => newSet.add(id));
        newSet.add(user.id);
        return newSet;
      });
      toast.success('已收藏');
    }
  };

  const handleCopyUrl = (username: string) => {
    const url = `https://github.com/${username}`;
    navigator.clipboard.writeText(url);
    toast.success('已复制链接');
  };

  if (isLoading && users.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Card className="p-6 text-center text-gray-500">
        <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>暂无{title}</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">
            共 {sortedUsers.length} 人
            {sortBy === 'followers' && ' · 按粉丝数排序'}
            {sortBy === 'common' && ' · 按共同关注排序'}
          </p>
        </div>
        {onSortChange && (
          <div className="flex gap-2">
            <button
              onClick={() => onSortChange('followers')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                sortBy === 'followers'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              粉丝数
            </button>
            <button
              onClick={() => onSortChange('common')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                sortBy === 'common'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              共同关注
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {sortedUsers.map(user => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {/* 头像 */}
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-10 h-10 rounded-full"
            />

            {/* 用户信息 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <a
                  href={`https://github.com/${user.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-900 hover:text-blue-600 truncate"
                >
                  {user.name || user.login}
                </a>
                <span className="text-xs text-gray-500">@{user.login}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                <span className="text-gray-400">ID: {user.id}</span>
                <span>👥 {user.followers} 粉丝</span>
                {user.common_following && (
                  <span className="text-orange-600 font-semibold">
                    🔗 {user.common_following} 共同关注
                  </span>
                )}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-2">
              <button
                onClick={() => handleCopyUrl(user.login)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="复制链接"
              >
                <Copy className="w-4 h-4 text-gray-600" />
              </button>
              <a
                href={`https://github.com/${user.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="访问 GitHub"
              >
                <ExternalLink className="w-4 h-4 text-gray-600" />
              </a>
              <button
                onClick={() => handleSave(user)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  isSaved(user.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isSaved(user.id) ? '已收藏' : '收藏'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? '加载中...' : '加载更多'}
        </button>
      )}
    </Card>
  );
}
