import { useState, useEffect } from "react";
import { Play, Square } from "lucide-react";
import { Toaster, toast } from "sonner";
import { Onboarding } from "./components/Onboarding";
import { Home } from "./components/Home";
import { Scheduler } from "./components/Scheduler";
import { Logs } from "./components/Logs";
import { Monitor } from "./components/Monitor";
import { Pipeline } from "./components/Pipeline";
import { Settings } from "./components/Settings";
import { TabBar } from "./components/TabBar";
import { NewScheduleSheet } from "./components/NewScheduleSheet";
import { LogDetailSheet } from "./components/LogDetailSheet";
import { EditPostSheet } from "./components/EditPostSheet";

type Screen = "onboarding" | "home" | "scheduler" | "logs" | "monitor" | "pipeline" | "settings";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [isNewScheduleOpen, setIsNewScheduleOpen] = useState(false);
  const [isLogDetailOpen, setIsLogDetailOpen] = useState(false);
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isDark, setIsDark] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  // 다크모드 적용 (document.documentElement에 .dark 클래스 토글)
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  // 발표 모드: 주요 화면을 자동 순회
  useEffect(() => {
    if (!demoMode) return;
    const order: Screen[] = ["home", "scheduler", "monitor", "logs", "pipeline", "settings"];
    let i = order.indexOf(currentScreen);
    if (i < 0) {
      i = 0;
      setCurrentScreen(order[0]);
    }
    const timer = setInterval(() => {
      i = (i + 1) % order.length;
      setCurrentScreen(order[i]);
    }, 3500);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoMode]);

  // 발표 모드 ESC 종료
  useEffect(() => {
    if (!demoMode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDemoMode(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [demoMode]);

  const handleToggleDark = () => setIsDark((v) => !v);

  const handleConnect = () => {
    toast.success("✅ Kaito 계정 연결 성공!", {
      description: "API 인증이 완료되었습니다.",
      duration: 3000,
    });
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen("home");
    toast("환영합니다! 🎉", {
      description: "야핑 자동화 시스템을 시작합니다.",
      duration: 2000,
    });
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleApprove = (id: number) => {
    toast.success("🚀 포스팅 완료!", {
      description: "포스팅이 성공적으로 게시되었습니다.",
      duration: 2000,
    });
  };

  const handleOpenEditPost = (post: any) => {
    setSelectedPost(post);
    setIsEditPostOpen(true);
  };

  const handleSaveEditPost = (updatedPost: any) => {
    toast.success("✅ 수정 완료!", {
      description: "포스팅이 업데이트되었습니다.",
      duration: 2000,
    });
  };

  const handleNewScheduleSuccess = () => {
    toast.success("✅ 야핑 예약 완료!", {
      description: "새로운 스케줄이 등록되었습니다.",
      duration: 3000,
    });
  };

  const handleOpenLogDetail = (log: any) => {
    setSelectedLog(log);
    setIsLogDetailOpen(true);
  };

  const handleResend = () => {
    toast.success("✅ 재전송 시뮬레이션 완료!", {
      description: "포스팅이 다시 전송되었습니다.",
      duration: 3000,
    });
  };

  const handleReconnect = () => {
    toast.loading("API 연결 중...", { duration: 1000 });
    setTimeout(() => {
      toast.success("✅ Kaito API 연결 성공!", {
        description: "정상적으로 연결되었습니다.",
        duration: 3000,
      });
    }, 1000);
  };

  const handleTestConnection = () => {
    toast.loading("연결 테스트 중...", { duration: 1000 });
    setTimeout(() => {
      toast.success("✅ 연결 테스트 성공!", {
        description: "Kaito API가 정상적으로 작동하고 있습니다.",
        duration: 3000,
      });
    }, 1000);
  };

  const handleLogout = () => {
    toast("로그아웃 하시겠습니까?", {
      action: {
        label: "확인",
        onClick: () => {
          setCurrentScreen("onboarding");
          toast.success("로그아웃되었습니다.");
        },
      },
      cancel: {
        label: "취소",
        onClick: () => {},
      },
      duration: 5000,
    });
  };

  return (
    <div className="relative">
      {/* iPhone 16 Pro Frame */}
      <div className="mx-auto max-w-[393px] min-h-screen bg-white overflow-hidden">
        {currentScreen === "onboarding" && (
          <Onboarding onComplete={handleOnboardingComplete} onConnect={handleConnect} />
        )}

        {currentScreen === "home" && (
          <>
            <Home 
              onNavigate={handleNavigate} 
              onApprove={handleApprove}
              onOpenEditPost={handleOpenEditPost}
            />
            <TabBar activeTab="home" onTabChange={(tab) => setCurrentScreen(tab)} />
          </>
        )}

        {currentScreen === "scheduler" && (
          <>
            <Scheduler
              onNavigate={handleNavigate}
              onOpenNewSchedule={() => setIsNewScheduleOpen(true)}
            />
            <TabBar activeTab="scheduler" onTabChange={(tab) => setCurrentScreen(tab)} />
          </>
        )}

        {currentScreen === "logs" && (
          <>
            <Logs onOpenDetail={handleOpenLogDetail} />
            <TabBar activeTab="logs" onTabChange={(tab) => setCurrentScreen(tab)} />
          </>
        )}

        {currentScreen === "monitor" && (
          <>
            <Monitor onReconnect={handleReconnect} />
            <TabBar activeTab="monitor" onTabChange={(tab) => setCurrentScreen(tab)} />
          </>
        )}

        {currentScreen === "pipeline" && (
          <>
            <Pipeline />
            <TabBar activeTab="pipeline" onTabChange={(tab) => setCurrentScreen(tab)} />
          </>
        )}

        {currentScreen === "settings" && (
          <>
            <Settings
              onTestConnection={handleTestConnection}
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              isDark={isDark}
              onToggleDark={handleToggleDark}
            />
            <TabBar activeTab="settings" onTabChange={(tab) => setCurrentScreen(tab)} />
          </>
        )}

        {/* Sheets */}
        <NewScheduleSheet
          isOpen={isNewScheduleOpen}
          onClose={() => setIsNewScheduleOpen(false)}
          onSuccess={handleNewScheduleSuccess}
        />

        <LogDetailSheet
          isOpen={isLogDetailOpen}
          onClose={() => setIsLogDetailOpen(false)}
          log={selectedLog}
          onResend={handleResend}
        />

        <EditPostSheet
          isOpen={isEditPostOpen}
          onClose={() => setIsEditPostOpen(false)}
          post={selectedPost}
          onSave={handleSaveEditPost}
        />
      </div>

      {/* 발표 모드 플로팅 컨트롤 */}
      {currentScreen !== "onboarding" && (
        <div className="fixed bottom-24 left-0 right-0 flex justify-center pointer-events-none z-50">
          <div className="w-full max-w-[393px] flex justify-end px-4">
            <button
              onClick={() => setDemoMode((v) => !v)}
              className={`pointer-events-auto flex items-center gap-1.5 px-3.5 py-2.5 rounded-full ios-button-primary ${
                demoMode ? "bg-[#FF3B30]" : "bg-[#007AFF]"
              }`}
              style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.22)" }}
            >
              {demoMode ? (
                <Square className="w-3.5 h-3.5 text-white" fill="white" />
              ) : (
                <Play className="w-3.5 h-3.5 text-white" fill="white" />
              )}
              <span className="ios-caption-1 text-white" style={{ fontWeight: 600 }}>
                {demoMode ? "발표 종료" : "발표 모드"}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "white",
            color: "#1C1C1E",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          },
        }}
      />
    </div>
  );
}
