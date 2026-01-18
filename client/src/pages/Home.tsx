import { Button } from "@/components/ui/button";
import { Github, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">GitHub 社交图谱</span>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setLocation('/favorites')} variant="outline" size="sm">
              我的收藏
            </Button>
            <Button onClick={() => setLocation('/explorer')} className="gap-2">
              开始探索
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            发现开发者的社交网络
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            深度分析 GitHub 用户画像、社交关系和技术标签，找到志同道合的开发者
          </p>
          <Button
            onClick={() => setLocation('/explorer')}
            size="lg"
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            立即开始
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* 功能介绍 */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Github className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">用户画像</h3>
            <p className="text-gray-600">
              全面展示 GitHub 用户的核心信息、仓库数据和社交数据
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">🔗</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">社交关系</h3>
            <p className="text-gray-600">
              可视化展示关注/粉丝关系，发现共同关注的开发者
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">智能推荐</h3>
            <p className="text-gray-600">
              基于技术栈和兴趣推荐优质开发者和开源项目
            </p>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
