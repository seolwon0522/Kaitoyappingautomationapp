import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useState } from "react";

interface LogsProps {
  onOpenDetail: (log: any) => void;
  highlightElement?: string | null;
}

export function Logs({ onOpenDetail, highlightElement }: LogsProps) {
  const [selectedTab, setSelectedTab] = useState<"today" | "week" | "all">("today");

  const getHighlightStyle = (elementId: string) => {
    if (highlightElement === elementId) {
      return "outline outline-4 outline-red-500 outline-offset-4 shadow-[0_0_20px_rgba(239,68,68,0.5)] relative z-10";
    }
    return "";
  };

  const logs = [
    {
      id: 1,
      time: "오후 1:24",
      timestamp: "2025.11.27",
      status: "success",
      content: "OpenAI DevDay 2025 요약\n\nGPT-5 공개 안했지만\nVoice Engine 개선 + API 가격 50% 인하\n\n개발자들 환호 중 🎉",
      coin: "AI16Z",
      earnings: "$22.80",
      engagement: 94,
      likes: 342,
      retweets: 128,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
    },
    {
      id: 2,
      time: "오전 11:15",
      timestamp: "2025.11.27",
      status: "success",
      content: "메타 Ray-Ban 스마트글래스 2세대\n\n이제 영상통화까지 됨 😱\n줌 미팅을 안경으로...\n\n미래가 왔다",
      coin: "VIRTUAL",
      earnings: "$19.50",
      engagement: 89,
      likes: 298,
      retweets: 94,
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80"
    },
    {
      id: 3,
      time: "오전 9:42",
      timestamp: "2025.11.27",
      status: "success",
      content: "T1 vs JDG 준결승\n\nZeus 솔킬 3개 ㄷㄷㄷ\n이번 Worlds 우승 각 보인다\n\n#T1WIN #Worlds2025",
      coin: "ELIZA",
      earnings: "$17.30",
      engagement: 86,
      likes: 267,
      retweets: 81,
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"
    },
    {
      id: 4,
      time: "오전 8:05",
      timestamp: "2025.11.27",
      status: "success",
      content: "테슬라 Cybertruck 한국 출시 확정\n\n2026년 1월 예약 시작\n가격은... 아직 미정 💰\n\n벌써부터 화제",
      coin: "PRIME",
      earnings: "$15.90",
      engagement: 83,
      likes: 245,
      retweets: 76,
      image: "https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=800&q=80"
    },
    {
      id: 5,
      time: "오후 11:28",
      timestamp: "2025.11.26",
      status: "success",
      content: "NVIDIA H200 벤치마크 나왔는데\n\nH100 대비 성능 2배 ㄷㄷ\n전력 효율도 미쳤음\n\n주가 또 오르겠네",
      coin: "RNDR",
      earnings: "$14.20",
      engagement: 80,
      likes: 223,
      retweets: 68,
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80"
    },
    {
      id: 6,
      time: "오후 8:45",
      timestamp: "2025.11.26",
      status: "failed",
      content: "비트코인 10만불 돌파 임박?\n\n월가 분석가들 전망 엇갈려\n누가 맞을지 두고보자",
      coin: "AI16Z",
      earnings: "$0.00",
      engagement: 0,
      likes: 0,
      retweets: 0
    }
  ];

  const todayStats = {
    total: logs.filter(l => l.timestamp === "2025.11.27").length,
    success: logs.filter(l => l.timestamp === "2025.11.27" && l.status === "success").length,
    failed: logs.filter(l => l.timestamp === "2025.11.27" && l.status === "failed").length,
    revenue: "$75.50"
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-[#34C759]" fill="#34C759" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-[#FF3B30]" fill="#FF3B30" />;
      case "pending":
        return <Clock className="w-5 h-5 text-[#FF9500]" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "success":
        return "성공";
      case "failed":
        return "실패";
      case "pending":
        return "대기";
      default:
        return "";
    }
  };

  const filteredLogs = () => {
    switch (selectedTab) {
      case "today":
        return logs.filter(l => l.timestamp === "2025.11.27");
      case "week":
        return logs;
      case "all":
        return logs;
      default:
        return logs;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      <div className="bg-[#F9FAFB] px-5 pt-16 pb-3">
        <h1 className="ios-large-title text-[#111827]">활동 로그</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Today Stats */}
        <div className="px-5 pt-5 pb-4">
          <div className="ios-card">
            <div className="px-4 py-3.5 border-b border-[#E5E7EB]">
              <p className="ios-headline text-[#111827]">오늘 활동</p>
              <p className="ios-caption-1 text-[#8E8E93] mt-0.5">2025년 11월 27일</p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-[#E5E7EB]">
              <div className="p-4">
                <p className="ios-caption-1 text-[#6B7280] mb-1">전체</p>
                <p className="ios-title-2 text-[#111827]" style={{ fontWeight: 600 }}>{todayStats.total}</p>
              </div>
              <div className="p-4">
                <p className="ios-caption-1 text-[#6B7280] mb-1">성공</p>
                <p className="ios-title-2 text-[#34C759]" style={{ fontWeight: 600 }}>{todayStats.success}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-[#E5E7EB] border-t border-[#E5E7EB]">
              <div className="p-4">
                <p className="ios-caption-1 text-[#6B7280] mb-1">실패</p>
                <p className="ios-body text-[#FF3B30]" style={{ fontWeight: 600 }}>{todayStats.failed}</p>
              </div>
              <div className="p-4">
                <p className="ios-caption-1 text-[#6B7280] mb-1">수익</p>
                <p className="ios-body text-[#34C759]" style={{ fontWeight: 600 }}>{todayStats.revenue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className={`px-5 pb-4 transition-all duration-300 ${getHighlightStyle("filter-tabs")}`} id="filter-tabs">
          <div className="ios-card p-1 flex gap-1">
            <button
              onClick={() => setSelectedTab("today")}
              className={`flex-1 py-2 rounded-lg transition-all ${
                selectedTab === "today" ? "bg-white shadow-sm" : "bg-transparent"
              }`}
            >
              <span className={`ios-subhead ${selectedTab === "today" ? "text-[#111827]" : "text-[#8E8E93]"}`} style={{ fontWeight: selectedTab === "today" ? 600 : 400 }}>
                오늘
              </span>
            </button>
            <button
              onClick={() => setSelectedTab("week")}
              className={`flex-1 py-2 rounded-lg transition-all ${
                selectedTab === "week" ? "bg-white shadow-sm" : "bg-transparent"
              }`}
            >
              <span className={`ios-subhead ${selectedTab === "week" ? "text-[#111827]" : "text-[#8E8E93]"}`} style={{ fontWeight: selectedTab === "week" ? 600 : 400 }}>
                이번 주
              </span>
            </button>
            <button
              onClick={() => setSelectedTab("all")}
              className={`flex-1 py-2 rounded-lg transition-all ${
                selectedTab === "all" ? "bg-white shadow-sm" : "bg-transparent"
              }`}
            >
              <span className={`ios-subhead ${selectedTab === "all" ? "text-[#111827]" : "text-[#8E8E93]"}`} style={{ fontWeight: selectedTab === "all" ? 600 : 400 }}>
                전체
              </span>
            </button>
          </div>
        </div>

        {/* Logs List */}
        <div className={`px-5 pb-5 transition-all duration-300 ${getHighlightStyle("log-list")}`} id="log-list">
          <div className="space-y-3">
            {filteredLogs().map((log, index) => (
              <button
                key={log.id}
                onClick={() => onOpenDetail(log)}
                className={`w-full ios-card overflow-hidden transition-all duration-300 ios-touchable ${index === 0 && log.status === "success" ? getHighlightStyle("success-log") : ""} ${index === 0 ? getHighlightStyle("log-item") : ""}`}
                id={index === 0 ? (log.status === "success" ? "success-log" : "log-item") : undefined}
              >
                {/* Header */}
                <div className="px-4 py-2.5 bg-[#F9FAFB] flex items-center justify-between border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(log.status)}
                    <span className="ios-caption-1 text-[#8E8E93]">{log.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#007AFF] rounded-full ios-caption-2 text-white" style={{ fontWeight: 600 }}>
                      ${log.coin}
                    </span>
                    <span className={`ios-subhead ${log.status === "success" ? "text-[#34C759]" : "text-[#FF3B30]"}`} style={{ fontWeight: 600 }}>
                      {log.earnings}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="ios-subhead text-[#111827] text-left leading-snug line-clamp-3 whitespace-pre-line mb-3">
                    {log.content}
                  </p>

                  {/* Stats */}
                  {log.status === "success" && (
                    <div className="flex items-center gap-4 p-3 bg-[#F9FAFB] rounded-lg">
                      <div className="flex-1">
                        <p className="ios-caption-2 text-[#8E8E93] mb-0.5">인게이지먼트</p>
                        <p className="ios-subhead text-[#007AFF]" style={{ fontWeight: 600 }}>{log.engagement}%</p>
                      </div>
                      <div className="w-px h-6 bg-[#E5E7EB]"></div>
                      <div className="flex-1">
                        <p className="ios-caption-2 text-[#8E8E93] mb-0.5">좋아요</p>
                        <p className="ios-subhead text-[#111827]" style={{ fontWeight: 500 }}>{log.likes}</p>
                      </div>
                      <div className="w-px h-6 bg-[#E5E7EB]"></div>
                      <div className="flex-1">
                        <p className="ios-caption-2 text-[#8E8E93] mb-0.5">리트윗</p>
                        <p className="ios-subhead text-[#111827]" style={{ fontWeight: 500 }}>{log.retweets}</p>
                      </div>
                    </div>
                  )}

                  {log.status === "failed" && (
                    <div className="p-3 bg-[#FEF2F2] rounded-lg border border-[#FEE2E2]">
                      <p className="ios-caption-1 text-[#FF3B30]" style={{ fontWeight: 500 }}>
                        ⚠️ API 응답 없음 - 재시도 필요
                      </p>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}