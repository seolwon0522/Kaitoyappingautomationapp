import { Plus } from "lucide-react";
import { useState } from "react";
import { automationRules, systemMetrics } from "../data";
import { DEMO_NOW, formatMonthLabel } from "../utils/date";

interface SchedulerProps {
  onNavigate: (screen: string) => void;
  onOpenNewSchedule: () => void;
}

export function Scheduler({ onNavigate, onOpenNewSchedule }: SchedulerProps) {
  const [rules, setRules] = useState(automationRules);

  const activeRules = rules.filter(r => r.active).length;
  const totalPosts = rules.reduce((sum, r) => sum + r.posts, 0);

  const handleToggleRule = (id: number) => {
    setRules(prevRules => 
      prevRules.map(rule => 
        rule.id === id ? { ...rule, active: !rule.active } : rule
      )
    );
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
              <p className="ios-caption-1 text-[#8E8E93] mt-0.5">{formatMonthLabel(DEMO_NOW)}</p>
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
                <p className="ios-title-2 text-[#34C759] mb-1" style={{ fontWeight: 600 }}>{systemMetrics.automationSuccess}%</p>
                <p className="ios-caption-1 text-[#8E8E93]">성공률</p>
              </div>
            </div>
          </div>
        </div>

        {/* Automation Rules */}
        <div className="px-5 pb-4">
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
                    }`}
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
            className="w-full ios-card px-4 py-3.5 flex items-center justify-center gap-2 ios-button-primary"
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
