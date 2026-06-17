# Kaito 야핑 자동화 시스템 - 종합 요구사항 정의서
## Frontend + Backend Requirements

---

## 문서 정보

- **프로젝트명**: Kaito 야핑 자동화 시스템
- **문서 유형**: 프론트엔드 + 백엔드 종합 요구사항 정의서
- **작성일**: 2025.12.03
- **버전**: 2.0
- **목적**: 실제 서비스 구현을 위한 완전한 기능 명세

---

## 시스템 개요

**서비스 설명**  
AI 기반 실시간 X(트위터) 트렌드 분석 및 자동 바이럴 포스팅 생성 시스템

**핵심 기능**
- X 계정 연동 및 OAuth 인증
- 실시간 트렌드 분석 (Kaito AI 연동)
- 자동 포스팅 생성 및 예약
- 스케줄 기반 자동화 규칙 관리
- 수익 추적 및 성과 분석
- 시스템 모니터링 및 활동 로그

**기술 스택 (예상)**
- Frontend: React 18, TypeScript, Tailwind CSS, motion/react
- Backend: Node.js (Express/NestJS) 또는 Python (FastAPI)
- Database: PostgreSQL (주 DB), Redis (캐시/큐)
- Queue: BullMQ 또는 Celery
- Auth: JWT + OAuth 2.0
- External APIs: X API v2, Kaito AI API

---

## 도메인 PREFIX 정의

### Frontend 도메인
| PREFIX | 도메인명 | 설명 |
|--------|---------|------|
| ONBOARD | 온보딩 | 초기 계정 연결 UI |
| DASH | 대시보드 | 메인 홈 화면 |
| SCHED | 스케줄러 | 자동화 규칙 UI |
| LOG | 활동 로그 | 이력 조회 UI |
| MONITOR | 모니터링 | 시스템 상태 UI |
| SET | 설정 | 사용자 설정 UI |
| NAV | 네비게이션 | 탭바 |
| SHEET | 모달 시트 | 시트 UI |
| PRESENT | 발표 모드 | 데모 기능 |

### Backend 도메인
| PREFIX | 도메인명 | 설명 |
|--------|---------|------|
| AUTH | 인증/인가 | OAuth, JWT, 세션 관리 |
| USER | 사용자 관리 | 프로필, 설정, 계정 |
| POST | 포스팅 관리 | 포스팅 CRUD, 상태 관리 |
| SCHED | 스케줄러 | 자동화 규칙 엔진 |
| TREND | 트렌드 분석 | Kaito API 연동, 분석 |
| AUTO | 자동화 엔진 | AI 포스팅 생성 로직 |
| LOG | 로그/이력 | 활동 기록 저장/조회 |
| STATS | 통계/분석 | 수익, 성과 계산 |
| MONITOR | 시스템 모니터링 | 헬스체크, 메트릭 |
| EXTAPI | 외부 API | X API, Kaito API 래퍼 |
| QUEUE | 큐 시스템 | 비동기 작업 관리 |
| NOTIFY | 알림 | 푸시, 이메일, 웹소켓 |

---

# Part 1: Frontend Requirements

## 1. ONBOARD: 온보딩 및 계정 연결

### Frontend Requirements

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 |
|-----------|-----------|--------|--------|----------|
| ONBOARD01 | 온보딩 화면 | ONBOARD01_UI01 | 브랜드 표시 | Kaito 로고 80px, 타이틀 Large Title 34px, 설명 Body 17px, 중앙 정렬 페이드인 0.5초 |
| ONBOARD01 | 온보딩 화면 | ONBOARD01_ACTION01 | X 연결 버튼 | Primary Button 파랑 #007AFF 높이 50px, 클릭 시 `GET /auth/x/authorize` 호출하여 OAuth URL 획득 후 리다이렉트 |
| ONBOARD01 | 온보딩 화면 | ONBOARD01_CALLBACK01 | OAuth 콜백 처리 | `/auth/callback?code=XXX` 파라미터 수신, `POST /auth/x/token` 호출하여 액세스 토큰 교환, JWT 저장 후 DASH 전환 |
| ONBOARD01 | 온보딩 화면 | ONBOARD01_ERROR01 | 인증 실패 처리 | OAuth 실패 시 에러 메시지 토스트 표시, 재시도 버튼 제공, 에러 타입별 다른 메시지 (네트워크/권한/취소) |

---

## 2. DASH: 홈 대시보드

### Frontend Requirements

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 |
|-----------|-----------|--------|--------|----------|
| DASH01 | 프로필 헤더 | DASH01_PROFILE01 | 사용자 정보 표시 | `GET /users/me` 응답 데이터로 아바타 48px, 이름 Headline, 핸들 Caption, 팔로워 수 파랑 표시 |
| DASH01 | 프로필 헤더 | DASH01_TOGGLE01 | 자동화 토글 | iOS 스위치, 클릭 시 `PATCH /users/me/automation` body: {enabled: boolean}, 응답 받아 상태 동기화, 낙관적 업데이트 적용 |
| DASH02 | 실시간 통계 | DASH02_METRICS01 | 통계 카드 그룹 | `GET /stats/daily` 응답 {todayRevenue, totalPosts, avgRevenueRate} 로 3개 카드 렌더링, 5초마다 폴링 또는 WebSocket 구독 |
| DASH02 | 실시간 통계 | DASH02_REFRESH01 | 수동 새로고침 | 당겨서 새로고침 제스처, 로딩 스피너 표시, API 재호출 후 UI 업데이트 |
| DASH03 | 추천 코인 | DASH03_COIN01 | 코인 리스트 | `GET /trends/top-coins?limit=5` 응답 배열로 카드 렌더링, 순위/이름/포스팅 수/수익/24시간 변동률 표시, 색상 매핑 적용 |
| DASH03 | 추천 코인 | DASH03_DETAIL01 | 코인 상세 이동 | 코인 카드 클릭 시 `/coins/{coinName}` 경로로 네비게이션 (선택적 구현) |
| DASH04 | 예약 포스팅 큐 | DASH04_QUEUE01 | 포스팅 목록 | `GET /posts?status=scheduled,ready` 응답 배열로 카드 렌더링, 내용 3줄 말줄임, 이미지/코인/수익/시간 표시 |
| DASH04 | 예약 포스팅 큐 | DASH04_ACTION01 | 포스팅 취소 | `DELETE /posts/{postId}` 호출, 성공 시 배열에서 제거 + 0.3초 페이드아웃, 실패 시 에러 토스트 |
| DASH04 | 예약 포스팅 큐 | DASH04_ACTION02 | 포스팅 수정 | 수정 버튼 클릭 → EditPostSheet 오픈, 현재 post 데이터 전달, 수정 후 `PATCH /posts/{postId}` 호출 |
| DASH04 | 예약 포스팅 큐 | DASH04_ACTION03 | 즉시 포스팅 | `POST /posts/{postId}/publish` 호출, 2초 로딩 스피너, 성공 시 배열 제거 + 성공 토스트, 실패 시 에러 처리 |
| DASH04 | 예약 포스팅 큐 | DASH04_REALTIME01 | 실시간 큐 업데이트 | WebSocket 구독 `ws://api/posts/stream`, 새 포스팅 추가/상태 변경 이벤트 수신 시 UI 즉시 반영 |

---

## 3. SCHED: 스케줄러

