import { useState } from "react";
import { Toaster, toast } from "sonner@2.0.3";
import { Onboarding } from "./components/Onboarding";
import { Home } from "./components/Home";
import { Scheduler } from "./components/Scheduler";
import { Logs } from "./components/Logs";
import { Monitor } from "./components/Monitor";
import { Settings } from "./components/Settings";
import { TabBar } from "./components/TabBar";
import { NewScheduleSheet } from "./components/NewScheduleSheet";
import { LogDetailSheet } from "./components/LogDetailSheet";
import { EditPostSheet } from "./components/EditPostSheet";

type Screen = "onboarding" | "home" | "scheduler" | "logs" | "monitor" | "settings";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [isNewScheduleOpen, setIsNewScheduleOpen] = useState(false);
  const [isLogDetailOpen, setIsLogDetailOpen] = useState(false);
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);

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

        {currentScreen === "settings" && (
          <>
            <Settings onTestConnection={handleTestConnection} onLogout={handleLogout} />
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
