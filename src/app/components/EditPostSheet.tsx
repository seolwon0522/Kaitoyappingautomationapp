import { X } from "lucide-react";
import { useState, useMemo } from "react";

interface EditPostSheetProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
  onSave: (updatedPost: any) => void;
  highlightElement?: string | null;
}

export function EditPostSheet({ isOpen, onClose, onSave, post, highlightElement }: EditPostSheetProps) {
  const [content, setContent] = useState(post?.content || "");
  const [scheduledTime, setScheduledTime] = useState(post?.scheduledTime || "");
  const [selectedCoin, setSelectedCoin] = useState(post?.coin || "AI16Z");

  const getHighlightStyle = (elementId: string) => {
    if (highlightElement === elementId) {
      return "outline outline-4 outline-red-500 outline-offset-4 shadow-[0_0_20px_rgba(239,68,68,0.5)] relative z-10";
    }
    return "";
  };

  const coins = [
    { name: "AI16Z", color: "#007AFF", engagement: 87, earnings: "+$24.50" },
    { name: "ELIZA", color: "#5856D6", engagement: 82, earnings: "+$19.20" },
    { name: "VIRTUAL", color: "#34C759", engagement: 79, earnings: "+$18.40" },
    { name: "ZEREBRO", color: "#FF9500", engagement: 74, earnings: "+$15.80" },
    { name: "AIXBT", color: "#FF2D55", engagement: 81, earnings: "+$21.30" },
    { name: "GOAT", color: "#5AC8FA", engagement: 76, earnings: "+$16.90" },
    { name: "FARTCOIN", color: "#AF52DE", engagement: 72, earnings: "+$14.20" },
    { name: "GRIFFAIN", color: "#FF3B30", engagement: 78, earnings: "+$17.60" },
  ];

  // 코인 변경 시 자동으로 예상값 재계산
  const coinStats = useMemo(() => {
    const coin = coins.find(c => c.name === selectedCoin);
    return coin || coins[0];
  }, [selectedCoin]);

  const handleSave = () => {
    onSave({
      ...post,
      content,
      scheduledTime,
      coin: selectedCoin,
      engagement: coinStats.engagement,
      earnings: coinStats.earnings,
    });
    onClose();
  };

  // Don't render if not open or post is null
  if (!isOpen || !post) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
      <div className="w-full max-w-[393px] pointer-events-auto">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
          style={{
            animation: isOpen ? 'fadeIn 0.2s ease-out' : 'fadeOut 0.2s ease-out'
          }}
        ></div>

        {/* Sheet */}
        <div 
          className="relative bg-white rounded-t-[20px] pb-8"
          style={{
            animation: isOpen ? 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-9 h-1 bg-[#C7C7CC] rounded-full"></div>
          </div>

          {/* Header */}
          <div className="px-5 py-3 border-b border-[#E5E7EB] flex items-center justify-between">
            <h2 className="ios-headline text-[#111827]">포스팅 수정</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F2F3F5] flex items-center justify-center ios-button-primary"
            >
              <X className="w-5 h-5 text-[#8E8E93]" strokeWidth={2.5} />
            </button>
          </div>

          {/* Content */}
          <div className="px-5 py-4 max-h-[60vh] overflow-y-auto pb-32">
            {/* Coin Badge */}
            <div className="mb-4">
              <p className="ios-caption-1 text-[#8E8E93] mb-2">코인</p>
              <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className={`w-full p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg ios-body text-[#111827] transition-all duration-300 ${getHighlightStyle('coin-selector')}`}
                id="coin-selector"
              >
                {coins.map((coin) => (
                  <option key={coin.name} value={coin.name} style={{ color: coin.color }}>
                    ${coin.name}
                  </option>
                ))}
              </select>
              
              {/* Coin Badge Preview with highlight */}
              <div className={`mt-2 transition-all duration-300 ${getHighlightStyle('coin-badge')}`} id="coin-badge">
                <span className="px-3 py-1.5 bg-[#007AFF] rounded-full ios-caption-1 text-white inline-block" style={{ fontWeight: 600 }}>
                  ${selectedCoin}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <p className="ios-caption-1 text-[#8E8E93] mb-2">내용</p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`w-full p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg ios-body text-[#111827] resize-none transition-all duration-300 ${getHighlightStyle('edit-textarea')}`}
                id="edit-textarea"
                rows={8}
                placeholder="포스팅 내용을 입력하세요..."
              />
            </div>

            {/* Scheduled Time */}
            <div className="mb-4">
              <p className="ios-caption-1 text-[#8E8E93] mb-2">예약 시간</p>
              <input
                type="text"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className={`w-full p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg ios-body text-[#111827] ${getHighlightStyle('scheduledTime')}`}
                placeholder="예: 오후 3:30"
              />
            </div>

            {/* Stats - with highlight wrapper */}
            <div className={`transition-all duration-300 ${getHighlightStyle('revenue-estimate')}`} id="revenue-estimate">
              <div className="p-3 bg-[#F9FAFB] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="ios-caption-1 text-[#8E8E93]">예상 인게이지먼트</span>
                  <span className="ios-caption-1 text-[#007AFF]" style={{ fontWeight: 600 }}>{coinStats.engagement}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="ios-caption-1 text-[#8E8E93]">예상 수익</span>
                  <span className="ios-caption-1 text-[#34C759]" style={{ fontWeight: 600 }}>{coinStats.earnings}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-5 pt-4 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] ios-button-primary"
            >
              <span className="ios-body text-[#111827]" style={{ fontWeight: 500 }}>취소</span>
            </button>
            <button
              onClick={handleSave}
              className={`flex-1 py-3.5 bg-[#007AFF] rounded-xl ios-button-primary transition-all duration-300 ${getHighlightStyle("edit-save-button")}`}
              id="edit-save-button"
            >
              <span className="ios-body text-white" style={{ fontWeight: 600 }}>저장</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes slideDown {
          from { transform: translateY(0); }
          to { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}