### Frontend Requirements

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 |
|-----------|-----------|--------|--------|----------|
| SCHED01 | 규칙 목록 | SCHED01_LIST01 | 규칙 카드 렌더링 | `GET /schedules` 응답 배열로 규칙 카드 표시, 규칙명/시간/빈도/포스팅 수/마지막 실행/활성 상태 표시 |
| SCHED01 | 규칙 목록 | SCHED01_TOGGLE01 | 규칙 활성화 토글 | iOS 스위치, 클릭 시 `PATCH /schedules/{scheduleId}` body: {active: boolean}, 낙관적 업데이트 + 서버 동기화 |
| SCHED01 | 규칙 목록 | SCHED01_DELETE01 | 규칙 삭제 | 스와이프 또는 삭제 버튼, 확인 다이얼로그 표시, `DELETE /schedules/{scheduleId}` 호출 후 목록 제거 |
| SCHED01 | 규칙 추가 | SCHED01_CREATE01 | 새 규칙 시트 오픈 | 하단 버튼 클릭 → NewScheduleSheet 오픈, 빈 폼 상태로 초기화 |
| SHEET01 | 규칙 작성 시트 | SHEET01_FORM01 | 규칙 폼 입력 | AI 자동 생성 토글, 포스팅 시간 select, 반복 빈도 select, 타겟 코인 멀티셀렉트, 톤 & 스타일 select, 입력 검증 적용 |
| SHEET01 | 규칙 작성 시트 | SHEET01_SUBMIT01 | 규칙 저장 | `POST /schedules` body: {time, frequency, coins, tone, aiEnabled}, 성공 시 시트 닫기 + 목록 새로고침, 실패 시 필드별 에러 표시 |
| SHEET01 | 규칙 작성 시트 | SHEET01_VALIDATION01 | 입력 검증 | 시간 필수, 최소 1개 코인 선택, AI OFF 시 톤 필수 체크, 실시간 검증 피드백 빨강 텍스트 |

---

## 4. LOG: 활동 로그

### Frontend Requirements

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 |
|-----------|-----------|--------|--------|----------|
| LOG01 | 로그 목록 | LOG01_FILTER01 | 시간 필터 탭 | 오늘/이번 주/전체 탭, 클릭 시 `GET /logs?period={today\|week\|all}` 호출하여 목록 새로고침 |
| LOG01 | 로그 목록 | LOG01_LIST01 | 로그 카드 렌더링 | 응답 배열로 카드 표시, 상태 아이콘 ✅/⚠️, 시간 HH:MM, 제목/내용 미리보기, 코인 배지, 수익 (성공 시) |
| LOG01 | 로그 목록 | LOG01_PAGINATION01 | 무한 스크롤 | Intersection Observer로 하단 감지, `GET /logs?page={n}&limit=20` 호출하여 추가 로드, 로딩 스피너 표시 |
| LOG01 | 로그 상세 | LOG01_DETAIL01 | 상세 시트 오픈 | 로그 카드 클릭 → `GET /logs/{logId}` 호출하여 전체 데이터 로드, LogDetailSheet 오픈 |
| SHEET02 | 로그 상세 시트 | SHEET02_CONTENT01 | 상세 정보 표시 | 전체 포스팅 내용, 정확한 시간, 연관 코인, 실제 수익, 에러 메시지, 트위터 링크 표시 |
| SHEET02 | 로그 상세 시트 | SHEET02_RESEND01 | 재전송 버튼 | 실패한 로그에만 표시, 클릭 시 `POST /posts/{postId}/retry` 호출, 성공 시 새 로그 생성 + 토스트 |
| SHEET02 | 로그 상세 시트 | SHEET02_LINK01 | 트위터 링크 | 성공한 로그에만 표시, 클릭 시 `twitterUrl` 필드 값으로 외부 링크 오픈 (새 탭) |

---

## 5. MONITOR: 시스템 모니터

### Frontend Requirements

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 |
|-----------|-----------|--------|--------|----------|
| MONITOR01 | 시스템 상태 | MONITOR01_STATUS01 | 상태 카드 | `GET /monitor/system` 응답 {apiLatency, uptime, status} 로 카드 표시, 초록/노랑/빨강 인디케이터 |
| MONITOR01 | 시스템 상태 | MONITOR01_REFRESH01 | 자동 갱신 | 10초마다 `/monitor/system` 폴링, 상태 변경 시 토스트 알림 (정상→경고) |
| MONITOR01 | 최근 활동 | MONITOR01_ACTIVITY01 | 활동 스트림 | `GET /monitor/activity?limit=10` 응답 배열로 스트림 표시, 액션 아이콘/설명/시간/관련 정보 |
| MONITOR01 | 실시간 트렌드 | MONITOR01_TREND01 | 트렌드 목록 | `GET /trends/live` 응답 배열로 트렌드 카드 표시, 해시태그/인기도 점수/관련 코인/임팩트 표시 |
| MONITOR01 | 성과 지표 | MONITOR01_METRICS01 | 지표 그리드 | `GET /stats/performance` 응답 {todayPosts, successRate, avgRevenue, trendAccuracy} 로 2x2 그리드 표시 |
| MONITOR01 | 연결 테스트 | MONITOR01_TEST01 | API 테스트 버튼 | 클릭 시 `GET /monitor/health` 호출, 1초 로딩, 성공/실패 토스트, 응답 시간 표시 |

---

## 6. SET: 설정

### Frontend Requirements

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 |
|-----------|-----------|--------|--------|----------|
| SET01 | 계정 관리 | SET01_ACCOUNT01 | 연결 계정 표시 | `GET /users/me/connections` 응답으로 X 계정 정보 표시, 아이콘/사용자명/상태 |
| SET01 | 계정 관리 | SET01_DISCONNECT01 | 연결 끊기 | 확인 다이얼로그 표시, `DELETE /users/me/connections/x` 호출, 성공 시 ONBOARD로 전환 + 로컬 토큰 삭제 |
| SET01 | API 키 관리 | SET01_APIKEY01 | API 키 시트 오픈 | 버튼 클릭 → ApiKeySheet 오픈, `GET /users/me/api-keys` 호출하여 현재 키 정보 로드 |
| SHEET03 | API 키 시트 | SHEET03_DISPLAY01 | 키 마스킹 표시 | 끝 4자리만 표시 `sk-•••••2h4j`, Eye/EyeOff 토글로 전체 키 보기/숨기기 |
| SHEET03 | API 키 시트 | SHEET03_COPY01 | 클립보드 복사 | Copy 버튼 클릭 시 `navigator.clipboard.writeText()`, 성공 토스트 표시 |
| SHEET03 | API 키 시트 | SHEET03_UPDATE01 | 키 변경 | textarea에 새 키 입력, `PATCH /users/me/api-keys` body: {xApiKey, kaitoApiKey}, 검증 후 저장, 성공 토스트 |
| SET02 | 일반 설정 | SET02_GENERAL01 | 설정 토글 그룹 | `GET /users/me/settings` 응답으로 알림/검토/언어/다크모드 토글 상태 동기화 |
| SET02 | 일반 설정 | SET02_UPDATE01 | 설정 변경 | 각 토글 클릭 시 `PATCH /users/me/settings` body: {key, value}, 낙관적 업데이트 적용 |
| SET02 | 고급 설정 | SET02_ADVANCED01 | 고급 설정 표시 | 자동 재시도/타임아웃/디버그 모드 설정 표시, 변경 시 동일 API 호출 |
| SET03 | 앱 정보 | SET03_INFO01 | 정보 섹션 | 버전 표시, 이용약관/개인정보 처리방침 링크, 로그아웃 버튼 |
| SET03 | 로그아웃 | SET03_LOGOUT01 | 로그아웃 처리 | 확인 다이얼로그, `POST /auth/logout` 호출, 로컬 JWT 삭제, ONBOARD로 전환 |

---

## 7. SHEET04: 포스팅 수정 시트

