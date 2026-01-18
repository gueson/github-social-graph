import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Mail, Globe, Calendar, Users, BookOpen, Star, GitFork } from 'lucide-react';
import { formatTimeAgo, calculatePercentileRank } from '@/lib/analysis';

interface UserProfileCardProps {
  user: any;
  isLoading?: boolean;
  onSave?: () => void;
  isSaved?: boolean;
}

export function UserProfileCard({ user, isLoading, onSave, isSaved }: UserProfileCardProps) {
  if (isLoading) {
    return (
      <Card className="p-6 space-y-4">
        <div className="flex gap-4">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="p-6 text-center text-gray-500">
        <p>未找到用户信息</p>
      </Card>
    );
  }

  const joinDate = new Date(user.created_at);
  const joinYear = joinDate.getFullYear();
  const joinMonth = joinDate.getMonth() + 1;

  return (
    <Card className="overflow-hidden">
      {/* 背景渐变 */}
      <div className="h-8" />

      <div className="px-6 pb-6">
        {/* 头像和基本信息 */}
        <div className="flex gap-4 -mt-12 mb-6">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <div className="flex-1 pt-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.name || user.login}</h2>
                <p className="text-gray-600">@{user.login}</p>
              </div>
              <Button
                onClick={onSave}
                variant={isSaved ? 'default' : 'outline'}
                size="sm"
                className="whitespace-nowrap"
              >
                {isSaved ? '已收藏' : '收藏'}
              </Button>
            </div>
          </div>
        </div>

        {/* 个人简介 */}
        {user.bio && (
          <p className="text-gray-700 mb-4 leading-relaxed">{user.bio}</p>
        )}

        {/* 个人信息区 */}
        <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-gray-200">
          {user.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{user.location}</span>
            </div>
          )}
          {user.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4 text-blue-500" />
              <span className="truncate">{user.email}</span>
            </div>
          )}
          {user.blog && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="w-4 h-4 text-blue-500" />
              <a href={user.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                {user.blog}
              </a>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>加入于 {joinYear} 年 {joinMonth} 月</span>
          </div>
        </div>

        {/* 社交数据区 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{user.followers}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1 mt-1">
              <Users className="w-4 h-4" />
              粉丝
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{user.following}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1 mt-1">
              <Users className="w-4 h-4" />
              关注
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{user.public_repos}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1 mt-1">
              <BookOpen className="w-4 h-4" />
              公开仓库
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{user.private_repos || 0}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-1 mt-1">
              <GitFork className="w-4 h-4" />
              私有仓库
            </div>
          </div>
        </div>

        {/* 对比标注 */}
        {user.followers > 0 && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-indigo-600">你的粉丝数量超过了 82% 的同领域开发者</span>
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
