interface OnboardingProps {
  onComplete: () => void;
  onConnect: () => void;
  highlightElement?: string | null;
}

export function Onboarding({ onComplete, onConnect, highlightElement }: OnboardingProps) {
  const getHighlightStyle = (elementId: string) => {
    if (highlightElement === elementId) {
      return "outline outline-4 outline-red-500 outline-offset-4 shadow-[0_0_20px_rgba(239,68,68,0.5)] relative z-10";
    }
    return "";
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white px-6 py-16">
      <div></div>
      
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-[#000000] rounded-[20px] flex items-center justify-center mb-8 shadow-sm">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"/>
          </svg>
        </div>
        
        <h1 className="ios-title-1 text-center mb-3 text-[#111827]">
          야핑 자동화
        </h1>
        
        <p className="ios-body text-center text-[#6B7280] mb-2 max-w-sm">
          실시간 트렌드 분석부터
        </p>
        <p className="ios-body text-center text-[#6B7280] mb-10 max-w-sm">
          스케줄 포스팅까지 자동으로
        </p>

        <div className="flex gap-2 flex-wrap justify-center mb-2">
          <div className="px-3 py-2 bg-[#F9FAFB] rounded-full border border-[#E5E7EB]">
            <span className="ios-caption-1 text-[#6B7280]">실시간 분석</span>
          </div>
          <div className="px-3 py-2 bg-[#F9FAFB] rounded-full border border-[#E5E7EB]">
            <span className="ios-caption-1 text-[#6B7280]">자동 포스팅</span>
          </div>
          <div className="px-3 py-2 bg-[#F9FAFB] rounded-full border border-[#E5E7EB]">
            <span className="ios-caption-1 text-[#6B7280]">수익 트래킹</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-3">
        <button
          onClick={onConnect}
          className={`w-full bg-[#007AFF] text-white py-4 rounded-[14px] shadow-sm ios-button-primary flex items-center justify-center transition-all duration-300 ${getHighlightStyle("connect-button")}`}
          id="connect-button"
        >
          <span className="ios-body text-white" style={{ fontWeight: 600 }}>X 계정 연결하기</span>
        </button>
        
        <button
          onClick={onComplete}
          className="w-full bg-[#F9FAFB] text-[#007AFF] py-4 rounded-[14px] border border-[#E5E7EB] ios-button-primary flex items-center justify-center"
        >
          <span className="ios-body text-[#007AFF]" style={{ fontWeight: 600 }}>둘러보기</span>
        </button>

        <p className="ios-caption-2 text-[#C7C7CC] text-center pt-2">
          Version 1.2.0
        </p>
      </div>
    </div>
  );
}