import React from 'react';
import { Github, Globe, Mail } from 'lucide-react';

interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-white border-t border-gray-200 py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Github className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">GitHub 社交图谱</span>
            </div>
            <p className="text-gray-600 mb-4">
              深度分析 GitHub 用户画像、社交关系和技术标签，发现志同道合的开发者
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://github-social-graph.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a 
                href="mailto:y_xk1990@126.com" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  首页
                </a>
              </li>
              <li>
                <a href="/explorer" className="text-gray-600 hover:text-blue-600 transition-colors">
                  探索
                </a>
              </li>
              <li>
                <a href="/recommendations" className="text-gray-600 hover:text-blue-600 transition-colors">
                  推荐
                </a>
              </li>
              <li>
                <a href="/common-connections" className="text-gray-600 hover:text-blue-600 transition-colors">
                  共同连接
                </a>
              </li>
              <li>
                <a href="/favorites" className="text-gray-600 hover:text-blue-600 transition-colors">
                  收藏
                </a>
              </li>
            </ul>
          </div>

          {/* 资源 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">资源</h3>
            <ul className="space-y-2">

              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://docs.github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  GitHub 文档
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {currentYear} GitHub Social Graph Team. 保留所有权利.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
              隐私政策
            </a>
            <a href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
              服务条款
            </a>
            <a href="/sitemap" className="text-gray-600 hover:text-blue-600 transition-colors">
              网站地图
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}