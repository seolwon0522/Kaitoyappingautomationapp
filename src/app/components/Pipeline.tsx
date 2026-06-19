import { motion } from "motion/react";
import { ChevronDown, Database, Layers, Sparkles, Users } from "lucide-react";
import { teamInfo } from "../data";

const STAGE_COLORS = ["#007AFF", "#5856D6", "#AF52DE", "#FF9500", "#34C759"];

export function Pipeline() {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] as const },
  });

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      <div className="bg-[#F9FAFB] px-5 pt-16 pb-3">
        <h1 className="ios-large-title text-[#111827]">시스템</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Project Hero */}
        <div className="px-5 pt-5 pb-4">
          <motion.div
            {...fadeUp(0)}
            className="rounded-[18px] p-5 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #007AFF 0%, #5856D6 100%)",
              boxShadow: "0 8px 28px rgba(0, 122, 255, 0.28)",
            }}
          >
            <p className="ios-caption-1 text-white/80 mb-1">{teamInfo.team}</p>
            <p className="text-white ios-title-3 mb-2" style={{ fontWeight: 700 }}>
              {teamInfo.project}
            </p>
            <p className="ios-caption-1 text-white/90">{teamInfo.subtitle}</p>
          </motion.div>
        </div>

        {/* Pipeline Stages */}
        <div className="px-5 pb-4">
          <div className="flex items-center gap-2 mb-3 px-0.5">
            <Sparkles className="w-4 h-4 text-[#007AFF]" />
            <h2 className="ios-headline text-[#111827]">처리 파이프라인</h2>
          </div>
          <div className="space-y-0">
            {teamInfo.pipeline.map((stage, idx) => {
              const color = STAGE_COLORS[idx % STAGE_COLORS.length];
              return (
                <div key={stage.step}>
                  <motion.div {...fadeUp(0.08 * idx)} className="ios-card p-4 flex items-start gap-3.5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: color }}
                    >
                      <span className="text-white" style={{ fontWeight: 700, fontSize: 15 }}>
                        {stage.step}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="ios-body text-[#111827]" style={{ fontWeight: 600 }}>
                        {stage.title}
                      </p>
                      <p className="ios-caption-1 text-[#8E8E93] mb-1.5">{stage.desc}</p>
                      <span
                        className="inline-block px-2.5 py-1 rounded-full"
                        style={{ background: `${color}14` }}
                      >
                        <span className="ios-caption-2" style={{ color, fontWeight: 600 }}>
                          {stage.tech}
                        </span>
                      </span>
                    </div>
                  </motion.div>
                  {idx < teamInfo.pipeline.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ChevronDown className="w-4 h-4 text-[#C7C7CC]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Architecture Layers */}
        <div className="px-5 pb-4">
          <div className="flex items-center gap-2 mb-3 px-0.5">
            <Layers className="w-4 h-4 text-[#5856D6]" />
            <h2 className="ios-headline text-[#111827]">4계층 아키텍처</h2>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {teamInfo.layers.map((layer, idx) => (
              <motion.div key={layer.name} {...fadeUp(0.06 * idx)} className="ios-card p-3.5">
                <p className="ios-subhead text-[#111827]" style={{ fontWeight: 600 }}>
                  {layer.name}
                </p>
                <p className="ios-caption-2 text-[#8E8E93] mt-1">{layer.tech}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Database Tables */}
        <div className="px-5 pb-4">
          <div className="flex items-center gap-2 mb-3 px-0.5">
            <Database className="w-4 h-4 text-[#34C759]" />
            <h2 className="ios-headline text-[#111827]">데이터베이스 · 5개 테이블</h2>
          </div>
          <div className="ios-card">
            {teamInfo.tables.map((table, idx) => (
              <div key={table.name}>
                {idx > 0 && <div className="ios-separator ios-separator-inset"></div>}
                <div className="px-4 py-3 flex items-center gap-3">
                  <span
                    className="ios-caption-1 px-2 py-0.5 rounded-md font-mono"
                    style={{ background: "#F2F3F5", color: "#5856D6", fontWeight: 600 }}
                  >
                    {table.name}
                  </span>
                  <p className="ios-caption-1 text-[#6B7280] flex-1">{table.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GPT Params */}
        <div className="px-5 pb-4">
          <h2 className="ios-headline text-[#111827] mb-3 px-0.5">AI 트윗 생성 설정</h2>
          <div className="ios-card p-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "최대 글자", value: `${teamInfo.gpt.maxChars}자` },
                { label: "temperature", value: `${teamInfo.gpt.temperature}` },
                { label: "재생성", value: `${teamInfo.gpt.maxRetries}회` },
                { label: "참고 이력", value: `${teamInfo.gpt.historyCount}개` },
                { label: "캐시 TTL", value: teamInfo.gpt.cacheTtl },
                { label: "반복 방지", value: "ON" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="ios-subhead text-[#007AFF]" style={{ fontWeight: 600 }}>
                    {item.value}
                  </p>
                  <p className="ios-caption-2 text-[#8E8E93] mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="px-5 pb-5">
          <div className="flex items-center gap-2 mb-3 px-0.5">
            <Users className="w-4 h-4 text-[#FF9500]" />
            <h2 className="ios-headline text-[#111827]">{teamInfo.team}</h2>
          </div>
          <div className="ios-card">
            {teamInfo.members.map((member, idx) => (
              <div key={member.name}>
                {idx > 0 && <div className="ios-separator ios-separator-inset"></div>}
                <div className="px-4 py-3.5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center shrink-0">
                    <span className="text-white ios-caption-1" style={{ fontWeight: 600 }}>
                      {member.name.slice(1)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="ios-body text-[#111827]" style={{ fontWeight: 600 }}>
                        {member.name}
                      </p>
                      <span className="ios-caption-2 text-[#007AFF]" style={{ fontWeight: 600 }}>
                        {member.role}
                      </span>
                    </div>
                    <p className="ios-caption-1 text-[#8E8E93] mt-0.5">{member.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