### Frontend Requirements

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 |
|-----------|-----------|--------|--------|----------|
| SHEET04 | 포스팅 수정 | SHEET04_EDIT01 | 내용 수정 textarea | 현재 post.content 로드, 280자 제한, 실시간 글자 수 표시, 입력 검증 |
| SHEET04 | 포스팅 수정 | SHEET04_COIN01 | 코인 선택 변경 | select dropdown, 변경 시 `GET /trends/estimate?coin={coin}` 호출하여 예상 수익 재계산 표시 |
| SHEET04 | 포스팅 수정 | SHEET04_IMAGE01 | 이미지 미리보기 | 현재 이미지 표시, "이미지 변경" 버튼 (선택적, 현재는 시뮬레이션) |
| SHEET04 | 포스팅 수정 | SHEET04_SAVE01 | 수정 저장 | `PATCH /posts/{postId}` body: {content, coin, scheduledTime, image}, 성공 시 시트 닫기 + 목록 새로고침, 실패 시 필드별 에러 |

---

## 8. NAV: 탭바 네비게이션

### Frontend Requirements

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 |
|-----------|-----------|--------|--------|----------|
| NAV01 | 탭바 UI | NAV01_LAYOUT01 | 탭바 컨테이너 | fixed bottom-0, backdrop-blur, 5개 탭 아이콘+텍스트, 활성 탭 파랑 강조 |
| NAV01 | 탭바 UI | NAV01_ACTIVE01 | 활성 탭 표시 | 현재 화면에 따라 activeTab 상태 동기화, 색상/폰트 변경, 0.2초 전환 애니메이션 |

---

## 9. PRESENT: 발표 모드

### Frontend Requirements

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 |
|-----------|-----------|--------|--------|----------|
| PRESENT01 | 스토리보드 | PRESENT01_FLOWS01 | 플로우 목록 | 12개 플로우 카드 표시, 시작 버튼 클릭 시 발표 모드 진입 |
| PRESENT02 | 발표 실행 | PRESENT02_START01 | 플로우 시작 | 모든 상태 초기화, presentationMode true, 첫 단계 화면 전환, 하이라이트 적용 |
| PRESENT02 | 발표 실행 | PRESENT02_NAV01 | 단계 네비게이션 | 이전/다음 버튼으로 단계 전환, 각 단계에서 executeStepAction() 실행 |
| PRESENT02 | 발표 실행 | PRESENT02_OVERLAY01 | 컨트롤 오버레이 | 하단 고정 오버레이, 현재 플로우명/단계 표시, 이전/다음/종료 버튼 |
| PRESENT02 | 발표 실행 | PRESENT02_HIGHLIGHT01 | 하이라이트 시스템 | highlightElement prop 기반 빨간 outline + glow 효과, z-index 조정 |

---

# Part 2: Backend Requirements

## 1. AUTH: 인증 및 인가

| 요구사항ID | 서비스 영역 | API/로직명 | 상세 설명 |
|-----------|------------|-----------|----------|
| AUTH01 | OAuth 연동 | `GET /api/v1/auth/x/authorize` | **목적**: X OAuth 2.0 인증 URL 생성<br>**요청**: 없음<br>**응답**: `{authUrl: string, state: string}`<br>**로직**: X API OAuth URL 생성, state 파라미터로 CSRF 방어, Redis에 state 저장 (5분 TTL) |
| AUTH01 | OAuth 연동 | `GET /api/v1/auth/callback` | **목적**: X OAuth 콜백 처리<br>**요청**: Query `code, state`<br>**응답**: 리다이렉트 to `/` with JWT cookie<br>**로직**: state 검증, X API에 code 교환하여 access_token 획득, 사용자 정보 조회, DB에 사용자 저장/업데이트, JWT 생성 후 쿠키 설정 |
| AUTH01 | OAuth 연동 | `POST /api/v1/auth/x/token` | **목적**: OAuth code를 JWT로 교환<br>**요청**: Body `{code: string, state: string}`<br>**응답**: `{accessToken: string, refreshToken: string, user: UserDto}`<br>**로직**: 콜백과 동일하지만 JSON 응답 방식 |
| AUTH02 | JWT 관리 | `POST /api/v1/auth/refresh` | **목적**: JWT refresh<br>**요청**: Body `{refreshToken: string}` 또는 Cookie<br>**응답**: `{accessToken: string}`<br>**로직**: refreshToken 검증, Redis에서 유효성 체크, 새 accessToken 발급 |
| AUTH02 | JWT 관리 | `POST /api/v1/auth/logout` | **목적**: 로그아웃<br>**요청**: Header `Authorization: Bearer {token}`<br>**응답**: `{success: true}`<br>**로직**: JWT 블랙리스트에 추가 (Redis, TTL = 토큰 만료 시간), refreshToken 무효화 |
| AUTH03 | 권한 검증 | Middleware: `authGuard` | **목적**: 모든 보호된 엔드포인트에 적용<br>**로직**: Authorization 헤더에서 JWT 추출, 서명 검증, 만료 체크, 블랙리스트 확인, `req.user` 에 사용자 정보 주입 |
| AUTH03 | 권한 검증 | Middleware: `roleGuard(role)` | **목적**: 역할 기반 접근 제어<br>**로직**: `req.user.role` 체크, 허용된 역할이 아니면 403 반환 (현재는 모두 user 역할, 추후 admin 추가 가능) |

---

## 2. USER: 사용자 관리

| 요구사항ID | 서비스 영역 | API/로직명 | 상세 설명 |
|-----------|------------|-----------|----------|
| USER01 | 프로필 조회 | `GET /api/v1/users/me` | **목적**: 현재 로그인 사용자 정보 조회<br>**요청**: Header `Authorization`<br>**응답**: `{id, name, handle, avatar, followers, createdAt}`<br>**로직**: JWT에서 userId 추출, DB에서 사용자 조회, 민감 정보 제외 후 반환 |
| USER01 | 프로필 조회 | `GET /api/v1/users/me/connections` | **목적**: 연결된 외부 계정 목록<br>**응답**: `[{platform: 'X', username, status: 'active', connectedAt}]`<br>**로직**: DB에서 외부 연결 정보 조회, X API로 계정 상태 검증 (선택적) |
| USER02 | 자동화 설정 | `PATCH /api/v1/users/me/automation` | **목적**: 자동화 ON/OFF 토글<br>**요청**: Body `{enabled: boolean}`<br>**응답**: `{enabled: boolean, updatedAt}`<br>**로직**: DB users 테이블 automation_enabled 컬럼 업데이트, enabled=false 시 모든 활성 스케줄 일시 중지 (scheduler 큐에 메시지 발송) |
| USER03 | 설정 관리 | `GET /api/v1/users/me/settings` | **목적**: 사용자 설정 조회<br>**응답**: `{notifications, reviewBeforePost, language, darkMode, autoRetry, apiTimeout, debugMode}`<br>**로직**: DB user_settings 테이블 조회, 기본값 적용 |
| USER03 | 설정 관리 | `PATCH /api/v1/users/me/settings` | **목적**: 설정 업데이트<br>**요청**: Body `{key: string, value: any}` 또는 전체 객체<br>**응답**: 업데이트된 설정 객체<br>**로직**: 입력 검증, DB 업데이트, 변경 사항 로그 기록 |
| USER04 | API 키 관리 | `GET /api/v1/users/me/api-keys` | **목적**: API 키 정보 조회 (마스킹)<br>**응답**: `{xApiKey: 'sk-•••2h4j', kaitoApiKey: '•••8f3k', stats: {createdAt, lastUsed, totalRequests}}`<br>**로직**: DB에서 암호화된 키 조회, 끝 4자리만 노출, 통계 정보 집계 |
| USER04 | API 키 관리 | `PATCH /api/v1/users/me/api-keys` | **목적**: API 키 업데이트<br>**요청**: Body `{xApiKey?: string, kaitoApiKey?: string}`<br>**응답**: 업데이트 성공 메시지<br>**로직**: 키 검증 (X API, Kaito API 테스트 호출), AES-256 암호화 후 DB 저장, 이전 키는 히스토리 테이블에 백업 |
| USER05 | 계정 연결 해제 | `DELETE /api/v1/users/me/connections/x` | **목적**: X 계정 연결 끊기<br>**응답**: `{success: true}`<br>**로직**: DB에서 X access_token 삭제, 모든 스케줄 비활성화, 예약 포스팅 취소, 사용자에게 확인 이메일 발송 (선택적) |

