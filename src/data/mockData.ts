import { MiniProgramCard, BlindBoxSoulmate, CommunityPost } from '../types';

export const DEFAULT_DAXIAN_PHOTO = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80';

export const HERO_DATA = {
  title: '嗨，欢迎来到来了朋友们。',
  subtitle: '在这里，大仙帮你用 MBTI 看见自己，用同频连接彼此。',
  image: DEFAULT_DAXIAN_PHOTO,
  heroBadge: '大仙主理人',
  hostName: '大仙',
  hostTitle: 'MBTI 资深咨询师 / 心理成长引导者',
  hostAvatar: DEFAULT_DAXIAN_PHOTO,
};

export const ACTION_CARDS: MiniProgramCard[] = [
  {
    id: 'private_school',
    title: '大仙私塾',
    subtitle: '一对一深度咨询与成长特训',
    actionText: '立即预约 →',
    targetPage: '/pages/consult/index',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    tag: '1v1 定制',
    color: '#D8D4C2',
  },
  {
    id: 'blind_box',
    title: '挚友盲盒',
    subtitle: '总会遇见那个懂你灵魂的 Ta',
    actionText: '立即开启 →',
    targetPage: '/pages/blindbox/index',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    tag: '灵魂同频',
    color: '#C9D1C8',
  },
  {
    id: 'community',
    title: '同行聚落',
    subtitle: '线上成长专栏与线下轻奢聚会',
    actionText: '探索聚落 →',
    targetPage: '/pages/community/index',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
    tag: '高知圈子',
    color: '#D4CDC5',
  },
];

export const MOCK_SOULMATES: BlindBoxSoulmate[] = [
  {
    id: 'sm_1',
    name: '林初一',
    mbti: 'INFJ 提倡者',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    age: 26,
    city: '上海 · 静安',
    vibe: '理想主义书店常客 / 颂钵冥想',
    matchScore: 98,
    quote: '“渴望深度的对话，胜过千百个浅尝辄止的热闹。”',
    tags: ['哲学思考', '独立咖啡馆', '古典乐', '同频治愈'],
  },
  {
    id: 'sm_2',
    name: '陆青寻',
    mbti: 'INFP 调停者',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    age: 28,
    city: '杭州 · 西湖',
    vibe: '胶片摄影师 / 绿植爱好者',
    matchScore: 95,
    quote: '“在万物生长的间隙，捕捉不经意的温柔灵光。”',
    tags: ['胶片日记', '茶艺', '森林徒步', 'MBTI研讨'],
  },
  {
    id: 'sm_3',
    name: '沈知安',
    mbti: 'ENFJ 主人公',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    age: 29,
    city: '北京 · 朝阳',
    vibe: '创意总监 / 心理疗愈志愿者',
    matchScore: 92,
    quote: '“做一盏照亮同路人的灯，温暖彼此的前行。”',
    tags: ['个人成长', '展览策展', '爵士乐', '深度共情'],
  },
];

export const MOCK_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    title: 'INFJ 与 ENFP 的灵魂碰撞：为什么我们总能在沉默中听懂彼此？',
    category: 'MBTI 深度解析',
    date: '2026-08-25',
    readTime: '6 分钟阅读',
    cover: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
    author: '大仙导师',
    summary: '深度拆解直觉型人格在人际交往中的安全感来源与共振频率。',
    likes: 382,
  },
  {
    id: 'p2',
    title: '「秋日山野轻奢冥想营」招募：3天2夜，与同频伙伴逃离喧嚣',
    category: '线下聚落',
    date: '2026-08-20',
    readTime: '报名中 · 仅限12人',
    cover: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    author: '来了朋友们活动组',
    summary: '在莫干山竹林深处，开启关于自我觉察与真实连接的深度聚落。',
    likes: 521,
  },
];
