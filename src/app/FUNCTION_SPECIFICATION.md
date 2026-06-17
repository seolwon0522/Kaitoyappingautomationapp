# Kaito 야핑 자동화 시스템 - 기능정의서 (Function Specification)

## 문서 정보
- **프로젝트명**: Kaito 야핑 자동화 시스템
- **문서 유형**: 통합 기능정의서 (Frontend + Backend)
- **작성 기준**: 구현된 UI 컴포넌트 및 프로토타입 플로우 분석
- **작성일**: 2025.12.03
- **버전**: 1.0

---

## 1. ONBOARD – 온보딩 및 초기 계정 연결

### 요구사항 및 기능 정의

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 | 비고 |
|-----------|-----------|--------|--------|----------|------|
| ONBOARD01 | 사용자는 앱 초기 실행 시 서비스 소개를 확인할 수 있어야 한다 | ONBOARD_UI01 | 브랜딩 표시 | 앱 실행 시 Kaito 로고 이미지(80px)와 타이틀("Kaito 야핑 자동화 시스템")을 화면 중앙 상단에 표시한다. 서브 타이틀로 "AI가 실시간 트렌드를 분석해 자동으로 바이럴 포스팅을 생성합니다" 문구를 Body 스타일(17px)로 표시한다. 0.5초 페이드인 애니메이션을 적용한다. | 컴포넌트: `Onboarding.tsx`, 스타일: 중앙 정렬, 흰색 배경 |
| ONBOARD02 | 사용자는 X(트위터) 계정을 연결할 수 있어야 한다 | ONBOARD_CONNECT01 | X 계정 연결 버튼 표시 | 화면 하단에 "X 계정 연결하기" 버튼을 Primary Button 스타일(파랑 #007AFF, 높이 50px, 모서리 14px)로 표시한다. Safe Area를 고려하여 하단에 고정 배치하며, 0.95 스케일 다운 터치 피드백을 제공한다. | 컴포넌트: `Onboarding.tsx`, props: `onConnect`, highlightElement 지원 |
| ONBOARD02 | 사용자는 X(트위터) 계정을 연결할 수 있어야 한다 | ONBOARD_CONNECT02 | OAuth 인증 플로우 시작 | 사용자가 "X 계정 연결하기" 버튼 클릭 시, 백엔드 `GET /api/v1/auth/x/authorize` API를 호출하여 OAuth 인증 URL과 state를 받는다. state는 서버 측 Redis에 5분 TTL로 저장되어 CSRF를 방어한다. 받은 authUrl로 브라우저를 리다이렉트하여 X OAuth 동의 화면으로 이동한다. | API: `GET /api/v1/auth/x/authorize`, 응답: `{authUrl: string, state: string}` |
| ONBOARD02 | 사용자는 X(트위터) 계정을 연결할 수 있어야 한다 | ONBOARD_CONNECT03 | OAuth 콜백 처리 | X OAuth 동의 후 리다이렉트된 `/auth/callback?code={code}&state={state}` URL에서 code와 state 파라미터를 추출한다. 백엔드 `POST /api/v1/auth/x/token`에 code와 state를 전송하여 access_token을 교환하고, 사용자 정보와 함께 JWT를 받는다. JWT를 로컬 스토리지 또는 쿠키에 저장하고, 사용자 정보를 전역 상태에 저장한다. | API: `POST /api/v1/auth/x/token`, body: `{code, state}`, 응답: `{accessToken, refreshToken, user}` |
| ONBOARD03 | 시스템은 연결 성공 시 사용자에게 피드백을 제공하고 홈 화면으로 이동해야 한다 | ONBOARD_FEEDBACK01 | 연결 성공 토스트 표시 | JWT 저장 성공 후 "✅ Kaito 계정 연결 성공!" 메시지를 토스트(Sonner)로 상단 중앙에 3초간 표시한다. description으로 "API 인증이 완료되었습니다" 문구를 추가한다. | 컴포넌트: `Onboarding.tsx`, onConnect 핸들러 |
| ONBOARD03 | 시스템은 연결 성공 시 사용자에게 피드백을 제공하고 홈 화면으로 이동해야 한다 | ONBOARD_FLOW01 | 홈 화면 전환 | 토스트 표시 2초 후 `setCurrentScreen("home")` 호출하여 대시보드 화면으로 자동 전환한다. 전환 시 "환영합니다! 🎉" 토스트를 추가로 표시하여 온보딩 완료를 알린다. 페이드 애니메이션(0.3초)을 적용한다. | 컴포넌트: `App.tsx`, handleOnboardingComplete 함수 |
| ONBOARD04 | 시스템은 연결 실패 시 에러를 처리하고 재시도 옵션을 제공해야 한다 | ONBOARD_ERROR01 | 인증 실패 처리 | OAuth 실패 또는 API 에러 발생 시 에러 타입별로 다른 토스트 메시지를 표시한다. 네트워크 오류: "네트워크 연결을 확인해주세요", 권한 거부: "X 계정 권한이 필요합니다", 취소: "인증이 취소되었습니다". 에러 토스트에 "재시도" 버튼을 포함하여 다시 연결 플로우를 시작할 수 있도록 한다. | 에러 코드: `AUTH_001`, `AUTH_003`, 재시도 액션 제공 |

---

## 2. AUTH – 인증 및 인가

### 요구사항 및 기능 정의

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 | 비고 |
|-----------|-----------|--------|--------|----------|------|
| AUTH01 | 시스템은 X OAuth 2.0 기반 인증을 지원해야 한다 | AUTH_LOGIN01 | OAuth 인증 URL 생성 | 백엔드는 `GET /api/v1/auth/x/authorize` 요청을 받으면 X OAuth 2.0 인증 URL을 생성한다. CSRF 방어를 위해 state 파라미터를 생성하고 Redis에 5분 TTL로 저장한다. 생성된 authUrl과 state를 JSON으로 반환한다. | API: `GET /api/v1/auth/x/authorize`, Redis key: `oauth_state:{state}` |
| AUTH01 | 시스템은 X OAuth 2.0 기반 인증을 지원해야 한다 | AUTH_LOGIN02 | OAuth 콜백 및 토큰 교환 | 백엔드는 `GET /api/v1/auth/callback?code={code}&state={state}` 또는 `POST /api/v1/auth/x/token` 요청을 받으면 state를 Redis에서 검증한다. 검증 성공 시 X API에 code를 전송하여 access_token과 refresh_token을 교환한다. X API로 사용자 정보를 조회하여 DB users 테이블에 upsert한다. JWT(accessToken, refreshToken)를 생성하여 반환한다. | API: `POST /api/v1/auth/x/token`, X API 호출, DB: users 테이블 INSERT/UPDATE |
| AUTH02 | 시스템은 JWT 기반 세션 관리를 제공해야 한다 | AUTH_TOKEN01 | JWT 발급 및 저장 | JWT는 HS256 또는 RS256 알고리즘으로 서명되며, payload에 userId, handle, role을 포함한다. accessToken은 15분, refreshToken은 7일 만료 기간을 가진다. 클라이언트는 accessToken을 Authorization 헤더에 포함하여 API를 호출하며, refreshToken은 HttpOnly 쿠키 또는 로컬 스토리지에 안전하게 저장한다. | JWT Secret: 환경 변수 관리, 알고리즘: HS256/RS256 |
| AUTH02 | 시스템은 JWT 기반 세션 관리를 제공해야 한다 | AUTH_TOKEN02 | JWT Refresh | 프론트엔드는 accessToken 만료 5분 전 또는 401 에러 발생 시 `POST /api/v1/auth/refresh` API를 호출한다. refreshToken을 body 또는 쿠키로 전송하면, 백엔드는 Redis에서 refreshToken 유효성을 검증하고 새로운 accessToken을 발급한다. 실패 시 재로그인 플로우로 전환한다. | API: `POST /api/v1/auth/refresh`, body: `{refreshToken}`, 응답: `{accessToken}` |
| AUTH03 | 시스템은 로그아웃 기능을 제공해야 한다 | AUTH_LOGOUT01 | 로그아웃 처리 | 사용자가 설정 화면에서 "로그아웃" 버튼 클릭 시 확인 다이얼로그를 표시한다. 확인 시 `POST /api/v1/auth/logout` API를 호출하여 서버 측 JWT를 블랙리스트에 추가하고 refreshToken을 무효화한다. 클라이언트는 로컬 스토리지와 쿠키에서 모든 토큰을 삭제하고 `setCurrentScreen("onboarding")`으로 온보딩 화면으로 이동한다. | API: `POST /api/v1/auth/logout`, Redis: JWT 블랙리스트 추가, 컴포넌트: `Settings.tsx` |
| AUTH04 | 모든 보호된 API는 인증을 요구해야 한다 | AUTH_GUARD01 | authGuard 미들웨어 | 백엔드의 모든 보호된 엔드포인트에 authGuard 미들웨어를 적용한다. Authorization 헤더에서 JWT를 추출하고 서명을 검증한다. 만료 체크, 블랙리스트 확인(Redis)을 수행하며, 검증 성공 시 `req.user`에 사용자 정보를 주입한다. 실패 시 401 Unauthorized 또는 403 Forbidden을 반환한다. | 미들웨어: authGuard, 에러 코드: AUTH_001, AUTH_002, AUTH_003 |

---

## 3. DASH – 홈 대시보드

### 요구사항 및 기능 정의

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 | 비고 |
|-----------|-----------|--------|--------|----------|------|
| DASH01 | 사용자는 대시보드에서 자신의 프로필 정보를 확인할 수 있어야 한다 | DASH_PROFILE01 | 프로필 헤더 표시 | 홈 화면 상단(pt-16, Safe Area)에 사용자 프로필 헤더를 표시한다. 아바타 이미지(48px 원형, Dicebear API), 이름(Headline 17px), 핸들(@crypto_siyeon, Caption 12px 회색), 팔로워 수(18.2K, Caption 12px 파랑)를 좌측 정렬로 배치한다. `GET /api/v1/users/me` API로 사용자 정보를 조회하여 렌더링한다. | API: `GET /api/v1/users/me`, 컴포넌트: `Home.tsx`, 응답: `{id, name, handle, avatar, followers}` |
| DASH02 | 사용자는 자동화 기능을 ON/OFF 할 수 있어야 한다 | DASH_TOGGLE01 | 자동화 토글 UI | 프로필 헤더 우측에 iOS 스위치 토글(36px × 20px)을 배치한다. ON 상태는 빨강 배경(#FF3B30) + Play 아이콘, OFF 상태는 파랑 배경(#007AFF) + Pause 아이콘으로 표시한다. 현재 상태는 `automationEnabled` props 또는 로컬 상태로 관리한다. | 컴포넌트: `Home.tsx`, props: `automationEnabled`, `onToggleAutomation` |
| DASH02 | 사용자는 자동화 기능을 ON/OFF 할 수 있어야 한다 | DASH_TOGGLE02 | 자동화 상태 변경 | 토글 클릭 시 `PATCH /api/v1/users/me/automation` API를 호출하여 서버에 상태를 저장한다. body: `{enabled: boolean}`. 낙관적 업데이트를 적용하여 즉시 UI를 변경하고, API 응답 성공 시 토스트("⚡ 자동화가 활성화/비활성화되었습니다!")를 표시한다. 실패 시 UI를 롤백하고 에러 토스트를 표시한다. | API: `PATCH /api/v1/users/me/automation`, 낙관적 업데이트, 에러 처리 |
| DASH02 | 사용자는 자동화 기능을 ON/OFF 할 수 있어야 한다 | DASH_TOGGLE03 | 백엔드 자동화 상태 반영 | 백엔드는 users 테이블의 automation_enabled 컬럼을 업데이트한다. enabled=false로 변경 시 해당 사용자의 모든 활성 스케줄을 일시 중지하고 큐에 중지 메시지를 발송한다. enabled=true 시 스케줄을 재활성화한다. | DB: users.automation_enabled, 스케줄러 큐 연동 |
| DASH03 | 사용자는 실시간 수익 통계를 확인할 수 있어야 한다 | DASH_METRICS01 | 통계 카드 표시 | 프로필 헤더 아래 3개의 통계 카드를 3컬럼 그리드(grid-cols-3 gap-3)로 표시한다. 각 카드는 흰색 배경, 모서리 12px, 그림자 적용. 첫 번째: "오늘 수익" + $1,247.30 (Title 1 28px 볼드), 두 번째: "총 포스팅" + 23개, 세 번째: "평균 수익률" + +28.5% (초록 #34C759, 상승 화살표). | 컴포넌트: `Home.tsx`, px-5 py-4 컨테이너 |
| DASH03 | 사용자는 실시간 수익 통계를 확인할 수 있어야 한다 | DASH_METRICS02 | 통계 데이터 조회 | 화면 진입 시 `GET /api/v1/stats/daily` API를 호출하여 통계 데이터를 조회한다. 응답: `{todayRevenue: number, totalPosts: number, avgRevenueRate: number, change24h: number}`. 5초마다 폴링하거나 WebSocket 구독을 통해 실시간 업데이트한다. | API: `GET /api/v1/stats/daily`, 폴링 또는 WebSocket, Redis 1분 캐싱 |
| DASH03 | 사용자는 실시간 수익 통계를 확인할 수 있어야 한다 | DASH_METRICS03 | 수동 새로고침 | 당겨서 새로고침(Pull to Refresh) 제스처를 지원한다. 사용자가 화면을 아래로 당기면 로딩 스피너를 표시하고 `/api/v1/stats/daily` API를 재호출하여 최신 데이터로 UI를 업데이트한다. | 제스처: Pull to Refresh, 로딩 상태 관리 |
| DASH04 | 사용자는 추천 코인 정보를 확인할 수 있어야 한다 | DASH_COIN01 | 추천 코인 카드 리스트 | 통계 섹션 아래 "추천 코인" 섹션을 표시한다. `GET /api/v1/trends/top-coins?limit=5` API로 상위 5개 코인을 조회한다. 각 코인은 카드로 표시되며 순위 배지(좌측 상단 회색 원), 코인명(Headline 17px, 색상별), 포스팅 수(Caption 12px), 수익(Title 2 22px 볼드), 24시간 변동률(초록/빨강 텍스트 + 화살표)을 포함한다. 첫 4개는 2x2 그리드, 5번째는 하단 1개로 배치한다. | API: `GET /api/v1/trends/top-coins`, 응답: `[{name, rank, posts, revenue, trend, trendUp}]` |
| DASH04 | 사용자는 추천 코인 정보를 확인할 수 있어야 한다 | DASH_COIN02 | 코인별 색상 테마 | 코인별로 고유 색상을 적용한다. AI16Z: 주황 #FF6B35, ELIZA: 보라 #A855F7, VIRTUAL: 초록 #10B981, PRIME: 파랑 #3B82F6, RNDR: 회색 #6B7280. 코인명 텍스트 색상과 배지 배경에 해당 색상을 적용한다. | 컴포넌트: `Home.tsx`, topCoins 데이터 구조 |
| DASH04 | 사용자는 추천 코인 정보를 확인할 수 있어야 한다 | DASH_COIN03 | 트렌드 방향 표시 | trendUp 값에 따라 초록 텍스트 + 상승 화살표(↗) 또는 빨강 텍스트 + 하락 화살표(↘)를 표시한다. 조건부 렌더링을 사용하며 페이드인 애니메이션을 적용한다. | 로직: {trend.trendUp ? "↗" : "↘"}, 애니메이션: fade-in |
| DASH05 | 사용자는 예약된 포스팅 목록을 확인하고 관리할 수 있어야 한다 | DASH_QUEUE01 | 포스팅 큐 목록 표시 | 추천 코인 아래 "예약 포스팅 큐" 섹션을 표시한다. `GET /api/v1/posts?status=scheduled,ready` API로 예약/준비 상태의 포스팅을 조회한다. 각 포스팅 카드는 내용(최대 3줄 말줄임), 이미지(Unsplash, 모서리 12px), 코인 배지(색상별), 예상 수익(초록 텍스트), 예약 시간(회색 텍스트), ETA 태그(회색 배지)를 표시한다. 세로 스크롤을 지원한다. | API: `GET /api/v1/posts?status=scheduled,ready`, 컴포넌트: `Home.tsx`, scheduledPosts 상태 |
| DASH05 | 사용자는 예약된 포스팅 목록을 확인하고 관리할 수 있어야 한다 | DASH_QUEUE02 | 포스팅 취소 기능 | 각 포스팅 카드 하단에 "취소" 버튼(회색 배경 #F3F4F6, 높이 36px, 모서리 8px)을 표시한다. 클릭 시 `DELETE /api/v1/posts/{postId}` API를 호출한다. 성공 시 0.3초 페이드아웃 애니메이션 후 배열에서 제거하고 "❌ 포스팅 취소 완료!" 토스트를 표시한다. 실패 시 에러 토스트를 표시한다. | API: `DELETE /api/v1/posts/{postId}`, 애니메이션: fade-out 0.3s, 에러 처리 |
| DASH05 | 사용자는 예약된 포스팅 목록을 확인하고 관리할 수 있어야 한다 | DASH_QUEUE03 | 포스팅 수정 기능 | 각 포스팅 카드에 "수정" 버튼(회색 배경)을 표시한다. 클릭 시 `onOpenEditPost(post)` 콜백을 호출하여 EditPostSheet 모달을 오픈한다. post 데이터(`{id, content, coin, scheduledTime, image}`)를 시트에 전달한다. 시트에서 수정 후 저장 시 `PATCH /api/v1/posts/{postId}` API를 호출하고 목록을 새로고침한다. | 컴포넌트: `Home.tsx`, `EditPostSheet.tsx`, API: `PATCH /api/v1/posts/{postId}` |
| DASH05 | 사용자는 예약된 포스팅 목록을 확인하고 관리할 수 있어야 한다 | DASH_QUEUE04 | 즉시 포스팅 기능 | 각 포스팅 카드에 "지금 포스팅" 버튼(파랑 배경 #007AFF, 흰색 텍스트)을 표시한다. 클릭 시 `setPostingId(post.id)`로 로딩 상태를 설정하고 `POST /api/v1/posts/{postId}/publish` API를 호출한다. 로딩 스피너를 2초간 표시한 후 성공 시 "🚀 포스팅 완료!" 토스트, completedCount 증가, 배열에서 제거한다. 실패 시 에러 토스트를 표시한다. | API: `POST /api/v1/posts/{postId}/publish`, 로딩 상태, setTimeout 2초 |
| DASH05 | 사용자는 예약된 포스팅 목록을 확인하고 관리할 수 있어야 한다 | DASH_QUEUE05 | 포스팅 상태 표시 | 포스팅 상태에 따라 UI를 다르게 표시한다. scheduled: 회색 배경, ready: 초록 배경 + "준비완료" 텍스트, posting: 로딩 스피너 + "포스팅 중..." 텍스트. postingId와 post.id를 비교하여 조건부 렌더링하며, 로딩 스피너는 rotate 360deg 1초 애니메이션을 적용한다. | 상태: scheduled, ready, posting, 애니메이션: spin |
| DASH06 | 사용자는 실시간으로 포스팅 큐 업데이트를 받을 수 있어야 한다 | DASH_REALTIME01 | WebSocket 구독 | 홈 화면 진입 시 `ws://api/v1/posts/stream` WebSocket에 연결한다. 새 포스팅 추가(`post_created`), 상태 변경(`post_updated`), 발행 완료(`post_published`) 이벤트를 수신한다. 이벤트 발생 시 scheduledPosts 배열을 즉시 업데이트하여 UI에 반영한다. 화면 이탈 시 연결을 종료한다. | WebSocket: `ws://api/v1/posts/stream`, 이벤트: post_created, post_updated, post_published |

---

## 4. POST – 포스팅 관리

### 요구사항 및 기능 정의

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 | 비고 |
|-----------|-----------|--------|--------|----------|------|
| POST01 | 시스템은 포스팅 목록 조회 API를 제공해야 한다 | POST_LIST01 | 포스팅 목록 조회 | `GET /api/v1/posts?status={status}&page={page}&limit={limit}` API는 userId 필터와 status 필터를 적용하여 DB posts 테이블을 조회한다. scheduledTime 내림차순으로 정렬하고 페이지네이션을 적용한다. 응답: `{posts: PostDto[], total, page, limit}`. PostDto는 id, content, coin, scheduledTime, estimatedRevenue, image, status, eta, date를 포함한다. | API: `GET /api/v1/posts`, DB: posts 테이블, 페이지네이션 |
| POST01 | 시스템은 포스팅 목록 조회 API를 제공해야 한다 | POST_DETAIL01 | 단일 포스팅 조회 | `GET /api/v1/posts/{postId}` API는 postId로 posts 테이블을 조회한다. 소유권 검증(userId 일치 확인)을 수행하며, 없으면 404를 반환한다. 성공 시 전체 PostDto를 반환한다. | API: `GET /api/v1/posts/{postId}`, 에러: POST_001 (404) |
| POST02 | 사용자는 수동으로 포스팅을 생성할 수 있어야 한다 | POST_CREATE01 | 수동 포스팅 생성 | `POST /api/v1/posts` API는 body: `{content, coin, scheduledTime?, image?, autoPublish: false}`를 받는다. content는 최대 280자, coin은 유효한 코인명, scheduledTime은 미래 시간을 검증한다. DB에 저장하며 status는 scheduledTime이 있으면 'scheduled', 없으면 'ready'로 설정한다. autoPublish=true 시 publishQueue에 job을 추가한다. | API: `POST /api/v1/posts`, 검증: 280자, 미래 시간, DB: posts INSERT |
| POST02 | 사용자는 수동으로 포스팅을 생성할 수 있어야 한다 | POST_CREATE02 | AI 자동 포스팅 생성 | `POST /api/v1/posts/generate` API는 body: `{coin, tone?, trend?}`를 받는다. 1) Kaito API로 최신 트렌드 조회 2) OpenAI GPT-4로 포스팅 생성(프롬프트: 트렌드+톤+코인, 한글70%/영어30%, 해시태그 2-4개, 이모지, 280자 제한) 3) Unsplash API로 관련 이미지 검색 4) 예상 수익 계산(ML 모델 또는 통계 기반) 5) DB 저장(status=ready). 생성된 PostDto를 반환한다. | API: `POST /api/v1/posts/generate`, 외부 API: Kaito, OpenAI, Unsplash, ML 모델 |
| POST03 | 사용자는 포스팅을 수정할 수 있어야 한다 | POST_UPDATE01 | 포스팅 수정 API | `PATCH /api/v1/posts/{postId}` API는 body: `{content?, coin?, scheduledTime?, image?}`를 받는다. 소유권 검증 후 status가 'scheduled' 또는 'ready'인 포스팅만 수정 가능하다. DB를 업데이트하며, scheduledTime 변경 시 큐의 기존 job을 취소하고 새 job을 재등록한다. 업데이트된 PostDto를 반환한다. | API: `PATCH /api/v1/posts/{postId}`, 큐 job 재등록, 에러: POST_004 (이미 발행됨) |
| POST03 | 사용자는 포스팅을 수정할 수 있어야 한다 | POST_UPDATE02 | 포스팅 수정 UI | EditPostSheet 컴포넌트에서 textarea(content, 280자 제한, 실시간 글자 수 표시), select(coin, 옵션: AI16Z, ELIZA 등), datetime-local(scheduledTime), 이미지 미리보기를 제공한다. 코인 변경 시 `GET /api/v1/trends/estimate?coin={coin}` API로 예상 수익을 재계산하여 표시한다. "저장" 버튼 클릭 시 `PATCH /api/v1/posts/{postId}` 호출 후 시트를 닫고 "✅ 수정 완료!" 토스트를 표시한다. | 컴포넌트: `EditPostSheet.tsx`, 검증: content 필수, 빈 문자열 불가 |
| POST04 | 사용자는 포스팅을 삭제할 수 있어야 한다 | POST_DELETE01 | 포스팅 삭제 API | `DELETE /api/v1/posts/{postId}` API는 소유권 검증 후 status가 'posted'가 아닌 포스팅을 삭제한다. posted 포스팅은 소프트 삭제(deleted_at 설정)만 가능하다. 큐에 등록된 job을 취소하고 DB에서 삭제 또는 deleted_at을 설정한다. `{success: true}`를 반환한다. | API: `DELETE /api/v1/posts/{postId}`, 큐 job 취소, 소프트 삭제 |
| POST05 | 사용자는 포스팅을 즉시 발행할 수 있어야 한다 | POST_PUBLISH01 | 즉시 발행 API | `POST /api/v1/posts/{postId}/publish` API는 소유권 검증 후 1) X API로 트윗 발행(이미지 있으면 미디어 업로드 후 첨부) 2) 성공 시 status='posted', twitterUrl 저장 3) 큐 job 제거 4) activity_logs 테이블에 성공 기록 5) 수익 계산 및 업데이트를 수행한다. 응답: `{success: true, twitterUrl, revenue?}`. 실패 시 status='failed', 에러 로그 기록, 재시도 횟수 증가한다. | API: `POST /api/v1/posts/{postId}/publish`, X API 호출, DB: posts, activity_logs |
| POST05 | 사용자는 포스팅을 즉시 발행할 수 있어야 한다 | POST_PUBLISH02 | 발행 UI 처리 | 홈 화면에서 "지금 포스팅" 버튼 클릭 시 setPostingId로 로딩 상태를 설정하고 버튼을 비활성화(opacity 변경)한다. 로딩 스피너를 표시하며 API 호출 후 성공 시 토스트, completedCount 증가, 배열 제거, 실패 시 에러 토스트를 표시한다. | 로딩 상태, 버튼 비활성화, 에러 처리 |
| POST06 | 사용자는 실패한 포스팅을 재시도할 수 있어야 한다 | POST_RETRY01 | 재전송 API | `POST /api/v1/posts/{postId}/retry` API는 status='failed'인 포스팅만 허용한다. 재시도 횟수를 체크하여 최대 3회까지만 허용한다. publish와 동일한 로직을 수행하며, 재시도 횟수를 증가시킨다. 3회 초과 시 "최대 재시도 횟수 초과" 에러를 반환한다. | API: `POST /api/v1/posts/{postId}/retry`, 재시도 횟수 체크(최대 3회) |
| POST06 | 사용자는 실패한 포스팅을 재시도할 수 있어야 한다 | POST_RETRY02 | 재전송 UI | LogDetailSheet에서 status='error' 로그에만 "재전송" 버튼(초록 배경)을 표시한다. 클릭 시 1초 로딩 상태를 표시하고 `POST /api/v1/posts/{postId}/retry` API를 호출한다. 성공 시 "✅ 재전송 시뮬레이션 완료!" 토스트 표시 후 시트를 닫고, 실패 시 에러 토스트를 표시한다. | 컴포넌트: `LogDetailSheet.tsx`, setTimeout 1초 |
| POST07 | 시스템은 실시간 포스팅 업데이트를 브로드캐스트해야 한다 | POST_STREAM01 | WebSocket 이벤트 발송 | 포스팅 생성, 수정, 발행 시 Redis Pub/Sub 또는 Socket.IO를 사용하여 연결된 클라이언트에 이벤트를 브로드캐스트한다. 이벤트 타입: `post_created`, `post_updated`, `post_published`, data에 PostDto를 포함한다. userId로 필터링하여 해당 사용자에게만 전송한다. | WebSocket: `ws://api/v1/posts/stream`, Redis Pub/Sub 또는 Socket.IO |