---

## 3. POST: 포스팅 관리

| 요구사항ID | 서비스 영역 | API/로직명 | 상세 설명 |
|-----------|------------|-----------|----------|
| POST01 | 포스팅 조회 | `GET /api/v1/posts` | **목적**: 포스팅 목록 조회<br>**요청**: Query `status=scheduled,ready&page=1&limit=20`<br>**응답**: `{posts: PostDto[], total, page, limit}`<br>**로직**: DB posts 테이블 조회, userId 필터, status 필터, 페이지네이션, scheduledTime 내림차순 정렬 |
| POST01 | 포스팅 조회 | `GET /api/v1/posts/{postId}` | **목적**: 단일 포스팅 상세 조회<br>**응답**: `PostDto` (전체 필드)<br>**로직**: postId로 조회, 소유권 검증 (userId 일치 확인), 없으면 404 |
| POST02 | 포스팅 생성 | `POST /api/v1/posts` | **목적**: 수동 포스팅 생성<br>**요청**: Body `{content, coin, scheduledTime?, image?, autoPublish: false}`<br>**응답**: 생성된 `PostDto`<br>**로직**: 입력 검증 (280자 제한, coin 존재 여부), scheduledTime이 없으면 즉시 발행 플래그, DB 저장, autoPublish=true 시 큐에 job 추가 |
| POST02 | 포스팅 생성 | `POST /api/v1/posts/generate` | **목적**: AI 자동 포스팅 생성<br>**요청**: Body `{coin, tone?, trend?}`<br>**응답**: 생성된 `PostDto`<br>**로직**: 1) Kaito API로 최신 트렌드 조회 2) OpenAI/Claude API로 포스팅 내용 생성 (프롬프트: 트렌드+톤+코인) 3) Unsplash API로 관련 이미지 검색 4) 예상 수익 계산 (내부 ML 모델 또는 통계 기반) 5) DB 저장 status=ready |
| POST03 | 포스팅 수정 | `PATCH /api/v1/posts/{postId}` | **목적**: 포스팅 수정<br>**요청**: Body `{content?, coin?, scheduledTime?, image?}`<br>**응답**: 업데이트된 `PostDto`<br>**로직**: 소유권 검증, status=scheduled,ready만 수정 가능, DB 업데이트, 큐에 있는 job 취소 후 재등록 (scheduledTime 변경 시) |
| POST03 | 포스팅 수정 | `DELETE /api/v1/posts/{postId}` | **목적**: 포스팅 삭제 (취소)<br>**응답**: `{success: true}`<br>**로직**: 소유권 검증, status=posted는 삭제 불가 (소프트 삭제만), DB에서 삭제 또는 deleted_at 설정, 큐 job 취소 |
| POST04 | 포스팅 발행 | `POST /api/v1/posts/{postId}/publish` | **목적**: 즉시 포스팅<br>**응답**: `{success: true, twitterUrl, revenue?}`<br>**로직**: 1) 소유권 검증 2) X API로 트윗 발행 (이미지 있으면 미디어 업로드 후 첨부) 3) 성공 시 status=posted, twitterUrl 저장 4) 큐 job 제거 5) LOG 테이블에 성공 기록 6) 수익 계산 및 업데이트 |
| POST04 | 포스팅 발행 | `POST /api/v1/posts/{postId}/retry` | **목적**: 실패한 포스팅 재시도<br>**응답**: 동일<br>**로직**: publish와 동일하지만 status=failed인 포스팅만 허용, 재시도 횟수 체크 (최대 3회) |
| POST05 | 실시간 업데이트 | WebSocket: `ws://api/v1/posts/stream` | **목적**: 포스팅 실시간 푸시<br>**메시지**: `{event: 'post_created\|post_updated\|post_published', data: PostDto}`<br>**로직**: Redis Pub/Sub 또는 Socket.IO 사용, 포스팅 생성/수정/발행 시 연결된 클라이언트에 이벤트 브로드캐스트, userId로 필터링 |

---

## 4. SCHED: 스케줄러

| 요구사항ID | 서비스 영역 | API/로직명 | 상세 설명 |
|-----------|------------|-----------|----------|
| SCHED01 | 스케줄 조회 | `GET /api/v1/schedules` | **목적**: 자동화 규칙 목록<br>**응답**: `{schedules: ScheduleDto[], totalPosts, activeCount}`<br>**로직**: DB schedules 테이블 조회, userId 필터, 각 스케줄의 생성된 포스팅 수 집계 (JOIN posts), lastTrigger 계산 |
| SCHED01 | 스케줄 조회 | `GET /api/v1/schedules/{scheduleId}` | **목적**: 단일 스케줄 상세<br>**응답**: `ScheduleDto` + 최근 생성된 포스팅 목록<br>**로직**: 소유권 검증, 관련 통계 포함 |
| SCHED02 | 스케줄 생성 | `POST /api/v1/schedules` | **목적**: 새 자동화 규칙 생성<br>**요청**: Body `{name, time, frequency, coins, tone, aiEnabled}`<br>**응답**: 생성된 `ScheduleDto`<br>**로직**: 1) 입력 검증 (cron 표현식 생성 또는 빈도 매핑) 2) DB 저장 active=true 3) Scheduler 서비스에 크론 job 등록 (예: node-cron, BullMQ) 4) 첫 실행 시간 계산 |
| SCHED02 | 스케줄 생성 | Cron Job: `executeSchedule(scheduleId)` | **목적**: 예약된 시간에 자동 포스팅 생성<br>**로직**: 1) DB에서 schedule 조회 2) aiEnabled=true 시 `POST /posts/generate` 내부 호출 (coins 순회) 3) 생성된 포스팅을 큐에 등록 (scheduledTime에 발행) 4) lastTrigger 업데이트 5) 에러 발생 시 재시도 또는 알림 발송 |
| SCHED03 | 스케줄 수정 | `PATCH /api/v1/schedules/{scheduleId}` | **목적**: 스케줄 수정<br>**요청**: Body `{name?, time?, frequency?, coins?, tone?, active?}`<br>**응답**: 업데이트된 `ScheduleDto`<br>**로직**: 소유권 검증, DB 업데이트, time 변경 시 크론 job 재등록, active 토글 시 job 활성화/비활성화 |
| SCHED03 | 스케줄 수정 | `DELETE /api/v1/schedules/{scheduleId}` | **목적**: 스케줄 삭제<br>**응답**: `{success: true}`<br>**로직**: 소유권 검증, 크론 job 취소, DB 소프트 삭제, 연결된 예약 포스팅은 그대로 유지 (선택적으로 취소 가능) |
| SCHED04 | 스케줄 통계 | `GET /api/v1/schedules/{scheduleId}/stats` | **목적**: 스케줄 성과 분석<br>**응답**: `{totalPosts, successRate, avgRevenue, topCoins}`<br>**로직**: 해당 스케줄이 생성한 포스팅의 통계 집계, 일별/주별/월별 차트 데이터 반환 (선택적) |

