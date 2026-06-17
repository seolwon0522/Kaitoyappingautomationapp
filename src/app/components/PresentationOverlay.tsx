import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PresentationFlow, FlowStep } from "../types/presentation";

interface PresentationOverlayProps {
  flow: PresentationFlow;
  step: FlowStep;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

export function PresentationOverlay({ 
  flow, 
  step, 
  onPrev,
  onNext,
  onClose 
}: PresentationOverlayProps) {
  const stepNumber = step.stepNumber;
  const totalSteps = flow.steps.length;
  
  return (
    <>
      {/* Top Indicator */}
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-b from-black/60 to-transparent pointer-events-none overflow-visible">
        <div className="mx-auto max-w-[393px] px-4 pt-12 pb-2 relative overflow-visible">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-4 py-2.5 shadow-2xl border border-white/20 pointer-events-auto absolute right-[-320px] top-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="ios-caption-2 text-[#8E8E93] truncate">📍 {flow.name}</p>
                <p className="ios-caption-1 text-[#111827] truncate mt-0.5" style={{ fontWeight: 600 }}>{step.stepName}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1 bg-[#007AFF] rounded-full">
                  <span className="ios-caption-2 text-white" style={{ fontWeight: 600 }}>
                    {stepNumber}/{totalSteps}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-full bg-[#F2F2F7] flex items-center justify-center active:scale-95 transition-transform"
                >
                  <X className="w-4 h-4 text-[#8E8E93]" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-gradient-to-t from-black/80 to-transparent pointer-events-none pb-safe">
        <div className="mx-auto max-w-[393px] px-4 pb-8 pt-6">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-2xl border border-white/20 pointer-events-auto">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={onPrev}
                disabled={stepNumber === 1}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                  stepNumber === 1
                    ? 'bg-[#F2F2F7] text-[#C7C7CC] cursor-not-allowed'
                    : 'bg-[#F2F2F7] text-[#007AFF] active:scale-95'
                }`}
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                <span className="ios-body" style={{ fontWeight: 600 }}>이전</span>
              </button>
              <button
                onClick={onNext}
                disabled={stepNumber === totalSteps}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                  stepNumber === totalSteps
                    ? 'bg-[#F2F2F7] text-[#C7C7CC] cursor-not-allowed'
                    : 'bg-[#007AFF] text-white active:scale-95'
                }`}
              >
                <span className="ios-body" style={{ fontWeight: 600 }}>다음</span>
                <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
            <div className="mt-3 flex gap-1.5">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div
                  key={idx}
                  className={`flex-1 h-1 rounded-full transition-all ${
                    idx + 1 === stepNumber
                      ? 'bg-[#007AFF]'
                      : idx + 1 < stepNumber
                      ? 'bg-[#34C759]'
                      : 'bg-[#E5E7EB]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}