---

## 5. SCHED – 스케줄러 및 자동화 규칙

### 요구사항 및 기능 정의

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 | 비고 |
|-----------|-----------|--------|--------|----------|------|
| SCHED01 | 사용자는 자동화 규칙 목록을 확인할 수 있어야 한다 | SCHED_LIST01 | 규칙 목록 조회 | `GET /api/v1/schedules` API는 userId 필터로 DB schedules 테이블을 조회한다. 각 스케줄의 생성된 포스팅 수를 집계(JOIN posts)하고 lastTrigger를 계산한다. 응답: `{schedules: ScheduleDto[], totalPosts, activeCount}`. ScheduleDto는 id, name, time, frequency, coins, tone, aiEnabled, active, posts, lastTrigger를 포함한다. | API: `GET /api/v1/schedules`, DB: schedules, posts JOIN, 컴포넌트: `Scheduler.tsx` |
| SCHED01 | 사용자는 자동화 규칙 목록을 확인할 수 있어야 한다 | SCHED_LIST02 | 규칙 카드 UI | 스케줄러 화면에 규칙 카드 리스트를 표시한다. 각 카드는 규칙명(Headline 17px 볼드), 실행 시간(Caption 12px 회색, 예: "매일 08:30" 또는 "24시간 활성"), 포스팅 수(Caption 12px 파랑), 마지막 실행(Caption 10px 회색, 예: "3분 전"), ON/OFF 토글(우측 정렬, iOS 스위치)을 표시한다. ios-separator-inset 구분선으로 항목을 구분한다. | 컴포넌트: `Scheduler.tsx`, rules 상태, 세로 스크롤 |
| SCHED01 | 사용자는 자동화 규칙 목록을 확인할 수 있어야 한다 | SCHED_STATS01 | 자동화 현황 카드 | 규칙 목록 상단에 자동화 현황 카드를 표시한다. 3컬럼 그리드로 "활성 규칙"(activeRules 계산, filter active:true), "이번 주"(totalPosts 합계, reduce), "성공률"(97% 하드코딩)을 표시한다. 흰색 카드, 중앙 정렬, divide-x 구분선을 적용한다. | 컴포넌트: `Scheduler.tsx`, 계산 로직: filter, reduce |
| SCHED02 | 사용자는 자동화 규칙을 활성화/비활성화할 수 있어야 한다 | SCHED_TOGGLE01 | 규칙 토글 UI | 각 규칙 카드 우측에 iOS 스위치(32px × 20px)를 표시한다. ON: 초록 배경(#34C759), OFF: 회색 배경(#E5E7EB). 클릭 시 `handleToggleRule(id)` 함수를 호출하여 로컬 상태를 즉시 업데이트(prevRules.map() 패턴)하고 "🔄 스케줄 상태 변경" 토스트를 표시한다. | 컴포넌트: `Scheduler.tsx`, 상태: rules, 낙관적 업데이트 |
| SCHED02 | 사용자는 자동화 규칙을 활성화/비활성화할 수 있어야 한다 | SCHED_TOGGLE02 | 규칙 토글 API | 토글 클릭 시 `PATCH /api/v1/schedules/{scheduleId}` API를 호출한다. body: `{active: boolean}`. 백엔드는 DB를 업데이트하고, active=true 시 크론 job을 활성화하고 active=false 시 job을 비활성화한다. 응답: 업데이트된 ScheduleDto. 실패 시 UI를 롤백하고 에러 토스트를 표시한다. | API: `PATCH /api/v1/schedules/{scheduleId}`, 크론 job 활성화/비활성화 |
| SCHED03 | 사용자는 새로운 자동화 규칙을 생성할 수 있어야 한다 | SCHED_CREATE01 | 새 규칙 버튼 | 스케줄러 화면 하단에 "+ 새 규칙 추가" 버튼(파랑 배경, 흰색 텍스트, 높이 50px, 모서리 14px)을 fixed bottom-20으로 고정 배치한다. Safe Area를 대응하며 scale(0.98) 터치 피드백을 제공한다. 클릭 시 `onOpenNewSchedule()` 콜백을 호출하여 NewScheduleSheet 모달을 오픈한다. highlightElement="add-schedule-button" 지원한다. | 컴포넌트: `Scheduler.tsx`, props: onOpenNewSchedule, 하이라이트 지원 |
| SCHED03 | 사용자는 새로운 자동화 규칙을 생성할 수 있어야 한다 | SCHED_CREATE02 | 규칙 작성 시트 UI | NewScheduleSheet 컴포넌트는 하단 슬라이드업 애니메이션(motion/react, spring damping 30 stiffness 300)으로 오픈된다. 상단에 드래그 핸들바(40px × 4px 회색 rounded-full), 헤더("새 야핑 예약", 좌: 취소, 우: 완료), 폼 영역(AI 자동 생성 토글, 포스팅 시간 select, 반복 빈도 select, 타겟 코인 멀티셀렉트, 톤 & 스타일 select, 자동 이미지 첨부 토글)을 표시한다. 최대 높이 70vh, 스크롤 지원, 백드롭 클릭 시 닫기를 제공한다. | 컴포넌트: `NewScheduleSheet.tsx`, 애니메이션, 폼 필드 |
| SCHED03 | 사용자는 새로운 자동화 규칙을 생성할 수 있어야 한다 | SCHED_CREATE03 | 규칙 입력 검증 | 폼 제출 시 다음을 검증한다. 1) 시간 필수 선택(빨강 별표 표시) 2) 최소 1개 코인 선택 3) AI OFF 시 톤 필수 선택. 검증 실패 시 해당 필드에 빨강 텍스트로 에러 메시지를 표시하고 제출을 막는다. 검증 성공 시 `POST /api/v1/schedules` API를 호출한다. | 검증 규칙: 시간 필수, 코인 최소 1개, AI OFF → 톤 필수 |
| SCHED03 | 사용자는 새로운 자동화 규칙을 생성할 수 있어야 한다 | SCHED_CREATE04 | 규칙 생성 API | `POST /api/v1/schedules` API는 body: `{name?, time, frequency, coins, tone, aiEnabled}`를 받는다. 1) 입력 검증(cron 표현식 생성 또는 빈도 매핑) 2) DB schedules 테이블 INSERT(active=true) 3) Scheduler 서비스에 크론 job 등록(예: node-cron, BullMQ) 4) 첫 실행 시간 계산. 생성된 ScheduleDto를 반환한다. | API: `POST /api/v1/schedules`, DB: schedules INSERT, 크론 job 등록 |
| SCHED03 | 사용자는 새로운 자동화 규칙을 생성할 수 있어야 한다 | SCHED_CREATE05 | 규칙 저장 완료 | API 성공 시 `onSuccess()` 콜백을 호출하여 "✅ 야핑 예약 완료!" 토스트를 표시하고 `onClose()`로 시트를 닫는다. 폼을 초기화(setContent(""), setSelectedTime("09:00"))하고 스케줄러 화면의 규칙 목록을 새로고침한다. | 컴포넌트: `NewScheduleSheet.tsx`, handleSubmit 함수 |
| SCHED04 | 시스템은 예약된 시간에 자동으로 포스팅을 생성해야 한다 | SCHED_CRON01 | 크론 작업 실행 | 백엔드의 Cron Job(예: node-cron, BullMQ)이 스케줄의 실행 시간마다 `executeSchedule(scheduleId)` 함수를 호출한다. 1) DB에서 schedule 조회(active=true 확인) 2) aiEnabled=true 시 `POST /api/v1/posts/generate` 내부 호출(coins 순회) 3) 생성된 포스팅을 publishQueue에 등록(scheduledTime에 발행) 4) lastTrigger 업데이트 5) 에러 발생 시 재시도 또는 알림 발송. | Cron Job, 내부 API 호출, 큐 등록, DB: schedules.lastTrigger 업데이트 |
| SCHED05 | 사용자는 자동화 규칙을 삭제할 수 있어야 한다 | SCHED_DELETE01 | 규칙 삭제 API | `DELETE /api/v1/schedules/{scheduleId}` API는 소유권 검증 후 크론 job을 취소하고 DB에서 소프트 삭제(deleted_at 설정)한다. 연결된 예약 포스팅은 유지하거나 선택적으로 취소할 수 있다. `{success: true}`를 반환한다. | API: `DELETE /api/v1/schedules/{scheduleId}`, 크론 job 취소, 소프트 삭제 |
| SCHED05 | 사용자는 자동화 규칙을 삭제할 수 있어야 한다 | SCHED_DELETE02 | 규칙 삭제 UI | 규칙 카드에서 스와이프 또는 삭제 버튼을 제공한다(선택적 구현). 클릭 시 확인 다이얼로그를 표시하고, 확인 시 `DELETE /api/v1/schedules/{scheduleId}` 호출 후 목록에서 제거하고 "🗑️ 스케줄 삭제 완료!" 토스트를 표시한다. | 확인 다이얼로그, 스와이프 제스처(선택적) |