---

## 5. TREND: 트렌드 분석

| 요구사항ID | 서비스 영역 | API/로직명 | 상세 설명 |
|-----------|------------|-----------|----------|
| TREND01 | 트렌드 조회 | `GET /api/v1/trends/live` | **목적**: 실시간 트렌드 목록<br>**요청**: Query `limit=10`<br>**응답**: `[{tag, score, relatedCoins, impact, updatedAt}]`<br>**로직**: 1) Kaito API `/trends` 호출 2) 결과를 내부 포맷으로 변환 3) Redis에 5분 캐싱 4) impact 계산 (내부 로직: score + historicalData) |
| TREND01 | 트렌드 조회 | `GET /api/v1/trends/top-coins` | **목적**: 추천 코인 리스트<br>**요청**: Query `limit=5`<br>**응답**: `[{name, rank, posts, revenue, trend, trendUp}]`<br>**로직**: 1) DB에서 최근 7일 코인별 포스팅 수/수익 집계 2) 24시간 변동률 계산 3) Kaito API로 현재 인기도 점수 조회 4) 순위 매기기 5) Redis 10분 캐싱 |
| TREND02 | 트렌드 분석 | Background Job: `analyzeTrends()` | **목적**: 주기적 트렌드 분석 (5분마다 실행)<br>**로직**: 1) Kaito API로 최신 트렌드 조회 2) X API Trending Topics 조회 (보조) 3) 내부 ML 모델로 임팩트 예측 4) DB trends 테이블에 저장 5) 급상승 트렌드 감지 시 알림 발송 (admin) 6) WebSocket으로 실시간 업데이트 브로드캐스트 |
| TREND03 | 예상 수익 | `GET /api/v1/trends/estimate` | **목적**: 특정 코인/트렌드의 예상 수익<br>**요청**: Query `coin={coin}&trend={tag}`<br>**응답**: `{estimatedRevenue, confidence, factors: []}`<br>**로직**: 1) 과거 데이터 기반 회귀 모델 또는 규칙 기반 계산 2) 코인 인기도 + 트렌드 점수 + 시간대 반영 3) confidence level 계산 (데이터 충분성) |

---

## 6. AUTO: 자동화 엔진

| 요구사항ID | 서비스 영역 | API/로직명 | 상세 설명 |
|-----------|------------|-----------|----------|
| AUTO01 | AI 생성 | Service: `generatePost(params)` | **목적**: AI 기반 포스팅 자동 생성<br>**입력**: `{coin, tone, trend?, keywords?}`<br>**출력**: `{content, image, estimatedRevenue}`<br>**로직**: 1) Kaito API로 해당 코인의 최신 뉴스/트렌드 조회 2) OpenAI GPT-4 또는 Claude API로 포스팅 생성 (프롬프트 템플릿: 톤+코인+트렌드) 3) 한글/영어 믹스 비율 조정 (70%/30%) 4) 해시태그 자동 추가 (2-4개) 5) Unsplash API로 관련 이미지 검색 6) 예상 수익 계산 모델 호출 |
| AUTO01 | AI 생성 | Prompt Template | **프롬프트 예시**: "You are a viral social media content creator. Generate a post about {coin} based on this trend: {trend}. Tone: {tone}. Use 70% Korean, 30% English. Include 2-4 hashtags. Add relevant emojis. Max 280 characters." |
| AUTO02 | 이미지 선택 | Service: `selectImage(keywords)` | **목적**: Unsplash에서 관련 이미지 자동 선택<br>**로직**: 1) keywords로 Unsplash API `/search/photos` 호출 2) 첫 번째 고품질 이미지 (w=800&q=80) 선택 3) 이미지 URL + 작가 정보 반환 4) 실패 시 기본 이미지 사용 |
| AUTO03 | 자동 발행 큐 | Queue: `publishQueue` | **목적**: 예약된 포스팅 자동 발행<br>**로직**: 1) BullMQ 또는 Celery 큐 사용 2) 포스팅 생성 시 scheduledTime을 delay로 job 등록 3) 실행 시간 도달 시 worker가 `POST /posts/{postId}/publish` 내부 호출 4) 성공/실패 로그 기록 5) 실패 시 재시도 (최대 3회, 지수 백오프) |
| AUTO04 | 수익 계산 | Service: `calculateRevenue(post)` | **목적**: 포스팅 예상/실제 수익 계산<br>**로직**: 1) 예상 수익: ML 모델 (coin popularity + trend score + time of day + historical avg) 2) 실제 수익: X API로 인게이지먼트 조회 (likes, retweets, replies) → 가중치 공식 적용 → $XX.XX 변환 3) DB posts 테이블 revenue 컬럼 업데이트 |

---

## 7. LOG: 로그 및 이력

| 요구사항ID | 서비스 영역 | API/로직명 | 상세 설명 |
|-----------|------------|-----------|----------|
| LOG01 | 로그 조회 | `GET /api/v1/logs` | **목적**: 활동 로그 목록<br>**요청**: Query `period=today\|week\|all&page=1&limit=20`<br>**응답**: `{logs: LogDto[], total, page}`<br>**로직**: DB activity_logs 테이블 조회, userId 필터, period 기반 날짜 필터 (today: 오늘 00:00 이후), time 내림차순 정렬 |
| LOG01 | 로그 조회 | `GET /api/v1/logs/{logId}` | **목적**: 로그 상세 조회<br>**응답**: `LogDto` (전체 필드)<br>**로직**: 소유권 검증, 관련 포스팅 정보 JOIN |
| LOG02 | 로그 생성 | Service: `createLog(params)` | **목적**: 활동 로그 자동 생성<br>**입력**: `{userId, type, postId?, title, content, coin?, revenue?, error?}`<br>**로직**: 1) DB activity_logs 테이블 INSERT 2) type: 'success' \| 'error' \| 'info' 3) 포스팅 성공/실패 시 자동 호출 4) 비동기 처리 (큐 또는 이벤트 리스너) |
| LOG03 | 로그 검색 | `GET /api/v1/logs/search` | **목적**: 로그 검색<br>**요청**: Query `q={keyword}&type={success\|error}`<br>**응답**: 검색 결과 배열<br>**로직**: content, title 필드에 LIKE 또는 Full-Text Search, type 필터 적용 |

---

## 8. STATS: 통계 및 분석

| 요구사항ID | 서비스 영역 | API/로직명 | 상세 설명 |
|-----------|------------|-----------|----------|
| STATS01 | 일일 통계 | `GET /api/v1/stats/daily` | **목적**: 오늘의 수익 및 통계<br>**응답**: `{todayRevenue, totalPosts, avgRevenueRate, change24h}`<br>**로직**: 1) DB posts 테이블에서 오늘 포스팅 집계 (createdAt >= today 00:00) 2) revenue SUM, COUNT(*) 3) 평균 수익률 계산 4) 어제와 비교하여 증감률 계산 5) Redis 1분 캐싱 |
| STATS02 | 성과 지표 | `GET /api/v1/stats/performance` | **목적**: 시스템 성과 지표<br>**응답**: `{todayPosts, successRate, avgRevenue, trendAccuracy}`<br>**로직**: 1) 오늘 포스팅 수 2) 성공률 = (성공 포스팅 / 전체 포스팅) * 100 3) 평균 수익 = SUM(revenue) / COUNT(*) 4) 트렌드 정확도 = (예상 수익과 실제 수익의 차이 분석) |
| STATS03 | 코인별 분석 | `GET /api/v1/stats/coins` | **목적**: 코인별 성과 분석<br>**요청**: Query `period=7d\|30d\|all`<br>**응답**: `[{coin, totalPosts, revenue, avgEngagement, trendChange}]`<br>**로직**: DB에서 코인별 그룹핑 집계, 시계열 데이터 반환 (일별/주별) |
| STATS04 | 차트 데이터 | `GET /api/v1/stats/charts` | **목적**: 대시보드 차트용 데이터<br>**요청**: Query `type=revenue\|posts&range=7d`<br>**응답**: `{labels: ['2025-11-20', ...], data: [100, 150, ...]}`<br>**로직**: 일별 또는 시간별 데이터 집계, 프론트엔드 차트 라이브러리 포맷으로 반환 |

