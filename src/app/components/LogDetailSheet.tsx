import { X, RefreshCw, CheckCircle, XCircle, Clock, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LogDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  log: any;
  highlightElement?: string | null;
}

export function LogDetailSheet({ isOpen, onClose, log, highlightElement }: LogDetailSheetProps) {
  if (!isOpen || !log) return null;

  const getHighlightStyle = (elementId: string) => {
    if (highlightElement === elementId) {
      return "outline outline-4 outline-red-500 outline-offset-4 shadow-[0_0_20px_rgba(239,68,68,0.5)] relative z-10";
    }
    return "";
  };

  const getStatusIcon = () => {
    switch (log.status) {
      case "success":
        return <CheckCircle className="w-12 h-12 text-[#34C759]" />;
      case "failed":
        return <XCircle className="w-12 h-12 text-[#FF3B30]" />;
      case "pending":
        return <Clock className="w-12 h-12 text-[#FF9500]" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (log.status) {
      case "success":
        return "포스팅 성공";
      case "failed":
        return "포스팅 실패";
      case "pending":
        return "대기 중";
      default:
        return "";
    }
  };

  const getStatusColor = () => {
    switch (log.status) {
      case "success":
        return "text-[#34C759]";
      case "failed":
        return "text-[#FF3B30]";
      case "pending":
        return "text-[#FF9500]";
      default:
        return "text-[#8E8E93]";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-30"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[393px] bg-white rounded-t-3xl shadow-2xl transition-all duration-300 ${getHighlightStyle("detail-sheet")}`}
        id="detail-sheet"
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#C6C6C8] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4 border-b border-[#C6C6C8]">
          <div className="w-8" />
          <h2 className="text-[#1C1C1E]">포스팅 상세</h2>
          <button onClick={onClose} className="text-[#007AFF]">
            닫기
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-6 max-h-[70vh] overflow-y-auto">
          {/* Status */}
          <div className="flex flex-col items-center mb-6">
            {getStatusIcon()}
            <p className={`text-xl mt-3 ${getStatusColor()}`}>{getStatusText()}</p>
            <p className="text-sm text-[#8E8E93] mt-1">
              {log.timestamp} {log.time}
            </p>
          </div>

          {/* Post Preview */}
          <div className="mb-6">
            <p className="text-sm text-[#8E8E93] mb-2">포스팅 미리보기</p>
            <div className="bg-[#F2F2F7] rounded-xl overflow-hidden">
              {log.image && (
                <img
                  src={log.image}
                  alt="Post image"
                  className="w-full aspect-[16/9] object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <div className="p-4">
                <p className="text-[#1C1C1E] whitespace-pre-line">{log.content}</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="mb-6">
            <p className="text-sm text-[#8E8E93] mb-2">상세 정보</p>
            <div className="ios-card divide-y divide-[#C6C6C8]">
              <div className="p-4 flex justify-between">
                <span className="text-[#8E8E93]">상태</span>
                <span className={getStatusColor()}>{getStatusText()}</span>
              </div>
              <div className="p-4 flex justify-between">
                <span className="text-[#8E8E93]">포스팅 시간</span>
                <span className="text-[#1C1C1E]">{log.time}</span>
              </div>
              <div className="p-4 flex justify-between">
                <span className="text-[#8E8E93]">날짜</span>
                <span className="text-[#1C1C1E]">{log.timestamp}</span>
              </div>
              <div className="p-4 flex justify-between">
                <span className="text-[#8E8E93]">플랫폼</span>
                <span className="text-[#1C1C1E]">X (Twitter)</span>
              </div>
              {log.status === "failed" && (
                <div className="p-4 flex justify-between">
                  <span className="text-[#8E8E93]">오류 메시지</span>
                  <span className="text-[#FF3B30]">API 응답 없음</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {log.status === "failed" && (
              <button
                onClick={() => {
                  onResend();
                  onClose();
                }}
                className="w-full bg-[#007AFF] text-white py-4 rounded-xl ios-button flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                재전송 시뮬레이션
              </button>
            )}
            
            {log.status === "success" && (
              <button className="w-full bg-[#F2F2F7] text-[#007AFF] py-4 rounded-xl ios-button flex items-center justify-center">
                <Share2 className="w-5 h-5 mr-2" />
                포스트 보기
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full bg-[#F2F2F7] text-[#8E8E93] py-4 rounded-xl ios-button"
            >
              닫기
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}