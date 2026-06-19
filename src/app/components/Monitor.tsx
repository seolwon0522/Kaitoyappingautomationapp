import { Activity, TrendingUp, BarChart3 } from "lucide-react";
import { hotTrends, realtimeActivity, systemMetrics, engagementSeries } from "../data";
import { DEMO_NOW, formatDotDate, formatClockTime } from "../utils/date";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const TREND_COLORS = ["#FF3B30", "#FF9500", "#007AFF", "#5856D6", "#34C759"];

interface MonitorProps {
  onReconnect: () => void;
}

export function Monitor({ onReconnect }: MonitorProps) {
  const trends = hotTrends;

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      <div className="bg-[#F9FAFB] px-5 pt-16 pb-3">
        <h1 className="ios-large-title text-[#111827]">실시간 모니터</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* System Status */}
        <div className="px-5 pt-5 pb-4">
          <div className="ios-card overflow-hidden">
            <div className="px-4 py-3.5 border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#34C759] rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="ios-body text-[#111827]" style={{ fontWeight: 600 }}>시스템 정상</p>
                    <p className="ios-caption-1 text-[#34C759]">{formatDotDate(DEMO_NOW)} {formatClockTime(DEMO_NOW)}</p>
                  </div>
                </div>
                <div className="w-2.5 h-2.5 bg-[#34C759] rounded-full"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-[#E5E7EB]">
              <div className="p-4">
                <p className="ios-caption-1 text-[#8E8E93] mb-1">응답 시간</p>
                <p className="ios-title-3 text-[#111827]" style={{ fontWeight: 600 }}>{systemMetrics.responseMs}ms</p>
              </div>
              <div className="p-4">
                <p className="ios-caption-1 text-[#8E8E93] mb-1">가동률</p>
                <p className="ios-title-3 text-[#34C759]" style={{ fontWeight: 600 }}>{systemMetrics.uptime}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Engagement Chart */}
        <div className="px-5 pb-4">
          <div className="ios-card p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="ios-headline text-[#111827]">주간 인게이지먼트</p>
              <span className="ios-caption-1 text-[#007AFF]" style={{ fontWeight: 600 }}>평균 {systemMetrics.avgEngagement}%</span>
            </div>
            <p className="ios-caption-1 text-[#8E8E93] mb-3">최근 7일 평균 참여율 (%)</p>
            <div className="h-[130px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementSeries} margin={{ top: 6, right: 8, left: 8, bottom: 0 }}>
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "#8E8E93" }}
                    dy={4}
                  />
                  <YAxis hide domain={[70, 100]} />
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
                    formatter={(value: any) => [`${value}%`, "인게이지먼트"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#007AFF"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#007AFF", strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "#007AFF" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-3 px-0.5">
            <h2 className="ios-headline text-[#111827]">실시간 활동</h2>
            <span className="ios-caption-1 text-[#8E8E93]">자동 업데이트</span>
          </div>
          <div className="ios-card">
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
          <div className="ios-card p-4 mb-3">
            <p className="ios-caption-1 text-[#8E8E93] mb-2">코인별 트렌드 스코어</p>
            <div className="h-[140px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={hotTrends.map((t) => ({ name: t.coin, score: t.score }))}
                  margin={{ top: 8, right: 4, left: 4, bottom: 0 }}
                >
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: "#8E8E93" }}
                    interval={0}
                    dy={4}
                  />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.04)" }}
                    contentStyle={{
                      borderRadius: 12,
                      border: "none",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      fontSize: 12,
                      padding: "8px 12px",
                    }}
                    labelStyle={{ color: "#8E8E93", fontSize: 11, marginBottom: 2 }}
                    formatter={(value: any) => [`${value}점`, "스코어"]}
                  />
                  <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={26}>
                    {hotTrends.map((_, i) => (
                      <Cell key={i} fill={TREND_COLORS[i % TREND_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="ios-card">
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
          <div className="ios-card p-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="ios-subhead text-[#8E8E93]">포스팅 성공률</span>
                  <span className="ios-subhead text-[#34C759]" style={{ fontWeight: 600 }}>{systemMetrics.postingSuccessRate}%</span>
                </div>
                <div className="h-2 bg-[#F2F3F5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#34C759] rounded-full transition-all" style={{ width: `${systemMetrics.postingSuccessRate}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="ios-subhead text-[#8E8E93]">트렌드 포착률</span>
                  <span className="ios-subhead text-[#007AFF]" style={{ fontWeight: 600 }}>{systemMetrics.trendDetection}%</span>
                </div>
                <div className="h-2 bg-[#F2F3F5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#007AFF] rounded-full transition-all" style={{ width: `${systemMetrics.trendDetection}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="ios-subhead text-[#8E8E93]">평균 인게이지먼트</span>
                  <span className="ios-subhead text-[#FF9500]" style={{ fontWeight: 600 }}>{systemMetrics.avgEngagement}%</span>
                </div>
                <div className="h-2 bg-[#F2F3F5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF9500] rounded-full transition-all" style={{ width: `${systemMetrics.avgEngagement}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Test Button */}
        <div className="px-5 pb-5">
          <button
            onClick={onReconnect}
            className="w-full ios-card px-4 py-3.5 flex items-center justify-center gap-2 ios-button-primary border border-[#E5E7EB]"
          >
            <BarChart3 className="w-5 h-5 text-[#007AFF]" strokeWidth={2.5} />
            <span className="ios-body text-[#007AFF]" style={{ fontWeight: 600 }}>연결 상태 테스트</span>
          </button>
        </div>
      </div>
    </div>
  );
}