---

## 9. MONITOR: 시스템 모니터링

| 요구사항ID | 서비스 영역 | API/로직명 | 상세 설명 |
|-----------|------------|-----------|----------|
| MONITOR01 | 시스템 상태 | `GET /api/v1/monitor/system` | **목적**: 시스템 상태 조회<br>**응답**: `{apiLatency, uptime, status, memoryUsage, cpuUsage}`<br>**로직**: 1) 외부 API (X, Kaito) ping 테스트 2) 서버 uptime 조회 3) 메모리/CPU 사용률 4) status: 'healthy' \| 'degraded' \| 'down' 5) Redis 연결 상태 체크 |
| MONITOR01 | 시스템 상태 | `GET /api/v1/monitor/health` | **목적**: 헬스체크 엔드포인트<br>**응답**: `{status: 'ok', timestamp, services: {db: 'up', redis: 'up', xApi: 'up'}}`<br>**로직**: 각 서비스 연결 테스트, 200 OK 또는 503 반환, 로드 밸런서용 |
| MONITOR02 | 활동 스트림 | `GET /api/v1/monitor/activity` | **목적**: 최근 시스템 활동<br>**요청**: Query `limit=10`<br>**응답**: `[{action, time, details, user?}]`<br>**로직**: 1) 최근 포스팅 생성/발행 이벤트 2) 스케줄 실행 이벤트 3) 트렌드 감지 이벤트 4) 에러 발생 이벤트 5) Redis 또는 DB에서 조회, 시간 역순 정렬 |
| MONITOR03 | 메트릭 수집 | Background Job: `collectMetrics()` | **목적**: 시스템 메트릭 수집 (1분마다)<br>**로직**: 1) 서버 리소스 사용률 수집 2) API 응답 시간 측정 (Prometheus, StatsD) 3) 큐 작업 수, 대기 시간 4) DB 쿼리 성능 5) 외부 API 호출 횟수/레이턴시 6) 시계열 DB (InfluxDB, TimescaleDB) 또는 Prometheus에 저장 |
| MONITOR04 | 알림 발송 | Service: `sendAlert(event)` | **목적**: 이상 상태 감지 시 알림<br>**로직**: 1) 에러율 > 10% 시 알림 2) API 레이턴시 > 2초 시 알림 3) 큐 적체 > 100개 시 알림 4) 외부 API 장애 감지 시 알림 5) 이메일/Slack 웹훅/SMS 발송 6) 중복 알림 방지 (5분 throttle) |

---

## 10. EXTAPI: 외부 API 연동

| 요구사항ID | 서비스 영역 | API/로직명 | 상세 설명 |
|-----------|------------|-----------|----------|
| EXTAPI01 | X API 래퍼 | Service: `XApiClient` | **목적**: X API v2 호출 래퍼<br>**메서드**: `postTweet(content, media?)`, `getUserInfo()`, `getTrends()`<br>**로직**: 1) 사용자의 X access_token 사용 (DB 또는 Redis에서 조회) 2) OAuth 1.0a 또는 2.0 인증 헤더 추가 3) 에러 처리 (429 Rate Limit, 401 Unauthorized) 4) 재시도 로직 (지수 백오프) 5) 응답 로깅 |
| EXTAPI01 | X API 래퍼 | Error Handling | **에러 코드 매핑**: 429 → "너무 많은 요청, 잠시 후 다시 시도", 401 → "인증 만료, 다시 로그인 필요", 403 → "권한 부족", 500 → "X 서버 오류" |
| EXTAPI02 | Kaito API 래퍼 | Service: `KaitoApiClient` | **목적**: Kaito AI API 호출<br>**메서드**: `getTrends()`, `getCoinAnalysis(coin)`, `getSignalScore(coin)`<br>**로직**: 1) 사용자의 Kaito API 키 사용 2) API 키를 Authorization 헤더에 추가 3) 응답 캐싱 (Redis, 5-10분) 4) 에러 처리 및 폴백 (API 장애 시 캐시된 데이터 반환) |
| EXTAPI03 | Unsplash API | Service: `UnsplashClient` | **목적**: 이미지 검색<br>**메서드**: `searchPhotos(query)`<br>**로직**: 1) Unsplash API `/search/photos` 호출 2) 고품질 이미지 (w=800&q=80) URL 반환 3) 에러 시 기본 placeholder 이미지 반환 4) 작가 정보 저장 (저작권 표시용) |
| EXTAPI04 | OpenAI API | Service: `OpenAIClient` | **목적**: AI 포스팅 생성<br>**메서드**: `generatePostContent(prompt)`<br>**로직**: 1) GPT-4 또는 GPT-3.5-turbo 호출 2) 프롬프트 템플릿 적용 3) temperature=0.8 (창의성) 4) max_tokens=100 5) 응답 파싱 및 검증 (280자 초과 시 재생성) |
| EXTAPI05 | 레이트 리미팅 | Middleware: `rateLimiter` | **목적**: API 레이트 리밋 관리<br>**로직**: 1) Redis로 사용자별 API 호출 횟수 추적 2) X API: 50 calls/15min per user 3) Kaito API: 100 calls/hour 4) 초과 시 429 반환 + Retry-After 헤더 5) 프리미엄 사용자는 제한 완화 (선택적) |

---

## 11. QUEUE: 큐 시스템

| 요구사항ID | 서비스 영역 | API/로직명 | 상세 설명 |
|-----------|------------|-----------|----------|
| QUEUE01 | 포스팅 큐 | Queue: `publishQueue` (BullMQ) | **목적**: 예약 포스팅 관리<br>**로직**: 1) 포스팅 생성 시 scheduledTime을 delay로 job 추가 2) job 데이터: `{postId, userId}` 3) worker가 시간 도달 시 `publishPost(postId)` 실행 4) 성공 시 job 완료, 실패 시 재시도 (최대 3회) |
| QUEUE01 | 포스팅 큐 | Worker: `publishWorker` | **로직**: 1) job에서 postId 추출 2) DB에서 post 조회 3) XApiClient.postTweet() 호출 4) 성공 시 status=posted, twitterUrl 저장 5) LOG 생성 6) 실패 시 에러 로그, 재시도 또는 status=failed |
| QUEUE02 | 스케줄 큐 | Queue: `scheduleQueue` | **목적**: 스케줄 기반 자동 생성<br>**로직**: 1) 크론 job이 실행 시간마다 `{scheduleId}` job 추가 2) worker가 `generatePost()` 호출 3) 생성된 포스팅을 `publishQueue`에 등록 4) 에러 시 알림 발송 |
| QUEUE03 | 트렌드 분석 큐 | Queue: `trendQueue` | **목적**: 백그라운드 트렌드 분석<br>**로직**: 1) 5분마다 job 추가 2) worker가 `analyzeTrends()` 실행 3) Kaito API 호출, DB 저장 4) 급상승 트렌드 감지 시 WebSocket 브로드캐스트 |
| QUEUE04 | 큐 모니터링 | `GET /api/v1/queue/status` | **목적**: 큐 상태 조회<br>**응답**: `{publishQueue: {active, waiting, completed, failed}, scheduleQueue: {...}}`<br>**로직**: BullMQ 또는 Celery 큐 메트릭 조회, 대시보드 표시용 |

