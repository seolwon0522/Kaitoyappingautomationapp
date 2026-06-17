# Kaito 야핑 자동화 시스템 - 기능정의서

## 문서 정보

- **프로젝트명**: Kaito 야핑 자동화 시스템
- **작성일**: 2025.12.03
- **버전**: 1.0
- **작성 기준**: 구현된 UI 컴포넌트 분석

---

## 1. AUTH – 인증

| 요구사항ID | 요구사항명 | 기능ID        | 기능명              | 상세설명                                                  | 비고                       |
| ---------- | ---------- | ------------- | ------------------- | --------------------------------------------------------- | -------------------------- |
| AUTH01     | 로그인     | AUTH_LOGIN01  | OAuth 인증 URL 생성 | X OAuth 인증 URL과 state를 생성하여 반환한다.             | API: GET /auth/x/authorize |
| AUTH01     | 로그인     | AUTH_LOGIN02  | OAuth 콜백 처리     | code/state 검증 후 access_token 교환 및 JWT 발급한다.     | API: POST /auth/x/token    |
| AUTH01     | 로그인     | AUTH_LOGIN03  | 로그인 성공 처리    | JWT 저장 후 홈 화면으로 이동하고 환영 토스트를 표시한다.  | 컴포넌트: Onboarding.tsx   |
| AUTH02     | 로그아웃   | AUTH_LOGOUT01 | 로그아웃 확인       | 로그아웃 확인 다이얼로그를 표시한다.                      | 컴포넌트: Settings.tsx     |
| AUTH02     | 로그아웃   | AUTH_LOGOUT02 | 로그아웃 처리       | JWT 무효화 및 토큰 삭제 후 온보딩 화면으로 이동한다.      | API: POST /auth/logout     |
| AUTH03     | 세션 관리  | AUTH_TOKEN01  | JWT 발급            | 사용자 정보를 포함한 JWT를 생성한다.                      | HS256/RS256, 15분/7일 만료 |
| AUTH03     | 세션 관리  | AUTH_TOKEN02  | JWT Refresh         | refreshToken으로 새 accessToken을 발급한다.               | API: POST /auth/refresh    |
| AUTH04     | 인증 보호  | AUTH_GUARD01  | 인증 미들웨어       | 보호된 API 요청 시 JWT를 검증하고 사용자 정보를 주입한다. | Middleware: authGuard      |

---

## 2. ONBOARD – 온보딩

| 요구사항ID | 요구사항명  | 기능ID             | 기능명         | 상세설명                                           | 비고                     |
| ---------- | ----------- | ------------------ | -------------- | -------------------------------------------------- | ------------------------ |
| ONBOARD01  | 앱 소개     | ONBOARD_UI01       | 브랜딩 표시    | Kaito 로고, 타이틀, 설명 문구를 중앙에 표시한다.   | 컴포넌트: Onboarding.tsx |
| ONBOARD02  | 계정 연결   | ONBOARD_CONNECT01  | 연결 버튼 표시 | "X 계정 연결하기" 버튼을 하단에 고정 배치한다.     | Primary Button 스타일    |
| ONBOARD02  | 계정 연결   | ONBOARD_CONNECT02  | 연결 시작      | 버튼 클릭 시 OAuth 인증 플로우를 시작한다.         | onConnect 핸들러         |
| ONBOARD03  | 연결 피드백 | ONBOARD_FEEDBACK01 | 성공 토스트    | 연결 성공 시 성공 메시지를 토스트로 표시한다.      | Sonner, 3초 표시         |
| ONBOARD03  | 연결 피드백 | ONBOARD_ERROR01    | 실패 처리      | 연결 실패 시 에러 메시지와 재시도 옵션을 제공한다. | 에러 타입별 메시지       |

---

## 3. DASH – 대시보드

