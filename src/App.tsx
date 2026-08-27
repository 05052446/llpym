import React, { useState } from 'react';
import { 
  Smartphone, 
  Code2, 
  SplitSquareVertical, 
  Sparkles, 
  Layers, 
  Check, 
  Copy, 
  ExternalLink,
  BookOpen,
  Image as ImageIcon,
  Palette,
  ShieldCheck,
  Send
} from 'lucide-react';
import { MiniProgramPhone } from './components/MiniProgramPhone';
import { CodeViewer } from './components/CodeViewer';
import { HERO_DATA, ACTION_CARDS } from './data/mockData';
import { WECHAT_NATIVE_FILES } from './data/wechatCode';

export default function App() {
  const [viewMode, setViewMode] = useState<'split' | 'preview' | 'code'>('split');
  const [quickCopied, setQuickCopied] = useState<string | null>(null);

  const handleQuickCopy = (type: 'wxml' | 'wxss' | 'js', code: string) => {
    navigator.clipboard.writeText(code);
    setQuickCopied(type);
    setTimeout(() => setQuickCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#2C2C28] flex flex-col font-sans selection:bg-[#635F40] selection:text-white">
      {/* 顶部主导航栏 */}
      <header className="bg-[#FAF9F6] border-b border-[#E5E1D4] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#635F40] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5 text-[#EFE4C6]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-[17px] font-bold text-[#2C2C28] tracking-tight font-serif">
                  来了朋友们 · 微信原生小程序首页
                </h1>
                <span className="text-[11px] bg-[#EAE5D4] text-[#635F40] px-2 py-0.5 rounded-full font-medium">
                  WeChat Native v1.0
                </span>
              </div>
              <p className="text-[12px] text-[#7A776C]">
                鼠尾草绿质感设计 · Flex 弹性布局 · WXML / WXSS / JS 原生代码已就绪
              </p>
            </div>
          </div>

          {/* 视图模式切换器 */}
          <div className="flex items-center bg-[#EFECE2] p-1 rounded-xl border border-[#DDD8C9] space-x-1">
            <button
              id="mode-split"
              onClick={() => setViewMode('split')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                viewMode === 'split'
                  ? 'bg-white text-[#2C2C28] shadow-sm'
                  : 'text-[#6B685B] hover:text-[#2C2C28]'
              }`}
            >
              <SplitSquareVertical className="w-4 h-4 text-[#635F40]" />
              <span className="hidden sm:inline">对照视图</span>
            </button>

            <button
              id="mode-preview"
              onClick={() => setViewMode('preview')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                viewMode === 'preview'
                  ? 'bg-white text-[#2C2C28] shadow-sm'
                  : 'text-[#6B685B] hover:text-[#2C2C28]'
              }`}
            >
              <Smartphone className="w-4 h-4 text-[#635F40]" />
              <span>小程序真机预览</span>
            </button>

            <button
              id="mode-code"
              onClick={() => setViewMode('code')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                viewMode === 'code'
                  ? 'bg-white text-[#2C2C28] shadow-sm'
                  : 'text-[#6B685B] hover:text-[#2C2C28]'
              }`}
            >
              <Code2 className="w-4 h-4 text-[#635F40]" />
              <span>代码查看器</span>
            </button>
          </div>
        </div>
      </header>

      {/* 快捷复制代码栏 */}
      <section className="bg-[#EFECE2]/70 border-b border-[#E2DDD0] px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[12px]">
          <div className="flex items-center space-x-2 text-[#5E5B4F]">
            <ShieldCheck className="w-4 h-4 text-[#635F40]" />
            <span>可直接复制并在微信开发者工具中一键运行：</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuickCopy('wxml', WECHAT_NATIVE_FILES.wxml)}
              className="flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-[#FAF9F6] border border-[#D5CFC0] rounded-lg text-[11px] font-medium text-[#444238] active:scale-95 transition-all"
            >
              {quickCopied === 'wxml' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#635F40]" />}
              <span>复制 index.wxml</span>
            </button>

            <button
              onClick={() => handleQuickCopy('wxss', WECHAT_NATIVE_FILES.wxss)}
              className="flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-[#FAF9F6] border border-[#D5CFC0] rounded-lg text-[11px] font-medium text-[#444238] active:scale-95 transition-all"
            >
              {quickCopied === 'wxss' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#635F40]" />}
              <span>复制 index.wxss</span>
            </button>

            <button
              onClick={() => handleQuickCopy('js', WECHAT_NATIVE_FILES.js)}
              className="flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-[#FAF9F6] border border-[#D5CFC0] rounded-lg text-[11px] font-medium text-[#444238] active:scale-95 transition-all"
            >
              {quickCopied === 'js' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#635F40]" />}
              <span>复制 index.js</span>
            </button>
          </div>
        </div>
      </section>

      {/* 主体工作区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 左侧：手机真机模拟器 */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="mb-3 text-center">
                <span className="text-[13px] font-bold text-[#4A4637] font-serif">
                  🎨 原型效果渲染预览 (可点击交互)
                </span>
                <p className="text-[11px] text-[#7A776C]">
                  已严格根据上传设计图还原：鼠尾草绿色彩体系、圆角卡片、排版与留白比例
                </p>
              </div>
              <MiniProgramPhone />
            </div>

            {/* 右侧：代码查看器与设计规范速查 */}
            <div className="lg:col-span-7 flex flex-col space-y-5 h-[840px]">
              <div className="flex-1 min-h-[500px]">
                <CodeViewer />
              </div>

              {/* 设计规范与热链接卡片 */}
              <div className="bg-[#FAF9F6] p-5 rounded-[22px] border border-[#E5E0D2] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[#4A4637]">
                    <Palette className="w-4 h-4 text-[#635F40]" />
                    <span className="text-[13.5px] font-bold">设计系统参数 (Design Specs)</span>
                  </div>
                  <span className="text-[11px] text-[#8C887B]">符合微信小程序规范 (750rpx)</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11.5px]">
                  <div className="bg-white p-3 rounded-xl border border-[#ECE7DA]">
                    <span className="text-[#8C887B] block mb-1">主色调 (Primary)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-md bg-[#635F40]"></div>
                      <span className="font-mono font-bold text-[#2C2C28]">#635F40</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-[#ECE7DA]">
                    <span className="text-[#8C887B] block mb-1">辅色调 (Sage Light)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-md bg-[#B2AC88]"></div>
                      <span className="font-mono font-bold text-[#2C2C28]">#B2AC88</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-[#ECE7DA]">
                    <span className="text-[#8C887B] block mb-1">底色 (Surface)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-md bg-[#F7F5F0] border border-[#D5D0C2]"></div>
                      <span className="font-mono font-bold text-[#2C2C28]">#F7F5F0</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-[#ECE7DA]">
                    <span className="text-[#8C887B] block mb-1">卡片圆角 (Radius)</span>
                    <span className="font-bold text-[#2C2C28] block mt-0.5">36rpx - 40rpx</span>
                  </div>
                </div>

                {/* 图片资源热链接 */}
                <div className="border-t border-[#EAE5D7] pt-3 flex flex-wrap items-center justify-between gap-2 text-[11.5px]">
                  <div className="flex items-center space-x-1.5 text-[#5C594C]">
                    <ImageIcon className="w-3.5 h-3.5 text-[#635F40]" />
                    <span><strong>图片热链接：</strong>支持直接从 CDN 或本工程图片资源加载</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[#635F40]">
                    <a href={HERO_DATA.image} target="_blank" rel="noreferrer" className="hover:underline flex items-center space-x-0.5">
                      <span>Hero图</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    {ACTION_CARDS.map(c => (
                      <a key={c.id} href={c.image} target="_blank" rel="noreferrer" className="hover:underline flex items-center space-x-0.5">
                        <span>{c.title}图</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'preview' && (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="mb-4 text-center max-w-md">
              <h2 className="text-[20px] font-bold text-[#2C2C28] font-serif mb-1">
                微信原生小程序真机体验
              </h2>
              <p className="text-[13px] text-[#7A776C]">
                支持点击卡片弹出预约、抽取灵魂盲盒、浏览同行聚落以及切换底部 TabBar。
              </p>
            </div>
            <MiniProgramPhone />
          </div>
        )}

        {viewMode === 'code' && (
          <div className="h-[760px]">
            <CodeViewer />
          </div>
        )}
      </main>

      {/* 底部版权与说明 */}
      <footer className="bg-[#FAF9F6] border-t border-[#E5E1D4] py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-[12px] text-[#8C887B]">
          © 2026 来了朋友们 · 微信原生小程序前端交付套件 · 纯原生 WXML / WXSS / JS (无外部重型依赖)
        </div>
      </footer>
    </div>
  );
}