---

## 6. LOG – 활동 로그

### 요구사항 및 기능 정의

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 | 비고 |
|-----------|-----------|--------|--------|----------|------|
| LOG01 | 사용자는 활동 로그를 시간 필터로 조회할 수 있어야 한다 | LOG_FILTER01 | 시간 필터 탭 UI | 로그 화면 상단에 "오늘" / "이번 주" / "전체" 3개 탭을 iOS 세그먼트 컨트롤 스타일로 표시한다. 비활성: 회색 배경(#F3F4F6), 활성: 흰색 배경 + 그림자. activeTab 상태(useState, 기본 "today")로 관리하며 클릭 시 setActiveTab()으로 변경하고 로그를 필터링한다. 3개 균등 분할(flex-1). | 컴포넌트: `Logs.tsx`, 상태: activeTab, iOS 세그먼트 스타일 |
| LOG01 | 사용자는 활동 로그를 시간 필터로 조회할 수 있어야 한다 | LOG_FILTER02 | 로그 필터링 API | 탭 변경 시 `GET /api/v1/logs?period={today\|week\|all}&page=1&limit=20` API를 호출한다. 백엔드는 period에 따라 날짜 필터를 적용한다(today: 오늘 00:00 이후, week: 최근 7일, all: 전체). userId 필터와 시간 내림차순 정렬을 적용하고 페이지네이션한다. 응답: `{logs: LogDto[], total, page}`. | API: `GET /api/v1/logs?period={period}`, DB: activity_logs, 날짜 필터 |
| LOG02 | 사용자는 활동 로그 목록을 확인할 수 있어야 한다 | LOG_LIST01 | 로그 카드 리스트 UI | activityLogs 배열을 기반으로 로그 카드를 렌더링한다. 각 카드는 상태 아이콘(✅ 성공, ⚠️ 실패), 시간(HH:MM, Caption 12px), 제목("포스팅 성공/실패", Headline 17px), 내용 미리보기(최대 2줄, Body 15px), 코인 배지(색상별, 우측 상단), 수익(성공 시만, 초록 텍스트)을 표시한다. 시간 역순 최신순으로 정렬하며 세로 스크롤을 지원한다(pb-24, 탭바 공간). | 컴포넌트: `Logs.tsx`, activityLogs 상태, 최신순 정렬 |
| LOG02 | 사용자는 활동 로그 목록을 확인할 수 있어야 한다 | LOG_LIST02 | 무한 스크롤 | Intersection Observer로 리스트 하단을 감지한다. 하단 도달 시 `GET /api/v1/logs?page={n+1}&limit=20` API를 호출하여 추가 데이터를 로드하고 기존 배열에 append한다. 로딩 스피너를 하단에 표시한다. 더 이상 데이터가 없으면 로딩을 중지한다. | Intersection Observer, 페이지네이션, 로딩 스피너 |
| LOG02 | 사용자는 활동 로그 목록을 확인할 수 있어야 한다 | LOG_EMPTY01 | 빈 상태 UI | filteredLogs.length === 0 조건일 때 화면 중앙에 회색 문서 아이콘(48px), "아직 활동 로그가 없습니다" 메시지(Headline), "포스팅이 실행되면 여기에 표시됩니다" 서브텍스트(Caption 회색)를 표시한다. flex items-center justify-center로 중앙 정렬한다. | 빈 상태, 중앙 정렬 |
| LOG03 | 사용자는 로그 상세 정보를 확인할 수 있어야 한다 | LOG_DETAIL01 | 로그 상세보기 오픈 | 로그 카드 클릭 시 `onOpenDetail(log)` 콜백을 호출한다. log 데이터(`{id, type, time, fullTime, title, content, coin, revenue, error}`)를 전달하고 `GET /api/v1/logs/{logId}` API로 전체 데이터를 로드한다(선택적). LogDetailSheet 모달을 오픈하며 active:bg-gray-50 터치 피드백을 제공한다. | 컴포넌트: `Logs.tsx`, `LogDetailSheet.tsx`, API: `GET /api/v1/logs/{logId}` (선택적) |
| LOG03 | 사용자는 로그 상세 정보를 확인할 수 있어야 한다 | LOG_DETAIL02 | 상세 시트 UI | LogDetailSheet는 하단 슬라이드업 애니메이션으로 오픈된다(최대 높이 85vh). 상태 아이콘(좌측 배지), 제목(log.title, Title 2 22px), 시간(log.fullTime, Caption 12px 회색), 닫기 버튼(우측 상단 X)을 헤더에 표시한다. 본문 영역에 "포스팅 내용" 레이블 + log.content 전체 내용(회색 배경 박스, Body 15px, line-height 1.5, 줄바꿈 유지), "연관 코인" + log.coin 배지, "실제 수익" + log.revenue(성공 시만, 초록), "에러 메시지" + log.error(실패 시만, 빨강)를 2컬럼 그리드로 표시한다. | 컴포넌트: `LogDetailSheet.tsx`, 레이아웃: 헤더 + 본문 + 액션 |
| LOG03 | 사용자는 로그 상세 정보를 확인할 수 있어야 한다 | LOG_DETAIL03 | 트위터 링크 버튼 | log.type === "success" 조건일 때만 "트위터에서 보기" 버튼(파랑 배경, 흰색 텍스트, 전체 너비, 외부 링크 아이콘)을 표시한다. 클릭 시 log.twitterUrl을 새 탭에서 오픈한다(실제 구현에서는 실제 링크 없으므로 "링크를 클립보드에 복사했습니다" 토스트 표시). | 조건부 렌더링, 외부 링크 |
| LOG03 | 사용자는 로그 상세 정보를 확인할 수 있어야 한다 | LOG_DETAIL04 | 재전송 버튼 | log.type === "error" 조건일 때만 "재전송" 버튼(초록 배경, 흰색 텍스트)을 표시한다. 클릭 시 1초 로딩 상태 표시 후 `POST /api/v1/posts/{postId}/retry` API를 호출한다. 성공 시 "✅ 재전송 시뮬레이션 완료!" 토스트 표시 후 시트를 닫는다. 실패 시 에러 토스트를 표시한다. | 조건부 렌더링, setTimeout 1초, API: `POST /api/v1/posts/{postId}/retry` |
| LOG04 | 시스템은 포스팅 성공/실패 시 자동으로 로그를 생성해야 한다 | LOG_CREATE01 | 로그 자동 생성 | 백엔드의 포스팅 발행 로직에서 성공 또는 실패 시 `createLog()` 서비스 함수를 호출한다. 입력: `{userId, type: 'success'\|'error', postId, title, content, coin, revenue?, error?}`. DB activity_logs 테이블에 INSERT하며 비동기 처리(큐 또는 이벤트 리스너)를 사용한다. | 서비스: createLog(), DB: activity_logs INSERT, 비동기 처리 |
| LOG05 | 사용자는 로그를 검색할 수 있어야 한다 | LOG_SEARCH01 | 로그 검색 API | `GET /api/v1/logs/search?q={keyword}&type={success\|error}` API는 content, title 필드에 LIKE 또는 Full-Text Search를 적용한다. type 필터를 추가로 적용하며 검색 결과 배열을 반환한다. | API: `GET /api/v1/logs/search`, DB: LIKE 또는 Full-Text Search |

---

## 7. MONITOR – 시스템 모니터링

### 요구사항 및 기능 정의

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 | 비고 |
|-----------|-----------|--------|--------|----------|------|
| MONITOR01 | 사용자는 시스템 상태를 확인할 수 있어야 한다 | MONITOR_STATUS01 | 시스템 상태 카드 UI | 모니터 화면 상단에 시스템 상태 카드를 2x2 그리드로 표시한다. "API 응답 시간"(145ms, Caption), "시스템 가동률"(99.8%, Title 2, 초록), "상태 인디케이터"(초록 원 + "정상" 텍스트), 메모리/CPU 사용률(선택적)을 표시한다. 흰색 카드, 그림자, 숫자 카운트업 애니메이션(선택적)을 적용한다. | 컴포넌트: `Monitor.tsx`, 2x2 그리드, 카드 스타일 |
| MONITOR01 | 사용자는 시스템 상태를 확인할 수 있어야 한다 | MONITOR_STATUS02 | 시스템 상태 조회 API | `GET /api/v1/monitor/system` API는 1) 외부 API(X, Kaito) ping 테스트 2) 서버 uptime 조회 3) 메모리/CPU 사용률 계산 4) Redis 연결 상태 체크를 수행한다. status를 'healthy' \| 'degraded' \| 'down'으로 판단하여 반환한다. 응답: `{apiLatency, uptime, status, memoryUsage, cpuUsage}`. | API: `GET /api/v1/monitor/system`, 외부 API ping, 서버 메트릭 |
| MONITOR01 | 사용자는 시스템 상태를 확인할 수 있어야 한다 | MONITOR_REFRESH01 | 자동 갱신 | 모니터 화면 진입 시 10초마다 `GET /api/v1/monitor/system` API를 폴링한다. 상태가 변경되면(예: 정상→경고) 토스트 알림을 표시한다. 화면 이탈 시 폴링을 중지한다. | setInterval 10초, 상태 변경 감지, 토스트 알림 |
| MONITOR02 | 사용자는 최근 시스템 활동을 확인할 수 있어야 한다 | MONITOR_ACTIVITY01 | 활동 스트림 UI | 시스템 상태 아래 "최근 활동" 섹션을 표시한다. recentActivity 배열을 기반으로 각 활동 항목(액션 아이콘(원형 배경), 액션 설명("포스팅 생성됨", "트렌드 감지", "스케줄 실행"), 시간("X분 전"), 관련 정보(코인명 또는 트렌드 태그))을 렌더링한다. 최대 5개 항목을 세로 스크롤로 표시한다. | 컴포넌트: `Monitor.tsx`, 최대 5개, 세로 스크롤 |
| MONITOR02 | 사용자는 최근 시스템 활동을 확인할 수 있어야 한다 | MONITOR_ACTIVITY02 | 활동 스트림 조회 API | `GET /api/v1/monitor/activity?limit=10` API는 최근 포스팅 생성/발행, 스케줄 실행, 트렌드 감지, 에러 발생 이벤트를 조회한다. Redis 또는 DB에서 시간 역순으로 정렬하여 반환한다. 응답: `[{action, time, details, user?}]`. | API: `GET /api/v1/monitor/activity`, Redis 또는 DB, 시간 역순 정렬 |
| MONITOR03 | 사용자는 실시간 트렌드를 확인할 수 있어야 한다 | MONITOR_TREND01 | 실시간 트렌드 UI | 활동 스트림 아래 "실시간 트렌드" 섹션을 표시한다. trendingTopics 배열을 기반으로 각 트렌드 카드(해시태그("#트렌드명", Headline 17px), 인기도 점수(0-100, 진행바), 관련 코인(배지 배열, 최대 3개), 예상 수익 임팩트("높음/중간/낮음", 색상별))를 렌더링한다. 인기도 점수 내림차순으로 정렬하며 흰색 카드, 구분선을 적용한다. | 컴포넌트: `Monitor.tsx`, 트렌드 카드, 진행바 |
| MONITOR03 | 사용자는 실시간 트렌드를 확인할 수 있어야 한다 | MONITOR_TREND02 | 트렌드 조회 API | `GET /api/v1/trends/live` API는 Kaito API를 호출하여 최신 트렌드를 조회한다. 결과를 내부 포맷으로 변환하고 Redis에 5분 캐싱한다. impact는 내부 로직(score + historicalData)으로 계산한다. 응답: `[{tag, score, relatedCoins, impact, updatedAt}]`. | API: `GET /api/v1/trends/live`, Kaito API 연동, Redis 5분 캐싱 |
| MONITOR04 | 사용자는 성과 지표를 확인할 수 있어야 한다 | MONITOR_METRICS01 | 성과 지표 그리드 UI | 트렌드 섹션 아래 "성과 지표" 2x2 그리드를 표시한다. "오늘 포스팅 수"(12, 파랑), "성공률"(94%, 초록), "평균 수익"($18.40, 파랑), "트렌드 정확도"(87%, 초록)를 표시한다. 페이드인 애니메이션을 적용한다. | 컴포넌트: `Monitor.tsx`, 2x2 그리드, 페이드인 애니메이션 |
| MONITOR04 | 사용자는 성과 지표를 확인할 수 있어야 한다 | MONITOR_METRICS02 | 성과 지표 조회 API | `GET /api/v1/stats/performance` API는 오늘 포스팅 수, 성공률(성공 포스팅 / 전체 포스팅 * 100), 평균 수익(SUM(revenue) / COUNT(*)), 트렌드 정확도(예상 수익과 실제 수익의 차이 분석)를 계산한다. 응답: `{todayPosts, successRate, avgRevenue, trendAccuracy}`. | API: `GET /api/v1/stats/performance`, DB 집계 쿼리 |
| MONITOR05 | 사용자는 API 연결 테스트를 수행할 수 있어야 한다 | MONITOR_TEST01 | 연결 테스트 버튼 UI | 화면 하단에 "Kaito API 연결 테스트" 버튼(파랑 배경, 높이 44px)을 고정 배치한다. 클릭 시 `handleTestConnection()` 함수를 호출한다. | 컴포넌트: `Monitor.tsx`, 하단 고정, props: onReconnect |
| MONITOR05 | 사용자는 API 연결 테스트를 수행할 수 있어야 한다 | MONITOR_TEST02 | 연결 테스트 실행 | 버튼 클릭 시 toast.loading("연결 테스트 중...", 1초)을 표시한다. `GET /api/v1/monitor/health` API를 호출하고 1초 후 응답을 받으면 toast.success("✅ 연결 테스트 성공!", "Kaito API가 정상적으로 작동하고 있습니다", 2초)를 표시한다. 실패 시 에러 토스트를 표시한다. 총 2초 소요. | API: `GET /api/v1/monitor/health`, 로딩 토스트, setTimeout |
| MONITOR06 | 시스템은 헬스체크 엔드포인트를 제공해야 한다 | MONITOR_HEALTH01 | 헬스체크 API | `GET /api/v1/monitor/health` API는 DB, Redis, X API, Kaito API의 연결 상태를 각각 테스트한다. 모든 서비스가 정상이면 200 OK를 반환하고, 하나라도 실패하면 503 Service Unavailable을 반환한다. 응답: `{status: 'ok', timestamp, services: {db: 'up', redis: 'up', xApi: 'up', kaitoApi: 'up'}}`. 로드 밸런서가 이 엔드포인트를 주기적으로 호출하여 서버 상태를 확인한다. | API: `GET /api/v1/monitor/health`, 200 OK 또는 503, 로드 밸런서용 |