| 요구사항ID | 요구사항명      | 기능ID         | 기능명           | 상세설명                                                   | 비고                             |
| ---------- | --------------- | -------------- | ---------------- | ---------------------------------------------------------- | -------------------------------- |
| DASH01     | 프로필 표시     | DASH_PROFILE01 | 사용자 정보 표시 | 아바타, 이름, 핸들, 팔로워 수를 헤더에 표시한다.           | API: GET /users/me               |
| DASH02     | 자동화 제어     | DASH_AUTO01    | 토글 UI 표시     | 자동화 ON/OFF 토글을 우측 상단에 배치한다.                 | iOS 스위치, 색상 변경            |
| DASH02     | 자동화 제어     | DASH_AUTO02    | 상태 변경        | 토글 클릭 시 자동화 상태를 변경하고 서버에 저장한다.       | API: PATCH /users/me/automation  |
| DASH03     | 통계 표시       | DASH_STATS01   | 수익 통계 카드   | 오늘 수익, 총 포스팅, 평균 수익률을 3컬럼 카드로 표시한다. | API: GET /stats/daily            |
| DASH03     | 통계 표시       | DASH_STATS02   | 통계 새로고침    | 5초마다 자동 갱신 또는 수동 새로고침을 지원한다.           | 폴링 또는 Pull to Refresh        |
| DASH04     | 코인 추천       | DASH_COIN01    | 코인 카드 표시   | 상위 5개 추천 코인을 카드로 표시한다.                      | API: GET /trends/top-coins       |
| DASH04     | 코인 추천       | DASH_COIN02    | 색상 테마 적용   | 코인별 고유 색상을 텍스트와 배지에 적용한다.               | AI16Z 주황, ELIZA 보라 등        |
| DASH05     | 포스팅 큐       | DASH_QUEUE01   | 예약 목록 표시   | 예약/준비 상태의 포스팅을 카드 리스트로 표시한다.          | API: GET /posts?status=scheduled |
| DASH05     | 포스팅 큐       | DASH_QUEUE02   | 포스팅 취소      | 취소 버튼 클릭 시 포스팅을 삭제한다.                       | API: DELETE /posts/{id}          |
| DASH05     | 포스팅 큐       | DASH_QUEUE03   | 포스팅 수정      | 수정 버튼 클릭 시 수정 시트를 오픈한다.                    | EditPostSheet 모달               |
| DASH05     | 포스팅 큐       | DASH_QUEUE04   | 즉시 발행        | "지금 포스팅" 버튼 클릭 시 즉시 발행한다.                  | API: POST /posts/{id}/publish    |
| DASH06     | 실시간 업데이트 | DASH_WS01      | WebSocket 구독   | WebSocket으로 포스팅 변경 이벤트를 수신한다.               | ws://api/posts/stream            |

---

## 4. POST – 포스팅 관리

| 요구사항ID | 요구사항명    | 기능ID         | 기능명              | 상세설명                                               | 비고                          |
| ---------- | ------------- | -------------- | ------------------- | ------------------------------------------------------ | ----------------------------- |
| POST01     | 포스팅 조회   | POST_LIST01    | 목록 조회           | 상태별 포스팅 목록을 페이지네이션으로 조회한다.        | API: GET /posts               |
| POST01     | 포스팅 조회   | POST_DETAIL01  | 상세 조회           | 단일 포스팅의 전체 정보를 조회한다.                    | API: GET /posts/{id}          |
| POST02     | 포스팅 작성   | POST_CREATE01  | 수동 작성           | 사용자가 직접 포스팅 내용을 입력하여 생성한다.         | API: POST /posts              |
| POST02     | 포스팅 작성   | POST_CREATE02  | AI 자동 생성        | AI가 트렌드를 분석하여 포스팅을 자동 생성한다.         | API: POST /posts/generate     |
| POST03     | 포스팅 수정   | POST_UPDATE01  | 수정 API            | 포스팅 내용, 코인, 시간, 이미지를 수정한다.            | API: PATCH /posts/{id}        |
| POST03     | 포스팅 수정   | POST_UPDATE02  | 수정 UI             | EditPostSheet에서 수정 폼을 제공한다.                  | textarea, select, datetime    |
| POST04     | 포스팅 삭제   | POST_DELETE01  | 삭제 처리           | 예약 포스팅을 삭제하고 큐 job을 취소한다.              | API: DELETE /posts/{id}       |
| POST05     | 포스팅 발행   | POST_PUBLISH01 | 즉시 발행           | X API로 트윗을 발행하고 결과를 저장한다.               | API: POST /posts/{id}/publish |
| POST05     | 포스팅 발행   | POST_RETRY01   | 재시도              | 실패한 포스팅을 재시도한다 (최대 3회).                 | API: POST /posts/{id}/retry   |
| POST06     | 실시간 동기화 | POST_STREAM01  | 이벤트 브로드캐스트 | 포스팅 생성/수정/발행 이벤트를 WebSocket으로 전송한다. | Redis Pub/Sub                 |