---

## 12. NOTIFY: 알림

| 요구사항ID | 서비스 영역 | API/로직명 | 상세 설명 |
|-----------|------------|-----------|----------|
| NOTIFY01 | 실시간 알림 | WebSocket: `ws://api/v1/notifications` | **목적**: 사용자별 실시간 알림<br>**메시지**: `{type, title, message, data?, timestamp}`<br>**로직**: 1) 사용자 로그인 시 WebSocket 연결 2) userId로 room 구독 3) 포스팅 성공/실패, 트렌드 감지, 시스템 알림 시 메시지 발송 4) 브라우저 알림 권한 요청 (선택적) |
| NOTIFY02 | 이메일 알림 | Service: `EmailService` | **목적**: 중요 이벤트 이메일 발송<br>**로직**: 1) 계정 연결 성공/해제 2) 주간 성과 리포트 3) 시스템 장애 알림 4) SendGrid, AWS SES, Nodemailer 사용 5) 템플릿 엔진 (Handlebars, EJS) |
| NOTIFY03 | 푸시 알림 | Service: `PushService` | **목적**: 모바일 푸시 알림 (선택적)<br>**로직**: 1) Firebase Cloud Messaging (FCM) 연동 2) 디바이스 토큰 저장 3) 포스팅 성공 시 알림 4) 사용자 설정에서 ON/OFF 제어 |
| NOTIFY04 | 알림 설정 | `GET /api/v1/users/me/notification-settings` | **목적**: 알림 설정 조회<br>**응답**: `{email, push, success, failure, trends}`<br>**로직**: DB user_notification_settings 테이블 조회 |
| NOTIFY04 | 알림 설정 | `PATCH /api/v1/users/me/notification-settings` | **목적**: 알림 설정 변경<br>**요청**: Body `{key, value}`<br>**로직**: DB 업데이트, 변경 사항 즉시 적용 |

---

## 13. 데이터 스키마 정의

### Database Schema (PostgreSQL)

#### users 테이블
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100),
  handle VARCHAR(50) UNIQUE NOT NULL,
  avatar TEXT,
  followers INTEGER DEFAULT 0,
  automation_enabled BOOLEAN DEFAULT true,
  x_access_token TEXT, -- 암호화
  x_refresh_token TEXT, -- 암호화
  x_user_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

#### posts 테이블
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  schedule_id UUID REFERENCES schedules(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  coin VARCHAR(20) NOT NULL,
  image TEXT,
  scheduled_time TIMESTAMP,
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, ready, posting, posted, failed
  twitter_url TEXT,
  estimated_revenue DECIMAL(10,2),
  actual_revenue DECIMAL(10,2),
  engagement_score INTEGER,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP,
  deleted_at TIMESTAMP,
  INDEX idx_user_status (user_id, status),
  INDEX idx_scheduled_time (scheduled_time)
);
```

#### schedules 테이블
```sql
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  time VARCHAR(10), -- "HH:MM" or "24시간 활성"
  frequency VARCHAR(50), -- "daily", "hourly", "event-based"
  coins TEXT[], -- ARRAY of coin names
  tone VARCHAR(50), -- "aggressive", "humorous", "professional"
  ai_enabled BOOLEAN DEFAULT true,
  active BOOLEAN DEFAULT true,
  last_triggered_at TIMESTAMP,
  total_posts INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  INDEX idx_user_active (user_id, active)
);
```

#### activity_logs 테이블
```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
  type VARCHAR(20) NOT NULL, -- success, error, info
  title VARCHAR(200),
  content TEXT,
  coin VARCHAR(20),
  revenue DECIMAL(10,2),
  error_message TEXT,
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_type_time (user_id, type, created_at DESC)
);
```

#### trends 테이블
```sql
CREATE TABLE trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag VARCHAR(100) UNIQUE NOT NULL,
  score INTEGER NOT NULL, -- 0-100
  related_coins TEXT[],
  impact VARCHAR(20), -- high, medium, low
  source VARCHAR(50), -- kaito, x, internal
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_score (score DESC),
  INDEX idx_updated_at (updated_at DESC)
);
```

#### user_settings 테이블
```sql
CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  notifications BOOLEAN DEFAULT true,
  review_before_post BOOLEAN DEFAULT true,
  language VARCHAR(10) DEFAULT 'ko',
  dark_mode BOOLEAN DEFAULT false,
  auto_retry INTEGER DEFAULT 3,
  api_timeout INTEGER DEFAULT 30,
  debug_mode BOOLEAN DEFAULT false,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### api_keys 테이블
```sql
CREATE TABLE api_keys (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  x_api_key TEXT, -- 암호화
  kaito_api_key TEXT, -- 암호화
  total_requests INTEGER DEFAULT 0,
  last_used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Redis Schema

```
# JWT 블랙리스트
blacklist:{token} = "1" (TTL = 토큰 만료 시간)

# OAuth state
oauth_state:{state} = {userId, timestamp} (TTL = 5분)

# API 레이트 리밋
ratelimit:{userId}:{endpoint} = count (TTL = 15분)

# 캐시
cache:trends:live = JSON (TTL = 5분)
cache:topcoins = JSON (TTL = 10분)
cache:stats:daily:{userId} = JSON (TTL = 1분)

# 세션
session:{sessionId} = {userId, ...} (TTL = 7일)

