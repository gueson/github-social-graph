import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Footer } from '@/components/Footer';

export default function Privacy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            onClick={() => setLocation('/')}
            variant="ghost"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">隐私政策</h1>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 隐私政策介绍</h2>
              <p className="text-gray-600 mb-2">
                GitHub社交图谱非常重视用户隐私保护。本隐私政策描述了我们如何收集、使用、存储和保护您的个人信息。
              </p>
              <p className="text-gray-600">
                请仔细阅读本隐私政策，了解我们的隐私实践。如果您对本隐私政策有任何疑问，请联系我们。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 我们收集的信息</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">2.1 自动收集的信息</h3>
                  <p className="text-gray-600">
                    当您访问我们的网站时，我们可能会通过第三方分析工具（如Umami Analytics）自动收集以下信息：
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                    <li>IP地址（已匿名化处理，仅用于地理位置统计）</li>
                    <li>浏览器类型和版本</li>
                    <li>操作系统类型和版本</li>
                    <li>访问时间和日期</li>
                    <li>访问的页面</li>
                    <li>引荐来源</li>
                  </ul>
                  <p className="text-gray-600 mt-2">
                    这些信息仅用于分析网站流量和用户行为，帮助我们改进服务质量，不会用于识别特定个人。我们使用的分析工具注重隐私保护，不会收集任何个人身份信息。
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-1">2.2 主动提供的信息</h3>
                  <p className="text-gray-600">
                    当您使用我们的服务时，您可能会主动提供以下信息：
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                    <li>GitHub用户名</li>
                    <li>GitHub API令牌（可选）</li>
                    <li>收藏的开发者和仓库</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 我们如何使用收集的信息</h2>
              <p className="text-gray-600 mb-2">
                我们收集的信息用于以下目的：
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                <li>提供、维护和改进我们的服务</li>
                <li>分析网站流量和用户行为模式</li>
                <li>优化用户体验和网站性能</li>
                <li>检测和防止欺诈、滥用或其他非法活动</li>
                <li>遵守适用的法律、法规和监管要求</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 信息共享和披露</h2>
              <p className="text-gray-600 mb-2">
                我们严格保护您的隐私，不会向第三方出售、出租或共享您的个人信息，除非：
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                <li>您明确同意或授权</li>
                <li>法律要求、法院命令或政府监管机构要求</li>
                <li>为了保护我们的权利、财产或安全，或他人的权利、财产或安全</li>
                <li>与我们的服务提供商共享，且这些提供商仅能在为我们提供服务的范围内使用您的信息</li>
              </ul>
              <p className="text-gray-600 mt-2">
                目前，我们使用以下第三方服务提供商来分析网站流量：
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                <li>Umami Analytics：采用隐私优先的设计，不会收集任何个人身份信息，且所有数据均已匿名化处理</li>
                <li>Vercel Web Analytics：由我们的托管提供商Vercel提供，用于分析网站性能和访问数据，所有数据均已匿名化处理</li>
                <li>Microsoft Clarity：用于收集用户交互数据和行为分析，帮助我们改进网站体验，所有数据均已匿名化处理</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. 信息安全</h2>
              <p className="text-gray-600">
                我们采取合理的安全措施保护您的个人信息，防止未经授权的访问、使用、披露或修改。这些措施包括但不限于：
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                <li>数据加密传输和存储</li>
                <li>访问控制和身份验证</li>
                <li>定期安全审计和漏洞扫描</li>
                <li>员工数据安全培训</li>
              </ul>
              <p className="text-gray-600 mt-2">
                然而，没有任何安全措施是绝对安全的，我们不能保证您的信息完全安全。如果发生数据泄露，我们将按照适用法律要求及时通知您。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. 数据保留</h2>
              <p className="text-gray-600">
                我们仅在必要的时间内保留您的个人信息，以实现本隐私政策中所述的目的，或遵守适用的法律、法规和监管要求。
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                <li>自动收集的匿名化数据（如流量分析数据）：保留12个月</li>
                <li>您主动提供的信息（如GitHub用户名）：在您使用我们的服务期间保留，或根据法律要求保留</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. 您的权利</h2>
              <p className="text-gray-600">
                根据适用的隐私法律，您可能享有以下权利：
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                <li>访问您的个人信息</li>
                <li>更正或更新您的个人信息</li>
                <li>删除您的个人信息</li>
                <li>限制或反对我们处理您的个人信息</li>
                <li>数据可携带权（如果适用）</li>
                <li>撤回同意（如果我们基于您的同意处理您的信息）</li>
              </ul>
              <p className="text-gray-600 mt-2">
                如果您想行使这些权利，请通过第11节中提供的联系方式联系我们。我们将在适用法律要求的时间内回复您的请求。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Cookie政策</h2>
              <p className="text-gray-600">
                我们的网站目前不使用任何Cookie或类似的跟踪技术。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. 隐私政策的变更</h2>
              <p className="text-gray-600">
                我们可能会不时更新本隐私政策。当我们更新隐私政策时，我们会在网站上发布更新后的版本，并更新底部的"最后更新日期"。我们鼓励您定期查看本隐私政策，了解我们的隐私实践。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. 联系我们</h2>
              <p className="text-gray-600">
                如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：
              </p>
              <div className="mt-2 text-gray-600">
                <p>邮箱：y_xk1990@126.com</p>
                <p>GitHub：https://github.com/gueson/github-social-graph</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. 最后更新日期</h2>
              <p className="text-gray-600">
                本隐私政策最后更新于：2026年1月18日
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}