export const WECHAT_NATIVE_FILES = {
  wxml: `<!-- pages/index/index.wxml -->
<view class="container">
  <!-- 顶部自定义导航栏 / 标题区域 -->
  <view class="nav-bar">
    <view class="nav-left" bindtap="onOpenDrawer">
      <view class="menu-icon">
        <view class="bar"></view>
        <view class="bar"></view>
        <view class="bar"></view>
      </view>
    </view>
    <view class="nav-title">来了朋友们</view>
    <view class="nav-right" bindtap="onViewProfile">
      <image class="avatar" src="{{userInfo.avatarUrl}}" mode="aspectFill" />
    </view>
  </view>

  <!-- 主滚动区域 -->
  <scroll-view scroll-y class="main-content" enable-flex>
    <!-- 顶部 Hero 形象大卡片 -->
    <view class="hero-card" bindtap="onHeroTap">
      <image class="hero-image" src="{{heroData.imageUrl}}" mode="aspectFill" />
      <view class="hero-gradient-mask"></view>
      <view class="hero-content">
        <text class="hero-title">{{heroData.title}}</text>
        <text class="hero-subtitle">{{heroData.subtitle}}</text>
      </view>
    </view>

    <!-- 核心功能入口卡片列表 -->
    <view class="cards-list">
      <block wx:for="{{actionCards}}" wx:key="id">
        <view class="action-card" bindtap="onCardTap" data-item="{{item}}">
          <!-- 左侧文字信息区 -->
          <view class="card-left">
            <text class="card-title">{{item.title}}</text>
            <text class="card-desc">{{item.desc}}</text>
            <view class="card-action">
              <text class="action-text">{{item.actionText}}</text>
            </view>
          </view>
          <!-- 右侧卡片配图区 -->
          <view class="card-right">
            <image wx:if="{{item.imageUrl}}" class="card-img" src="{{item.imageUrl}}" mode="aspectFill" />
            <view wx:else class="card-img-placeholder">
              <text class="placeholder-text">img</text>
            </view>
          </view>
        </view>
      </block>
    </view>
  </scroll-view>

  <!-- 底部自定义 TabBar (若使用原生 tabBar 可配置在 app.json 中) -->
  <view class="tab-bar">
    <view 
      class="tab-item {{currentTab === 'index' ? 'active' : ''}}" 
      bindtap="switchTab" 
      data-tab="index"
    >
      <image class="tab-icon" src="{{currentTab === 'index' ? '/images/tab_home_active.png' : '/images/tab_home.png'}}" />
      <text class="tab-label">首页</text>
    </view>

    <view 
      class="tab-item {{currentTab === 'blindbox' ? 'active' : ''}}" 
      bindtap="switchTab" 
      data-tab="blindbox"
    >
      <image class="tab-icon" src="{{currentTab === 'blindbox' ? '/images/tab_box_active.png' : '/images/tab_box.png'}}" />
      <text class="tab-label">挚友盲盒</text>
    </view>

    <view 
      class="tab-item {{currentTab === 'community' ? 'active' : ''}}" 
      bindtap="switchTab" 
      data-tab="community"
    >
      <image class="tab-icon" src="{{currentTab === 'community' ? '/images/tab_community_active.png' : '/images/tab_community.png'}}" />
      <text class="tab-label">同行聚落</text>
    </view>

    <view 
      class="tab-item {{currentTab === 'profile' ? 'active' : ''}}" 
      bindtap="switchTab" 
      data-tab="profile"
    >
      <image class="tab-icon" src="{{currentTab === 'profile' ? '/images/tab_user_active.png' : '/images/tab_user.png'}}" />
      <text class="tab-label">个人中心</text>
    </view>
  </view>
</view>`,

  wxss: `/* pages/index/index.wxss */
page {
  background-color: #F7F5F0;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", serif;
  color: #2C2C2C;
  height: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  background-color: #F7F5F0;
}

/* 顶部导航栏 */
.nav-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 40rpx 20rpx 40rpx;
  background-color: #F7F5F0;
  z-index: 10;
}

.nav-left {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.menu-icon {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 36rpx;
  height: 24rpx;
}

.menu-icon .bar {
  width: 100%;
  height: 4rpx;
  background-color: #4A4A48;
  border-radius: 2rpx;
}

.nav-title {
  font-size: 38rpx;
  font-weight: 500;
  letter-spacing: 2rpx;
  color: #5C5642;
  font-family: "PingFang SC", serif;
}

.nav-right {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.avatar {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  border: 2rpx solid #E0DBD0;
}

/* 主滚动区域 */
.main-content {
  flex: 1;
  padding: 10rpx 36rpx 40rpx 36rpx;
  box-sizing: border-box;
  overflow-y: scroll;
}

/* 顶部 Hero 形象大卡片 */
.hero-card {
  position: relative;
  width: 100%;
  height: 720rpx;
  border-radius: 40rpx;
  overflow: hidden;
  margin-bottom: 36rpx;
  box-shadow: 0 12rpx 36rpx rgba(99, 95, 64, 0.08);
}

.hero-image {
  width: 100%;
  height: 100%;
  display: block;
}

.hero-gradient-mask {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 55%;
  background: linear-gradient(180deg, rgba(30, 30, 28, 0) 0%, rgba(30, 30, 28, 0.85) 100%);
}

.hero-content {
  position: absolute;
  left: 44rpx;
  right: 44rpx;
  bottom: 44rpx;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.hero-title {
  font-size: 42rpx;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1.4;
  margin-bottom: 18rpx;
  letter-spacing: 1rpx;
}

.hero-subtitle {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-weight: 300;
}

/* 核心功能入口卡片列表 */
.cards-list {
  display: flex;
  flex-direction: column;
  gap: 28rpx;
}

.action-card {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background-color: #FFFFFF;
  border-radius: 36rpx;
  padding: 36rpx;
  box-shadow: 0 8rpx 24rpx rgba(178, 172, 136, 0.08);
  box-sizing: border-box;
}

.card-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 24rpx;
}

.card-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #2D2C28;
  margin-bottom: 12rpx;
}

.card-desc {
  font-size: 24rpx;
  color: #7A786E;
  line-height: 1.5;
  margin-bottom: 24rpx;
}

.card-action {
  display: flex;
  align-items: center;
}

.action-text {
  font-size: 26rpx;
  font-weight: 500;
  color: #635F40;
  letter-spacing: 1rpx;
}

.card-right {
  width: 200rpx;
  height: 180rpx;
  flex-shrink: 0;
  border-radius: 28rpx;
  overflow: hidden;
  background-color: #E2DFD8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-img {
  width: 100%;
  height: 100%;
}

.card-img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #CBC7BD;
}

.placeholder-text {
  font-size: 24rpx;
  color: #55534B;
  font-style: italic;
}

/* 底部 TabBar */
.tab-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 120rpx;
  background-color: #FAF9F6;
  border-top: 1rpx solid #EBE7DC;
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: content-box;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.tab-icon {
  width: 44rpx;
  height: 44rpx;
  margin-bottom: 6rpx;
}

.tab-label {
  font-size: 20rpx;
  color: #8C887B;
}

.tab-item.active .tab-label {
  color: #635F40;
  font-weight: 600;
}`,

  js: `// pages/index/index.js
Page({
  data: {
    currentTab: 'index',
    userInfo: {
      avatarUrl: '/images/daxian_avatar.jpg', // 可替换为大仙真实头像
      nickName: '山水客'
    },
    heroData: {
      title: '嗨，欢迎来到来了朋友们。',
      subtitle: '在这里，大仙帮你用 MBTI 看见自己，用同频连接彼此。',
      imageUrl: '/images/daxian_hero.jpg' // 大仙主理人真容海报图
    },
    actionCards: [
      {
        id: 'private_school',
        title: '大仙私塾',
        desc: '一对一深度咨询与成长特训',
        actionText: '立即预约 →',
        path: '/pages/consult/index',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'blind_box',
        title: '挚友盲盒',
        desc: '总会遇见那个懂你灵魂的 Ta',
        actionText: '立即开启 →',
        path: '/pages/blindbox/index',
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'community',
        title: '同行聚落',
        desc: '线上成长专栏与线下轻奢聚会',
        actionText: '立即开启 →',
        path: '/pages/community/index',
        imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },

  onLoad(options) {
    console.log('来了朋友们 首页加载完成');
  },

  onPullDownRefresh() {
    // 模拟下拉刷新
    setTimeout(() => {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '已同步最新数据',
        icon: 'success'
      });
    }, 600);
  },

  onHeroTap() {
    wx.navigateTo({
      url: '/pages/about/index',
      fail: () => {
        wx.showModal({
          title: '关于大仙',
          content: '大仙带你开启 MBTI 认知之旅，找到真正属于你的同频圈子。',
          showCancel: false,
          confirmColor: '#635F40'
        });
      }
    });
  },

  onCardTap(e) {
    const item = e.currentTarget.dataset.item;
    if (item && item.path) {
      wx.navigateTo({
        url: item.path,
        fail: () => {
          wx.showToast({
            title: \`进入 \${item.title}\`,
            icon: 'none'
          });
        }
      });
    }
  },

  onOpenDrawer() {
    wx.showActionSheet({
      itemList: ['关于来了朋友们', '大仙私塾介绍', 'MBTI 测评中心', '联系助教微信'],
      itemColor: '#635F40',
      success(res) {
        console.log('选择菜单:', res.tapIndex);
      }
    });
  },

  onViewProfile() {
    wx.navigateTo({
      url: '/pages/profile/index',
      fail: () => {
        wx.showToast({
          title: '前往个人中心',
          icon: 'none'
        });
      }
    });
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ currentTab: tab });
  }
});`,

  json: `{
  "usingComponents": {},
  "navigationBarTitleText": "来了朋友们",
  "navigationBarBackgroundColor": "#F7F5F0",
  "navigationBarTextStyle": "black",
  "enablePullDownRefresh": true,
  "backgroundColor": "#F7F5F0"
}`,

  appJson: `{
  "pages": [
    "pages/index/index",
    "pages/blindbox/index",
    "pages/community/index",
    "pages/profile/index",
    "pages/consult/index"
  ],
  "window": {
    "backgroundTextStyle": "dark",
    "navigationBarBackgroundColor": "#F7F5F0",
    "navigationBarTitleText": "来了朋友们",
    "navigationBarTextStyle": "black",
    "backgroundColor": "#F7F5F0"
  },
  "tabBar": {
    "color": "#8C887B",
    "selectedColor": "#635F40",
    "backgroundColor": "#FAF9F6",
    "borderStyle": "white",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "images/tab_home.png",
        "selectedIconPath": "images/tab_home_active.png"
      },
      {
        "pagePath": "pages/blindbox/index",
        "text": "挚友盲盒",
        "iconPath": "images/tab_box.png",
        "selectedIconPath": "images/tab_box_active.png"
      },
      {
        "pagePath": "pages/community/index",
        "text": "同行聚落",
        "iconPath": "images/tab_community.png",
        "selectedIconPath": "images/tab_community_active.png"
      },
      {
        "pagePath": "pages/profile/index",
        "text": "个人中心",
        "iconPath": "images/tab_user.png",
        "selectedIconPath": "images/tab_user_active.png"
      }
    ]
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json"
}`,

  appWxss: `/** app.wxss **/
page {
  --primary-color: #635F40;
  --primary-light: #B2AC88;
  --bg-color: #F7F5F0;
  --card-bg: #FFFFFF;
  --text-main: #2D2C28;
  --text-sub: #7A786E;
  background-color: #F7F5F0;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  box-sizing: border-box;
}

view, text, image, navigator {
  box-sizing: border-box;
}`
};