# 큐 (BullMQ 자동 관리)
bull:publishQueue:*
bull:scheduleQueue:*
bull:trendQueue:*
```

---

## 14. API 에러 코드 표준

| 에러 코드 | HTTP Status | 메시지 | 설명 |
|----------|-------------|--------|------|
| AUTH_001 | 401 | 인증이 필요합니다 | JWT 누락 또는 잘못된 토큰 |
| AUTH_002 | 401 | 토큰이 만료되었습니다 | JWT 만료 |
| AUTH_003 | 403 | 권한이 없습니다 | 리소스 접근 권한 없음 |
| USER_001 | 404 | 사용자를 찾을 수 없습니다 | 존재하지 않는 사용자 |
| POST_001 | 404 | 포스팅을 찾을 수 없습니다 | 존재하지 않는 포스팅 |
| POST_002 | 400 | 내용은 최대 280자입니다 | 입력 검증 실패 |
| POST_003 | 400 | 코인을 선택해주세요 | 필수 필드 누락 |
| POST_004 | 409 | 이미 발행된 포스팅입니다 | 중복 작업 시도 |
| SCHED_001 | 404 | 스케줄을 찾을 수 없습니다 | 존재하지 않는 스케줄 |
| SCHED_002 | 400 | 시간 형식이 잘못되었습니다 | 입력 검증 실패 |
| EXTAPI_001 | 503 | X API 연동 오류 | 외부 API 장애 |
| EXTAPI_002 | 429 | 요청 제한 초과 | Rate Limit 초과 |
| EXTAPI_003 | 503 | Kaito API 연동 오류 | 외부 API 장애 |
| SERVER_001 | 500 | 서버 오류가 발생했습니다 | 내부 서버 오류 |

**에러 응답 포맷**:
```json
{
  "error": {
    "code": "POST_002",
    "message": "내용은 최대 280자입니다",
    "details": {
      "field": "content",
      "currentLength": 320,
      "maxLength": 280
    },
    "timestamp": "2025-12-03T12:34:56Z"
  }
}
```

---

## 15. 보안 요구사항

| 요구사항ID | 영역 | 내용 | 구현 방법 |
|-----------|------|------|----------|
| SEC01 | 인증 | JWT 보안 | - HS256 또는 RS256 알고리즘<br>- Secret 환경 변수 관리<br>- Access token 15분, Refresh token 7일<br>- Refresh token rotation |
| SEC02 | 암호화 | 민감 데이터 암호화 | - X access_token, API 키는 AES-256 암호화 후 DB 저장<br>- 암호화 키는 AWS KMS 또는 HashiCorp Vault 사용 |
| SEC03 | HTTPS | SSL/TLS | - 프로덕션 환경 HTTPS 강제<br>- Let's Encrypt 인증서<br>- HSTS 헤더 설정 |
| SEC04 | CORS | Cross-Origin | - 허용된 origin만 설정<br>- Credentials 허용 (쿠키 사용 시)<br>- Preflight 캐싱 |
| SEC05 | CSRF | CSRF 방어 | - SameSite cookie 설정<br>- CSRF 토큰 (POST/PATCH/DELETE)<br>- OAuth state 파라미터 검증 |
| SEC06 | Rate Limiting | API 제한 | - Redis 기반 슬라이딩 윈도우<br>- IP별, 사용자별 제한<br>- 429 응답 + Retry-After 헤더 |
| SEC07 | Input Validation | 입력 검증 | - Joi, Yup 등 스키마 검증<br>- XSS 방지 (sanitize-html)<br>- SQL Injection 방지 (ORM 사용) |
| SEC08 | 로깅 | 보안 로깅 | - 인증 실패, API 오류 로깅<br>- 민감 정보 마스킹<br>- Winston, Pino 사용 |

---

## 16. 성능 요구사항

| 요구사항ID | 영역 | 목표 | 구현 방법 |
|-----------|------|------|----------|
| PERF01 | API 응답 시간 | < 200ms (P95) | - DB 인덱스 최적화<br>- Redis 캐싱<br>- N+1 쿼리 방지 (DataLoader) |
| PERF02 | 데이터베이스 | < 50ms (쿼리 평균) | - 복합 인덱스 생성<br>- 쿼리 최적화 (EXPLAIN 분석)<br>- Connection pooling |
| PERF03 | 캐싱 | 80% 캐시 히트율 | - Redis 캐싱 전략<br>- TTL 적절히 설정<br>- Cache invalidation 로직 |
| PERF04 | 동시 사용자 | 1000명 동시 접속 | - Horizontal scaling (로드 밸런서)<br>- Stateless 서버 설계<br>- WebSocket 클러스터링 |
| PERF05 | 큐 처리 | < 5초 지연 | - BullMQ 워커 병렬 처리 (concurrency=5)<br>- 우선순위 큐 사용<br>- 큐 모니터링 |

---

## 17. 운영 및 배포

| 요구사항ID | 영역 | 내용 |
|-----------|------|------|
| OPS01 | 환경 변수 | - DATABASE_URL, REDIS_URL<br>- JWT_SECRET, ENCRYPTION_KEY<br>- X_CLIENT_ID, X_CLIENT_SECRET<br>- KAITO_API_KEY<br>- OPENAI_API_KEY<br>- UNSPLASH_ACCESS_KEY |
| OPS02 | 로깅 | - Winston 또는 Pino<br>- 로그 레벨: error, warn, info, debug<br>- 파일 로깅 + 콘솔 출력<br>- 프로덕션: ELK Stack 또는 CloudWatch |
| OPS03 | 모니터링 | - Prometheus + Grafana<br>- 메트릭: API latency, DB connections, Queue size<br>- 알림: PagerDuty, Slack |
| OPS04 | 배포 | - Docker 컨테이너화<br>- Kubernetes 또는 AWS ECS<br>- Blue-Green 또는 Rolling 배포<br>- CI/CD: GitHub Actions, CircleCI |
| OPS05 | 백업 | - DB 자동 백업 (일일)<br>- S3에 백업 저장<br>- Point-in-time recovery |
| OPS06 | 스케일링 | - Horizontal Pod Autoscaler (HPA)<br>- DB Read Replica<br>- Redis Cluster |

---

## 18. 테스트 요구사항

| 요구사항ID | 영역 | 내용 |
|-----------|------|------|
| TEST01 | 단위 테스트 | - Jest, Vitest 사용<br>- 서비스 로직 테스트 커버리지 > 80%<br>- Mock 사용 (외부 API) |
| TEST02 | 통합 테스트 | - Supertest로 API 엔드포인트 테스트<br>- Test DB 사용<br>- 트랜잭션 롤백 |
| TEST03 | E2E 테스트 | - Playwright 또는 Cypress<br>- 주요 사용자 플로우 테스트<br>- CI에서 자동 실행 |
| TEST04 | 부하 테스트 | - k6, Artillery 사용<br>- 1000 concurrent users 시뮬레이션<br>- 응답 시간, 에러율 측정 |

---

## 부록: API 엔드포인트 전체 목록

### 인증 (AUTH)
```
GET    /api/v1/auth/x/authorize
GET    /api/v1/auth/callback
POST   /api/v1/auth/x/token
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
```

### 사용자 (USER)
```
GET    /api/v1/users/me
GET    /api/v1/users/me/connections
PATCH  /api/v1/users/me/automation
GET    /api/v1/users/me/settings
PATCH  /api/v1/users/me/settings
GET    /api/v1/users/me/api-keys
PATCH  /api/v1/users/me/api-keys
DELETE /api/v1/users/me/connections/x
```

### 포스팅 (POST)
```
GET    /api/v1/posts
GET    /api/v1/posts/{postId}
POST   /api/v1/posts
POST   /api/v1/posts/generate
PATCH  /api/v1/posts/{postId}
DELETE /api/v1/posts/{postId}
POST   /api/v1/posts/{postId}/publish
POST   /api/v1/posts/{postId}/retry
WS     ws://api/v1/posts/stream
```

### 스케줄 (SCHED)
```
GET    /api/v1/schedules
GET    /api/v1/schedules/{scheduleId}
POST   /api/v1/schedules
PATCH  /api/v1/schedules/{scheduleId}
DELETE /api/v1/schedules/{scheduleId}
GET    /api/v1/schedules/{scheduleId}/stats
```

### 트렌드 (TREND)
```
GET    /api/v1/trends/live
GET    /api/v1/trends/top-coins
GET    /api/v1/trends/estimate
```

### 로그 (LOG)
```
GET    /api/v1/logs
GET    /api/v1/logs/{logId}
GET    /api/v1/logs/search
```

### 통계 (STATS)
```
GET    /api/v1/stats/daily
GET    /api/v1/stats/performance
GET    /api/v1/stats/coins
GET    /api/v1/stats/charts
```

### 모니터 (MONITOR)
```
GET    /api/v1/monitor/system
GET    /api/v1/monitor/health
GET    /api/v1/monitor/activity
```

### 큐 (QUEUE)
```
GET    /api/v1/queue/status
```

### 알림 (NOTIFY)
```
WS     ws://api/v1/notifications
GET    /api/v1/users/me/notification-settings
PATCH  /api/v1/users/me/notification-settings
```

---

## 문서 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 2.0 | 2025.12.03 | 백엔드 요구사항 추가, 종합 문서로 재작성 | AI Assistant |
| 1.0 | 2025.12.03 | 프론트엔드 요구사항 초안 | AI Assistant |

---

**총 요구사항**: 80개 이상 (프론트 40개, 백엔드 40개)  
**총 API 엔드포인트**: 50개 이상  
**데이터베이스 테이블**: 8개  
**외부 API 연동**: 4개 (X, Kaito, Unsplash, OpenAI)