---

## 5. SCHED – 스케줄 관리

| 요구사항ID | 요구사항명 | 기능ID         | 기능명         | 상세설명                                          | 비고                        |
| ---------- | ---------- | -------------- | -------------- | ------------------------------------------------- | --------------------------- |
| SCHED01    | 규칙 조회  | SCHED_LIST01   | 규칙 목록 표시 | 자동화 규칙 목록을 카드로 표시한다.               | API: GET /schedules         |
| SCHED01    | 규칙 조회  | SCHED_STATS01  | 현황 카드 표시 | 활성 규칙 수, 이번 주 포스팅, 성공률을 표시한다.  | 3컬럼 그리드                |
| SCHED02    | 규칙 제어  | SCHED_TOGGLE01 | 활성화 토글    | 규칙별 ON/OFF 토글로 활성화 상태를 제어한다.      | API: PATCH /schedules/{id}  |
| SCHED03    | 규칙 작성  | SCHED_CREATE01 | 작성 시트 오픈 | "새 규칙 추가" 버튼 클릭 시 시트를 오픈한다.      | NewScheduleSheet 모달       |
| SCHED03    | 규칙 작성  | SCHED_CREATE02 | 폼 입력        | AI 토글, 시간, 빈도, 코인, 톤 선택 폼을 제공한다. | 입력 검증 포함              |
| SCHED03    | 규칙 작성  | SCHED_CREATE03 | 규칙 저장      | 입력 검증 후 새 규칙을 생성한다.                  | API: POST /schedules        |
| SCHED04    | 자동 실행  | SCHED_CRON01   | 크론 작업      | 예약된 시간에 자동으로 포스팅을 생성한다.         | BullMQ 또는 node-cron       |
| SCHED05    | 규칙 삭제  | SCHED_DELETE01 | 삭제 처리      | 규칙을 삭제하고 크론 job을 취소한다.              | API: DELETE /schedules/{id} |

---

## 6. LOG – 활동 로그

| 요구사항ID | 요구사항명 | 기능ID       | 기능명         | 상세설명                                         | 비고                        |
| ---------- | ---------- | ------------ | -------------- | ------------------------------------------------ | --------------------------- |
| LOG01      | 로그 조회  | LOG_FILTER01 | 시간 필터 탭   | 오늘/이번 주/전체 탭으로 로그를 필터링한다.      | iOS 세그먼트 컨트롤         |
| LOG01      | 로그 조회  | LOG_LIST01   | 목록 표시      | 상태 아이콘, 시간, 내용, 코인을 카드로 표시한다. | 시간 역순 정렬              |
| LOG01      | 로그 조회  | LOG_SCROLL01 | 무한 스크롤    | 하단 감지 시 추가 로그를 로드한다.               | Intersection Observer       |
| LOG02      | 로그 상세  | LOG_DETAIL01 | 상세 시트 오픈 | 로그 카드 클릭 시 상세 정보 시트를 오픈한다.     | LogDetailSheet 모달         |
| LOG02      | 로그 상세  | LOG_DETAIL02 | 상세 정보 표시 | 전체 내용, 코인, 수익, 에러 메시지를 표시한다.   | 성공/실패별 다른 UI         |
| LOG02      | 로그 상세  | LOG_LINK01   | 트위터 링크    | 성공한 로그에만 트위터 링크 버튼을 표시한다.     | 조건부 렌더링               |
| LOG02      | 로그 상세  | LOG_RETRY01  | 재시도 버튼    | 실패한 로그에만 재시도 버튼을 표시한다.          | API: POST /posts/{id}/retry |
| LOG03      | 로그 생성  | LOG_CREATE01 | 자동 기록      | 포스팅 성공/실패 시 자동으로 로그를 생성한다.    | 비동기 처리                 |
| LOG04      | 로그 검색  | LOG_SEARCH01 | 키워드 검색    | 내용과 제목에서 키워드를 검색한다.               | API: GET /logs/search       |

