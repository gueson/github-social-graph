import React from 'react';

const Sitemap: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">网站地图</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-6">
            以下是 GitHub 社交图谱网站的所有主要页面链接。您也可以查看我们的 <a href="/sitemap.xml" className="text-blue-600 hover:underline">XML 站点地图</a> 用于搜索引擎索引。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">主要页面</h2>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    首页
                  </a>
                </li>
                <li>
                  <a href="/explorer" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    探索
                  </a>
                </li>
                <li>
                  <a href="/recommendations" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    推荐
                  </a>
                </li>
                <li>
                  <a href="/common-connections" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    共同连接
                  </a>
                </li>
                <li>
                  <a href="/favorites" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    收藏
                  </a>
                </li>
                <li>
                  <a href="/component-showcase" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    组件展示
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">法律页面</h2>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    隐私政策
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    服务条款
                  </a>
                </li>
                <li>
                  <a href="/sitemap" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    网站地图
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">XML 站点地图</h2>
            <p className="text-gray-600 mb-4">
              我们的 XML 站点地图包含了网站所有页面的详细信息，有助于搜索引擎更好地索引我们的网站。
            </p>
            <a 
              href="/sitemap.xml" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              查看 XML 站点地图
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;