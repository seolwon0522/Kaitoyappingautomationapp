import { X, Clock, Image } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface NewScheduleSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function NewScheduleSheet({ isOpen, onClose, onSuccess }: NewScheduleSheetProps) {
  const [content, setContent] = useState("");
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [autoImage, setAutoImage] = useState(true);
  const [aiGenerate, setAiGenerate] = useState(true);

  const handleSubmit = () => {
    onSuccess();
    onClose();
    setContent("");
    setSelectedTime("09:00");
  };

  if (!isOpen) return null;

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
        className="w-full max-w-[393px] bg-white rounded-t-3xl shadow-2xl"
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#C6C6C8] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4 border-b border-[#C6C6C8]">
          <button onClick={onClose} className="text-[#007AFF]">
            취소
          </button>
          <h2 className="text-[#1C1C1E]">새 야핑 예약</h2>
          <button onClick={handleSubmit} className="text-[#007AFF]">
            완료
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-6 max-h-[70vh] overflow-y-auto">
          {/* AI Auto Generate Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#007AFF]/10 to-[#5856D6]/10 rounded-xl border border-[#007AFF]/20">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-[#007AFF] to-[#5856D6] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#1C1C1E]">AI 자동 생성</p>
                  <p className="text-xs text-[#8E8E93]">실시간 트렌드 분석</p>
                </div>
              </div>
              <button
                onClick={() => setAiGenerate(!aiGenerate)}
                className="flex-shrink-0"
              >
                <div
                  className={`w-12 h-7 rounded-full p-0.5 transition-colors ${
                    aiGenerate ? "bg-gradient-to-r from-[#007AFF] to-[#5856D6]" : "bg-[#E5E5EA]"
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full transition-transform ${
                      aiGenerate ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Text Input */}
          {!aiGenerate && (
            <div className="mb-6">
              <label className="text-sm text-[#8E8E93] mb-2 block">포스팅 내용 (수동 입력)</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="예: aespa 신곡 미쳤다 ㄷㄷ 이번엔 레전드 찍었네 🔥 #aespa #Kpop #AIXBT"
                className="w-full p-4 bg-[#F2F2F7] rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#007AFF] resize-none"
                rows={4}
              />
            </div>
          )}

          {aiGenerate && (
            <div className="mb-6">
              <label className="text-sm text-[#8E8E93] mb-2 block">AI가 분석할 트렌드 카테고리</label>
              <div className="bg-[#F2F2F7] rounded-xl overflow-hidden">
                <button className="w-full p-4 flex items-center justify-between text-left ios-list-item">
                  <span className="text-[#1C1C1E]">전체 트렌드 (추천)</span>
                  <svg className="w-5 h-5 text-[#007AFF]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="h-px bg-[#C6C6C8] mx-4" />
                <button className="w-full p-4 flex items-center justify-between text-left ios-list-item">
                  <span className="text-[#8E8E93]">엔터테인먼트</span>
                </button>
                <div className="h-px bg-[#C6C6C8] mx-4" />
                <button className="w-full p-4 flex items-center justify-between text-left ios-list-item">
                  <span className="text-[#8E8E93]">스포츠</span>
                </button>
                <div className="h-px bg-[#C6C6C8] mx-4" />
                <button className="w-full p-4 flex items-center justify-between text-left ios-list-item">
                  <span className="text-[#8E8E93]">테크</span>
                </button>
              </div>
            </div>
          )}

          {/* Time Picker */}
          <div className="mb-6">
            <label className="text-sm text-[#8E8E93] mb-2 block flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              예약 시간 선택
            </label>
            <div className="flex items-center justify-center bg-[#F2F2F7] rounded-xl p-4">
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="text-2xl bg-transparent border-0 focus:outline-none text-[#1C1C1E]"
              />
            </div>
          </div>

          {/* Repeat Options */}
          <div className="mb-6">
            <label className="text-sm text-[#8E8E93] mb-2 block">반복 설정</label>
            <div className="bg-[#F2F2F7] rounded-xl overflow-hidden">
              <button className="w-full p-4 flex items-center justify-between text-left ios-list-item">
                <span className="text-[#1C1C1E]">매일</span>
                <svg className="w-5 h-5 text-[#007AFF]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="h-px bg-[#C6C6C8] mx-4" />
              <button className="w-full p-4 flex items-center justify-between text-left ios-list-item">
                <span className="text-[#8E8E93]">매주</span>
              </button>
              <div className="h-px bg-[#C6C6C8] mx-4" />
              <button className="w-full p-4 flex items-center justify-between text-left ios-list-item">
                <span className="text-[#8E8E93]">커스텀</span>
              </button>
            </div>
          </div>

          {/* Auto Image Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 bg-[#F2F2F7] rounded-xl">
              <div className="flex items-center">
                <Image className="w-5 h-5 text-[#8E8E93] mr-3" />
                <div>
                  <p className="text-[#1C1C1E]">자동 이미지 첨부</p>
                  <p className="text-xs text-[#8E8E93]">AI 생성 이미지 추가</p>
                </div>
              </div>
              <button
                onClick={() => setAutoImage(!autoImage)}
                className="flex-shrink-0"
              >
                <div
                  className={`w-12 h-7 rounded-full p-0.5 transition-colors ${
                    autoImage ? "bg-[#34C759]" : "bg-[#E5E5EA]"
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full transition-transform ${
                      autoImage ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#007AFF] text-white py-4 rounded-xl ios-button"
          >
            예약 완료
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
