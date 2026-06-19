// 발표 자료와 일치하는 헤드라인 지표 단일 소스
export const systemMetrics = {
  responseMs: 82, // 응답 시간
  uptime: 99.9, // 가동률
  automationSuccess: 97, // 자동화 성공률(헤드라인)
  postingSuccessRate: 97.2, // 포스팅 성공률(정밀 바)
  engagementPrediction: 92, // 인게이지먼트 예측
  trendDetection: 93.8, // 트렌드 포착률
  avgEngagement: 87.4, // 평균 인게이지먼트
};

// 홈 오늘 요약(차트 시계열 마지막 값과 정합)
export const todayStats = {
  totalRevenue: "$324.60",
  avgEngagement: 89,
  postedCount: 27,
};

// 앱 메타 — 야핑팀 브랜딩
export const appMeta = {
  version: "2.0.0",
  year: 2026,
  brand: "야핑팀",
  product: "AI 기반 야핑 자동화 시스템",
  copyright: "© 2026 야핑팀 · v2.0.0",
};

// 발표 자료 기반 시스템/팀 정보 (파이프라인 화면용)
export const teamInfo = {
  project: "AI 기반 야핑 자동화 시스템",
  subtitle: "트렌드 수집 → AI 트윗 생성 → 자동 게시 → 성과 분석",
  team: "야핑팀",
  members: [
    { name: "김가인", role: "팀장 · 기획/UI", detail: "프로젝트 총괄·일정 관리, 서비스 흐름·UI/UX 기획, 홈 대시보드 구현" },
    { name: "김태균", role: "스케줄러/연동", detail: "APScheduler 자동 게시, 실패 재시도, OAuth 토큰 흐름 구성" },
    { name: "김현지", role: "트렌드/GPT", detail: "Redis 캐싱 트렌드, 블랙리스트 필터, CoinGecko 연동, 반복 방지 프롬프트" },
    { name: "김설원", role: "아키텍처/DB", detail: "FastAPI 4계층·5테이블 스키마, lifespan 스케줄 복구 구현" },
  ],
  pipeline: [
    { step: 1, title: "트렌드 수집", desc: "X 트렌드 + 코인 메타정보", tech: "Twitter · CoinGecko API" },
    { step: 2, title: "정제 · 캐싱", desc: "블랙리스트 필터링", tech: "Redis 캐시 (TTL 30분)" },
    { step: 3, title: "AI 트윗 생성", desc: "GPT로 야핑 트윗 생성", tech: "GPT · 반복 패턴 방지" },
    { step: 4, title: "스케줄 게시", desc: "예약·즉시 자동 게시", tech: "APScheduler · Twitter API" },
    { step: 5, title: "성과 분석", desc: "지표 저장·시각화", tech: "PostgreSQL · React" },
  ],
  layers: [
    { name: "프론트엔드", tech: "React · TypeScript · Tailwind" },
    { name: "백엔드 API", tech: "Python · FastAPI" },
    { name: "데이터 계층", tech: "PostgreSQL · Redis" },
    { name: "외부 API", tech: "Twitter · GPT · CoinGecko" },
  ],
  tables: [
    { name: "users", desc: "계정 정보 + X OAuth 토큰" },
    { name: "projects", desc: "참여 에어드랍 프로젝트 설정" },
    { name: "tweets", desc: "GPT 생성 트윗 후보 + 사용 여부" },
    { name: "schedules", desc: "자동 게시 규칙 + 작업 ID" },
    { name: "post_history", desc: "게시 이력 + 조회·좋아요·리트윗" },
  ],
  gpt: {
    maxChars: 280,
    temperature: 0.85,
    maxRetries: 3,
    historyCount: 5,
    cacheTtl: "30분",
  },
};
