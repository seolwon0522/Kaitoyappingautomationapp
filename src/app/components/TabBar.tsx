type TabId = "home" | "scheduler" | "logs" | "monitor" | "pipeline" | "settings";

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const tabs = [
    { 
      id: "home" as const, 
      label: "야핑",
      iconActive: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M10.5 20V14H14.5V20H19.5V12H22.5L12.5 3L2.5 12H5.5V20H10.5Z" fill="#007AFF"/>
        </svg>
      ),
      iconInactive: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M12.5 5.69L17.5 10.19V18H14.5V14H10.5V18H7.5V10.19L12.5 5.69ZM12.5 3L2.5 12H5.5V20H12.5V16H16.5V20H22.5V12H24.5L12.5 3Z" fill="#8E8E93"/>
        </svg>
      )
    },
    { 
      id: "scheduler" as const, 
      label: "자동화",
      iconActive: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M7.5 2V4H17.5V2H19.5V4H21.5C22.6 4 23.5 4.9 23.5 6V20C23.5 21.1 22.6 22 21.5 22H3.5C2.4 22 1.5 21.1 1.5 20V6C1.5 4.9 2.4 4 3.5 4H5.5V2H7.5ZM21.5 20V9H3.5V20H21.5Z" fill="#007AFF"/>
        </svg>
      ),
      iconInactive: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M19.5 4H17.5V2H15.5V4H9.5V2H7.5V4H5.5C4.4 4 3.5 4.9 3.5 6V20C3.5 21.1 4.4 22 5.5 22H19.5C20.6 22 21.5 21.1 21.5 20V6C21.5 4.9 20.6 4 19.5 4ZM19.5 20H5.5V9H19.5V20Z" fill="#8E8E93"/>
        </svg>
      )
    },
    { 
      id: "logs" as const, 
      label: "로그",
      iconActive: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M14.5 2H6.5C5.4 2 4.5 2.9 4.5 4V20C4.5 21.1 5.4 22 6.5 22H18.5C19.6 22 20.5 21.1 20.5 20V8L14.5 2Z" fill="#007AFF"/>
        </svg>
      ),
      iconInactive: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M14.5 2H6.5C5.4 2 4.5 2.9 4.5 4V20C4.5 21.1 5.39 22 6.5 22H18.5C19.6 22 20.5 21.1 20.5 20V8L14.5 2ZM18.5 20H6.5V4H13.5V9H18.5V20Z" fill="#8E8E93"/>
        </svg>
      )
    },
    { 
      id: "monitor" as const, 
      label: "모니터",
      iconActive: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M16.5 6L14.79 7.71L13.38 6.3L14.08 5.6L12.5 4L10.92 5.6L11.62 6.3L10.21 7.71L8.5 6L2.5 12L8.5 18L10.21 16.29L11.62 17.7L10.92 18.4L12.5 20L14.08 18.4L13.38 17.7L14.79 16.29L16.5 18L22.5 12L16.5 6Z" fill="#007AFF"/>
        </svg>
      ),
      iconInactive: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M8.5 5L6.5 7L2.5 3L4.5 1L8.5 5ZM13.5 1L11.5 3L15.5 7L17.5 5L13.5 1ZM3.5 8L1.5 10L5.5 14L7.5 12L3.5 8ZM23.5 10L21.5 8L17.5 12L19.5 14L23.5 10ZM10.5 14L8.5 16L12.5 20L14.5 18L10.5 14ZM18.5 14L16.5 16L20.5 20L22.5 18L18.5 14Z" fill="#8E8E93"/>
        </svg>
      )
    },
    {
      id: "pipeline" as const,
      label: "시스템",
      iconActive: (
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      iconInactive: (
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: "settings" as const,
      label: "설정",
      iconActive: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M19.93 12.71C19.96 12.49 20 12.25 20 12C20 11.75 19.96 11.51 19.93 11.29L21.96 9.72C22.14 9.59 22.19 9.34 22.08 9.14L20.16 5.86C20.05 5.66 19.81 5.59 19.6 5.66L17.24 6.62C16.77 6.27 16.26 5.97 15.71 5.73L15.35 3.21C15.32 2.99 15.13 2.83 14.91 2.83H11.08C10.86 2.83 10.67 2.99 10.64 3.21L10.28 5.73C9.73 5.97 9.22 6.28 8.75 6.62L6.39 5.66C6.18 5.58 5.94 5.66 5.83 5.86L3.91 9.14C3.79 9.34 3.85 9.59 4.03 9.72L6.06 11.29C6.03 11.51 6 11.75 6 12C6 12.25 6.03 12.49 6.06 12.71L4.03 14.28C3.85 14.41 3.8 14.66 3.91 14.86L5.83 18.14C5.94 18.34 6.18 18.41 6.39 18.34L8.75 17.38C9.22 17.73 9.73 18.03 10.28 18.27L10.64 20.79C10.67 21.01 10.86 21.17 11.08 21.17H14.91C15.13 21.17 15.32 21.01 15.35 20.79L15.71 18.27C16.26 18.03 16.77 17.72 17.24 17.38L19.6 18.34C19.81 18.42 20.05 18.34 20.16 18.14L22.08 14.86C22.19 14.66 22.14 14.41 21.96 14.28L19.93 12.71ZM13 15.5C11.07 15.5 9.5 13.93 9.5 12C9.5 10.07 11.07 8.5 13 8.5C14.93 8.5 16.5 10.07 16.5 12C16.5 13.93 14.93 15.5 13 15.5Z" fill="#007AFF"/>
        </svg>
      ),
      iconInactive: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M19.93 12.71C19.96 12.49 20 12.25 20 12C20 11.75 19.96 11.51 19.93 11.29L21.96 9.72C22.14 9.59 22.19 9.34 22.08 9.14L20.16 5.86C20.05 5.66 19.81 5.59 19.6 5.66L17.24 6.62C16.77 6.27 16.26 5.97 15.71 5.73L15.35 3.21C15.32 2.99 15.13 2.83 14.91 2.83H11.08C10.86 2.83 10.67 2.99 10.64 3.21L10.28 5.73C9.73 5.97 9.22 6.28 8.75 6.62L6.39 5.66C6.18 5.58 5.94 5.66 5.83 5.86L3.91 9.14C3.79 9.34 3.85 9.59 4.03 9.72L6.06 11.29C6.03 11.51 6 11.75 6 12C6 12.25 6.03 12.49 6.06 12.71L4.03 14.28C3.85 14.41 3.8 14.66 3.91 14.86L5.83 18.14C5.94 18.34 6.18 18.41 6.39 18.34L8.75 17.38C9.22 17.73 9.73 18.03 10.28 18.27L10.64 20.79C10.67 21.01 10.86 21.17 11.08 21.17H14.91C15.13 21.17 15.32 21.01 15.35 20.79L15.71 18.27C16.26 18.03 16.77 17.72 17.24 17.38L19.6 18.34C19.81 18.42 20.05 18.34 20.16 18.14L22.08 14.86C22.19 14.66 22.14 14.41 21.96 14.28L19.93 12.71ZM13 15.5C11.07 15.5 9.5 13.93 9.5 12C9.5 10.07 11.07 8.5 13 8.5C14.93 8.5 16.5 10.07 16.5 12C16.5 13.93 14.93 15.5 13 15.5ZM13 10.5C12.17 10.5 11.5 11.17 11.5 12C11.5 12.83 12.17 13.5 13 13.5C13.83 13.5 14.5 12.83 14.5 12C14.5 11.17 13.83 10.5 13 10.5Z" fill="#8E8E93"/>
        </svg>
      )
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center pointer-events-none z-50">
      <div className="w-full max-w-[393px] pointer-events-auto">
        <div className="ios-tab-bar">
          <div className="flex items-center justify-around px-2 pt-2 pb-7">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className="flex flex-col items-center min-w-0 flex-1 transition-opacity active:opacity-50"
                >
                  <div className="mb-1">
                    {isActive ? tab.iconActive : tab.iconInactive}
                  </div>
                  <span
                    className={`ios-caption-2 ${
                      isActive ? "text-[#007AFF]" : "text-[#8E8E93]"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
