import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">服务条款</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            欢迎使用 GitHub 社交图谱服务。这些服务条款（"条款"）规定了您使用我们的网站和服务时的权利和义务。
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 接受条款</h2>
            <p className="text-gray-600 mb-4">
              访问或使用我们的服务，即表示您同意受这些条款的约束。如果您不同意这些条款的任何部分，您不得访问或使用我们的服务。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 服务说明</h2>
            <p className="text-gray-600 mb-4">
              GitHub 社交图谱是一个允许用户分析 GitHub 用户画像、社交关系和技术标签的平台。我们的服务包括但不限于：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>GitHub 用户探索</li>
              <li>共同连接分析</li>
              <li>开发者推荐</li>
              <li>组件展示</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 用户责任</h2>
            <p className="text-gray-600 mb-4">
              您同意在使用我们的服务时遵守所有适用的法律和法规。您不得：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>违反任何法律法规</li>
              <li>侵犯他人的知识产权</li>
              <li>上传或传播任何恶意软件</li>
              <li>干扰或破坏我们的服务</li>
              <li>收集或存储其他用户的个人信息</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 知识产权</h2>
            <p className="text-gray-600 mb-4">
              我们的服务和所有相关内容（包括但不限于文本、图形、徽标、图像、视频和软件）均为我们或我们的许可方的知识产权。您不得复制、修改、分发、销售或租赁我们服务的任何部分，除非得到我们的明确书面许可。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 免责声明</h2>
            <p className="text-gray-600 mb-4">
              我们的服务按"原样"提供，不附带任何明示或暗示的保证。我们不保证：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>服务将不间断、及时、安全或无错误</li>
              <li>服务的结果将是准确或可靠的</li>
              <li>服务的质量将符合您的期望</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 责任限制</h2>
            <p className="text-gray-600 mb-4">
              在法律允许的最大范围内，我们不对任何间接、偶然、特殊、后果性或惩罚性损害承担责任，包括但不限于利润损失、数据损失或其他无形损失，即使我们已被告知此类损害的可能性。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 条款修改</h2>
            <p className="text-gray-600 mb-4">
              我们保留随时修改这些条款的权利。我们将通过在网站上发布修改后的条款来通知您。修改后的条款将在发布后立即生效。您继续使用我们的服务即表示您接受修改后的条款。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. 终止</h2>
            <p className="text-gray-600 mb-4">
              我们保留随时终止或暂停您访问我们服务的权利，无需事先通知或承担责任，原因包括但不限于您违反这些条款。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. 适用法律</h2>
            <p className="text-gray-600 mb-4">
              这些条款受中华人民共和国法律管辖，不考虑其法律冲突规定。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. 联系我们</h2>
            <p className="text-gray-600 mb-4">
              如果您对这些条款有任何疑问，请通过以下方式联系我们：
            </p>
            <p className="text-gray-600">
              电子邮件：y_xk1990@126.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;