---

## 8. SET – 설정 및 계정 관리

### 요구사항 및 기능 정의

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 | 비고 |
|-----------|-----------|--------|--------|----------|------|
| SET01 | 사용자는 연결된 계정 정보를 확인할 수 있어야 한다 | SET_ACCOUNT01 | 연결 계정 표시 UI | 설정 화면 상단 "연결된 계정" 섹션에 X 계정 정보를 표시한다. X 로고 아이콘(24px), 사용자명(@crypto_siyeon), 상태(활성, 초록 원)를 흰색 카드에 표시하며 우측에 화살표 아이콘(더보기)을 배치한다. | 컴포넌트: `Settings.tsx`, 카드 스타일, 우측 화살표 |
| SET01 | 사용자는 연결된 계정 정보를 확인할 수 있어야 한다 | SET_ACCOUNT02 | 연결 계정 조회 API | `GET /api/v1/users/me/connections` API는 DB에서 사용자의 외부 연결 정보를 조회한다. 응답: `[{platform: 'X', username, status: 'active', connectedAt}]`. 선택적으로 X API를 호출하여 계정 상태를 실시간 검증한다. | API: `GET /api/v1/users/me/connections`, DB: users.x_user_id, 선택적 X API 검증 |
| SET02 | 사용자는 계정 연결을 끊을 수 있어야 한다 | SET_DISCONNECT01 | 연결 끊기 버튼 UI | "연결된 계정" 섹션 하단에 "X 계정 연결 끊기" 버튼(Destructive 스타일, 빨강 텍스트 #FF3B30)을 표시한다. 클릭 시 확인 다이얼로그(toast)를 표시한다. 경고 메시지: "연결을 끊으면 자동화가 중지됩니다". | 컴포넌트: `Settings.tsx`, Destructive 버튼, 확인 다이얼로그 |
| SET02 | 사용자는 계정 연결을 끊을 수 있어야 한다 | SET_DISCONNECT02 | 연결 끊기 API | 확인 시 `DELETE /api/v1/users/me/connections/x` API를 호출한다. 백엔드는 1) DB에서 X access_token 삭제 2) 모든 스케줄 비활성화 3) 예약 포스팅 취소 4) 사용자에게 확인 이메일 발송(선택적)을 수행한다. 성공 시 `{success: true}`를 반환한다. 프론트는 로컬 토큰을 삭제하고 `setCurrentScreen("onboarding")`으로 온보딩 화면으로 전환한다. | API: `DELETE /api/v1/users/me/connections/x`, DB: X 토큰 삭제, 스케줄 비활성화 |
| SET03 | 사용자는 API 키를 관리할 수 있어야 한다 | SET_APIKEY01 | API 키 관리 버튼 UI | "연결된 계정" 아래 "API 키 관리" 버튼(흰색 카드, 열쇠 아이콘, 우측 화살표)을 표시한다. 클릭 시 `onApiKeySheetChange(true)`를 호출하여 ApiKeySheet 모달을 오픈한다. active:bg-gray-50 터치 피드백을 제공한다. | 컴포넌트: `Settings.tsx`, props: apiKeySheetOpen, onApiKeySheetChange |
| SET03 | 사용자는 API 키를 관리할 수 있어야 한다 | SET_APIKEY02 | API 키 시트 UI | ApiKeySheet는 하단 슬라이드업 애니메이션으로 오픈된다. "X API Key" 레이블 + 마스킹된 키 표시(sk-•••••2h4j, 끝 4자리만, 고정폭 폰트 monospace, 회색 박스), Eye/EyeOff 토글 버튼(우측), Copy 버튼(클립보드 복사), "새 API 키" 입력 영역(textarea 2줄, placeholder), API 키 통계(등록일, 마지막 사용, 총 요청 수, 상태(활성) 배지), API 키 발급 안내(정보 박스, 파랑 배경), "저장" 버튼을 표시한다. | 컴포넌트: `ApiKeySheet.tsx` (미구현 시 `Settings.tsx`에 통합), 마스킹, 토글 |
| SET03 | 사용자는 API 키를 관리할 수 있어야 한다 | SET_APIKEY03 | API 키 조회 API | 시트 오픈 시 `GET /api/v1/users/me/api-keys` API를 호출한다. 백엔드는 DB에서 암호화된 키를 조회하고 끝 4자리만 노출하여 반환한다. 통계 정보(createdAt, lastUsed, totalRequests)를 집계한다. 응답: `{xApiKey: 'sk-•••2h4j', kaitoApiKey: '•••8f3k', stats: {...}}`. | API: `GET /api/v1/users/me/api-keys`, DB: api_keys, AES-256 복호화 후 마스킹 |
| SET03 | 사용자는 API 키를 관리할 수 있어야 한다 | SET_APIKEY04 | API 키 보기/숨기기 | Eye/EyeOff 아이콘 클릭 시 showKey 상태를 토글한다. showKey=true: 전체 키 표시(sk-abc123...xyz789), showKey=false: 마스킹 표시. showKey useState 기본 false. | 상태: showKey, 조건부 렌더링 |
| SET03 | 사용자는 API 키를 관리할 수 있어야 한다 | SET_APIKEY05 | 클립보드 복사 | Copy 버튼 클릭 시 `navigator.clipboard.writeText(apiKey)`를 호출하여 전체 API 키를 클립보드에 복사한다. 성공 시 "✅ API 키가 클립보드에 복사되었습니다" 토스트를 표시한다. | Clipboard API, 성공 토스트 |
| SET03 | 사용자는 API 키를 관리할 수 있어야 한다 | SET_APIKEY06 | API 키 변경 | "새 API 키" textarea에 키를 입력하고 "저장" 버튼 클릭 시 길이 체크(최소 20자)를 수행한다. 검증 성공 시 `PATCH /api/v1/users/me/api-keys` API를 호출한다. body: `{xApiKey?, kaitoApiKey?}`. 백엔드는 키를 검증(X API, Kaito API 테스트 호출)하고 AES-256 암호화 후 DB에 저장한다. 이전 키는 히스토리 테이블에 백업한다. 성공 시 "✅ 설정 저장 완료!" 토스트 표시 후 시트를 닫는다. | API: `PATCH /api/v1/users/me/api-keys`, 검증: 길이 + API 테스트, AES-256 암호화 |
| SET04 | 사용자는 일반 설정을 변경할 수 있어야 한다 | SET_GENERAL01 | 일반 설정 UI | "일반" 섹션에 알림(토글), 포스팅 전 ��토(토글), 언어(한국어/English, 우측 화살표), 다크 모드(토글) 항목을 표시한다. 각 항목은 흰색 카드 스타일이며 iOS 스위치 토글을 제공한다. | 컴포넌트: `Settings.tsx`, iOS 스위치 토글 |
| SET04 | 사용자는 일반 설정을 변경할 수 있어야 한다 | SET_GENERAL02 | 설정 조회 API | 설정 화면 진입 시 `GET /api/v1/users/me/settings` API를 호출하여 현재 설정을 조회한다. 응답: `{notifications, reviewBeforePost, language, darkMode, autoRetry, apiTimeout, debugMode}`. DB user_settings 테이블을 조회하며 기본값을 적용한다. 조회된 값으로 토글 상태를 동기화한다. | API: `GET /api/v1/users/me/settings`, DB: user_settings |
| SET04 | 사용자는 일반 설정을 변경할 수 있어야 한다 | SET_GENERAL03 | 설정 변경 API | 각 토글 클릭 시 `PATCH /api/v1/users/me/settings` API를 호출한다. body: `{key: string, value: any}` 또는 전체 객체. 낙관적 업데이트를 적용하여 즉시 UI를 변경하고 DB를 업데이트한다. 변경 사항을 로그에 기록한다. 응답: 업데이트된 설정 객체. | API: `PATCH /api/v1/users/me/settings`, 낙관적 업데이트, DB: user_settings UPDATE |
| SET05 | 사용자는 고급 설정을 변경할 수 있어야 한다 | SET_ADVANCED01 | 고급 설정 UI | "고급" 섹션에 자동 재시도(숫자, 1-5회), API 타임아웃(숫자, 10-60초), 디버그 모드(토글) 항목을 표시한다. 숫자 항목은 현재 값을 표시하며 클릭 시 선택 UI를 제공한다(선택적 구현). | 컴포넌트: `Settings.tsx`, 숫자 선택 UI(선택적) |
| SET05 | 사용자는 고급 설정을 변경할 수 있어야 한다 | SET_ADVANCED02 | 고급 설정 변경 | 고급 설정 변경 시 동일하게 `PATCH /api/v1/users/me/settings` API를 호출한다. autoRetry, apiTimeout, debugMode 값을 업데이트한다. | API: `PATCH /api/v1/users/me/settings`, 동일한 엔드포인트 사용 |
| SET06 | 사용자는 앱 정보를 확인하고 로그아웃할 수 있어야 한다 | SET_INFO01 | 앱 정보 표시 | "정보" 섹션에 버전(1.0.0, 하드코딩, 회색 텍스트 우측 정렬), 이용약관(외부 링크 아이콘), 개인정보 처리방침(외부 링크 아이콘) 항목을 표시한다. 링크 클릭 시 "외부 링크 시뮬레이션" 토스트를 표시한다(실제 링크 없음). | 컴포넌트: `Settings.tsx`, 외부 링크 시뮬레이션 |
| SET06 | 사용자는 앱 정보를 확인하고 로그아웃할 수 있어야 한다 | SET_LOGOUT01 | 로그아웃 버튼 UI | "정보" 섹션 하단에 "로그아웃" 버튼(Destructive 스타일, 빨강 텍스트)을 표시한다. 클릭 시 확인 다이얼로그(toast)를 표시한다. 메시지: "로그아웃 하시겠습니까?", 액션: "확인" / "취소", duration: 5초. | 컴포넌트: `Settings.tsx`, Destructive 버튼, 확인 다이얼로그 |
| SET06 | 사용자는 앱 정보를 확인하고 로그아웃할 수 있어야 한다 | SET_LOGOUT02 | 로그아웃 처리 | 확인 클릭 시 `POST /api/v1/auth/logout` API를 호출한다. 백엔드는 JWT를 블랙리스트에 추가(Redis, TTL = 토큰 만료 시간)하고 refreshToken을 무효화한다. 프론트는 로컬 스토리지와 쿠키에서 모든 토큰을 삭제하고 `setCurrentScreen("onboarding")`으로 온보딩 화면으로 이동한다. "로그아웃되었습니다" 토스트를 표시한다. | API: `POST /api/v1/auth/logout`, Redis: JWT 블랙리스트, 토큰 삭제 |

