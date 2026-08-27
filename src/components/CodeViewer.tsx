import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  Terminal, 
  Layers, 
  FileText, 
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { WECHAT_NATIVE_FILES } from '../data/wechatCode';

export const CodeViewer: React.FC = () => {
  const [activeFileTab, setActiveFileTab] = useState<'wxml' | 'wxss' | 'js' | 'json' | 'appJson' | 'appWxss'>('wxml');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const fileTabs = [
    { id: 'wxml', label: 'index.wxml', desc: '首页视图结构 (Flex + 语义标签)', icon: FileCode },
    { id: 'wxss', label: 'index.wxss', desc: '首页样式 (鼠尾草绿 + rpx 响应式)', icon: Layers },
    { id: 'js', label: 'index.js', desc: '首页逻辑与 Mock 数据', icon: Terminal },
    { id: 'json', label: 'index.json', desc: '页面窗口配置', icon: FileText },
    { id: 'appJson', label: 'app.json', desc: '全局路由与 TabBar 配置', icon: FileText },
    { id: 'appWxss', label: 'app.wxss', desc: '全局公共样式与 CSS 变量', icon: Layers },
  ];

  const getActiveCode = () => {
    switch (activeFileTab) {
      case 'wxml': return WECHAT_NATIVE_FILES.wxml;
      case 'wxss': return WECHAT_NATIVE_FILES.wxss;
      case 'js': return WECHAT_NATIVE_FILES.js;
      case 'json': return WECHAT_NATIVE_FILES.json;
      case 'appJson': return WECHAT_NATIVE_FILES.appJson;
      case 'appWxss': return WECHAT_NATIVE_FILES.appWxss;
      default: return '';
    }
  };

  const handleCopy = (code: string, fileName: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(fileName);
    setTimeout(() => {
      setCopiedFile(null);
    }, 2000);
  };

  const handleDownloadAll = () => {
    const filesToDownload = [
      { name: 'pages_index_index.wxml', content: WECHAT_NATIVE_FILES.wxml },
      { name: 'pages_index_index.wxss', content: WECHAT_NATIVE_FILES.wxss },
      { name: 'pages_index_index.js', content: WECHAT_NATIVE_FILES.js },
      { name: 'pages_index_index.json', content: WECHAT_NATIVE_FILES.json },
      { name: 'app.json', content: WECHAT_NATIVE_FILES.appJson },
      { name: 'app.wxss', content: WECHAT_NATIVE_FILES.appWxss },
    ];

    // Single export helper
    filesToDownload.forEach((file, index) => {
      setTimeout(() => {
        const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, index * 150);
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#1E1E1C] rounded-[24px] overflow-hidden border border-[#383733] shadow-2xl text-[#E5E2D9]">
      {/* 顶部工具栏与文件切换 Tab */}
      <div className="bg-[#272624] px-4 py-3 border-b border-[#3A3834] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-[#E57373]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFD54F]"></div>
            <div className="w-3 h-3 rounded-full bg-[#81C784]"></div>
          </div>
          <span className="text-[13px] font-medium text-[#C8C4B7]">微信小程序原生代码生成器</span>
          <span className="text-[10px] bg-[#635F40] text-[#EFE4C6] px-2 py-0.5 rounded-full font-mono">
            WeChat Native
          </span>
        </div>

        {/* 复制与下载按钮 */}
        <div className="flex items-center space-x-2">
          <button
            id="btn-copy-current-file"
            onClick={() => handleCopy(getActiveCode(), activeFileTab)}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#3B3A36] hover:bg-[#4D4B46] text-[#E8E4D9] rounded-lg text-[12px] font-medium transition-colors border border-[#52504A] active:scale-95"
          >
            {copiedFile === activeFileTab ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#81C784]" />
                <span className="text-[#81C784]">已复制该文件</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>复制代码</span>
              </>
            )}
          </button>

          <button
            id="btn-download-all"
            onClick={handleDownloadAll}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#635F40] hover:bg-[#524E33] text-white rounded-lg text-[12px] font-medium transition-colors shadow-sm active:scale-95"
            title="一键下载所有源码文件"
          >
            <Download className="w-3.5 h-3.5" />
            <span>下载源码</span>
          </button>
        </div>
      </div>

      {/* 文件选择标签条 */}
      <div className="bg-[#22211F] px-3 pt-2 flex space-x-1 overflow-x-auto border-b border-[#35332F] no-scrollbar">
        {fileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFileTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-file-${tab.id}`}
              onClick={() => setActiveFileTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-t-lg text-[12px] font-mono transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-[#1E1E1C] text-[#EFE4C6] border-t-2 border-[#B2AC88] font-bold'
                  : 'text-[#9C988D] hover:text-[#D5D1C4] hover:bg-[#2A2926]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 代码展示视窗 */}
      <div className="flex-1 overflow-auto p-4 bg-[#1E1E1C] font-mono text-[12.5px] leading-relaxed relative selection:bg-[#635F40] selection:text-white">
        <pre className="text-[#D8D4C8] whitespace-pre font-mono">
          <code>{getActiveCode()}</code>
        </pre>
      </div>

      {/* 底部使用指引与微信开发者工具快速上手提示 */}
      <div className="bg-[#252422] p-4 border-t border-[#383733] text-[12px] text-[#A6A296] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-[#B2AC88] flex-shrink-0" />
          <span>
            <strong>微信开发者工具使用说明：</strong> 新建小程序项目后，将对应代码粘贴至 <code className="text-[#E5D3B3] bg-[#33322E] px-1 py-0.5 rounded">pages/index/</code> 目录下即可运行。
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-[#8C887B]">
          <span>主色调: <span className="text-[#B2AC88]">#635F40 (Sage Green)</span></span>
          <span>布局: <span className="text-[#E5D3B3]">Flexbox + rpx</span></span>
        </div>
      </div>
    </div>
  );
};
