import { ChevronRight, User, Key, Bell, Info, DollarSign, Moon, Layers } from "lucide-react";
import { useState } from "react";
import { demoUser, supportedCoins, appMeta } from "../data";
import { DEMO_NOW, formatMonthLabel } from "../utils/date";

interface SettingsProps {
  onTestConnection: () => void;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export function Settings({ onTestConnection, onLogout, onNavigate, isDark, onToggleDark }: SettingsProps) {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      <div className="bg-[#F9FAFB] px-5 pt-16 pb-3">
        <h1 className="ios-large-title text-[#111827]">설정</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Account */}
        <div className="px-5 pt-5 pb-4">
          <div className="ios-card overflow-hidden">
            <div className="px-4 py-3.5 flex items-center gap-3 border-b border-[#E5E7EB]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center overflow-hidden">
                <img
                  src={demoUser.avatar}
                  alt="Profile"
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1">
                <p className="ios-body text-[#111827]" style={{ fontWeight: 600 }}>{demoUser.name}</p>
                <p className="ios-caption-1 text-[#8E8E93]">{demoUser.handle} · {demoUser.followers}</p>
              </div>
            </div>
            <button className="w-full px-4 py-3.5 flex items-center justify-between ios-touchable">
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-[#8E8E93]" />
                <div>
                  <p className="ios-body text-[#111827]">API 키 관리</p>
                  <p className="ios-caption-1 text-[#8E8E93]">{demoUser.apiKeyMask}</p>
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
            <div className="px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-[#8E8E93]" />
                <p className="ios-body text-[#111827]">다크 모드</p>
              </div>
              <button onClick={onToggleDark}>
                <div className={`w-12 h-7 rounded-full p-0.5 transition-colors ${
                  isDark ? 'bg-[#34C759]' : 'bg-[#E5E7EB]'
                }`}>
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                    isDark ? 'translate-x-5' : ''
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
                  <p className="ios-caption-1 text-[#8E8E93]">{supportedCoins.length}개 활성화</p>
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
            <button
              onClick={() => onNavigate('pipeline')}
              className="w-full px-4 py-3.5 flex items-center justify-between ios-touchable"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-[#8E8E93]" />
                <div>
                  <p className="ios-body text-[#111827]">팀 · 시스템 구조</p>
                  <p className="ios-caption-1 text-[#8E8E93]">야핑팀 · 파이프라인</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#C7C7CC]" strokeWidth={2.5} />
            </button>
            <div className="ios-separator ios-separator-inset"></div>
            <div className="px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-[#8E8E93]" />
                <p className="ios-body text-[#111827]">앱 버전</p>
              </div>
              <p className="ios-body text-[#8E8E93]">{appMeta.version}</p>
            </div>
          </div>
        </div>

        {/* Supported Coins */}
        <div className="px-5 pb-4">
          <div className="bg-[#F2F3F5] rounded-xl p-4">
            <p className="ios-caption-1 text-[#8E8E93] mb-2">지원 코인 · {formatMonthLabel(DEMO_NOW)}</p>
            <div className="flex flex-wrap gap-2">
              {supportedCoins.map((coin) => (
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
          <p className="ios-caption-2 text-[#8E8E93]">{appMeta.product}</p>
          <p className="ios-caption-2 text-[#C7C7CC] mt-1">{appMeta.copyright}</p>
        </div>
      </div>
    </div>
  );
}
