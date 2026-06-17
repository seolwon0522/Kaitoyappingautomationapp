import React, { useState } from 'react';
import { Toaster } from 'sonner@2.0.3';
import { Onboarding } from './components/Onboarding';
import { Home } from './components/Home';
import { Scheduler } from './components/Scheduler';
import { Logs } from './components/Logs';
import { Monitor } from './components/Monitor';
import { Settings } from './components/Settings';
import { Storyboard } from './components/Storyboard';
import { TabBar } from './components/TabBar';

export type Screen = 'onboarding' | 'home' | 'schedule' | 'logs' | 'monitor' | 'settings' | 'storyboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('storyboard');
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setIsConnected(false);
    setCurrentScreen('onboarding');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onConnect={handleConnect} onComplete={handleConnect} />;
      case 'home':
        return <Home onNavigate={setCurrentScreen} onApprove={() => {}} />;
      case 'schedule':
        return <Scheduler onNavigate={setCurrentScreen} />;
      case 'logs':
        return <Logs />;
      case 'monitor':
        return <Monitor />;
      case 'settings':
        return <Settings onLogout={handleLogout} />;
      case 'storyboard':
        return <Storyboard />;
      default:
        return <Onboarding onConnect={handleConnect} onComplete={handleConnect} />;
    }
  };

  // Map screen to tab for TabBar
  const getActiveTab = (): "home" | "scheduler" | "logs" | "monitor" | "settings" => {
    if (currentScreen === 'schedule') return 'scheduler';
    if (currentScreen === 'home' || currentScreen === 'logs' || currentScreen === 'monitor' || currentScreen === 'settings') {
      return currentScreen;
    }
    return 'home';
  };

  const handleTabChange = (tab: "home" | "scheduler" | "logs" | "monitor" | "settings") => {
    if (tab === 'scheduler') {
      setCurrentScreen('schedule');
    } else {
      setCurrentScreen(tab);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Main Content */}
      <div className={`w-full h-full ${currentScreen !== 'onboarding' && currentScreen !== 'storyboard' ? 'pb-20' : ''}`}>
        {renderScreen()}
      </div>

      {/* Tab Bar - only show when connected and not on storyboard */}
      {isConnected && currentScreen !== 'storyboard' && (
        <TabBar activeTab={getActiveTab()} onTabChange={handleTabChange} />
      )}

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </div>
  );
}