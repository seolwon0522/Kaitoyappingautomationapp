export interface FlowStep {
  stepNumber: number;
  stepName: string;
  screen: string;
  action?: string; // Action identifier instead of function
  description?: string; // What should be visible in this step
  highlight?: string; // For highlighting specific sections (e.g., "trends", "metrics")
  highlightElement?: string; // Specific element to highlight with red box
}

export interface PresentationFlow {
  id: string;
  name: string;
  icon: string;
  steps: FlowStep[];
}

export const PRESENTATION_FLOWS: PresentationFlow[] = [
  {
    id: "onboarding_flow",
    name: "회원가입 플로우",
    icon: "🚀",
    steps: [
      { 
        stepNumber: 1, 
        stepName: "앱 실행", 
        screen: "onboarding",
        description: "온보딩 화면 표시"
      },
      { 
        stepNumber: 2, 
        stepName: "X 계정 연결 클릭", 
        screen: "onboarding",
        action: "click_connect",
        highlightElement: "connect-button",
        description: "연결 버튼에 포커스"
      },
      { 
        stepNumber: 3, 
        stepName: "홈 화면 진입", 
        screen: "home",
        action: "complete_onboarding",
        description: "홈 대시보드 표시"
      },
      { 
        stepNumber: 4, 
        stepName: "대시보드 둘러보기", 
        screen: "home",
        highlightElement: "metrics-section",
        description: "실시간 수익 및 통계 확인"
      },
    ],
  },
  {
    id: "automation_flow",
    name: "자동화 제어 플로우",
    icon: "⚡",
    steps: [
      { 
        stepNumber: 1, 
        stepName: "자동화 OFF 상태 확인", 
        screen: "home",
        action: "reset_automation",
        highlightElement: "automation-card",
        description: "자동화가 비활성화된 홈 화면"
      },
      { 
        stepNumber: 2, 
        stepName: "자동화 ON 토글 클릭", 
        screen: "home",
        action: "enable_automation",
        highlightElement: "automation-toggle",
        description: "자동화 활성화 및 토스트 표시"
      },
      { 
        stepNumber: 3, 
        stepName: "자동화 활성화 상태", 
        screen: "home",
        highlightElement: "automation-card",
        description: "자동화가 켜진 상태의 홈 화면"
      },
      { 
        stepNumber: 4, 
        stepName: "실시간 포스팅 생성", 
        screen: "home",
        highlightElement: "post-queue",
        description: "AI가 자동으로 생성한 포스팅 확인"
      },
    ],
  },
  {
    id: "create_schedule",
    name: "스케줄 생성 플로우",
    icon: "📅",
    steps: [
      { 
        stepNumber: 1, 
        stepName: "스케줄 화면 확인", 
        screen: "scheduler",
        highlightElement: "schedule-list",
        description: "기존 스케줄 목록 확인"
      },
      { 
        stepNumber: 2, 
        stepName: "새 규칙 추가 버튼", 
        screen: "scheduler",
        highlightElement: "add-button",
        description: "새 스케줄 추가 준비"
      },
      { 
        stepNumber: 3, 
        stepName: "새 규칙 추가 시트 열기", 
        screen: "scheduler",
        action: "open_new_schedule",
        highlightElement: "schedule-sheet",
        description: "새 스케줄 생성 시트 표시"
      },
      { 
        stepNumber: 4, 
        stepName: "스케줄 설정 입력", 
        screen: "scheduler",
        highlightElement: "schedule-form",
        description: "시간, 빈도, 코인 선택"
      },
      { 
        stepNumber: 5, 
        stepName: "스케줄 저장 완료", 
        screen: "scheduler",
        action: "save_schedule",
        highlightElement: "save-button",
        description: "스케줄 추가 완료 및 목록 갱신"
      },
    ],
  },
  {
    id: "post_now_flow",
    name: "즉시 포스팅 플로우",
    icon: "🚀",
    steps: [
      { 
        stepNumber: 1, 
        stepName: "예약 포스팅 목록 확인", 
        screen: "home",
        highlightElement: "post-queue",
        description: "승인 대기 중인 포스팅 표시"
      },
      { 
        stepNumber: 2, 
        stepName: "포스팅 내용 검토", 
        screen: "home",
        highlightElement: "post-card",
        description: "포스팅 텍스트, 코인, 예상 수익 확인"
      },
      { 
        stepNumber: 3, 
        stepName: "지금 포스팅 버튼 클릭", 
        screen: "home",
        action: "approve_post",
        highlightElement: "approve-button",
        description: "포스팅 실행 토스트 표시"
      },
      { 
        stepNumber: 4, 
        stepName: "포스팅 완료 확인", 
        screen: "logs",
        highlightElement: "success-log",
        description: "로그에 성공 기록 추가"
      },
    ],
  },
  {
    id: "edit_post_flow",
    name: "포스팅 수정 플로우",
    icon: "✏️",
    steps: [
      { 
        stepNumber: 1, 
        stepName: "포스팅 목록 확인", 
        screen: "home",
        highlightElement: "post-card",
        description: "예약 포스팅 큐 표시"
      },
      { 
        stepNumber: 2, 
        stepName: "수정 버튼 클릭", 
        screen: "home",
        action: "open_edit_post",
        highlightElement: "edit-button",
        description: "포스팅 편집 시트 열기"
      },
      { 
        stepNumber: 3, 
        stepName: "내용 수정", 
        screen: "home",
        highlightElement: "edit-textarea",
        description: "포스팅 텍스트 및 설정 변경"
      },
      { 
        stepNumber: 4, 
        stepName: "수정 사항 저장", 
        screen: "home",
        action: "save_edit_post",
        highlightElement: "edit-save-button",
        description: "수정 완료 토스트 및 시트 닫기"
      },
    ],
  },
  {
    id: "delete_post_flow",
    name: "포스팅 취소 플로우",
    icon: "❌",
    steps: [
      { 
        stepNumber: 1, 
        stepName: "포스팅 목록 확인", 
        screen: "home",
        highlightElement: "post-queue",
        description: "예약된 포스팅 큐 표시"
      },
      { 
        stepNumber: 2, 
        stepName: "취소 버튼 클릭", 
        screen: "home",
        action: "delete_post",
        highlightElement: "cancel-button",
        description: "예약 포스팅 취소"
      },
      { 
        stepNumber: 3, 
        stepName: "포스팅 제거 완료", 
        screen: "home",
        highlightElement: "post-queue",
        description: "목록에서 제거됨"
      },
    ],
  },
  {
    id: "schedule_edit_flow",
    name: "스케줄 토글 플로우",
    icon: "📝",
    steps: [
      { 
        stepNumber: 1, 
        stepName: "스케줄 목록 확인", 
        screen: "scheduler",
        highlightElement: "schedule-list",
        description: "활성화된 스케줄 확인"
      },
      { 
        stepNumber: 2, 
        stepName: "스케줄 비활성화", 
        screen: "scheduler",
        action: "toggle_schedule",
        highlightElement: "schedule-toggle",
        description: "토글 스위치로 일시 중지"
      },
      { 
        stepNumber: 3, 
        stepName: "스케줄 재활성화", 
        screen: "scheduler",
        action: "toggle_schedule",
        highlightElement: "schedule-toggle",
        description: "토글 스위치로 다시 활성화"
      },
      { 
        stepNumber: 4, 
        stepName: "상태 변경 완료", 
        screen: "scheduler",
        highlightElement: "schedule-list",
        description: "스케줄 상태 업데이트됨"
      },
    ],
  },
  {
    id: "view_log_flow",
    name: "로그 상세보기 플로우",
    icon: "📄",
    steps: [
      { 
        stepNumber: 1, 
        stepName: "활동 로그 화면", 
        screen: "logs",
        highlightElement: "log-list",
        description: "전체 로그 목록 표시"
      },
      { 
        stepNumber: 2, 
        stepName: "필터 옵션 선택", 
        screen: "logs",
        highlightElement: "filter-tabs",
        description: "성공/실패/전체 필터링"
      },
      { 
        stepNumber: 3, 
        stepName: "로그 항목 선택", 
        screen: "logs",
        action: "open_log_detail",
        highlightElement: "log-item",
        description: "로그 상세 정보 시트 표시"
      },
      { 
        stepNumber: 4, 
        stepName: "로그 상세 정보 확인", 
        screen: "logs",
        highlightElement: "detail-sheet",
        description: "포스팅 내용, 시간, 결과 등 표시"
      },
      { 
        stepNumber: 5, 
        stepName: "시트 닫기", 
        screen: "logs",
        action: "close_log_detail",
        description: "로그 목록으로 복귀"
      },
    ],
  },
  {
    id: "monitor_system_flow",
    name: "시스템 모니터링 플로우",
    icon: "📈",
    steps: [
      { 
        stepNumber: 1, 
        stepName: "모니터링 화면 진입", 
        screen: "monitor",
        description: "시스템 모니터링 대시보드"
      },
      { 
        stepNumber: 2, 
        stepName: "시스템 상태 확인", 
        screen: "monitor",
        highlightElement: "system-status",
        description: "API 응답시간 및 가동률 확인"
      },
      { 
        stepNumber: 3, 
        stepName: "최근 활동 분석", 
        screen: "monitor",
        highlightElement: "activity-section",
        description: "포스팅 성공/실패 통계"
      },
      { 
        stepNumber: 4, 
        stepName: "실시간 트렌드 분석", 
        screen: "monitor",
        highlightElement: "trends-section",
        description: "최근 감지된 인기 트렌드 목록"
      },
      { 
        stepNumber: 5, 
        stepName: "연결 테스트 실행", 
        screen: "monitor",
        action: "test_connection",
        highlightElement: "test-button",
        description: "API 연결 테스트 및 결과 표시"
      },
    ],
  },
  {
    id: "settings_flow",
    name: "설정 변경 플로우",
    icon: "⚙️",
    steps: [
      { 
        stepNumber: 1, 
        stepName: "설정 화면 진입", 
        screen: "settings",
        highlightElement: "api-section",
        description: "전체 설정 메뉴"
      },
      { 
        stepNumber: 2, 
        stepName: "API 키 관리 열기", 
        screen: "settings",
        action: "open_api_key_sheet",
        highlightElement: "api-key-button",
        description: "API 키 관리 시트 표시"
      },
      { 
        stepNumber: 3, 
        stepName: "API 키 입력", 
        screen: "settings",
        highlightElement: "api-key-input",
        description: "OpenAI 및 X API 키 입력"
      },
      { 
        stepNumber: 4, 
        stepName: "연결 테스트", 
        screen: "settings",
        action: "test_api_connection",
        highlightElement: "test-button",
        description: "API 연결 상태 확인"
      },
      { 
        stepNumber: 5, 
        stepName: "설정 저장", 
        screen: "settings",
        action: "save_api_keys",
        description: "변경사항 저장 완료"
      },
    ],
  },
  {
    id: "analytics_flow",
    name: "수익 분석 플로우",
    icon: "💰",
    steps: [
      { 
        stepNumber: 1, 
        stepName: "홈 대시보드 확인", 
        screen: "home",
        highlightElement: "metrics-section",
        description: "실시간 수익 지표 확인"
      },
      { 
        stepNumber: 2, 
        stepName: "수익 통계 분석", 
        screen: "home",
        highlightElement: "revenue-card",
        description: "오늘 수익 및 예상 수익"
      },
      { 
        stepNumber: 3, 
        stepName: "포스팅당 수익 확인", 
        screen: "home",
        highlightElement: "post-card",
        description: "각 포스팅의 예상 수익 표시"
      },
      { 
        stepNumber: 4, 
        stepName: "로그에서 실제 수익 확인", 
        screen: "logs",
        highlightElement: "log-list",
        description: "완료된 포스팅의 실제 수익"
      },
    ],
  },
  {
    id: "coin_selection_flow",
    name: "코인 선택 플로우",
    icon: "🪙",
    steps: [
      { 
        stepNumber: 1, 
        stepName: "포스팅 수정 시트 열기", 
        screen: "home",
        action: "open_edit_post",
        highlightElement: "edit-button",
        description: "코인 선택을 위한 편집 모드"
      },
      { 
        stepNumber: 2, 
        stepName: "코인 선택 드롭다운", 
        screen: "home",
        highlightElement: "coin-selector",
        description: "$AI16Z, $ELIZA, $VIRTUAL 등 선택"
      },
      { 
        stepNumber: 3, 
        stepName: "코인 변경 적용", 
        screen: "home",
        highlightElement: "coin-badge",
        description: "선택한 코인 배지로 표시"
      },
      { 
        stepNumber: 4, 
        stepName: "예상 수익 재계산", 
        screen: "home",
        highlightElement: "revenue-estimate",
        description: "코인에 따른 수익 자동 업데이트"
      },
    ],
  },
];