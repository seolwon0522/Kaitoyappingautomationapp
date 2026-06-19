import { Plus } from "lucide-react";
import { useState } from "react";
import { formatKoreanDate } from "../utils/date";

interface SchedulerProps {
  onNavigate: (screen: string) => void;
  onOpenNewSchedule: () => void;
  highlightElement?: string | null;
}

export function Scheduler({ onNavigate, onOpenNewSchedule, highlightElement }: SchedulerProps) {
  const [rules, setRules] = useState([
    { id: 1, title: "실시간 X 트렌드", time: "24시간 활성", active: true, posts: 42, lastTrigger: "3분 전" },
    { id: 2, title: "AI/크립토 트렌드 모니터링", time: "24시간 활성", active: true, posts: 34, lastTrigger: "8분 전" },
    { id: 3, title: "테크 기업 발표 추적", time: "이벤트 발생시", active: true, posts: 18, lastTrigger: "1시간 전" },
    { id: 4, title: "K-POP 신곡/컴백 알림", time: "자동 감지", active: true, posts: 12, lastTrigger: "3시간 전" },
    { id: 5, title: "e스포츠 경기 결과", time: "경기 종료 후", active: true, posts: 9, lastTrigger: "5시간 전" },
    { id: 6, title: "아침 시장 브리핑", time: "매일 08:30", active: false, posts: 0, lastTrigger: "-" },
    { id: 7, title: "저녁 일일 요약", time: "매일 19:00", active: false, posts: 0, lastTrigger: "-" },
  ]);

  const activeRules = rules.filter(r => r.active).length;
  const totalPosts = rules.reduce((sum, r) => sum + r.posts, 0);

  const handleToggleRule = (id: number) => {
    setRules(prevRules => 
      prevRules.map(rule => 
        rule.id === id ? { ...rule, active: !rule.active } : rule
      )
    );
  };

  const getHighlightStyle = (elementId: string) => {
    if (highlightElement === elementId) {
      return "outline outline-4 outline-red-500 outline-offset-4 shadow-[0_0_20px_rgba(239,68,68,0.5)] relative z-10";
    }
    return "";
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      <div className="bg-[#F9FAFB] px-5 pt-16 pb-3">
        <h1 className="ios-large-title text-[#111827]">스케줄</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Stats Summary */}
        <div className="px-5 pt-5 pb-4">
          <div className="ios-card">
            <div className="px-4 py-3.5 border-b border-[#E5E7EB]">
              <p className="ios-headline text-[#111827]">자동화 현황</p>
              <p className="ios-caption-1 text-[#8E8E93] mt-0.5">{formatKoreanDate()} 기준</p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-[#E5E7EB]">
              <div className="p-4 text-center">
                <p className="ios-title-2 text-[#111827] mb-1 transition-all" style={{ fontWeight: 600 }}>{activeRules}</p>
                <p className="ios-caption-1 text-[#8E8E93]">활성 규칙</p>
              </div>
              <div className="p-4 text-center">
                <p className="ios-title-2 text-[#111827] mb-1" style={{ fontWeight: 600 }}>{totalPosts}</p>
                <p className="ios-caption-1 text-[#8E8E93]">이번 주</p>
              </div>
              <div className="p-4 text-center">
                <p className="ios-title-2 text-[#34C759] mb-1" style={{ fontWeight: 600 }}>97%</p>
                <p className="ios-caption-1 text-[#8E8E93]">성공률</p>
              </div>
            </div>
          </div>
        </div>

        {/* Automation Rules */}
        <div className={`px-5 pb-4 transition-all duration-300 ${getHighlightStyle("schedule-list")}`} id="schedule-list">
          <div className="flex items-center justify-between mb-3 px-0.5">
            <h2 className="ios-headline text-[#111827]">자동화 규칙</h2>
            <span className="ios-caption-1 text-[#8E8E93]">{rules.length}개</span>
          </div>
          <div className="ios-card">
            {rules.map((rule, idx) => (
              <div key={rule.id}>
                {idx > 0 && <div className="ios-separator ios-separator-inset"></div>}
                <div className="px-4 py-3.5 flex items-center justify-between ios-touchable">
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="ios-body text-[#111827]" style={{ fontWeight: 500 }}>{rule.title}</p>
                      {rule.active && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#34C759]"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="ios-caption-2 text-[#8E8E93]">{rule.time}</p>
                      {rule.posts > 0 && (
                        <>
                          <span className="ios-caption-2 text-[#8E8E93]">·</span>
                          <p className="ios-caption-2 text-[#8E8E93]">{rule.posts}건</p>
                          <span className="ios-caption-2 text-[#8E8E93]">·</span>
                          <p className="ios-caption-2 text-[#007AFF]">{rule.lastTrigger}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleToggleRule(rule.id)}
                    className={`w-12 h-7 rounded-full p-0.5 transition-colors ${
                      rule.active ? 'bg-[#34C759]' : 'bg-[#E5E7EB]'
                    } ${idx === 0 ? getHighlightStyle("schedule-toggle") : ""}`}
                    id={idx === 0 ? "schedule-toggle" : undefined}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                      rule.active ? 'translate-x-5' : ''
                    }`}></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Button */}
        <div className="px-5 pb-5">
          <button
            onClick={onOpenNewSchedule}
            className={`w-full ios-card px-4 py-3.5 flex items-center justify-center gap-2 ios-button-primary transition-all duration-300 ${getHighlightStyle("add-button")}`}
            id="add-button"
          >
            <Plus className="w-5 h-5 text-[#007AFF]" strokeWidth={2.5} />
            <span className="ios-body text-[#007AFF]" style={{ fontWeight: 600 }}>새 규칙 추가</span>
          </button>
        </div>

        {/* Quick Tips */}
        <div className="px-5 pb-5">
          <div className="bg-[#F2F3F5] rounded-xl p-4">
            <p className="ios-footnote text-[#8E8E93] mb-2">💡 자동화 팁</p>
            <p className="ios-caption-1 text-[#6B7280]">
              트렌드 모니터링을 활성화하면 OpenAI DevDay, Apple 이벤트 같은 주요 발표를 실시간으로 감지하여 최적 타이밍에 포스팅합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}