---

## 7. MONITOR – 시스템 모니터링

| 요구사항ID | 요구사항명  | 기능ID             | 기능명         | 상세설명                                           | 비고                        |
| ---------- | ----------- | ------------------ | -------------- | -------------------------------------------------- | --------------------------- |
| MONITOR01  | 시스템 상태 | MONITOR_STATUS01   | 상태 카드 표시 | API 응답 시간, 가동률, 상태 인디케이터를 표시한다. | 2x2 그리드                  |
| MONITOR01  | 시스템 상태 | MONITOR_STATUS02   | 상태 조회      | 외부 API ping, 서버 메트릭, Redis 연결을 체크한다. | API: GET /monitor/system    |
| MONITOR01  | 시스템 상태 | MONITOR_REFRESH01  | 자동 갱신      | 10초마다 시스템 상태를 자동 갱신한다.              | setInterval 폴링            |
| MONITOR02  | 활동 스트림 | MONITOR_ACTIVITY01 | 활동 표시      | 최근 10개 시스템 활동을 스트림으로 표시한다.       | API: GET /monitor/activity  |
| MONITOR03  | 트렌드 분석 | MONITOR_TREND01    | 트렌드 표시    | 실시간 트렌드를 인기도 순으로 표시한다.            | API: GET /trends/live       |
| MONITOR04  | 성과 지표   | MONITOR_METRICS01  | 지표 표시      | 오늘 포스팅, 성공률, 평균 수익, 정확도를 표시한다. | API: GET /stats/performance |
| MONITOR05  | 연결 테스트 | MONITOR_TEST01     | API 테스트     | Kaito API 연결을 테스트하고 결과를 표시한다.       | API: GET /monitor/health    |

---

## 8. SET – 설정

| 요구사항ID | 요구사항명  | 기능ID           | 기능명           | 상세설명                                       | 비고                                |
| ---------- | ----------- | ---------------- | ---------------- | ---------------------------------------------- | ----------------------------------- |
| SET01      | 계정 정보   | SET_ACCOUNT01    | 연결 계정 표시   | X 계정 아이콘, 사용자명, 상태를 표시한다.      | API: GET /users/me/connections      |
| SET01      | 계정 정보   | SET_DISCONNECT01 | 연결 끊기        | 확인 후 X 계정 연결을 해제한다.                | API: DELETE /users/me/connections/x |
| SET02      | API 키 관리 | SET_APIKEY01     | API 키 시트 오픈 | "API 키 관리" 버튼 클릭 시 시트를 오픈한다.    | ApiKeySheet 모달                    |
| SET02      | API 키 관리 | SET_APIKEY02     | 키 표시          | 마스킹된 API 키를 표시한다 (끝 4자리만).       | 고정폭 폰트                         |
| SET02      | API 키 관리 | SET_APIKEY03     | 키 보기/숨기기   | Eye/EyeOff 토글로 전체 키를 표시/숨김한다.     | showKey 상태                        |
| SET02      | API 키 관리 | SET_APIKEY04     | 키 복사          | Copy 버튼 클릭 시 클립보드에 복사한다.         | Clipboard API                       |
| SET02      | API 키 관리 | SET_APIKEY05     | 키 변경          | 새 API 키를 입력하고 검증 후 저장한다.         | API: PATCH /users/me/api-keys       |
| SET03      | 일반 설정   | SET_GENERAL01    | 설정 조회        | 알림, 검토, 언어, 다크모드 설정을 조회한다.    | API: GET /users/me/settings         |
| SET03      | 일반 설정   | SET_GENERAL02    | 설정 변경        | 각 설정 토글 클릭 시 서버에 저장한다.          | API: PATCH /users/me/settings       |
| SET04      | 고급 설정   | SET_ADVANCED01   | 고급 옵션 표시   | 자동 재시도, 타임아웃, 디버그 모드를 표시한다. | 숫자 선택 UI                        |
| SET04      | 고급 설정   | SET_ADVANCED02   | 고급 설정 변경   | 고급 설정 값을 변경하고 저장한다.              | 동일 API 사용                       |
| SET05      | 앱 정보     | SET_INFO01       | 정보 표시        | 버전, 이용약관, 개인정보 링크를 표시한다.      | 외부 링크 시뮬레이션                |

