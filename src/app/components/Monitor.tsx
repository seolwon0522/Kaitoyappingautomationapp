import { Activity, TrendingUp, BarChart3 } from "lucide-react";
import { formatDateTimeKorean } from "../utils/date";

interface MonitorProps {
  onReconnect: () => void;
  highlightElement?: string | null;
}

export function Monitor({ onReconnect, highlightElement }: MonitorProps) {
  const trends = [
    { tag: "#AI16z", coin: "AI16Z", score: 96, change: "+34%", volume: "2.8M" },
    { tag: "#OpenAIDevDay", coin: "VIRTUAL", score: 91, change: "+28%", volume: "1.9M" },
    { tag: "#JOBYAviation", coin: "PRIME", score: 87, change: "+19%", volume: "1.4M" },
    { tag: "#GalaxyAI", coin: "ELIZA", score: 84, change: "+15%", volume: "1.2M" },
    { tag: "#NewJeans", coin: "ELIZA", score: 79, change: "+12%", volume: "980K" },
  ];

  const realtimeActivity = [
    { time: "방금", action: "트렌드 감지", detail: "AI16z Eliza 프레임워크 버즈 급상승" },
    { time: "2분 전", action: "포스팅 완료", detail: "JOBY Aviation eVTOL 승인 뉴스" },
    { time: "5분 전", action: "분석 완료", detail: "삼성 Galaxy AI 업데이트 반응 분석" },
    { time: "8분 전", action: "예약 등록", detail: "뉴진스 신곡 관련 3건 예약" },
    { time: "12분 전", action: "포스팅 완료", detail: "OpenAI DevDay 요약 게시" },
  ];

  const getHighlightStyle = (elementId: string) => {
    if (highlightElement === elementId) {
      return "outline outline-4 outline-red-500 outline-offset-4 shadow-[0_0_20px_rgba(239,68,68,0.5)] relative z-10";
    }
    return "";
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB] relative">
      <div className="bg-[#F9FAFB] px-5 pt-16 pb-3">
        <h1 className="ios-large-title text-[#111827]">실시간 모니터</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* System Status */}
        <div className="px-5 pt-5 pb-4">
          <div className={`ios-card overflow-hidden transition-all duration-300 ${getHighlightStyle("system-status")}`} id="system-status">
            <div className="px-4 py-3.5 border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#34C759] rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="ios-body text-[#111827]" style={{ fontWeight: 600 }}>시스템 정상</p>
                    <p className="ios-caption-1 text-[#34C759]">{formatDateTimeKorean()}</p>
                  </div>
                </div>
                <div className="w-2.5 h-2.5 bg-[#34C759] rounded-full"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-[#E5E7EB]">
              <div className="p-4">
                <p className="ios-caption-1 text-[#8E8E93] mb-1">응답 시간</p>
                <p className="ios-title-3 text-[#111827]" style={{ fontWeight: 600 }}>82ms</p>
              </div>
              <div className="p-4">
                <p className="ios-caption-1 text-[#8E8E93] mb-1">가동률</p>
                <p className="ios-title-3 text-[#34C759]" style={{ fontWeight: 600 }}>99.9%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-3 px-0.5">
            <h2 className="ios-headline text-[#111827]">실시간 활동</h2>
            <span className="ios-caption-1 text-[#8E8E93]">자동 업데이트</span>
          </div>
          <div className={`ios-card transition-all duration-300 ${getHighlightStyle("activity-section")}`} id="activity-section">
            {realtimeActivity.map((activity, idx) => (
              <div key={idx}>
                {idx > 0 && <div className="ios-separator ios-separator-inset"></div>}
                <div className="px-4 py-3 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="ios-subhead text-[#111827]" style={{ fontWeight: 600 }}>{activity.action}</span>
                      <span className="ios-caption-2 text-[#8E8E93]">{activity.time}</span>
                    </div>
                    <p className="ios-caption-1 text-[#8E8E93]">{activity.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hot Trends */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-3 px-0.5">
            <h2 className="ios-headline text-[#111827]">실시간 트렌드</h2>
            <span className="ios-caption-1 text-[#8E8E93]">{trends.length}건 분석중</span>
          </div>
          <div className={`ios-card transition-all duration-300 ${getHighlightStyle("trends-section")}`} id="trends-section">
            {trends.map((trend, idx) => (
              <div key={trend.tag}>
                {idx > 0 && <div className="ios-separator ios-separator-inset"></div>}
                <div className="px-4 py-3.5 flex items-center justify-between ios-touchable">
                  <div className="flex items-center gap-3 flex-1">
                    <TrendingUp className="w-5 h-5 text-[#FF3B30]" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="ios-body text-[#111827]" style={{ fontWeight: 500 }}>{trend.tag}</p>
                        <span className="ios-caption-2 text-[#34C759]" style={{ fontWeight: 600 }}>{trend.change}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="ios-caption-2 text-[#8E8E93]">${trend.coin}</p>
                        <span className="ios-caption-2 text-[#8E8E93]">·</span>
                        <p className="ios-caption-2 text-[#8E8E93]">{trend.volume} 언급</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="ios-title-3 text-[#FF3B30]" style={{ fontWeight: 600 }}>{trend.score}</p>
                    <p className="ios-caption-2 text-[#8E8E93]">점수</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="px-5 pb-4">
          <h2 className="ios-headline text-[#111827] mb-3 px-0.5">성과 지표</h2>
          <div className={`ios-card p-4 transition-all duration-300 ${getHighlightStyle("metrics-section")}`} id="metrics-section">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="ios-subhead text-[#8E8E93]">포스팅 성공률</span>
                  <span className="ios-subhead text-[#34C759]" style={{ fontWeight: 600 }}>97.2%</span>
                </div>
                <div className="h-2 bg-[#F2F3F5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#34C759] rounded-full transition-all" style={{ width: '97.2%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="ios-subhead text-[#8E8E93]">트렌드 포착률</span>
                  <span className="ios-subhead text-[#007AFF]" style={{ fontWeight: 600 }}>93.8%</span>
                </div>
                <div className="h-2 bg-[#F2F3F5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#007AFF] rounded-full transition-all" style={{ width: '93.8%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="ios-subhead text-[#8E8E93]">평균 인게이지먼트</span>
                  <span className="ios-subhead text-[#FF9500]" style={{ fontWeight: 600 }}>87.4%</span>
                </div>
                <div className="h-2 bg-[#F2F3F5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF9500] rounded-full transition-all" style={{ width: '87.4%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Test Button */}
        <div className="px-5 pb-5">
          <button
            onClick={onReconnect}
            className={`w-full ios-card px-4 py-3.5 flex items-center justify-center gap-2 ios-button-primary border border-[#E5E7EB] transition-all duration-300 ${getHighlightStyle("test-button")}`}
            id="test-button"
          >
            <BarChart3 className="w-5 h-5 text-[#007AFF]" strokeWidth={2.5} />
            <span className="ios-body text-[#007AFF]" style={{ fontWeight: 600 }}>연결 상태 테스트</span>
          </button>
        </div>
      </div>
    </div>
  );
}