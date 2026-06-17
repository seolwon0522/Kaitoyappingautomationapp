import { ChevronRight, User, Key, Bell, Info, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { ApiKeySheet } from "./ApiKeySheet";

interface SettingsProps {
  onTestConnection: () => void;
  onLogout: () => void;
  apiKeySheetOpen?: boolean;
  onApiKeySheetChange?: (open: boolean) => void;
  highlightElement?: string | null;
}

export function Settings({ onTestConnection, onLogout, apiKeySheetOpen = false, onApiKeySheetChange, highlightElement }: SettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [isApiKeySheetOpen, setIsApiKeySheetOpen] = useState(false);

  // Sync with external prop if provided
  useEffect(() => {
    if (apiKeySheetOpen !== undefined) {
      setIsApiKeySheetOpen(apiKeySheetOpen);
    }
  }, [apiKeySheetOpen]);

  const handleApiKeySheetToggle = (open: boolean) => {
    setIsApiKeySheetOpen(open);
    if (onApiKeySheetChange) {
      onApiKeySheetChange(open);
    }
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
        <h1 className="ios-large-title text-[#111827]">설정</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Account */}
        <div className={`px-5 pt-5 pb-4 transition-all duration-300 ${getHighlightStyle("api-section")}`} id="api-section">
          <div className="ios-card overflow-hidden">
            <div className="px-4 py-3.5 flex items-center gap-3 border-b border-[#E5E7EB]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=siyeon2025" 
                  alt="Profile" 
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1">
                <p className="ios-body text-[#111827]" style={{ fontWeight: 600 }}>박시연</p>
                <p className="ios-caption-1 text-[#8E8E93]">@crypto_siyeon · 18.2K</p>
              </div>
            </div>
            <button 
              className={`w-full px-4 py-3.5 flex items-center justify-between ios-touchable transition-all duration-300 ${getHighlightStyle("api-key-button")}`}
              onClick={() => handleApiKeySheetToggle(true)}
              id="api-key-button"
            >
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-[#8E8E93]" />
                <div>
                  <p className="ios-body text-[#111827]">API 키 관리</p>
                  <p className="ios-caption-1 text-[#8E8E93]">••••••••••8f2d</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#C7C7CC]" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="px-5 pb-4">
          <h2 className="ios-headline text-[#111827] mb-3 px-0.5">환경설정</h2>
          <div className="ios-card">
            <div className="px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#8E8E93]" />
                <p className="ios-body text-[#111827]">알림</p>
              </div>
              <button onClick={() => setNotifications(!notifications)}>
                <div className={`w-12 h-7 rounded-full p-0.5 transition-colors ${
                  notifications ? 'bg-[#34C759]' : 'bg-[#E5E7EB]'
                }`}>
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications ? 'translate-x-5' : ''
                  }`}></div>
                </div>
              </button>
            </div>
            <div className="ios-separator ios-separator-inset"></div>
            <button className="w-full px-4 py-3.5 flex items-center justify-between ios-touchable">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-[#8E8E93]" />
                <div>
                  <p className="ios-body text-[#111827]">지원 코인</p>
                  <p className="ios-caption-1 text-[#8E8E93]">8개 활성화</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#C7C7CC]" strokeWidth={2.5} />
            </button>
            <div className="ios-separator ios-separator-inset"></div>
            <button className="w-full px-4 py-3.5 flex items-center justify-between ios-touchable">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#8E8E93]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="ios-body text-[#111827]">포스팅 간격</p>
                  <p className="ios-caption-1 text-[#8E8E93]">25분</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#C7C7CC]" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* System */}
        <div className="px-5 pb-4">
          <h2 className="ios-headline text-[#111827] mb-3 px-0.5">시스템</h2>
          <div className="ios-card">
            <button
              onClick={onTestConnection}
              className="w-full px-4 py-3.5 flex items-center justify-between ios-touchable"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#34C759] rounded-full"></div>
                <p className="ios-body text-[#111827]">연결 상태 확인</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#C7C7CC]" strokeWidth={2.5} />
            </button>
            <div className="ios-separator ios-separator-inset"></div>
            <div className="px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-[#8E8E93]" />
                <p className="ios-body text-[#111827]">앱 버전</p>
              </div>
              <p className="ios-body text-[#8E8E93]">1.2.0</p>
            </div>
          </div>
        </div>

        {/* Supported Coins */}
        <div className="px-5 pb-4">
          <div className="bg-[#F2F3F5] rounded-xl p-4">
            <p className="ios-caption-1 text-[#8E8E93] mb-2">지원 코인 · 2025년 11월 기준</p>
            <div className="flex flex-wrap gap-2">
              {['AI16Z', 'ELIZA', 'VIRTUAL', 'PRIME', 'RNDR', 'FET', 'AGIX', 'OCEAN'].map((coin) => (
                <span key={coin} className="px-2.5 py-1.5 bg-white rounded-full border border-[#E5E7EB]">
                  <span className="ios-caption-2 text-[#6B7280]">${coin}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="px-5 pb-5">
          <button
            onClick={onLogout}
            className="w-full ios-card px-4 py-3.5 ios-button-primary border border-[#E5E7EB]"
          >
            <p className="ios-body text-[#FF3B30]" style={{ fontWeight: 600 }}>로그아웃</p>
          </button>
        </div>

        {/* Footer */}
        <div className="px-5 pt-2 pb-4 text-center">
          <p className="ios-caption-2 text-[#8E8E93]">야핑 자동화 시스템</p>
          <p className="ios-caption-2 text-[#C7C7CC] mt-1">© 2025 Kaito Labs · v1.2.0</p>
        </div>
      </div>

      {/* ApiKeySheet */}
      <ApiKeySheet 
        isOpen={isApiKeySheetOpen} 
        onClose={() => handleApiKeySheetToggle(false)}
        onSave={(apiKey) => {
          // Handle API key save
          handleApiKeySheetToggle(false);
        }}
        highlightElement={highlightElement}
      />
    </div>
  );
}