---

## 9. NAV – 네비게이션

| 요구사항ID | 요구사항명 | 기능ID       | 기능명        | 상세설명                                      | 비고                    |
| ---------- | ---------- | ------------ | ------------- | --------------------------------------------- | ----------------------- |
| NAV01      | 탭바 UI    | NAV_LAYOUT01 | 탭바 컨테이너 | 5개 탭을 하단에 고정 배치한다.                | fixed bottom, blur 효과 |
| NAV01      | 탭바 UI    | NAV_TAB01    | 홈 탭         | House 아이콘 + "홈" 텍스트를 표시한다.        | 클릭 시 홈 화면         |
| NAV01      | 탭바 UI    | NAV_TAB02    | 스케줄 탭     | Calendar 아이콘 + "스케줄" 텍스트를 표시한다. | 클릭 시 스케줄 화면     |
| NAV01      | 탭바 UI    | NAV_TAB03    | 로그 탭       | FileText 아이콘 + "로그" 텍스트를 표시한다.   | 클릭 시 로그 화면       |
| NAV01      | 탭바 UI    | NAV_TAB04    | 모니터 탭     | Activity 아이콘 + "모니터" 텍스트를 표시한다. | 클릭 시 모니터 화면     |
| NAV01      | 탭바 UI    | NAV_TAB05    | 설정 탭       | Settings 아이콘 + "설정" 텍스트를 표시한다.   | 클릭 시 설정 화면       |
| NAV02      | 활성 상태  | NAV_ACTIVE01 | 활성 탭 표시  | 현재 화면에 해당하는 탭을 파랑으로 강조한다.  | 색상, 폰트 변경         |

---

## 10. TREND – 트렌드 분석

| 요구사항ID | 요구사항명    | 기능ID           | 기능명          | 상세설명                                           | 비고                       |
| ---------- | ------------- | ---------------- | --------------- | -------------------------------------------------- | -------------------------- |
| TREND01    | 실시간 트렌드 | TREND_LIVE01     | 트렌드 조회     | Kaito API로 최신 트렌드를 조회한다.                | API: GET /trends/live      |
| TREND01    | 실시간 트렌드 | TREND_LIVE02     | 백그라운드 분석 | 5분마다 트렌드를 분석하고 DB에 저장한다.           | Cron Job, ML 모델          |
| TREND02    | 코인 추천     | TREND_COINS01    | 추천 코인 조회  | 최근 7일 데이터 기반으로 상위 5개 코인을 추천한다. | API: GET /trends/top-coins |
| TREND03    | 수익 예측     | TREND_ESTIMATE01 | 예상 수익 계산  | 코인과 트렌드 기반으로 예상 수익을 계산한다.       | API: GET /trends/estimate  |

---

## 11. STATS – 통계

| 요구사항ID | 요구사항명 | 기능ID        | 기능명      | 상세설명                                      | 비고                        |
| ---------- | ---------- | ------------- | ----------- | --------------------------------------------- | --------------------------- |
| STATS01    | 일일 통계  | STATS_DAILY01 | 통계 조회   | 오늘 수익, 포스팅 수, 수익률을 조회한다.      | API: GET /stats/daily       |
| STATS02    | 성과 지표  | STATS_PERF01  | 지표 조회   | 성공률, 평균 수익, 정확도를 조회한다.         | API: GET /stats/performance |
| STATS03    | 코인 분석  | STATS_COINS01 | 코인별 통계 | 코인별 포스팅, 수익, 인게이지먼트를 집계한다. | API: GET /stats/coins       |

