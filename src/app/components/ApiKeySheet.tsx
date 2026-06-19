import { X, Eye, EyeOff, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";
import { subDays } from "date-fns";
import { formatDateDot, formatDateTime24 } from "../utils/date";

interface ApiKeySheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
  currentApiKey?: string;
  highlightElement?: string | null;
}

export function ApiKeySheet({ isOpen, onClose, onSave, currentApiKey = "", highlightElement }: ApiKeySheetProps) {
  const [apiKey, setApiKey] = useState(currentApiKey || "xkeybP9nVFDKDGPj0eN0aR9Yt");
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getHighlightStyle = (elementId: string) => {
    if (highlightElement === elementId) {
      return "outline outline-4 outline-red-500 outline-offset-4 shadow-[0_0_20px_rgba(239,68,68,0.5)] relative z-10";
    }
    return "";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast.success("클립보드에 복사되었습니다!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("API 키를 입력해주세요!");
      return;
    }
    onSave(apiKey);
    toast.success("트위터 API 키가 저장되었습니다!");
    onClose();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowKey(true);
  };

  const handleCancel = () => {
    setApiKey(currentApiKey || "xkeybP9nVFDKDGPj0eN0aR9Yt");
    setIsEditing(false);
  };

  const handleRegenerate = () => {
    const newKey = `xkeyb${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    toast.success("새로운 API 키가 생성되었습니다!");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[101] mx-auto max-w-[393px]"
          >
            <div className="bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
              {/* Handle Bar */}
              <div className="flex justify-center pt-2 pb-1">
                <div className="w-9 h-1 bg-[#C7C7CC] rounded-full"></div>
              </div>

              {/* Header */}
              <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
                <h2 className="ios-title-2 text-[#111827]">API 키 관리</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center ios-touchable"
                >
                  <X className="w-4.5 h-4.5 text-[#8E8E93]" strokeWidth={2.5} />
                </button>
              </div>

              {/* Content */}
              <div className="px-5 py-6 space-y-6">
                {/* Info Banner */}
                <div className="bg-[#F0F9FF] border border-[#BFDBFE] rounded-xl p-4">
                  <p className="ios-caption-1 text-[#1E40AF]" style={{ fontWeight: 600 }}>
                    🔑 트위터 API 키
                  </p>
                  <p className="ios-caption-1 text-[#3B82F6] mt-1">
                    트위터 개발자 포털에서 발급받은 API 키를 입력하세요.
                  </p>
                </div>

                {/* API Key Input */}
                <div>
                  <label className="ios-caption-1 text-[#8E8E93] mb-2 block">
                    {isEditing ? "새 API 키 입력" : "현재 API 키"}
                  </label>
                  <div className={`ios-card p-4 transition-all duration-300 ${getHighlightStyle("api-key-input")}`} id="api-key-input">
                    {isEditing ? (
                      <div className="space-y-3">
                        <input
                          type={showKey ? "text" : "password"}
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          placeholder="트위터 API 키를 입력하세요"
                          className="w-full px-3 py-2.5 bg-[#F2F2F7] rounded-lg font-mono text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#007AFF] placeholder:text-[#C7C7CC]"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowKey(!showKey)}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#F2F2F7] ios-touchable"
                          >
                            {showKey ? (
                              <EyeOff className="w-4 h-4 text-[#8E8E93]" strokeWidth={2} />
                            ) : (
                              <Eye className="w-4 h-4 text-[#8E8E93]" strokeWidth={2} />
                            )}
                            <span className="ios-caption-1 text-[#111827]" style={{ fontWeight: 600 }}>
                              {showKey ? "숨기기" : "보기"}
                            </span>
                          </button>
                          <button
                            onClick={handleCancel}
                            className="flex-1 flex items-center justify-center py-2.5 rounded-lg border border-[#E5E7EB] ios-touchable"
                          >
                            <span className="ios-caption-1 text-[#8E8E93]" style={{ fontWeight: 600 }}>
                              취소
                            </span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 font-mono text-sm text-[#111827] break-all">
                            {showKey ? apiKey : `${"•".repeat(Math.min(apiKey.length - 8, 50))}${apiKey.slice(-8)}`}
                          </div>
                          <button
                            onClick={() => setShowKey(!showKey)}
                            className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#F2F2F7] flex items-center justify-center ios-touchable"
                          >
                            {showKey ? (
                              <EyeOff className="w-4.5 h-4.5 text-[#8E8E93]" strokeWidth={2} />
                            ) : (
                              <Eye className="w-4.5 h-4.5 text-[#8E8E93]" strokeWidth={2} />
                            )}
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleCopy}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#F2F2F7] ios-touchable"
                          >
                            {copied ? (
                              <>
                                <Check className="w-4 h-4 text-[#34C759]" strokeWidth={2.5} />
                                <span className="ios-caption-1 text-[#34C759]" style={{ fontWeight: 600 }}>
                                  복사됨
                                </span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 text-[#8E8E93]" strokeWidth={2} />
                                <span className="ios-caption-1 text-[#111827]" style={{ fontWeight: 600 }}>
                                  복사
                                </span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={handleEdit}
                            className="flex-1 flex items-center justify-center py-2.5 rounded-lg bg-[#007AFF] ios-touchable"
                          >
                            <span className="ios-caption-1 text-white" style={{ fontWeight: 600 }}>
                              변경
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* API Key Stats */}
                <div>
                  <label className="ios-caption-1 text-[#8E8E93] mb-2 block">
                    사용 현황
                  </label>
                  <div className="ios-card divide-y divide-[#E5E7EB]">
                    <div className="px-4 py-3 flex items-center justify-between">
                      <span className="ios-body text-[#6B7280]">등록일</span>
                      <span className="ios-body text-[#111827]" style={{ fontWeight: 600 }}>
                        {formatDateDot(subDays(new Date(), 12))}
                      </span>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <span className="ios-body text-[#6B7280]">마지막 사용</span>
                      <span className="ios-body text-[#111827]" style={{ fontWeight: 600 }}>
                        {formatDateTime24()}
                      </span>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <span className="ios-body text-[#6B7280]">총 요청 수</span>
                      <span className="ios-body text-[#111827]" style={{ fontWeight: 600 }}>
                        1,247회
                      </span>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <span className="ios-body text-[#6B7280]">상태</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#34C759] rounded-full"></div>
                        <span className="ios-body text-[#34C759]" style={{ fontWeight: 600 }}>
                          활성화
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* How to Get API Key */}
                <div className="bg-[#FEF9E7] border border-[#FDE68A] rounded-xl p-4">
                  <p className="ios-caption-1 text-[#92400E]" style={{ fontWeight: 600 }}>
                    💡 API 키 발급 방법
                  </p>
                  <p className="ios-caption-1 text-[#B45309] mt-1">
                    트위터 개발자 포털 → Projects & Apps → Keys and Tokens에서 발급
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 pb-8 pt-2">
                <button
                  onClick={handleSave}
                  className="w-full bg-[#007AFF] py-3.5 rounded-xl ios-button-primary"
                >
                  <span className="ios-body text-white" style={{ fontWeight: 600 }}>
                    {isEditing ? "저장하기" : "완료"}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}