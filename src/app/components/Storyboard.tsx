import { useState, useEffect } from "react";
import { 
  Home, Calendar, FileText, Activity, Settings, 
  ChevronRight, Play, Users, Zap, TrendingUp,
  CheckCircle, X, Clock, Edit, Trash2, ArrowRight,
  DollarSign, Coins, Database
} from "lucide-react";
import { Onboarding } from "./Onboarding";
import { Home as HomeScreen } from "./Home";
import { Scheduler } from "./Scheduler";
import { Logs } from "./Logs";
import { Monitor } from "./Monitor";
import { Settings as SettingsScreen } from "./Settings";
import { ERD_Diagram } from "./ERD_Diagram";
import { ERD_Detailed } from "./ERD_Detailed";

interface StoryboardProps {
  onStartFlow?: (flowId: string) => void;
  initialView?: ViewMode;
}

type ViewMode = "overview" | "screens" | "flows" | "design" | "erd-diagram" | "erd-detailed";

export function Storyboard({ onStartFlow, initialView }: StoryboardProps) {
  const [currentView, setCurrentView] = useState<ViewMode>(initialView || "overview");
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);

  // Update view when initialView prop changes
  useEffect(() => {
    if (initialView) {
      setCurrentView(initialView);
    }
  }, [initialView]);

  const screens = [
    {
      id: "onboarding",
      name: "온보딩",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      goal: "사용자에게 앱의 핵심 기능을 소개하고 X 계정 연결",
      actions: ["X 계정 연결하기", "둘러보기"],
      keyFeatures: ["앱 로고", "기능 태그", "CTA 버튼"]
    },
    {
      id: "home",
      name: "홈 대시보드",
      icon: Home,
      color: "from-blue-500 to-cyan-500",
      goal: "실시간 자동화 현황 모니터링 및 예약 포스팅 관리",
      actions: ["자동화 토글", "지금 포스팅", "포스팅 수정", "포스팅 취소"],
      keyFeatures: ["프로필 헤더", "오늘 요약", "인기 코인", "예약 포스팅 큐"]
    },
    {
      id: "scheduler",
      name: "스케줄 관리",
      icon: Calendar,
      color: "from-green-500 to-emerald-500",
      goal: "자동화 규칙 생성 및 관리",
      actions: ["규칙 활성화/비활성화", "새 규칙 추가"],
      keyFeatures: ["자동화 현황", "규칙 리스트", "토글 스위치"]
    },
    {
      id: "logs",
      name: "포스팅 기록",
      icon: FileText,
      color: "from-orange-500 to-red-500",
      goal: "과거 포스팅 이력 및 성과 확인",
      actions: ["기간 필터", "로그 상세보기", "재전송"],
      keyFeatures: ["통계 요약", "로그 엔트리", "성과 지표"]
    },
    {
      id: "monitor",
      name: "실시간 모니터",
      icon: Activity,
      color: "from-indigo-500 to-purple-500",
      goal: "시스템 상태 및 트렌드 실시간 모니터링",
      actions: ["연결 테스트"],
      keyFeatures: ["시스템 상태", "실시간 활동", "트렌드 분석", "성과 지표"]
    },
    {
      id: "settings",
      name: "설정",
      icon: Settings,
      color: "from-gray-500 to-slate-500",
      goal: "계정 정보 및 환경설정 관리",
      actions: ["알림 토글", "API 키 관리", "로그아웃"],
      keyFeatures: ["프로필 정보", "환경설정", "지원 코인"]
    }
  ];

  const flows = [
    {
      id: "onboarding_flow",
      name: "회원가입 플로우",
      icon: Users,
      color: "#AF52DE",
      duration: "5초",
      steps: [
        { name: "앱 실행", screen: "온보딩", component: "onboarding" },
        { name: "기능 확인", screen: "온보딩", component: "onboarding" },
        { name: "X 계정 연결", screen: "온보딩", component: "onboarding" },
        { name: "홈 화면 진입", screen: "홈", component: "home" }
      ]
    },
    {
      id: "automation_flow",
      name: "자동화 제어 플로우",
      icon: Zap,
      color: "#007AFF",
      duration: "즉시",
      steps: [
        { name: "홈 화면 확인", screen: "홈", component: "home" },
        { name: "자동화 버튼 클릭", screen: "홈", component: "home" },
        { name: "활성화/정지 토글", screen: "홈", component: "home" },
        { name: "상태 업데이트", screen: "홈", component: "home" }
      ]
    },
    {
      id: "create_schedule",
      name: "스케줄 생성 플로우",
      icon: Calendar,
      color: "#34C759",
      duration: "20초",
      steps: [
        { name: "스케줄러 진입", screen: "스케줄러", component: "scheduler" },
        { name: "새 규칙 추가", screen: "스케줄러", component: "scheduler" },
        { name: "AI 설정", screen: "모달", component: "scheduler" },
        { name: "시간 선택", screen: "모달", component: "scheduler" },
        { name: "예약 완료", screen: "스케줄러", component: "scheduler" }
      ]
    },
    {
      id: "post_now_flow",
      name: "즉시 포스팅 플로우",
      icon: Play,
      color: "#FF9500",
      duration: "1초",
      steps: [
        { name: "포스팅 선택", screen: "홈", component: "home" },
        { name: "지금 포스팅 클릭", screen: "홈", component: "home" },
        { name: "실행 애니메이션", screen: "홈", component: "home" },
        { name: "완료 토스트", screen: "홈", component: "home" }
      ]
    },
    {
      id: "edit_post_flow",
      name: "포스팅 수정 플로우",
      icon: Edit,
      color: "#5AC8FA",
      duration: "15초",
      steps: [
        { name: "포스팅 목록 확인", screen: "홈", component: "home" },
        { name: "수정 버튼 클릭", screen: "홈", component: "home" },
        { name: "콘텐츠 편집", screen: "모달", component: "home" },
        { name: "저장 완료", screen: "홈", component: "home" }
      ]
    },
    {
      id: "view_log_flow",
      name: "로그 상세보기 플로우",
      icon: FileText,
      color: "#5856D6",
      duration: "10초",
      steps: [
        { name: "로그 화면 진입", screen: "로그", component: "logs" },
        { name: "로그 항목 선택", screen: "로그", component: "logs" },
        { name: "상세 정보 확인", screen: "모달", component: "logs" },
        { name: "포스팅 성과 분석", screen: "모달", component: "logs" },
        { name: "재전송 (실패 시)", screen: "모달", component: "logs" }
      ]
    },
    {
      id: "monitor_system_flow",
      name: "시스템 모니터링 플로우",
      icon: Activity,
      color: "#FF2D55",
      duration: "연속",
      steps: [
        { name: "모니터 화면 진입", screen: "모니터", component: "monitor" },
        { name: "시스템 상태 확인", screen: "모니터", component: "monitor" },
        { name: "실시간 트렌드 확인", screen: "모니터", component: "monitor" },
        { name: "실시간 활동 로그", screen: "모니터", component: "monitor" },
        { name: "연결 상태 테스트", screen: "모니터", component: "monitor" }
      ]
    },
    {
      id: "settings_flow",
      name: "설정 변경 플로우",
      icon: Settings,
      color: "#8E8E93",
      duration: "10초",
      steps: [
        { name: "설정 화면 진입", screen: "설정", component: "settings" },
        { name: "API 키 관리 열기", screen: "설정", component: "settings" },
        { name: "API 키 입력", screen: "설정", component: "settings" },
        { name: "연결 테스트", screen: "설정", component: "settings" },
        { name: "설정 저장", screen: "설정", component: "settings" }
      ]
    },
    {
      id: "delete_post_flow",
      name: "포스팅 취소 플로우",
      icon: Trash2,
      color: "#FF3B30",
      duration: "3초",
      steps: [
        { name: "포스팅 목록 확인", screen: "홈", component: "home" },
        { name: "취소 버튼 클릭", screen: "홈", component: "home" },
        { name: "포스팅 제거", screen: "홈", component: "home" }
      ]
    },
    {
      id: "schedule_edit_flow",
      name: "스케줄 토글 플로우",
      icon: Edit,
      color: "#FF9500",
      duration: "8초",
      steps: [
        { name: "스케줄 목록 확인", screen: "스케줄러", component: "scheduler" },
        { name: "스케줄 비활성화", screen: "스케줄러", component: "scheduler" },
        { name: "스케줄 재활성화", screen: "스케줄러", component: "scheduler" },
        { name: "상태 변경 완료", screen: "스케줄러", component: "scheduler" }
      ]
    },
    {
      id: "analytics_flow",
      name: "수익 분석 플로우",
      icon: DollarSign,
      color: "#34C759",
      duration: "15초",
      steps: [
        { name: "홈 대시보드 확인", screen: "홈", component: "home" },
        { name: "수익 통계 분석", screen: "홈", component: "home" },
        { name: "포스팅당 수익", screen: "홈", component: "home" },
        { name: "로그에서 실제 수익", screen: "로그", component: "logs" }
      ]
    },
    {
      id: "coin_selection_flow",
      name: "코인 선택 플로우",
      icon: Coins,
      color: "#5AC8FA",
      duration: "10초",
      steps: [
        { name: "포스팅 수정 시트", screen: "모달", component: "home" },
        { name: "코인 선택", screen: "모달", component: "home" },
        { name: "코인 변경 적용", screen: "모달", component: "home" },
        { name: "예상 수익 재계산", screen: "모달", component: "home" }
      ]
    }
  ];

  const designSystem = {
    colors: [
      { name: "Primary", hex: "#007AFF", usage: "버튼, 링크, 활성 상태" },
      { name: "Success", hex: "#34C759", usage: "성공, 수익, 활성" },
      { name: "Danger", hex: "#FF3B30", usage: "삭제, 실패, 경고" },
      { name: "Warning", hex: "#FF9500", usage: "보류, 경고" },
      { name: "Background", hex: "#F9FAFB", usage: "화면 배경" },
      { name: "Text Primary", hex: "#111827", usage: "제목, 본문" },
    ],
    typography: [
      { name: "Large Title", size: "34px", weight: "Bold" },
      { name: "Title 1", size: "28px", weight: "Bold" },
      { name: "Headline", size: "17px", weight: "Semibold" },
      { name: "Body", size: "17px", weight: "Regular" },
      { name: "Caption", size: "12px", weight: "Regular" },
    ]
  };

  const stats = {
    screens: 10,
    flows: 12,
    features: 25,
    interactions: 51
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-gray-900" style={{ fontWeight: 700 }}>
                Kaito 야핑 자동화 시스템
              </h1>
              <p className="text-sm text-gray-600 mt-1">UX Storyboard · iOS 18 · iPhone 16 Pro · v1.2.0</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentView("overview")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentView === "overview"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                개요
              </button>
              <button
                onClick={() => setCurrentView("screens")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentView === "screens"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                화면
              </button>
              <button
                onClick={() => setCurrentView("flows")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentView === "flows"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                플로우
              </button>
              <button
                onClick={() => setCurrentView("design")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentView === "design"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                디자인
              </button>
              <button
                onClick={() => setCurrentView("erd-diagram")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentView === "erd-diagram"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ERD (간결)
              </button>
              <button
                onClick={() => setCurrentView("erd-detailed")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentView === "erd-detailed"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ERD (슬라이드)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview */}
        {currentView === "overview" && (
          <div className="space-y-8">
            {/* Hero Stats */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: "화면", value: stats.screens, color: "blue" },
                { label: "플로우", value: stats.flows, color: "green" },
                { label: "주요 기능", value: stats.features, color: "purple" },
                { label: "인터랙션", value: stats.interactions, color: "orange" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className={`text-4xl mb-2 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 bg-clip-text text-transparent`} style={{ fontWeight: 700 }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Project Description */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl text-gray-900 mb-4" style={{ fontWeight: 700 }}>프로젝트 개요</h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  <span style={{ fontWeight: 600 }}>Kaito 야핑 자동화 시스템</span>은 AI 기반 실시간 X(구 트위터) 트렌드 분석 및 자동 바이럴 포스팅 생성 시스템입니다.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-700" style={{ fontWeight: 600 }}>실시간 분석</span>
                    </div>
                    <p className="text-xs text-gray-600">X 트렌드 24시간 모니터링</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700" style={{ fontWeight: 600 }}>자동 포스팅</span>
                    </div>
                    <p className="text-xs text-gray-600">스케줄 기반 자동화</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-gray-700" style={{ fontWeight: 600 }}>수익 트래킹</span>
                    </div>
                    <p className="text-xs text-gray-600">포스팅 성과 실시간 추적</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl text-gray-900 mb-6" style={{ fontWeight: 700 }}>핵심 기능</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "실시간 자동화", desc: "트렌드 감지부터 포스팅까지 자동 실행", icon: Zap },
                  { title: "스마트 스케줄링", desc: "다양한 조건 기반 예약 시스템", icon: Calendar },
                  { title: "AI 콘텐츠 생성", desc: "바이럴 최적화 포스팅 자동 작성", icon: TrendingUp },
                  { title: "멀티 코인 지원", desc: "8개 AI/크립토 코인 동시 관리", icon: Activity },
                  { title: "성과 분석", desc: "인게이지먼트 & 수익 실시간 트래킹", icon: FileText },
                  { title: "iOS 18 네이티브", desc: "SF Pro 폰트 & 네이티브 컴포넌트", icon: CheckCircle }
                ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 mb-1" style={{ fontWeight: 600 }}>{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl text-gray-900 mb-6" style={{ fontWeight: 700 }}>기술 스택</h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm text-gray-500 mb-3" style={{ fontWeight: 600 }}>프론트엔드</h3>
                  <div className="space-y-2">
                    {["React + TypeScript", "Tailwind CSS v4.0", "Motion/React"].map((tech) => (
                      <div key={tech} className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-3" style={{ fontWeight: 600 }}>디자인</h3>
                  <div className="space-y-2">
                    {["iOS 18 Design System", "SF Pro Font", "Lucide Icons"].map((tech) => (
                      <div key={tech} className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 mb-3" style={{ fontWeight: 600 }}>이미지 & 알림</h3>
                  <div className="space-y-2">
                    {["Unsplash API", "Sonner Toast", "Mock Data"].map((tech) => (
                      <div key={tech} className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Screens */}
        {currentView === "screens" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl text-gray-900 mb-2" style={{ fontWeight: 700 }}>화면 구조</h2>
              <p className="text-gray-600 mb-6">총 10개 화면 (메인 6개 + 모달 3개 + 탭바)</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {screens.map((screen) => {
                const Icon = screen.icon;
                return (
                  <div
                    key={screen.id}
                    onClick={() => setSelectedScreen(selectedScreen === screen.id ? null : screen.id)}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${screen.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl text-gray-900 mb-1" style={{ fontWeight: 600 }}>{screen.name}</h3>
                        <p className="text-sm text-gray-600">{screen.goal}</p>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${selectedScreen === screen.id ? 'rotate-90' : ''}`} />
                    </div>

                    {selectedScreen === screen.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                        <div>
                          <h4 className="text-sm text-gray-500 mb-2" style={{ fontWeight: 600 }}>주요 액션</h4>
                          <div className="space-y-2">
                            {screen.actions.map((action, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                {action}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm text-gray-500 mb-2" style={{ fontWeight: 600 }}>핵심 요소</h4>
                          <div className="flex flex-wrap gap-2">
                            {screen.keyFeatures.map((feature, idx) => (
                              <span key={idx} className="px-3 py-1 bg-gray-50 text-xs text-gray-700 rounded-full border border-gray-200">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modals */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl text-gray-900 mb-4" style={{ fontWeight: 700 }}>모달 시트 (3개)</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "새 야핑 예약", desc: "스케줄 생성 및 AI 설정" },
                  { name: "로그 상세", desc: "포스팅 성과 및 재전송" },
                  { name: "포스팅 수정", desc: "콘텐츠 & 시간 수정" }
                ].map((modal, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                    <h3 className="text-gray-900 mb-1" style={{ fontWeight: 600 }}>{modal.name}</h3>
                    <p className="text-xs text-gray-600">{modal.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Flows */}
        {currentView === "flows" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl text-gray-900 mb-2" style={{ fontWeight: 700 }}>사용자 플로우</h2>
              <p className="text-gray-600 mb-6">12개 주요 사용자 여정 시나리오 · 클릭하여 상세보기</p>
            </div>

            <div className="space-y-6">
              {flows.map((flow) => {
                const Icon = flow.icon;
                const isSelected = selectedFlow === flow.id;
                return (
                  <div
                    key={flow.id}
                    onClick={() => setSelectedFlow(isSelected ? null : flow.id)}
                    className={`bg-white rounded-2xl shadow-lg border-2 transition-all cursor-pointer ${
                      isSelected 
                        ? `border-${flow.color}-500 shadow-2xl` 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Flow Header */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 bg-gradient-to-br from-${flow.color}-500 to-${flow.color}-600 rounded-2xl flex items-center justify-center shadow-lg`}>
                            <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                          </div>
                          <div>
                            <h3 className="text-xl text-gray-900 mb-1" style={{ fontWeight: 700 }}>{flow.name}</h3>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{flow.duration}</span>
                              </div>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-500">{flow.steps.length}단계</span>
                            </div>
                          </div>
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isSelected ? `bg-${flow.color}-100` : 'bg-gray-100'
                        }`}>
                          <ChevronRight className={`w-6 h-6 transition-transform ${
                            isSelected ? `text-${flow.color}-600 rotate-90` : 'text-gray-400'
                          }`} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>

                    {/* Flow Steps - Timeline Style */}
                    {isSelected && (
                      <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                        {/* Demo Button */}
                        <div className="mb-6">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onStartFlow?.(flow.id);
                            }}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                            style={{ fontWeight: 600 }}
                          >
                            <Play className="w-5 h-5" />
                            <span className="text-lg">발표 모드로 시작하기</span>
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Steps Grid */}
                        <div className="flex items-start justify-between gap-8">
                          {flow.steps.map((step, idx) => {
                            // Determine which component to render
                            const getScreenComponent = () => {
                              switch (step.component) {
                                case 'onboarding':
                                  return <Onboarding />;
                                case 'home':
                                  return <HomeScreen />;
                                case 'scheduler':
                                  return <Scheduler />;
                                case 'logs':
                                  return <Logs />;
                                case 'monitor':
                                  return <Monitor />;
                                case 'settings':
                                  return <SettingsScreen />;
                                default:
                                  return null;
                              }
                            };

                            return (
                              <div key={idx} className="flex-1">
                                <div className="flex flex-col items-center gap-4">
                                  {/* Step Number Circle */}
                                  <div 
                                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg relative z-10"
                                    style={{ 
                                      backgroundColor: flow.color,
                                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                                    }}
                                  >
                                    <span className="text-white" style={{ fontSize: '28px', fontWeight: 600 }}>
                                      {idx + 1}
                                    </span>
                                  </div>

                                  {/* Arrow */}
                                  {idx < flow.steps.length - 1 && (
                                    <div 
                                      className="absolute top-10 h-1"
                                      style={{ 
                                        left: `calc(${(idx + 1) * (100 / flow.steps.length)}% - ${50 / flow.steps.length}%)`,
                                        width: `calc(${100 / flow.steps.length}% - 40px)`,
                                        backgroundColor: flow.color,
                                        opacity: 0.3
                                      }}
                                    ></div>
                                  )}

                                  {/* Step Content */}
                                  <div className="text-center w-full">
                                    <h4 
                                      className="text-gray-900 mb-2"
                                      style={{ 
                                        fontSize: '20px',
                                        fontWeight: 600,
                                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                                      }}
                                    >
                                      {step.name}
                                    </h4>
                                    <div 
                                      className="inline-block px-4 py-2 rounded-full mb-4"
                                      style={{ 
                                        backgroundColor: flow.color,
                                        opacity: 0.15
                                      }}
                                    >
                                      <span 
                                        style={{ 
                                          color: flow.color,
                                          fontSize: '15px',
                                          fontWeight: 500,
                                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                                        }}
                                      >
                                        {step.screen}
                                      </span>
                                    </div>

                                    {/* Screen Preview - iPhone Frame */}
                                    <div className="mt-4">
                                      <div 
                                        className="mx-auto bg-black rounded-3xl p-2 shadow-2xl border-4 border-gray-800"
                                        style={{ 
                                          width: '180px',
                                          height: '380px',
                                          position: 'relative'
                                        }}
                                      >
                                        {/* Dynamic Island */}
                                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20"></div>

                                        {/* Screen Content */}
                                        <div 
                                          className="w-full h-full bg-white rounded-2xl overflow-hidden relative"
                                          style={{ 
                                            transform: 'scale(0.22)',
                                            transformOrigin: 'top center',
                                            width: '818px',
                                            height: '1727px',
                                            position: 'absolute',
                                            top: 0,
                                            left: '50%',
                                            marginLeft: '-409px'
                                          }}
                                        >
                                          {getScreenComponent()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Edge Cases */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl text-gray-900 mb-6" style={{ fontWeight: 700 }}>엣지 케이스 & 에러 처리</h2>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { case: "예약 포스팅 없음", solution: "빈 상태 메시지 표시", icon: "📭" },
                  { case: "자동화 비활성화", solution: "'일시 정지됨' 상태 표시", icon: "⏸️" },
                  { case: "네트워크 오류", solution: "에러 토스트 + 재시도 버튼", icon: "🌐" },
                  { case: "이미지 로드 실패", solution: "onError로 이미지 숨김", icon: "🖼️" },
                  { case: "매우 긴 콘텐츠", solution: "line-clamp 또는 Read more", icon: "📝" },
                  { case: "모달 중첩 방지", solution: "독립적인 isOpen 상태", icon: "🪟" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 border-2 border-orange-200">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{item.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-base text-gray-900 mb-2" style={{ fontWeight: 700 }}>{item.case}</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Design System */}
        {currentView === "design" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl text-gray-900 mb-2" style={{ fontWeight: 700 }}>디자인 시스템</h2>
              <p className="text-gray-600 mb-6">iOS 18 네이티브 디자인 가이드라인 준수</p>
            </div>

            {/* Colors */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl text-gray-900 mb-4" style={{ fontWeight: 700 }}>컬러 팔레트</h2>
              <div className="grid grid-cols-3 gap-4">
                {designSystem.colors.map((color) => (
                  <div key={color.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div 
                      className="w-16 h-16 rounded-xl shadow-md flex-shrink-0" 
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 mb-1" style={{ fontWeight: 600 }}>{color.name}</h3>
                      <p className="text-xs text-gray-500 font-mono">{color.hex}</p>
                      <p className="text-xs text-gray-600 mt-1">{color.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl text-gray-900 mb-4" style={{ fontWeight: 700 }}>타이포그래피</h2>
              <div className="space-y-4">
                {designSystem.typography.map((type) => (
                  <div key={type.name} className="flex items-baseline justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-baseline gap-4">
                      <span className="text-sm text-gray-500 w-32" style={{ fontWeight: 600 }}>{type.name}</span>
                      <span className="text-gray-900" style={{ fontSize: type.size, fontWeight: type.weight === 'Bold' ? 700 : type.weight === 'Semibold' ? 600 : 400 }}>
                        야핑 자동화 시스템
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {type.size} · {type.weight}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Components */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl text-gray-900 mb-4" style={{ fontWeight: 700 }}>iOS 컴포넌트</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="text-sm text-gray-900 mb-3" style={{ fontWeight: 600 }}>카드</h3>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-700">iOS Card Component</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="text-sm text-gray-900 mb-3" style={{ fontWeight: 600 }}>버튼</h3>
                  <button className="w-full bg-blue-500 text-white py-3 rounded-xl shadow-sm" style={{ fontWeight: 600 }}>
                    Primary Button
                  </button>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="text-sm text-gray-900 mb-3" style={{ fontWeight: 600 }}>토글 스위치</h3>
                  <div className="w-12 h-7 bg-green-500 rounded-full p-0.5">
                    <div className="w-6 h-6 bg-white rounded-full translate-x-5 transition-transform"></div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="text-sm text-gray-900 mb-3" style={{ fontWeight: 600 }}>구분선</h3>
                  <div className="h-px bg-gray-200"></div>
                </div>
              </div>
            </div>

            {/* Animations */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl text-gray-900 mb-4" style={{ fontWeight: 700 }}>애니메이션</h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { name: "Slide In", desc: "카드 등장" },
                  { name: "Fade Out", desc: "카드 제거" },
                  { name: "Spring", desc: "모달 등장" },
                  { name: "Pulse", desc: "활성 인디케이터" }
                ].map((anim) => (
                  <div key={anim.name} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 text-center">
                    <div className="text-sm text-gray-900 mb-1" style={{ fontWeight: 600 }}>{anim.name}</div>
                    <div className="text-xs text-gray-600">{anim.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ERD (Compact) */}
        {currentView === "erd-diagram" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl text-gray-900 mb-2" style={{ fontWeight: 700 }}>ERD (간결)</h2>
              <p className="text-gray-600 mb-6">데이터베이스 스키마 간결한 시각화</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <ERD_Diagram />
            </div>
          </div>
        )}

        {/* ERD (Slides) */}
        {currentView === "erd-detailed" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl text-gray-900 mb-2" style={{ fontWeight: 700 }}>ERD (슬라이드)</h2>
              <p className="text-gray-600 mb-6">데이터베이스 스키마 상세 슬라이드</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <ERD_Detailed />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            Kaito 야핑 자동화 시스템 UX Storyboard · © {new Date().getFullYear()} Kaito Labs · v1.2.0
          </p>
        </div>
      </div>
    </div>
  );
}