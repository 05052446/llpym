import React, { useState, useRef } from 'react';
import { 
  Menu, 
  Home, 
  Users, 
  BookOpen, 
  User, 
  Sparkles, 
  ArrowRight, 
  X, 
  Calendar, 
  Clock, 
  Heart, 
  Share2, 
  ChevronRight,
  Compass,
  CheckCircle2,
  Camera,
  Upload,
  RotateCcw,
  Check
} from 'lucide-react';
import { HERO_DATA, ACTION_CARDS, MOCK_SOULMATES, MOCK_POSTS, DEFAULT_DAXIAN_PHOTO } from '../data/mockData';
import { MiniProgramCard, BlindBoxSoulmate, CommunityPost } from '../types';

interface MiniProgramPhoneProps {
  onSelectCodeTab?: (tab: string) => void;
}

export const MiniProgramPhone: React.FC<MiniProgramPhoneProps> = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'blindbox' | 'community' | 'profile'>('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<MiniProgramCard | null>(null);
  const [activeSoulmate, setActiveSoulmate] = useState<BlindBoxSoulmate | null>(null);
  const [isDrawingBlindbox, setIsDrawingBlindbox] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [activeHeroModal, setActiveHeroModal] = useState(false);
  const [photoUploadedTip, setPhotoUploadedTip] = useState(false);

  // 大仙自定义照片状态，支持 localStorage 本地持久化
  const [daxianPhoto, setDaxianPhoto] = useState<string>(() => {
    try {
      return localStorage.getItem('daxian_custom_photo') || DEFAULT_DAXIAN_PHOTO;
    } catch {
      return DEFAULT_DAXIAN_PHOTO;
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          setDaxianPhoto(base64);
          try {
            localStorage.setItem('daxian_custom_photo', base64);
          } catch (err) {
            console.warn('Storage limit exceeded, keeping in memory', err);
          }
          setPhotoUploadedTip(true);
          setTimeout(() => setPhotoUploadedTip(false), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDaxianPhoto(DEFAULT_DAXIAN_PHOTO);
    try {
      localStorage.removeItem('daxian_custom_photo');
    } catch {
      // ignore
    }
  };

  const isCustomPhoto = daxianPhoto !== DEFAULT_DAXIAN_PHOTO;

  const handleCardClick = (card: MiniProgramCard) => {
    setSelectedCard(card);
    if (card.id === 'blind_box') {
      triggerBlindBoxDraw();
    }
  };

  const triggerBlindBoxDraw = () => {
    setIsDrawingBlindbox(true);
    setTimeout(() => {
      const randomMate = MOCK_SOULMATES[Math.floor(Math.random() * MOCK_SOULMATES.length)];
      setActiveSoulmate(randomMate);
      setIsDrawingBlindbox(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[390px]">
      {/* 隐藏的本地图片选择器 */}
      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileUpload} 
      />

      {/* 顶层快捷上传 & 状态指示栏 */}
      <div className="w-full mb-2.5 flex items-center justify-between px-1 text-[11.5px]">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#EAE5D6] hover:bg-[#DFD9C8] border border-[#D5CFBE] rounded-full text-[#4A4637] font-medium transition-all active:scale-95 shadow-xs"
        >
          <Camera className="w-3.5 h-3.5 text-[#635F40]" />
          <span>{isCustomPhoto ? '已生效真实照片 (点击更换)' : '📷 导入大仙照片 (选择本地图片)'}</span>
        </button>

        {isCustomPhoto && (
          <button
            onClick={handleResetPhoto}
            className="flex items-center space-x-1 text-[#8C887B] hover:text-[#4A4637] px-2 py-1 transition-colors text-[11px]"
            title="恢复默认照片"
          >
            <RotateCcw className="w-3 h-3" />
            <span>恢复默认</span>
          </button>
        )}
      </div>

      {photoUploadedTip && (
        <div className="w-full mb-2 bg-[#635F40] text-white text-[11px] py-1.5 px-3 rounded-xl flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center space-x-1.5">
            <Check className="w-3.5 h-3.5 text-[#EFE4C6]" />
            <span>大仙专属照片已成功应用至全部模块！</span>
          </div>
          <button onClick={() => setPhotoUploadedTip(false)} className="text-white/70 hover:text-white">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* 手机真机外壳 */}
      <div className="relative w-full h-[810px] bg-[#F7F5F0] rounded-[48px] shadow-[0_24px_60px_rgba(44,44,40,0.18)] border-[10px] border-[#2C2C28] flex flex-col overflow-hidden select-none">
        {/* 手机顶部灵动岛 / 听筒区域 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-[#2C2C28] rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#1A1A18] mr-2"></div>
          <div className="w-10 h-1.5 rounded-full bg-[#1A1A18]"></div>
        </div>

        {/* 微信状态栏 (Status Bar) */}
        <div className="pt-3 px-6 pb-1 flex justify-between items-center text-[12px] font-semibold text-[#4A4A46] z-40 bg-[#F7F5F0]">
          <span>09:41</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px]">5G</span>
            <div className="w-5 h-2.5 border border-[#4A4A46] rounded-sm p-[1px] flex items-center">
              <div className="w-3 h-full bg-[#4A4A46] rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* 微信导航栏 (WeChat Custom Navigation Bar) */}
        <div className="relative px-5 py-2.5 flex items-center justify-between bg-[#F7F5F0] z-30 border-b border-[#EFECE4]">
          {/* 左侧抽屉菜单按钮 */}
          <button 
            id="btn-nav-menu"
            onClick={() => setDrawerOpen(true)}
            className="p-1.5 -ml-1 text-[#4A4A46] hover:bg-[#EAE6DB] rounded-lg transition-colors active:scale-95"
            title="打开菜单"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* 居中标题：来自原图的优雅衬线体 */}
          <div className="flex items-center space-x-1.5">
            <span className="text-[19px] font-medium tracking-wider text-[#544E3B] font-serif">
              来了朋友们
            </span>
          </div>

          {/* 右侧用户头像 */}
          <button 
            id="btn-nav-avatar"
            onClick={() => setActiveTab('profile')}
            className="relative p-0.5 rounded-full border border-[#D5CFBE] active:scale-95 transition-transform"
            title="个人中心"
          >
            <img 
              src={daxianPhoto} 
              alt="大仙" 
              referrerPolicy="no-referrer"
              onError={(e) => { e.currentTarget.src = DEFAULT_DAXIAN_PHOTO; }}
              className="w-7 h-7 rounded-full object-cover" 
            />
          </button>
        </div>

        {/* 主视图内容区域 */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24 scroll-smooth space-y-4 no-scrollbar">
          {activeTab === 'home' && (
            <>
              {/* 顶部 Hero 形象大卡片 (严格还原原图：圆角、图文层叠、暗色渐变、大标题与副标题) */}
              <div 
                id="hero-banner-card"
                onClick={() => setActiveHeroModal(true)}
                className="relative w-full h-[340px] rounded-[28px] overflow-hidden shadow-sm cursor-pointer group active:scale-[0.99] transition-all bg-[#2C2C28]"
              >
                {/* 背景大图 */}
                <img 
                  src={daxianPhoto} 
                  alt="来了朋友们 - 大仙" 
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = DEFAULT_DAXIAN_PHOTO; }}
                  className="w-full h-full object-cover object-top brightness-95 group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* 优雅暗调渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1E1B]/95 via-[#1F1E1B]/40 to-transparent"></div>

                {/* 卡片左下角文案 */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white flex flex-col justify-end">
                  <h1 className="text-[21px] font-bold leading-snug tracking-wide font-serif mb-2.5 drop-shadow-sm">
                    {HERO_DATA.title}
                  </h1>
                  <p className="text-[13px] text-white/90 font-normal leading-relaxed drop-shadow-sm font-sans">
                    {HERO_DATA.subtitle}
                  </p>
                </div>

                {/* 顶部浮动徽章与快捷上传 */}
                <div className="absolute top-3.5 right-3.5 flex items-center space-x-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="bg-black/40 hover:bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-[10px] text-white/90 border border-white/20 flex items-center space-x-1 active:scale-95 transition-all"
                    title="点击更换大仙照片"
                  >
                    <Camera className="w-3 h-3 text-[#EFE4C6]" />
                    <span>更换照片</span>
                  </button>

                  <div className="bg-black/25 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white/90 border border-white/20 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-[#EFE4C6]" />
                    <span>{HERO_DATA.heroBadge}</span>
                  </div>
                </div>
              </div>

              {/* 核心功能卡片列表 (严格还原原图 3 张圆角卡片布局) */}
              <div className="flex flex-col space-y-3.5 pt-1">
                {ACTION_CARDS.map((card) => (
                  <div 
                    key={card.id}
                    id={`card-${card.id}`}
                    onClick={() => handleCardClick(card)}
                    className="w-full bg-white rounded-[24px] p-4 flex items-center justify-between shadow-[0_4px_16px_rgba(99,95,64,0.05)] border border-[#ECE8DC] active:scale-[0.985] transition-all cursor-pointer hover:border-[#D6CEBC]"
                  >
                    {/* 左侧文字与引导按钮 */}
                    <div className="flex-1 pr-3 flex flex-col justify-between h-[96px]">
                      <div>
                        <h2 className="text-[17px] font-bold text-[#2A2925] tracking-tight mb-1">
                          {card.title}
                        </h2>
                        <p className="text-[12px] text-[#787569] leading-snug">
                          {card.subtitle}
                        </p>
                      </div>
                      
                      <div className="inline-flex items-center text-[13px] font-medium text-[#635F40] group">
                        <span>{card.actionText}</span>
                      </div>
                    </div>

                    {/* 右侧图片展示区 */}
                    <div className="w-[102px] h-[96px] rounded-[18px] bg-[#D7D3C6] overflow-hidden relative flex-shrink-0 flex items-center justify-center shadow-inner">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-[#635F40]/10"></div>
                      <span className="absolute top-1.5 right-1.5 text-[9px] bg-black/40 backdrop-blur-xs text-white px-1.5 py-0.5 rounded-md">
                        {card.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 底部微小留白与品牌寄语 */}
              <div className="text-center pt-2 pb-4">
                <span className="text-[11px] text-[#9E9B8F] tracking-widest uppercase">
                  —— 见自己 · 见天地 · 见同频之友 ——
                </span>
              </div>
            </>
          )}

          {/* 挚友盲盒视图 */}
          {activeTab === 'blindbox' && (
            <div className="flex flex-col items-center pt-4 space-y-4">
              <div className="w-full bg-white rounded-[24px] p-5 shadow-sm border border-[#ECE8DC] text-center">
                <div className="w-14 h-14 mx-auto bg-[#EFECE2] rounded-2xl flex items-center justify-center text-[#635F40] mb-3">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h2 className="text-[18px] font-bold text-[#2C2C28] mb-1 font-serif">挚友盲盒 · 灵魂相遇</h2>
                <p className="text-[12px] text-[#7A776C] leading-relaxed mb-4">
                  总有一个灵魂频率与你完全共振。点击开启，寻找属于你的同频挚友。
                </p>

                <button 
                  id="btn-open-blindbox"
                  disabled={isDrawingBlindbox}
                  onClick={triggerBlindBoxDraw}
                  className="w-full py-3.5 bg-[#635F40] hover:bg-[#524E33] text-white rounded-2xl text-[14px] font-semibold tracking-wide shadow-md transition-all active:scale-98 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isDrawingBlindbox ? '正在同频共振寻找中...' : '开启今日灵魂盲盒'}</span>
                </button>
              </div>

              {activeSoulmate && (
                <div className="w-full bg-white rounded-[24px] p-5 shadow-sm border border-[#ECE8DC] animate-in fade-in zoom-in duration-300">
                  <div className="flex items-center space-x-3.5 mb-3">
                    <img 
                      src={activeSoulmate.avatar} 
                      alt={activeSoulmate.name} 
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#D7D3C6]" 
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[15px] text-[#2C2C28]">{activeSoulmate.name}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EAE6DB] text-[#635F40] font-bold">
                          {activeSoulmate.mbti}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8C887B]">{activeSoulmate.tagline}</span>
                    </div>
                  </div>

                  <div className="bg-[#FAF9F6] p-3.5 rounded-2xl mb-3 border border-[#EFECE4] space-y-1">
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="text-[#635F40] font-semibold">同频契合度</span>
                      <span className="font-bold text-[#635F40]">{activeSoulmate.matchRate}%</span>
                    </div>
                    <p className="text-[12px] text-[#555246] leading-relaxed">
                      {activeSoulmate.bio}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => alert(`已向 ${activeSoulmate.name} 发送同频打招呼信件！`)}
                      className="flex-1 py-2.5 bg-[#635F40] text-white rounded-xl text-[12.5px] font-medium active:scale-95 transition-all"
                    >
                      打个招呼 (发破冰信)
                    </button>
                    <button 
                      onClick={() => setActiveSoulmate(null)}
                      className="px-3.5 py-2.5 bg-[#EAE6DB] text-[#4A4A46] rounded-xl text-[12.5px] font-medium active:scale-95 transition-all"
                    >
                      换一个
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 同行聚落 Tab 视图 */}
          {activeTab === 'community' && (
            <div className="pt-2 space-y-3">
              <div className="px-1 flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#4A4637]">🌿 精选聚落与专栏</span>
                <span className="text-[11px] text-[#8C887B]">每周更新</span>
              </div>

              {MOCK_POSTS.map((post) => (
                <div 
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white rounded-[22px] overflow-hidden border border-[#ECE8DC] shadow-xs cursor-pointer active:scale-98 transition-transform"
                >
                  <img src={post.cover} alt={post.title} referrerPolicy="no-referrer" className="w-full h-28 object-cover" />
                  <div className="p-3.5">
                    <div className="flex items-center justify-between text-[11px] text-[#8A8679] mb-1.5">
                      <span className="bg-[#EFECE2] text-[#635F40] px-2 py-0.5 rounded-full font-medium">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-[14px] text-[#2C2C28] line-clamp-1 mb-1">{post.title}</h3>
                    <p className="text-[12px] text-[#7A776C] line-clamp-2 leading-relaxed">{post.summary}</p>
                    <div className="mt-2.5 pt-2 border-t border-[#F2EFE8] flex items-center justify-between text-[11px] text-[#8A8679]">
                      <span>作者：{post.author}</span>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-[#B2AC88]" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 个人中心 Tab 视图 */}
          {activeTab === 'profile' && (
            <div className="pt-2 space-y-3">
              <div className="bg-white rounded-[24px] p-5 border border-[#ECE8DC] shadow-xs flex items-center space-x-4">
                <img 
                  src={daxianPhoto} 
                  alt="大仙" 
                  referrerPolicy="no-referrer" 
                  onError={(e) => { e.currentTarget.src = DEFAULT_DAXIAN_PHOTO; }}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#B2AC88]" 
                />
                <div>
                  <h3 className="text-[17px] font-bold text-[#2C2C28]">山水客 (我)</h3>
                  <span className="text-[11px] bg-[#EAE5D4] text-[#635F40] px-2.5 py-0.5 rounded-full font-medium inline-block mt-1">
                    INFJ 提倡者 · 旅者
                  </span>
                </div>
              </div>

              {/* 快捷上传相片入口卡片 */}
              <div className="bg-white rounded-[24px] p-4 border border-[#ECE8DC] shadow-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-bold text-[#2C2C28]">大仙肖像定制</span>
                  {isCustomPhoto && (
                    <span className="text-[10px] bg-[#635F40] text-white px-2 py-0.5 rounded-full">已应用自定义照片</span>
                  )}
                </div>
                <p className="text-[11.5px] text-[#7A776C] mb-3">
                  点击下方按钮可选择您电脑中的真实照片文件（如 daxian.jpg），系统将自动应用并持久保存。
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 bg-[#635F40] text-white py-2 rounded-xl text-[12px] font-medium flex items-center justify-center space-x-1.5 active:scale-95 transition-all"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>选择本地照片文件</span>
                  </button>
                  {isCustomPhoto && (
                    <button
                      onClick={handleResetPhoto}
                      className="px-3 py-2 bg-[#EFECE2] text-[#635F40] rounded-xl text-[12px]"
                    >
                      恢复默认
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-4 border border-[#ECE8DC] shadow-xs space-y-3 text-[13px]">
                <div className="flex justify-between items-center py-1.5 border-b border-[#F4F1EA]">
                  <span className="text-[#4A473D]">我的 MBTI 深度档案</span>
                  <span className="text-[#8C887B]">已完成解读 ›</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[#F4F1EA]">
                  <span className="text-[#4A473D]">大仙私塾预约记录</span>
                  <span className="text-[#635F40] font-medium">1 场待开启 ›</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[#F4F1EA]">
                  <span className="text-[#4A473D]">挚友盲盒结识记录</span>
                  <span className="text-[#8C887B]">3 位同频好友 ›</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-[#4A473D]">微信小程序设置</span>
                  <span className="text-[#8C887B]">隐私与授权 ›</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部 TabBar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#FAF9F6] border-t border-[#EAE5D6] px-6 flex justify-around items-center z-40">
          <button 
            id="tab-home"
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-0.5 ${activeTab === 'home' ? 'text-[#635F40]' : 'text-[#9C988B]'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">首页</span>
          </button>

          <button 
            id="tab-blindbox"
            onClick={() => setActiveTab('blindbox')}
            className={`flex flex-col items-center space-y-0.5 ${activeTab === 'blindbox' ? 'text-[#635F40]' : 'text-[#9C988B]'}`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] font-medium">挚友盲盒</span>
          </button>

          <button 
            id="tab-community"
            onClick={() => setActiveTab('community')}
            className={`flex flex-col items-center space-y-0.5 ${activeTab === 'community' ? 'text-[#635F40]' : 'text-[#9C988B]'}`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-medium">同行聚落</span>
          </button>

          <button 
            id="tab-profile"
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center space-y-0.5 ${activeTab === 'profile' ? 'text-[#635F40]' : 'text-[#9C988B]'}`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium">我的</span>
          </button>
        </div>

        {/* 侧边抽屉菜单 */}
        {drawerOpen && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex">
            <div className="w-[78%] h-full bg-[#FAF9F6] p-6 flex flex-col justify-between animate-in slide-in-from-left duration-200">
              <div>
                <div className="flex justify-between items-center mb-5">
                  <span className="text-[18px] font-bold text-[#4A4637] font-serif">来了朋友们</span>
                  <button onClick={() => setDrawerOpen(false)} className="p-1 text-[#8C887B]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 抽屉内主理人速览卡片 */}
                <div 
                  onClick={() => { setActiveHeroModal(true); setDrawerOpen(false); }}
                  className="bg-[#EFECE2] p-3.5 rounded-2xl mb-4 flex items-center space-x-3 cursor-pointer hover:bg-[#E7E2D5] transition-colors"
                >
                  <img 
                    src={daxianPhoto} 
                    alt="大仙" 
                    referrerPolicy="no-referrer" 
                    onError={(e) => { e.currentTarget.src = DEFAULT_DAXIAN_PHOTO; }}
                    className="w-11 h-11 rounded-full object-cover border border-[#B2AC88]" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-[14px] text-[#2C2C28]">{HERO_DATA.hostName}</span>
                      <span className="text-[10px] bg-[#635F40] text-white px-1.5 py-0.2 rounded-full">主理人</span>
                    </div>
                    <p className="text-[11px] text-[#7A776C] truncate mt-0.5">{HERO_DATA.hostTitle}</p>
                  </div>
                </div>

                <div className="space-y-4 text-[14px] text-[#3D3A31]">
                  <div className="p-3 bg-[#EFECE2] rounded-xl text-[12px] text-[#635F40] leading-relaxed">
                    大仙私塾致力于通过 MBTI 心理学工具，重构你的认知模式与人际同频圈。
                  </div>

                  <div className="space-y-2">
                    <button 
                      onClick={() => { setActiveTab('home'); setDrawerOpen(false); }}
                      className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFECE2] text-[13px] font-medium"
                    >
                      🏠 小程序首页
                    </button>
                    <button 
                      onClick={() => { setActiveHeroModal(true); setDrawerOpen(false); }}
                      className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFECE2] text-[13px] font-medium text-[#635F40]"
                    >
                      ✨ 认识主理人大仙
                    </button>
                    <button 
                      onClick={() => { setActiveTab('blindbox'); setDrawerOpen(false); }}
                      className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFECE2] text-[13px] font-medium"
                    >
                      🎁 开启今日盲盒
                    </button>
                    <button 
                      onClick={() => { setActiveTab('community'); setDrawerOpen(false); }}
                      className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#EFECE2] text-[13px] font-medium"
                    >
                      🌿 探索同行聚落
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#8C887B]">
                版本号: WeChat Native v1.0.4
              </div>
            </div>
            <div className="flex-1 h-full" onClick={() => setDrawerOpen(false)}></div>
          </div>
        )}

        {/* 详情或预约弹窗 */}
        {selectedCard && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end">
            <div className="w-full bg-[#FAF9F6] rounded-t-[32px] p-6 max-h-[85%] overflow-y-auto animate-in slide-in-from-bottom duration-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[12px] bg-[#635F40] text-white px-2.5 py-0.5 rounded-full font-medium">
                  {selectedCard.tag}
                </span>
                <button onClick={() => { setSelectedCard(null); setBookedSuccess(false); }} className="p-1 text-[#8C887B]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-[20px] font-bold text-[#2C2C28] font-serif mb-1">
                {selectedCard.title}
              </h2>
              <p className="text-[13px] text-[#7A776C] mb-4">
                {selectedCard.subtitle}
              </p>

              <img src={selectedCard.image} alt={selectedCard.title} referrerPolicy="no-referrer" className="w-full h-36 object-cover rounded-2xl mb-4" />

              {selectedCard.id === 'private_school' && (
                <div className="space-y-3 text-[13px]">
                  <div className="bg-[#EFECE2] p-3.5 rounded-xl space-y-1.5 text-[#4A473D]">
                    <div className="font-bold text-[#2C2C28]">🎯 1v1 私塾特训包含：</div>
                    <p>• 深度 MBTI 原生认知图谱拆解 (60 mins)</p>
                    <p>• 职场卡点与情感亲密关系模型重构</p>
                    <p>• 大仙专属私域答疑社群终身权限</p>
                  </div>

                  {bookedSuccess ? (
                    <div className="p-4 bg-[#635F40] text-white rounded-2xl text-center space-y-1.5 animate-in zoom-in-95 duration-200">
                      <CheckCircle2 className="w-8 h-8 mx-auto text-[#EFE4C6]" />
                      <div className="font-bold text-[15px]">预约申请已提交！</div>
                      <p className="text-[11.5px] text-white/80">大仙助教将在 2 小时内通过微信与您确认时间</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setBookedSuccess(true)}
                      className="w-full bg-[#635F40] text-white py-3 rounded-2xl font-bold text-[14px] shadow-sm hover:bg-[#524E34] active:scale-98 transition-all"
                    >
                      即刻确认预约 (免费体验初诊)
                    </button>
                  )}
                </div>
              )}

              {selectedCard.id !== 'private_school' && (
                <button
                  onClick={() => {
                    if (selectedCard.id === 'blind_box') setActiveTab('blindbox');
                    if (selectedCard.id === 'community') setActiveTab('community');
                    setSelectedCard(null);
                  }}
                  className="w-full bg-[#635F40] text-white py-3 rounded-2xl font-bold text-[14px] shadow-sm"
                >
                  进入该模块体验
                </button>
              )}
            </div>
          </div>
        )}

        {/* 主理人大仙寄语与深度资料弹窗 */}
        {activeHeroModal && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end">
            <div className="w-full bg-[#FAF9F6] rounded-t-[32px] p-6 max-h-[90%] overflow-y-auto animate-in slide-in-from-bottom duration-200">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[12px] bg-[#635F40] text-white px-2.5 py-0.5 rounded-full font-medium">主理人寄语</span>
                  <span className="text-[13px] font-bold text-[#2C2C28]">{HERO_DATA.hostName}</span>
                </div>
                <button onClick={() => setActiveHeroModal(false)} className="p-1 text-[#8C887B]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <img 
                src={daxianPhoto} 
                alt="大仙" 
                referrerPolicy="no-referrer" 
                onError={(e) => { e.currentTarget.src = DEFAULT_DAXIAN_PHOTO; }}
                className="w-full h-48 object-cover object-top rounded-2xl mb-3" 
              />
              <p className="text-[12.5px] text-[#4A473D] leading-relaxed mb-4">
                “很多人以为 MBTI 只是一个简单的 4 个字母测试，但在我眼中，它是我们了解内心原动力的精神地图。愿你在『来了朋友们』，卸下伪装，与真正懂你的人相遇。”
              </p>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setActiveHeroModal(false);
                    setSelectedCard(ACTION_CARDS[0]);
                  }}
                  className="flex-1 bg-[#635F40] text-white py-2.5 rounded-xl font-bold text-[13px]"
                >
                  预约大仙 1v1 咨询
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 bg-[#EFECE2] text-[#635F40] rounded-xl text-[12px] font-medium"
                >
                  更换照片
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