---

## 9. NAV – 탭바 네비게이션

### 요구사항 및 기능 정의

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 | 비고 |
|-----------|-----------|--------|--------|----------|------|
| NAV01 | 사용자는 주요 화면 간 이동할 수 있어야 한다 | NAV_LAYOUT01 | 탭바 UI | 화면 하단에 fixed bottom-0으로 탭바를 고정 배치한다. 흰색 배경 + backdrop-blur-lg(iOS 반투명 효과), 상단 그림자(0 -1px 3px rgba), 높이 68px(Safe Area 대응), z-index 40을 적용한다. 5개 탭(홈, 스케줄, 로그, 모니터, 설정)을 균등 분할(flex-1)로 배치한다. | 컴포넌트: `TabBar.tsx`, fixed bottom, backdrop-blur |
| NAV01 | 사용자는 주요 화면 간 이동할 수 있어야 한다 | NAV_TAB01 | 홈 탭 | House 아이콘(lucide-react) + "홈" 텍스트를 표시한다. 활성: 파랑 #007AFF, 비활성: 회색 #8E8E93. 클릭 시 `onTabChange("home")`을 호출하여 홈 화면으로 전환한다. scale(0.95) 터치 피드백을 제공한다. | 아이콘: House, 활성 색상: 파랑 |
| NAV01 | 사용자는 주요 화면 간 이동할 수 있어야 한다 | NAV_TAB02 | 스케줄 탭 | Calendar 아이콘 + "스케줄" 텍스트. NAV_TAB01과 동일한 스타일 및 동작. 클릭 시 `onTabChange("scheduler")`. | 아이콘: Calendar |
| NAV01 | 사용자는 주요 화면 간 이동할 수 있어야 한다 | NAV_TAB03 | 로그 탭 | FileText 아이콘 + "로그" 텍스트. NAV_TAB01과 동일. 클릭 시 `onTabChange("logs")`. | 아이콘: FileText |
| NAV01 | 사용자는 주요 화면 간 이동할 수 있어야 한다 | NAV_TAB04 | 모니터 탭 | Activity 아이콘 + "모니터" 텍스트. NAV_TAB01과 동일. 클릭 시 `onTabChange("monitor")`. | 아이콘: Activity |
| NAV01 | 사용자는 주요 화면 간 이동할 수 있어야 한다 | NAV_TAB05 | 설정 탭 | Settings 아이콘 + "설정" 텍스트. NAV_TAB01과 동일. 클릭 시 `onTabChange("settings")`. | 아이콘: Settings |
| NAV01 | 사용자는 주요 화면 간 이동할 수 있어야 한다 | NAV_ACTIVE01 | 활성 탭 표시 | `activeTab === tabName` 조건으로 활성 탭을 판단한다. 활성 탭은 아이콘 색상 파랑, 텍스트 색상 파랑, 폰트 semibold를 적용한다. 비활성 탭은 회색을 유지한다. 0.2초 ease 전환 애니메이션을 적용한다. | 조건부 스타일, 0.2초 전환 |

