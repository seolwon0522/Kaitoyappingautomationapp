import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useState } from "react";
import { postingLogs } from "../data";
import { DEMO_NOW, formatLongDate } from "../utils/date";

interface LogsProps {
  onOpenDetail: (log: any) => void;
}

export function Logs({ onOpenDetail }: LogsProps) {
  const [selectedTab, setSelectedTab] = useState<"today" | "week" | "all">("today");

  const logs = postingLogs;

  const stats = {
    success: logs.filter(l => l.status === 'success').length,
    failed: logs.filter(l => l.status === 'failed').length,
    pending: 2,
    totalEarnings: logs.reduce((sum, l) => sum + parseFloat(l.earnings.replace('$', '')), 0).toFixed(2)
  };

  const getStatusIcon = (status: string) => {
    if (status === "success") return <CheckCircle className="w-5 h-5 text-[#34C759]" fill="#34C759" />;
    if (status === "failed") return <XCircle className="w-5 h-5 text-[#FF3B30]" />;
    return <Clock className="w-5 h-5 text-[#FF9500]" />;
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      <div className="bg-[#F9FAFB] px-5 pt-16 pb-3">
        <h1 className="ios-large-title text-[#111827]">포스팅 기록</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Period Tabs */}
        <div className="px-5 pt-5 pb-4">
          <div className="bg-[#F2F3F5] rounded-lg p-1 flex">
            {(['today', 'week', 'all'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex-1 py-2 rounded-md transition-all flex items-center justify-center ${
                  selectedTab === tab
                    ? 'bg-white shadow-sm'
                    : 'bg-transparent'
                }`}
              >
                <span className={`ios-subhead ${
                  selectedTab === tab ? 'text-[#111827]' : 'text-[#8E8E93]'
                }`} style={{ fontWeight: selectedTab === tab ? 600 : 400 }}>
                  {tab === 'today' ? '오늘' : tab === 'week' ? '최근 7일' : '전체'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="px-5 pb-4">
          <div className="ios-card">
            <div className="px-4 py-3 border-b border-[#E5E7EB]">
              <p className="ios-caption-1 text-[#8E8E93]">{formatLongDate(DEMO_NOW)}</p>
            </div>
            <div className="grid grid-cols-4 divide-x divide-[#E5E7EB]">
              <div className="p-3.5 text-center min-w-0">
                <p className="ios-title-3 text-[#34C759] mb-0.5" style={{ fontWeight: 600 }}>{stats.success}</p>
                <p className="ios-caption-2 text-[#8E8E93]">성공</p>
              </div>
              <div className="p-3.5 text-center min-w-0">
                <p className="ios-title-3 text-[#FF3B30] mb-0.5" style={{ fontWeight: 600 }}>{stats.failed}</p>
                <p className="ios-caption-2 text-[#8E8E93]">실패</p>
              </div>
              <div className="p-3.5 text-center min-w-0">
                <p className="ios-title-3 text-[#FF9500] mb-0.5" style={{ fontWeight: 600 }}>{stats.pending}</p>
                <p className="ios-caption-2 text-[#8E8E93]">보류</p>
              </div>
              <div className="p-3 text-center min-w-0">
                <p className="ios-subhead text-[#111827] mb-0.5 truncate" style={{ fontWeight: 600 }}>${stats.totalEarnings}</p>
                <p className="ios-caption-2 text-[#8E8E93]">총 수익</p>
              </div>
            </div>
          </div>
        </div>

        {/* Log Entries */}
        <div className="px-5 pb-5">
          <div className="ios-card">
            {logs.map((log, idx) => (
              <div key={log.id}>
                {idx > 0 && <div className="ios-separator ios-separator-inset"></div>}
                <button
                  onClick={() => onOpenDetail(log)}
                  className="w-full px-4 py-3.5 flex items-start gap-3 ios-touchable text-left"
                >
                  <div className="pt-0.5">
                    {getStatusIcon(log.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="ios-caption-1 text-[#8E8E93]">{log.time}</span>
                      <span className="ios-caption-2 text-[#C7C7CC]">·</span>
                      <span className="ios-caption-2 text-[#8E8E93]">{log.date}</span>
                      <span className="px-2 py-0.5 bg-[#007AFF] rounded-full ios-caption-2 text-white" style={{ fontWeight: 600 }}>
                        ${log.coin}
                      </span>
                      {log.status === 'success' && (
                        <span className="ios-caption-1 text-[#34C759]" style={{ fontWeight: 600 }}>{log.earnings}</span>
                      )}
                    </div>
                    <p className="ios-subhead text-[#111827] line-clamp-2 mb-1.5" style={{ lineHeight: 1.4 }}>
                      {log.content}
                    </p>
                    {log.status === 'success' && (
                      <div className="flex items-center gap-3">
                        <span className="ios-caption-2 text-[#8E8E93]">👍 {log.likes}</span>
                        <span className="ios-caption-2 text-[#8E8E93]">🔄 {log.retweets}</span>
                        <span className="ios-caption-2 text-[#8E8E93]">📊 {log.engagement}%</span>
                      </div>
                    )}
                    {log.status === 'failed' && (
                      <span className="ios-caption-2 text-[#FF3B30]">포스팅 실패 - 재시도 필요</span>
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
