import { X } from "lucide-react";
import { useState } from "react";

interface EditPostSheetProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
  onSave: (updatedPost: any) => void;
}

export function EditPostSheet({ isOpen, onClose, post, onSave }: EditPostSheetProps) {
  const [content, setContent] = useState(post?.content || "");
  const [scheduledTime, setScheduledTime] = useState(post?.scheduledTime || "");

  if (!isOpen || !post) return null;

  const handleSave = () => {
    onSave({
      ...post,
      content,
      scheduledTime,
    });
    onClose();
  };

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
          <div className="px-5 py-4 max-h-[70vh] overflow-y-auto">
            {/* Coin Badge */}
            <div className="mb-4">
              <p className="ios-caption-1 text-[#8E8E93] mb-2">코인</p>
              <span className="px-3 py-1.5 bg-[#007AFF] rounded-full ios-subhead text-white" style={{ fontWeight: 600 }}>
                ${post.coin}
              </span>
            </div>

            {/* Content */}
            <div className="mb-4">
              <p className="ios-caption-1 text-[#8E8E93] mb-2">내용</p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg ios-body text-[#111827] resize-none"
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
                className="w-full p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg ios-body text-[#111827]"
                placeholder="예: 오후 3:30"
              />
            </div>

            {/* Stats */}
            <div className="p-3 bg-[#F9FAFB] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="ios-caption-1 text-[#8E8E93]">예상 인게이지먼트</span>
                <span className="ios-caption-1 text-[#007AFF]" style={{ fontWeight: 600 }}>{post.engagement}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="ios-caption-1 text-[#8E8E93]">예상 수익</span>
                <span className="ios-caption-1 text-[#34C759]" style={{ fontWeight: 600 }}>{post.earnings}</span>
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
              className="flex-1 py-3.5 bg-[#007AFF] rounded-xl ios-button-primary"
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