---

## 10. PRESENT – 발표 모드 및 스토리보드

### 요구사항 및 기능 정의

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 | 비고 |
|-----------|-----------|--------|--------|----------|------|
| PRESENT01 | 사용자는 스토리보드에서 프로젝트 개요를 확인할 수 있어야 한다 | PRESENT_OVERVIEW01 | 스토리보드 탭 네비게이션 | 스토리보드 화면 상단에 Overview / Screens / Flows / Design 4개 탭을 표시한다. 활성 탭은 파랑 하단 바(2px 높이)를 표시한다. 클릭 시 해당 탭 컨텐츠로 전환한다. storyboardView useState(기본 "overview")로 상태를 관리한다. | 컴포넌트: `Storyboard.tsx`, props: initialView, 탭 네비게이션 |
| PRESENT01 | 사용자는 스토리보드에서 프로젝트 개요를 확인할 수 있어야 한다 | PRESENT_OVERVIEW02 | 프로젝트 개요 섹션 | Overview 탭에 "Kaito 야핑 자동화 시스템" 제목, 프로젝트 목적/주요 기능/기술 스택 설명, 통계(총 화면 수: 7개, 총 플로우: 12개, 컴포넌트 수: 13개)를 카드 기반으로 표시한다. 아이콘 + 텍스트 레이아웃을 사용한다. | Overview 탭, 카드 기반 레이아웃 |
| PRESENT02 | 사용자는 스토리보드에서 화면 목록을 확인할 수 있어야 한다 | PRESENT_SCREENS01 | 화면 목록 표시 | Screens 탭에 7개 화면(온보딩, 홈, 스케줄러, 로그, 모니터, 설정, 스토리보드) 카드를 표시한다. 각 카드는 화면명(Headline 17px), 설명(Caption 12px), 썸네일 이미지(선택적), "보기" 버튼을 포함한다. 2컬럼 그리드로 배치한다. 클릭 시 해당 화면으로 직접 전환한다. | Screens 탭, 2컬럼 그리드, 직접 전환 |
| PRESENT03 | 사용자는 스토리보드에서 플로우 목록을 확인하고 시작할 수 있어야 한다 | PRESENT_FLOWS01 | 플로우 목록 표시 | Flows 탭에 PRESENTATION_FLOWS 배열(12개) 플로우 카드를 표시한다. 각 카드는 아이콘(이모지, 48px), 플로우명(Headline 17px), 단계 수("N단계", Caption 회색), "시작" 버튼(파랑 배경)을 포함한다. 세로 리스트로 배치한다. 클릭 시 `onStartFlow(flowId)`를 호출한다. | Flows 탭, 플로우 카드, onStartFlow 콜백 |
| PRESENT04 | 사용자는 발표 모드를 시작할 수 있어야 한다 | PRESENT_START01 | 플로우 시작 액션 | "시작" 버튼 클릭 시 `handleStartFlow(flowId)`를 호출한다. 실행 순서: 1) 모든 데모 상태 초기화(setDemoAutomationEnabled(false), setHighlightElement(null), 모든 시트 닫기) 2) setPresentationMode(true) 3) setCurrentFlowId(flowId) 4) setCurrentStepIndex(0) 5) 첫 단계 화면으로 전환 6) 첫 단계 하이라이트 적용(highlightElement prop 설정) 7) executeStepAction() 실행 8) "🎯 발표 모드 시작!" 토스트 표시. | 컴포넌트: `App.tsx`, handleStartFlow 함수 |
| PRESENT05 | 사용자는 발표 모드에서 단계를 탐색할 수 있어야 한다 | PRESENT_NAV01 | 단계 네비게이션 | 발표 컨트롤 오버레이에 "이전" / "다음" 버튼을 표시한다. 이전 버튼: currentStepIndex > 0 조건, 클릭 시 handlePresentationPrev() 호출하여 단계 -1, 해당 화면으로 전환, 하이라이트 업데이트, 액션 실행. 다음 버튼: currentStepIndex < totalSteps - 1 조건, 클릭 시 handlePresentationNext() 호출하여 단계 +1, 화면 전환, 액션 실행. | 컴포넌트: `PresentationOverlay.tsx`, 이전/다음 버튼 |
| PRESENT05 | 사용자는 발표 모드에서 단계를 탐색할 수 있어야 한다 | PRESENT_NAV02 | 단계별 액션 실행 | `executeStepAction(action)` 함수는 각 단계의 action 파라미터에 따라 switch-case로 분기한다. 지원 액션: click_connect(온보딩 연결 안내 토스트), complete_onboarding(완료 토스트), reset_automation(자동화 OFF), enable_automation(자동화 ON + 토스트), open_new_schedule(시트 오픈), save_schedule(시트 닫기 + 성공 토스트), approve_post(포스팅 완료 토스트), open_edit_post(수정 시트 오픈 + 데이터 전달), open_log_detail(로그 상세 시트 오픈), test_connection(로딩 → 성공 토스트) 등 15개 이상 액션 정의. 각 액션은 UI 변경 + toast 피드백을 포함한다. | 컴포넌트: `App.tsx`, executeStepAction 함수, 15개 이상 액션 |
| PRESENT06 | 시스템은 발표 모드에서 하이라이트 효과를 제공해야 한다 | PRESENT_HIGHLIGHT01 | 하이라이트 시스템 | 각 컴포넌트는 `highlightElement` prop을 받는다. `getHighlightStyle(elementId)` 함수로 조건 체크(highlightElement === elementId)하여 스타일을 반환한다. 하이라이트 스타일: "outline outline-4 outline-red-500 outline-offset-4 shadow-[0_0_20px_rgba(239,68,68,0.5)] relative z-10"(빨간 outline 4px + glow 효과). 적용 요소 ID 예시: "connect-button", "metrics-section", "schedule-list", "add-schedule-button", "schedule-sheet", "schedule-form" 등. 단계 전환 시 자동 업데이트한다. | props: highlightElement, getHighlightStyle 함수, 빨간 outline + glow |
| PRESENT07 | 사용자는 발표 모드를 종료할 수 있어야 한다 | PRESENT_CLOSE01 | 발표 모드 종료 | 발표 컨트롤 오버레이 우측 상단 "종료" 버튼(빨강) 클릭 시 `handlePresentationClose()`를 호출한다. 실행 순서: 1) setPresentationMode(false) 2) setCurrentFlowId(null) 3) setCurrentStepIndex(0) 4) setCurrentScreen("storyboard") 5) setStoryboardView("flows") 6) "발표 모드 종료" 토스트 표시. 결과: 스토리보드 화면의 Flows 탭으로 복귀한다. | 컴포넌트: `App.tsx`, handlePresentationClose 함수 |
| PRESENT08 | 시스템은 발표 모드에서 진행 상황을 표시해야 한다 | PRESENT_OVERLAY01 | 발표 컨트롤 오버레이 UI | 발표 모드 활성화 시 화면 하단에 고정 오버레이(fixed bottom-0, z-index 60)를 표시한다. 반투명 검정 배경(rgba(0,0,0,0.9)), 현재 플로우명(Headline, 흰색), 진행 상황("N / M 단계", Caption, 회색), 이전 버튼(회색), 다음 버튼(파랑), 종료 버튼(빨강, 우측 상단)을 포함한다. 오버레이 배경 클릭해도 닫히지 않는다. | 컴포넌트: `PresentationOverlay.tsx`, fixed bottom, z-60 |