---

## 12. USER – 사용자 관리

| 요구사항ID | 요구사항명  | 기능ID         | 기능명           | 상세설명                                | 비고                            |
| ---------- | ----------- | -------------- | ---------------- | --------------------------------------- | ------------------------------- |
| USER01     | 프로필 조회 | USER_PROFILE01 | 내 정보 조회     | 현재 사용자의 프로필 정보를 조회한다.   | API: GET /users/me              |
| USER02     | 자동화 설정 | USER_AUTO01    | 자동화 상태 변경 | 사용자의 자동화 ON/OFF 상태를 변경한다. | API: PATCH /users/me/automation |

---

## 13. QUEUE – 큐 시스템

| 요구사항ID | 요구사항명 | 기능ID           | 기능명    | 상세설명                                         | 비고          |
| ---------- | ---------- | ---------------- | --------- | ------------------------------------------------ | ------------- |
| QUEUE01    | 포스팅 큐  | QUEUE_PUBLISH01  | 큐 등록   | scheduledTime에 맞춰 포스팅 job을 큐에 등록한다. | BullMQ/Celery |
| QUEUE01    | 포스팅 큐  | QUEUE_PUBLISH02  | 워커 실행 | 시간 도달 시 워커가 포스팅을 발행한다.           | X API 호출    |
| QUEUE02    | 스케줄 큐  | QUEUE_SCHEDULE01 | 자동 생성 | 크론 시간에 자동으로 포스팅을 생성한다.          | Cron Job 연동 |

---

## 14. EXTAPI – 외부 API

| 요구사항ID | 요구사항명     | 기능ID         | 기능명           | 상세설명                               | 비고            |
| ---------- | -------------- | -------------- | ---------------- | -------------------------------------- | --------------- |
| EXTAPI01   | X API 연동     | EXTAPI_X01     | 트윗 발행        | X API로 트윗을 발행한다.               | OAuth 1.0a/2.0  |
| EXTAPI01   | X API 연동     | EXTAPI_X02     | 사용자 정보 조회 | X API로 사용자 정보를 조회한다.        | OAuth 인증 필요 |
| EXTAPI02   | Kaito API 연동 | EXTAPI_KAITO01 | 트렌드 조회      | Kaito API로 실시간 트렌드를 조회한다.  | API 키 인증     |
| EXTAPI02   | Kaito API 연동 | EXTAPI_KAITO02 | 코인 분석        | Kaito API로 코인 신호 점수를 조회한다. | Redis 5분 캐싱  |
| EXTAPI03   | Unsplash API   | EXTAPI_IMG01   | 이미지 검색      | Unsplash API로 관련 이미지를 검색한다. | 고품질 이미지   |
| EXTAPI04   | OpenAI API     | EXTAPI_AI01    | 포스팅 생성      | GPT-4로 포스팅 내용을 생성한다.        | 프롬프트 템플릿 |

---

## 요약

### 도메인별 통계

| 도메인  | 요구사항 수 | 기능 수 |
| ------- | ----------- | ------- |
| AUTH    | 4개         | 8개     |
| ONBOARD | 3개         | 5개     |
| DASH    | 6개         | 12개    |
| POST    | 6개         | 10개    |
| SCHED   | 5개         | 10개    |
| LOG     | 4개         | 9개     |
| MONITOR | 5개         | 9개     |
| SET     | 5개         | 13개    |
| NAV     | 2개         | 7개     |
| TREND   | 3개         | 4개     |
| STATS   | 3개         | 3개     |
| USER    | 2개         | 2개     |
| QUEUE   | 2개         | 3개     |
| EXTAPI  | 4개         | 6개     |

**총 요구사항**: 54개  
**총 기능**: 101개

---

## 문서 변경 이력

| 버전 | 날짜       | 변경 내용 | 작성자       |
| ---- | ---------- | --------- | ------------ |
| 1.0  | 2025.12.03 | 초안 작성 | AI Assistant |