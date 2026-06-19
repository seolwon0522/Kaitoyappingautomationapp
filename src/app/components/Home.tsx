import { ChevronRight, Play, Pause, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { formatDateDot, formatKoreanDateWithWeekday } from "../utils/date";

interface HomeProps {
  onNavigate: (screen: string) => void;
  onApprove: (id: number) => void;
  onOpenEditPost?: (post: any) => void;
  automationEnabled?: boolean;
  onToggleAutomation?: () => void;
  highlightElement?: string | null;
}

export function Home({ onNavigate, onApprove, onOpenEditPost, automationEnabled, onToggleAutomation, highlightElement }: HomeProps) {
  const todayDateStr = formatDateDot();

  // Use prop if provided, otherwise use local state
  const [isAutomationActive, setIsAutomationActive] = useState(automationEnabled !== undefined ? automationEnabled : true);
  const [scheduledPosts, setScheduledPosts] = useState([
    {
      id: 1,
      content: "AI16z 프레임워크 미쳤다 ㄷㄷ\n\n개발자들 사이에서 난리남\n엘리자봇 만드는데 10분컷 가능 🤖\n\n이거 진짜 게임체인저인듯\n\n#AI16z #Eliza #AIAgent",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      coin: "AI16Z",
      earnings: "$18.50",
      engagement: 92,
      scheduledTime: "오후 2:30",
      status: "scheduled",
      eta: "5분 후",
      date: todayDateStr
    },
    {
      id: 2,
      content: "JOBY Aviation 드디어 상업 운항 승인 받았다고?\n\n하늘 나는 택시 시대 온다 🚁\n뉴욕-JFK 15분컷...\n\n교통체증 이제 안녕이네 ㅋㅋㅋ\n\n#JOBY #eVTOL #FlyingCar",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80",
      coin: "PRIME",
      earnings: "$15.80",
      engagement: 88,
      scheduledTime: "오후 3:15",
      status: "scheduled",
      eta: "20분 후",
      date: todayDateStr
    },
    {
      id: 3,
      content: "삼성 갤럭시 AI 업데이트 진짜 실화냐\n\n통화 중 실시간 번역 + 요약까지 해줌 😱\n\n영어 못해도 글로벌 비즈니스 가능\n미래가 왔다...\n\n#GalaxyAI #Samsung #AI",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
      coin: "VIRTUAL",
      earnings: "$14.20",
      engagement: 85,
      scheduledTime: "오후 4:00",
      status: "ready",
      eta: "준비완료",
      date: todayDateStr
    },
    {
      id: 4,
      content: "뉴진스 신곡 \"Time Travel\" 티저 떴는데\n\n민희진 표 감성 미쳤고요 💫\nY2K 바이브 + 미래형 비트 조합\n\n이번 주 금요일 발매\n벌써부터 기대됨 ㅠㅠ\n\n#NewJeans #TimeTravel #Kpop",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
      coin: "ELIZA",
      earnings: "$12.60",
      engagement: 81,
      scheduledTime: "오후 5:30",
      status: "scheduled",
      eta: "1시간 후",
      date: todayDateStr
    }
  ]);

  const [completedCount, setCompletedCount] = useState(23);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [postingId, setPostingId] = useState<number | null>(null);

  const userProfile = {
    name: "박시연",
    handle: "@crypto_siyeon",
    followers: "18.2K",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=siyeon2025"
  };

  const topCoins = [
    { name: "AI16Z", rank: 1, posts: 287, revenue: "$4,850", trend: "+34%", trendUp: true },
    { name: "ELIZA", rank: 2, posts: 245, revenue: "$3,920", trend: "+28%", trendUp: true },
    { name: "VIRTUAL", rank: 3, posts: 198, revenue: "$2,640", trend: "+19%", trendUp: true },
    { name: "PRIME", rank: 4, posts: 156, revenue: "$1,890", trend: "+12%", trendUp: true },
    { name: "RNDR", rank: 5, posts: 132, revenue: "$1,520", trend: "-5%", trendUp: false },
  ];

  const newPostTemplates = [
    {
      content: "NVIDIA H200 벤치마크 떴다\n\nH100 대비 성능 2배 상승 ㄷㄷ\n전력 효율도 미쳤음\n\nAI 훈련 시간 반으로 줄어듬\n\n#NVIDIA #H200 #AI",
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80",
      coin: "RNDR",
      earnings: "$16.40",
      engagement: 87,
    },
    {
      content: "Apple Vision Pro 2 루머 정리\n\n- 30% 더 가벼움\n- 배터리 2배\n- 가격 $2999로 인하\n\n2026년 출시 예정 👀\n\n#VisionPro #Apple #AR",
      image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&q=80",
      coin: "VIRTUAL",
      earnings: "$13.90",
      engagement: 83,
    },
    {
      content: "메타 Ray-Ban 2세대 공개\n\n이제 영상통화까지 됨 😱\n줌 미팅을 안경으로...\n\n미래가 진짜 왔다\n\n#Meta #RayBan #SmartGlasses",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",
      coin: "AI16Z",
      earnings: "$19.20",
      engagement: 90,
    }
  ];

  const todayStats = {
    scheduled: scheduledPosts.length,
    posted: completedCount,
    totalRevenue: "$287.40",
    avgEngagement: 87
  };

  // Auto-add new posts when automation is active
  useEffect(() => {
    if (!isAutomationActive) return;

    const interval = setInterval(() => {
      const randomTemplate = newPostTemplates[Math.floor(Math.random() * newPostTemplates.length)];
      const newId = Date.now();
      const times = ["오후 6:00", "오후 6:30", "오후 7:00", "오후 7:30", "오후 8:00"];
      const randomTime = times[Math.floor(Math.random() * times.length)];

      const newPost = {
        id: newId,
        ...randomTemplate,
        scheduledTime: randomTime,
        status: "scheduled",
        eta: `${Math.floor(Math.random() * 40) + 10}분 후`,
        date: todayDateStr
      };

      setScheduledPosts(prev => [...prev, newPost]);
    }, 15000); // Add new post every 15 seconds

    return () => clearInterval(interval);
  }, [isAutomationActive]);

  // Sync automation state with prop
  useEffect(() => {
    if (automationEnabled !== undefined) {
      setIsAutomationActive(automationEnabled);
    }
  }, [automationEnabled]);

  const handleToggleAutomation = () => {
    if (onToggleAutomation) {
      onToggleAutomation();
    } else {
      setIsAutomationActive(!isAutomationActive);
    }
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

  const getHighlightStyle = (elementId: string) => {
    if (highlightElement === elementId) {
      return "shadow-[0_0_0_4px_rgba(239,68,68,1),0_0_20px_rgba(239,68,68,0.5)] rounded-xl relative z-10";
    }
    return "";
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      {/* Profile Header */}
      <div className={`bg-white border-b border-[#E5E7EB] px-5 pt-16 pb-4 transition-all duration-300 rounded-b-xl ${getHighlightStyle("automation-card")}`} id="automation-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center overflow-hidden">
              <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full" />
            </div>
            <div>
              <p className="ios-headline text-[#111827]">{userProfile.name}</p>
              <p className="ios-caption-1 text-[#6B7280]">{userProfile.handle} · {userProfile.followers}</p>
            </div>
          </div>
        </div>
        <button 
          onClick={handleToggleAutomation}
          className={`w-full px-4 py-2.5 rounded-xl ios-button-primary transition-all flex items-center justify-center gap-2 ${
            isAutomationActive ? 'bg-[#FF3B30]' : 'bg-[#007AFF]'
          } ${getHighlightStyle("automation-toggle")}`}
          id="automation-toggle"
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

      <div className="flex-1 overflow-y-auto pb-24 px-4">
        {/* Status Bar */}
        <div className="bg-white px-5 py-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-all ${isAutomationActive ? 'status-active' : 'status-paused'}`}></div>
            <span className="ios-subhead text-[#6B7280]">
              {isAutomationActive ? `자동 포스팅 활성화 · ${todayDateStr}` : '일시 정지됨'}
            </span>
          </div>
        </div>

        {/* Today Stats */}
        <div className={`px-5 pt-5 pb-4 transition-all duration-300 ${getHighlightStyle("metrics-section")}`} id="metrics-section">
          <div className={`ios-card transition-all duration-300 ${getHighlightStyle("revenue-card")}`} id="revenue-card">
            <div className="px-4 py-3.5 border-b border-[#E5E7EB]">
              <p className="ios-headline text-[#111827]">오늘 요약</p>
              <p className="ios-caption-1 text-[#8E8E93] mt-0.5">{formatKoreanDateWithWeekday()}</p>
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
        <div className={`px-5 pb-4 transition-all duration-300 ${getHighlightStyle("post-queue")}`} id="post-queue">
          <div className="flex items-center justify-between mb-3 px-0.5">
            <h2 className="ios-headline text-[#111827]">예약 포스팅</h2>
            <span className="ios-caption-1 text-[#8E8E93]">{scheduledPosts.length}건 대기중</span>
          </div>
          <div className="space-y-3">
            {scheduledPosts.map((post, index) => (
              <div 
                key={post.id} 
                className={`ios-card overflow-hidden transition-all duration-300 ${
                  removingId === post.id ? 'opacity-0 scale-95 -translate-x-4' : 'opacity-100 scale-100'
                } ${
                  postingId === post.id ? 'ring-2 ring-[#34C759] shadow-lg' : ''
                } ${index === 0 ? getHighlightStyle("post-card") : ""}`}
                id={index === 0 ? "post-card" : undefined}
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
                      className={`flex-1 py-2.5 bg-[#F9FAFB] rounded-lg ios-button-primary border border-[#E5E7EB] disabled:opacity-50 flex items-center justify-center transition-all duration-300 ${index === 0 ? getHighlightStyle("cancel-button") : ""}`}
                      id={index === 0 ? "cancel-button" : undefined}
                    >
                      <span className="ios-subhead text-[#111827]" style={{ fontWeight: 500 }}>취소</span>
                    </button>
                    <button 
                      onClick={() => handleEdit(post)}
                      disabled={postingId === post.id}
                      className={`flex-1 py-2.5 bg-[#F9FAFB] rounded-lg ios-button-primary border border-[#E5E7EB] disabled:opacity-50 flex items-center justify-center transition-all duration-300 ${index === 0 ? getHighlightStyle("edit-button") : ""}`}
                      id={index === 0 ? "edit-button" : undefined}
                    >
                      <span className="ios-subhead text-[#007AFF]" style={{ fontWeight: 600 }}>수정</span>
                    </button>
                    <button
                      onClick={() => handlePostNow(post.id)}
                      disabled={postingId === post.id}
                      className={`flex-1 py-2.5 bg-[#007AFF] rounded-lg ios-button-primary disabled:opacity-50 flex items-center justify-center transition-all duration-300 ${index === 0 ? getHighlightStyle("approve-button") : ""}`}
                      id={index === 0 ? "approve-button" : undefined}
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