---

## 11. TREND – 트렌드 분석

### 요구사항 및 기능 정의

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 | 비고 |
|-----------|-----------|--------|--------|----------|------|
| TREND01 | 시스템은 실시간 트렌드 정보를 제공해야 한다 | TREND_LIVE01 | 실시간 트렌드 조회 API | `GET /api/v1/trends/live?limit=10` API는 1) Kaito API `/trends` 호출 2) 결과를 내부 포맷으로 변환 3) Redis에 5분 캐싱 4) impact 계산(내부 로직: score + historicalData)을 수행한다. 응답: `[{tag, score, relatedCoins, impact, updatedAt}]`. | API: `GET /api/v1/trends/live`, Kaito API 연동, Redis 5분 캐싱 |
| TREND01 | 시스템은 실시간 트렌드 정보를 제공해야 한다 | TREND_LIVE02 | 백그라운드 트렌드 분석 | Background Job(5분마다 실행)이 `analyzeTrends()` 함수를 호출한다. 1) Kaito API로 최신 트렌드 조회 2) X API Trending Topics 조회(보조) 3) 내부 ML 모델로 임팩트 예측 4) DB trends 테이블에 저장 5) 급상승 트렌드 감지 시 알림 발송(admin) 6) WebSocket으로 실시간 업데이트 브로드캐스트. | Cron Job 5분, Kaito API, X API, ML 모델, DB: trends, WebSocket |
| TREND02 | 시스템은 추천 코인 정보를 제공해야 한다 | TREND_COINS01 | 추천 코인 조회 API | `GET /api/v1/trends/top-coins?limit=5` API는 1) DB에서 최근 7일 코인별 포스팅 수/수익 집계 2) 24시간 변동률 계산 3) Kaito API로 현재 인기도 점수 조회 4) 순위 매기기 5) Redis 10분 캐싱을 수행한다. 응답: `[{name, rank, posts, revenue, trend, trendUp}]`. | API: `GET /api/v1/trends/top-coins`, DB 집계, Kaito API, Redis 10분 캐싱 |
| TREND03 | 시스템은 예상 수익을 계산해야 한다 | TREND_ESTIMATE01 | 예상 수익 계산 API | `GET /api/v1/trends/estimate?coin={coin}&trend={tag}` API는 과거 데이터 기반 회귀 모델 또는 규칙 기반 계산을 수행한다. 코인 인기도 + 트렌드 점수 + 시간대를 반영하며 confidence level을 계산한다(데이터 충분성). 응답: `{estimatedRevenue, confidence, factors: []}`. | API: `GET /api/v1/trends/estimate`, ML 모델 또는 규칙, 과거 데이터 기반 |

