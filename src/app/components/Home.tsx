import { ChevronRight, Play, Pause, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import {
  demoUser,
  topCoins,
  scheduledPosts as initialPosts,
  newPostTemplates,
  autoPostTimes,
  todayStats as todayStatsData,
  revenueSeries,
} from "../data";
import { DEMO_NOW, formatDotDate, formatLongDate } from "../utils/date";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";

interface HomeProps {
  onNavigate: (screen: string) => void;
  onApprove: (id: number) => void;
  onOpenEditPost?: (post: any) => void;
}

export function Home({ onNavigate, onApprove, onOpenEditPost }: HomeProps) {
  const [isAutomationActive, setIsAutomationActive] = useState(true);
  const [scheduledPosts, setScheduledPosts] = useState(initialPosts);

  const [completedCount, setCompletedCount] = useState(todayStatsData.postedCount);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [postingId, setPostingId] = useState<number | null>(null);

  const userProfile = demoUser;

  const todayStats = {
    scheduled: scheduledPosts.length,
    posted: completedCount,
    totalRevenue: todayStatsData.totalRevenue,
    avgEngagement: todayStatsData.avgEngagement,
  };

  // Auto-add new posts when automation is active
  useEffect(() => {
    if (!isAutomationActive) return;

    const interval = setInterval(() => {
      const randomTemplate = newPostTemplates[Math.floor(Math.random() * newPostTemplates.length)];
      const newId = Date.now();
      const randomTime = autoPostTimes[Math.floor(Math.random() * autoPostTimes.length)];

      const newPost = {
        id: newId,
        ...randomTemplate,
        scheduledTime: randomTime,
        status: "scheduled",
        eta: `${Math.floor(Math.random() * 40) + 10}분 후`,
        date: formatDotDate(DEMO_NOW),
      };

      setScheduledPosts(prev => [...prev, newPost]);
    }, 15000); // Add new post every 15 seconds

    return () => clearInterval(interval);
  }, [isAutomationActive]);

  const handleToggleAutomation = () => {
    setIsAutomationActive(!isAutomationActive);
  };

  const handleCancel = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setScheduledPosts(prev => prev.filter(post => post.id !== id));
      setRemovingId(null);
    }, 300);
  };

  const handleEdit = (post: any) => {
    if (onOpenEditPost) {
      onOpenEditPost(post);
    }
  };

  const handlePostNow = (id: number) => {
    setPostingId(id);
    
    setTimeout(() => {
      setScheduledPosts(prev => prev.filter(post => post.id !== id));
      setCompletedCount(prev => prev + 1);
      setPostingId(null);
      onApprove(id);
    }, 800);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      {/* Profile Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-5 pt-14 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center overflow-hidden">
              <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full" />
            </div>
            <div>
              <p className="ios-headline text-[#111827]">{userProfile.name}</p>
              <p className="ios-caption-1 text-[#6B7280]">{userProfile.handle} · {userProfile.followers}</p>
            </div>
          </div>
          <button 
            onClick={handleToggleAutomation}
            className={`px-4 py-2 rounded-full ios-button-primary transition-all ${
              isAutomationActive ? 'bg-[#FF3B30]' : 'bg-[#007AFF]'
            }`}
          >
            <div className="flex items-center gap-1.5">
              {isAutomationActive ? (
                <>
                  <Pause className="w-4 h-4 text-white" fill="white" />
                  <span className="ios-footnote text-white" style={{ fontWeight: 600 }}>정지</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-white" fill="white" />
                  <span className="ios-footnote text-white" style={{ fontWeight: 600 }}>시작</span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Status Bar */}
        <div className="bg-white px-5 py-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-all ${isAutomationActive ? 'status-active' : 'status-paused'}`}></div>
            <span className="ios-subhead text-[#6B7280]">
              {isAutomationActive ? `자동 포스팅 활성화 · ${formatDotDate(DEMO_NOW)}` : '일시 정지됨'}
            </span>
          </div>
        </div>

        {/* Today Stats */}
        <div className="px-5 pt-5 pb-4">
          <div className="ios-card">
            <div className="px-4 py-3.5 border-b border-[#E5E7EB]">
              <p className="ios-headline text-[#111827]">오늘 요약</p>
              <p className="ios-caption-1 text-[#8E8E93] mt-0.5">{formatLongDate(DEMO_NOW)}</p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-[#E5E7EB]">
              <div className="p-4">
                <p className="ios-caption-1 text-[#6B7280] mb-1">예약 대기</p>
                <p className="ios-title-2 text-[#111827] transition-all" style={{ fontWeight: 600 }}>{todayStats.scheduled}</p>
              </div>
              <div className="p-4">
                <p className="ios-caption-1 text-[#6B7280] mb-1">완료</p>
                <p className="ios-title-2 text-[#111827] transition-all" style={{ fontWeight: 600 }}>{todayStats.posted}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-[#E5E7EB] border-t border-[#E5E7EB]">
              <div className="p-4">
                <p className="ios-caption-1 text-[#6B7280] mb-1">총 수익</p>
                <p className="ios-body text-[#34C759]" style={{ fontWeight: 600 }}>{todayStats.totalRevenue}</p>
              </div>
              <div className="p-4">
                <p className="ios-caption-1 text-[#6B7280] mb-1">평균 인게이지먼트</p>
                <p className="ios-body text-[#007AFF]" style={{ fontWeight: 600 }}>{todayStats.avgEngagement}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Revenue Chart */}
        <div className="px-5 pb-4">
          <div className="ios-card p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="ios-headline text-[#111827]">주간 수익 추이</p>
              <span className="ios-caption-1 text-[#34C759]" style={{ fontWeight: 600 }}>+18.2%</span>
            </div>
            <p className="ios-caption-1 text-[#8E8E93] mb-3">최근 7일 · 야핑 보상 ($)</p>
            <div className="h-[150px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueSeries} margin={{ top: 6, right: 6, left: 6, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#007AFF" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#007AFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "#8E8E93" }}
                    dy={4}
                  />
                  <Tooltip
                    cursor={{ stroke: "#007AFF", strokeWidth: 1, strokeDasharray: "3 3" }}
                    contentStyle={{
                      borderRadius: 12,
                      border: "none",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      fontSize: 12,
                      padding: "8px 12px",
                    }}
                    labelStyle={{ color: "#8E8E93", fontSize: 11, marginBottom: 2 }}
                    formatter={(value: any) => [`$${value}`, "수익"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#007AFF"
                    strokeWidth={2.5}
                    fill="url(#revFill)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#007AFF" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Coins */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-3 px-0.5">
            <h2 className="ios-headline text-[#111827]">인기 코인</h2>
            <span className="ios-caption-1 text-[#8E8E93]">실시간 업데이트</span>
          </div>
          <div className="ios-card">
            {topCoins.map((coin, idx) => (
              <div key={coin.name}>
                {idx > 0 && <div className="ios-separator ios-separator-inset"></div>}
                <div className="px-4 py-3.5 flex items-center justify-between ios-touchable">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                      coin.rank <= 3 
                        ? `coin-badge-${coin.rank} text-white` 
                        : 'coin-badge-4'
                    }`}>
                      {coin.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="ios-body text-[#111827]" style={{ fontWeight: 500 }}>${coin.name}</p>
                        <span className={`ios-caption-2 ${coin.trendUp ? 'text-[#34C759]' : 'text-[#FF3B30]'}`} style={{ fontWeight: 600 }}>
                          {coin.trend}
                        </span>
                      </div>
                      <p className="ios-caption-2 text-[#8E8E93]">{coin.posts}건 포스팅</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="ios-subhead text-[#111827]" style={{ fontWeight: 600 }}>{coin.revenue}</p>
                    <p className="ios-caption-2 text-[#8E8E93]">이번 주</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Posts Queue */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-3 px-0.5">
            <h2 className="ios-headline text-[#111827]">예약 포스팅</h2>
            <span className="ios-caption-1 text-[#8E8E93]">{scheduledPosts.length}건 대기중</span>
          </div>
          <div className="space-y-3">
            {scheduledPosts.map((post) => (
              <div 
                key={post.id} 
                className={`ios-card overflow-hidden transition-all duration-300 ${
                  removingId === post.id ? 'opacity-0 scale-95 -translate-x-4' : 'opacity-100 scale-100'
                } ${
                  postingId === post.id ? 'ring-2 ring-[#34C759] shadow-lg' : ''
                }`}
                style={{
                  animation: 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Header */}
                <div className="px-4 py-2.5 bg-[#F9FAFB] flex items-center justify-between border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#007AFF] rounded-full ios-caption-1 text-white" style={{ fontWeight: 600 }}>
                      ${post.coin}
                    </span>
                    <div className="flex items-center gap-1">
                      {postingId === post.id ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-[#34C759]" fill="#34C759" />
                          <span className="ios-caption-2 text-[#34C759]" style={{ fontWeight: 500 }}>실행중...</span>
                        </>
                      ) : (
                        <>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            post.status === 'scheduled' ? 'status-scheduled' : 'status-completed'
                          }`}></div>
                          <span className="ios-caption-2 text-[#8E8E93]">{post.eta}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="ios-subhead text-[#34C759]" style={{ fontWeight: 600 }}>{post.earnings}</span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="ios-subhead text-[#111827] leading-snug whitespace-pre-line mb-3" style={{ lineHeight: 1.4 }}>
                    {post.content}
                  </p>

                  {post.image && (
                    <div className="rounded-xl overflow-hidden mb-3 border border-[#E5E7EB]">
                      <img
                        src={post.image}
                        alt=""
                        className="w-full aspect-[16/9] object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  )}

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 mb-3 p-3 bg-[#F9FAFB] rounded-lg">
                    <div className="flex-1">
                      <p className="ios-caption-2 text-[#8E8E93] mb-0.5">인게이지먼트</p>
                      <p className="ios-subhead text-[#007AFF]" style={{ fontWeight: 600 }}>{post.engagement}%</p>
                    </div>
                    <div className="w-px h-6 bg-[#E5E7EB]"></div>
                    <div className="flex-1">
                      <p className="ios-caption-2 text-[#8E8E93] mb-0.5">예약 시간</p>
                      <p className="ios-subhead text-[#111827]" style={{ fontWeight: 500 }}>{post.scheduledTime}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleCancel(post.id)}
                      disabled={postingId === post.id}
                      className="flex-1 py-2.5 bg-[#F9FAFB] rounded-lg ios-button-primary border border-[#E5E7EB] disabled:opacity-50 flex items-center justify-center"
                    >
                      <span className="ios-subhead text-[#111827]" style={{ fontWeight: 500 }}>취소</span>
                    </button>
                    <button 
                      onClick={() => handleEdit(post)}
                      disabled={postingId === post.id}
                      className="flex-1 py-2.5 bg-[#F9FAFB] rounded-lg ios-button-primary border border-[#E5E7EB] disabled:opacity-50 flex items-center justify-center"
                    >
                      <span className="ios-subhead text-[#007AFF]" style={{ fontWeight: 600 }}>수정</span>
                    </button>
                    <button
                      onClick={() => handlePostNow(post.id)}
                      disabled={postingId === post.id}
                      className="flex-1 py-2.5 bg-[#007AFF] rounded-lg ios-button-primary disabled:opacity-50 flex items-center justify-center"
                    >
                      <span className="ios-subhead text-white" style={{ fontWeight: 600 }}>
                        {postingId === post.id ? '실행중...' : '지금 포스팅'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-5 pb-5">
          <div className="ios-card">
            <button
              onClick={() => onNavigate('scheduler')}
              className="w-full px-4 py-3.5 flex items-center justify-between ios-touchable"
            >
              <span className="ios-body text-[#111827]">스케줄 관리</span>
              <ChevronRight className="w-5 h-5 text-[#C7C7CC]" strokeWidth={2.5} />
            </button>
            <div className="ios-separator ios-separator-inset"></div>
            <button
              onClick={() => onNavigate('logs')}
              className="w-full px-4 py-3.5 flex items-center justify-between ios-touchable"
            >
              <span className="ios-body text-[#111827]">포스팅 기록</span>
              <ChevronRight className="w-5 h-5 text-[#C7C7CC]" strokeWidth={2.5} />
            </button>
            <div className="ios-separator ios-separator-inset"></div>
            <button
              onClick={() => onNavigate('monitor')}
              className="w-full px-4 py-3.5 flex items-center justify-between ios-touchable"
            >
              <span className="ios-body text-[#111827]">실시간 모니터</span>
              <ChevronRight className="w-5 h-5 text-[#C7C7CC]" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