---

## 12. STATS – 통계 및 분석

### 요구사항 및 기능 정의

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 | 비고 |
|-----------|-----------|--------|--------|----------|------|
| STATS01 | 시스템은 일일 통계 정보를 제공해야 한다 | STATS_DAILY01 | 일일 통계 조회 API | `GET /api/v1/stats/daily` API는 1) DB posts 테이블에서 오늘 포스팅 집계(createdAt >= today 00:00) 2) revenue SUM, COUNT(*) 3) 평균 수익률 계산 4) 어제와 비교하여 증감률 계산을 수행한다. 응답: `{todayRevenue, totalPosts, avgRevenueRate, change24h}`. Redis 1분 캐싱을 적용한다. | API: `GET /api/v1/stats/daily`, DB 집계, Redis 1분 캐싱 |
| STATS02 | 시스템은 성과 지표를 제공해야 한다 | STATS_PERFORMANCE01 | 성과 지표 조회 API | `GET /api/v1/stats/performance` API는 1) 오늘 포스팅 수 2) 성공률 = (성공 포스팅 / 전체 포스팅) * 100 3) 평균 수익 = SUM(revenue) / COUNT(*) 4) 트렌드 정확도 = (예상 수익과 실제 수익의 차이 분석)을 계산한다. 응답: `{todayPosts, successRate, avgRevenue, trendAccuracy}`. | API: `GET /api/v1/stats/performance`, DB 집계 |
| STATS03 | 시스템은 코인별 분석 정보를 제공해야 한다 | STATS_COINS01 | 코인별 분석 API | `GET /api/v1/stats/coins?period=7d\|30d\|all` API는 DB에서 코인별 그룹핑 집계를 수행한다. 시계열 데이터를 반환(일별/주별)한다. 응답: `[{coin, totalPosts, revenue, avgEngagement, trendChange}]`. | API: `GET /api/v1/stats/coins`, DB 그룹핑 집계, 시계열 데이터 |

---

## 13. USER – 사용자 관리

### 요구사항 및 기능 정의

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 | 비고 |
|-----------|-----------|--------|--------|----------|------|
| USER01 | 시스템은 사용자 프로필 정보를 제공해야 한다 | USER_PROFILE01 | 프로필 조회 API | `GET /api/v1/users/me` API는 JWT에서 userId를 추출하고 DB users 테이블에서 사용자를 조회한다. 민감 정보(password, token)를 제외하고 반환한다. 응답: `{id, name, handle, avatar, followers, createdAt}`. | API: `GET /api/v1/users/me`, JWT 파싱, DB: users |
| USER02 | 시스템은 사용자 자동화 설정을 관리해야 한다 | USER_AUTO01 | 자동화 설정 업데이트 API | `PATCH /api/v1/users/me/automation` API는 body: `{enabled: boolean}`을 받아 DB users.automation_enabled를 업데이트한다. enabled=false 시 해당 사용자의 모든 활성 스케줄을 일시 중지하고 scheduler 큐에 중지 메시지를 발송한다. enabled=true 시 스케줄을 재활성화한다. 응답: `{enabled, updatedAt}`. | API: `PATCH /api/v1/users/me/automation`, DB: users, 스케줄러 큐 연동 |

---

## 14. QUEUE – 큐 시스템

### 요구사항 및 기능 정의

| 요구사항ID | 요구사항명 | 기능ID | 기능명 | 상세설명 | 비고 |
|-----------|-----------|--------|--------|----------|------|
| QUEUE01 | 시스템은 예약 포스팅을 큐로 관리해야 한다 | QUEUE_PUBLISH01 | 포스팅 큐 관리 | BullMQ 또는 Celery 기반 `publishQueue`를 사용한다. 포스팅 생성 시 scheduledTime을 delay로 job을 추가한다. job 데이터: `{postId, userId}`. worker가 시간 도달 시 `publishPost(postId)` 함수를 실행한다. 성공 시 job 완료, 실패 시 재시도(최대 3회, 지수 백오프). | Queue: BullMQ/Celery, publishQueue, job: {postId, userId}, 재시도 3회 |
| QUEUE01 | 시스템은 예약 포스팅을 큐로 관리해야 한다 | QUEUE_PUBLISH02 | 포스팅 워커 | worker는 1) job에서 postId 추출 2) DB에서 post 조회 3) XApiClient.postTweet() 호출 4) 성공 시 status=posted, twitterUrl 저장 5) 큐 job 제거 6) LOG 생성 7) 실패 시 에러 로그, 재시도 또는 status=failed 설정을 수행한다. | Worker: publishWorker, X API 호출, DB 업데이트, 로그 생성 |
| QUEUE02 | 시스템은 스케줄 기반 자동 생성을 큐로 관리해야 한다 | QUEUE_SCHEDULE01 | 스케줄 큐 관리 | 크론 job이 실행 시간마다 `scheduleQueue`에 `{scheduleId}` job을 추가한다. worker가 `generatePost()` 함수를 호출하여 포스팅을 생성하고 `publishQueue`에 등록한다. 에러 시 알림을 발송한다. | Queue: scheduleQueue, Cron job 연동, generatePost() 호출 |

---

## 부록: 도메인별 요구사항/기능 요약

| 도메인 | 요구사항 수 | 기능 수 | 주요 API 수 |
|--------|------------|---------|------------|
| ONBOARD | 4개 | 7개 | 2개 |
| AUTH | 4개 | 8개 | 6개 |
| DASH | 6개 | 18개 | 5개 |
| POST | 7개 | 13개 | 9개 |
| SCHED | 5개 | 15개 | 6개 |
| LOG | 5개 | 10개 | 4개 |
| MONITOR | 6개 | 13개 | 5개 |
| SET | 6개 | 18개 | 8개 |
| NAV | 1개 | 7개 | 0개 |
| PRESENT | 8개 | 14개 | 0개 |
| TREND | 3개 | 5개 | 3개 |
| STATS | 3개 | 4개 | 3개 |
| USER | 2개 | 2개 | 2개 |
| QUEUE | 2개 | 3개 | 0개 |

**총 요구사항**: 62개  
**총 기능**: 137개  
**총 API 엔드포인트**: 53개 이상

---

## 문서 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 1.0 | 2025.12.03 | 초안 작성, 구현된 UI 컴포넌트 기반 분석 완료 | AI Assistant |

---

**작성 기준**: React 컴포넌트 구조 및 props/state/handlers 분석  
**분석 범위**: 14개 도메인, 137개 세부 기능  
**문서 목적**: 실제 개발 가이드 및 API 명세
