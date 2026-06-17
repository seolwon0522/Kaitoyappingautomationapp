# Kaito 야핑 자동화 시스템 - Figma UI 기반 요구사항 정의서

## 문서 정보
- **프로젝트명**: Kaito 야핑 자동화 시스템
- **작성일**: 2025.12.03
- **버전**: 1.0
- **분석 대상**: React 컴포넌트 기반 UI 구조

---

## 도메인 PREFIX 정의

| PREFIX | 도메인명 | 설명 |
|--------|---------|------|
| ONBOARD | 온보딩 | 초기 계정 연결 및 앱 소개 |
| DASH | 대시보드 | 메인 홈 화면 및 실시간 수익 모니터링 |
| SCHED | 스케줄러 | 자동화 규칙 생성 및 관리 |
| LOG | 활동 로그 | 포스팅 이력 조회 및 분석 |
| MONITOR | 모니터링 | 시스템 상태 및 트렌드 분석 |
| SET | 설정 | 계정, API 키, 앱 환경 설정 |
| NAV | 네비게이션 | 탭바 및 화면 전환 |
| SHEET | 모달 시트 | 하단 슬라이드업 모달 UI |
| PRESENT | 발표 모드 | 인터랙티브 스토리보드 및 데모 |
| DATA | 데이터 | 상태 관리 및 모의 데이터 구조 |

---

## 요구사항 정의서

### ONBOARD01: 온보딩 화면 초기 진입 및 계정 연결 플로우

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| ONBOARD01_BRAND01 | 브랜드 아이덴티티 표시 | - Kaito 로고 이미지를 화면 중앙 상단에 표시<br>- 로고 크기: 80px × 80px<br>- 배경: 흰색 단색<br>- 애니메이션: 페이드인 효과 (0.5초) |
| ONBOARD01_BRAND02 | 서비스 타이틀 및 설명 | - 타이틀: "Kaito 야핑 자동화 시스템" (Large Title, 34px)<br>- 서브타이틀: "AI가 실시간 트렌드를 분석해 자동으로 바이럴 포스팅을 생성합니다" (Body, 17px)<br>- 중앙 정렬, 회색 텍스트 (#8E8E93) |
| ONBOARD01_ACTION01 | X 계정 연결 버튼 | - 버튼 텍스트: "X 계정 연결하기"<br>- 스타일: iOS Primary Button (파랑 #007AFF, 높이 50px, 모서리 14px)<br>- 위치: 하단 고정 (Safe Area 대응)<br>- 터치 피드백: 0.95 스케일 다운 애니메이션<br>- 클릭 시: toast 메시지 "✅ Kaito 계정 연결 성공!" 표시 후 DASH 화면으로 전환 |
| ONBOARD01_FLOW01 | 화면 전환 로직 | - 연결 성공 시 2초 후 자동으로 DASH01 화면으로 네비게이션<br>- 전환 애니메이션: 페이드 효과<br>- 비동기 처리: setTimeout(2000ms)<br>- 에러 처리: 없음 (모의 데이터로 항상 성공) |

---

### DASH01: 홈 대시보드 프로필 및 자동화 제어

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| DASH01_PROFILE01 | 사용자 프로필 헤더 | - 아바타: 원형 이미지 (48px, Dicebear API 사용)<br>- 이름: "박시연" (Headline, 17px)<br>- 핸들: "@crypto_siyeon" (Caption, 12px, 회색)<br>- 팔로워 수: "18.2K" (Caption, 12px, 파랑)<br>- 위치: 화면 상단 좌측, Safe Area 대응 (pt-16) |
| DASH01_TOGGLE01 | 자동화 ON/OFF 토글 | - 위치: 프로필 헤더 우측 정렬<br>- 스타일: iOS 스위치 컴포넌트 (36px × 20px)<br>- ON 상태: 빨강 배경 (#FF3B30), Play 아이콘<br>- OFF 상태: 파랑 배경 (#007AFF), Pause 아이콘<br>- 클릭 시: 상태 토글 + toast 메시지 "⚡ 자동화가 활성화/비활성화되었습니다!"<br>- 상태 관리: useState를 통한 로컬 상태 또는 props 기반 제어 |

---

### DASH02: 홈 대시보드 실시간 수익 통계

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| DASH02_METRICS01 | 오늘 수익 카드 | - 레이블: "오늘 수익" (Caption, 12px)<br>- 값: "$1,247.30" (Title 1, 28px, 볼드)<br>- 스타일: 흰색 카드, 그림자 (0 1px 3px rgba(0,0,0,0.1))<br>- 위치: 3컬럼 그리드 첫 번째 |
| DASH02_METRICS02 | 총 포스팅 카드 | - 레이블: "총 포스팅"<br>- 값: "23개" (숫자는 completedCount state 기반)<br>- 스타일: DASH02_METRICS01과 동일<br>- 위치: 3컬럼 그리드 두 번째 |
| DASH02_METRICS03 | 평균 수익률 카드 | - 레이블: "평균 수익률"<br>- 값: "+28.5%" (초록 텍스트 #34C759)<br>- 아이콘: 상승 화살표<br>- 스타일: DASH02_METRICS01과 동일<br>- 위치: 3컬럼 그리드 세 번째 |
| DASH02_LAYOUT01 | 통계 섹션 레이아웃 | - 컨테이너: px-5 py-4<br>- 그리드: grid-cols-3 gap-3<br>- 반응형: iPhone 16 Pro (393px) 최적화<br>- 하이라이트 지원: highlightElement="metrics-section" 시 빨간 outline 표시 |

---

### DASH03: 홈 대시보드 추천 코인 섹션

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| DASH03_COIN01 | 코인 카드 리스트 | - 데이터: topCoins 배열 (5개 코인)<br>- 각 카드 구성:<br>  * 순위 배지 (좌측 상단, 회색 원)<br>  * 코인명 (Headline, 17px)<br>  * 포스팅 수 (Caption, 12px)<br>  * 수익 (Title 2, 22px, 볼드)<br>  * 24시간 변동률 (초록/빨강 텍스트, 화살표 아이콘)<br>- 스타일: 흰색 카드, 모서리 12px, 그림자<br>- 레이아웃: 2x2 그리드 (첫 4개) + 1개 하단 |
| DASH03_COIN02 | 코인별 색상 테마 | - AI16Z: 주황 (#FF6B35)<br>- ELIZA: 보라 (#A855F7)<br>- VIRTUAL: 초록 (#10B981)<br>- PRIME: 파랑 (#3B82F6)<br>- RNDR: 회색 (#6B7280)<br>- 적용: 코인명 텍스트 색상 및 배지 배경 |
| DASH03_TREND01 | 트렌드 표시 로직 | - trendUp: true → 초록 텍스트 + 상승 화살표<br>- trendUp: false → 빨강 텍스트 + 하락 화살표<br>- 조건부 렌더링: {trend.trendUp ? "↗" : "↘"}<br>- 애니메이션: 페이드인 효과 |

---

### DASH04: 홈 대시보드 예약 포스팅 큐

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| DASH04_QUEUE01 | 포스팅 카드 리스트 | - 데이터: scheduledPosts 배열 (useState로 관리)<br>- 초기 데이터: 4개 포스팅<br>- 각 카드 구성:<br>  * 포스팅 내용 (최대 3줄, overflow 말줄임)<br>  * 이미지 (하단, Unsplash API, 모서리 12px)<br>  * 코인 배지 (상단 좌측, 색상별 구분)<br>  * 예상 수익 (우측 상단, 초록 텍스트)<br>  * 예약 시간 (하단 좌측, 회색 텍스트)<br>  * ETA 태그 (하단 우측, 회색 배지)<br>- 스크롤: 세로 스크롤 지원 |
| DASH04_ACTION01 | 포스팅 취소 버튼 | - 버튼 텍스트: "취소"<br>- 스타일: 회색 배경 (#F3F4F6), 높이 36px, 모서리 8px<br>- 위치: 카드 하단 3버튼 중 왼쪽<br>- 클릭 이벤트:<br>  1) setRemovingId(post.id) 설정<br>  2) 0.3초 페이드아웃 애니메이션<br>  3) 배열에서 해당 post 제거<br>  4) toast 메시지 "❌ 포스팅 취소 완료!"<br>- 상태 관리: useState로 scheduledPosts 업데이트 |
| DASH04_ACTION02 | 포스팅 수정 버튼 | - 버튼 텍스트: "수정"<br>- 스타일: DASH04_ACTION01과 동일<br>- 위치: 카드 하단 3버튼 중 중앙<br>- 클릭 이벤트:<br>  1) onOpenEditPost(post) 콜백 호출<br>  2) SHEET02 (EditPostSheet) 모달 오픈<br>  3) post 데이터 전달<br>- 데이터 전달: { id, content, coin, scheduledTime, image } |
| DASH04_ACTION03 | 지금 포스팅 버튼 | - 버튼 텍스트: "지금 포스팅"<br>- 스타일: 파랑 배경 (#007AFF), 흰색 텍스트<br>- 위치: 카드 하단 3버튼 중 오른쪽<br>- 클릭 이벤트:<br>  1) setPostingId(post.id) 설정<br>  2) 로딩 스피너 표시 (2초간)<br>  3) 성공 처리:<br>     - toast "🚀 포스팅 완료!"<br>     - completedCount + 1<br>     - 배열에서 해당 post 제거<br>  4) 애니메이션: 버튼 비활성화 + opacity 변경<br>- 비동기: setTimeout(2000ms) |
| DASH04_STATUS01 | 포스팅 상태 표시 | - scheduled: 기본 회색 배경<br>- ready: 초록 배경, "준비완료" 텍스트<br>- posting: 로딩 스피너 + "포스팅 중..." 텍스트<br>- 조건부 렌더링: postingId === post.id 체크<br>- 애니메이션: spin 효과 (rotate 360deg, 1초) |

---

### SCHED01: 스케줄러 자동화 규칙 목록 및 제어

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| SCHED01_STATS01 | 자동화 현황 카드 | - 구성:<br>  * 활성 규칙 수: activeRules 계산 (filter로 active:true 카운트)<br>  * 이번 주 포스팅: totalPosts 합계 (reduce로 posts 합산)<br>  * 성공률: "97%" (하드코딩)<br>- 레이아웃: 3컬럼 그리드, 중앙 정렬<br>- 스타일: 흰색 카드, 구분선 (divide-x)<br>- 위치: 페이지 상단, 규칙 목록 위 |
| SCHED01_LIST01 | 규칙 카드 리스트 | - 데이터: rules 배열 (useState로 관리, 초기 7개)<br>- 각 카드 구성:<br>  * 규칙명 (Headline, 17px, 볼드)<br>  * 실행 시간 (Caption, 12px, 회색)<br>  * 포스팅 수 (Caption, 12px, 파랑)<br>  * 마지막 실행 (Caption, 10px, 회색)<br>  * ON/OFF 토글 (우측 정렬)<br>- 구분선: 카드 내부 항목 사이 (ios-separator-inset)<br>- 스크롤: 세로 스크롤 지원 |
| SCHED01_TOGGLE01 | 규칙 활성화 토글 | - 스타일: iOS 스위치 (32px × 20px)<br>- ON: 초록 배경 (#34C759)<br>- OFF: 회색 배경 (#E5E7EB)<br>- 클릭 이벤트:<br>  1) handleToggleRule(id) 호출<br>  2) setRules로 해당 규칙의 active 상태 반전<br>  3) toast 메시지 "🔄 스케줄 상태 변경"<br>- 상태 관리: prevRules.map() 패턴 사용 |
| SCHED01_BUTTON01 | 새 규칙 추가 버튼 | - 버튼 텍스트: "+ 새 규칙 추가"<br>- 스타일: 파랑 배경, 흰색 텍스트, 높이 50px, 모서리 14px<br>- 위치: 하단 고정 (fixed bottom-20, Safe Area 대응)<br>- 클릭 이벤트: onOpenNewSchedule() 콜백 → SHEET01 모달 오픈<br>- 터치 피드백: scale(0.98) 애니메이션<br>- 하이라이트: highlightElement="add-schedule-button" 지원 |

---

### SHEET01: 새 스케줄 작성 모달 시트

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| SHEET01_LAYOUT01 | 시트 모달 컨테이너 | - 배경: 반투명 검정 (bg-black bg-opacity-30)<br>- 위치: fixed inset-0, z-index 50<br>- 애니메이션:<br>  * 진입: 하단에서 슬라이드업 (y: 100% → 0)<br>  * 퇴장: 하단으로 슬라이드다운 (y: 0 → 100%)<br>  * 스프링 효과: damping 30, stiffness 300<br>- 백드롭 닫기: 배경 클릭 시 onClose() 호출<br>- 최대 높이: 70vh, 스크롤 지원 |
| SHEET01_HANDLE01 | 드래그 핸들바 | - 크기: 40px × 4px<br>- 색상: 회색 (#C6C6C8)<br>- 모서리: 완전 둥글게 (rounded-full)<br>- 위치: 상단 중앙 (pt-3)<br>- 기능: 시각적 표시만 (실제 드래그 미지원) |
| SHEET01_HEADER01 | 헤더 네비게이션 바 | - 레이아웃: flex justify-between<br>- 왼쪽 버튼: "취소" (파랑 텍스트) → onClose()<br>- 중앙 타이틀: "새 야핑 예약" (Headline, 17px)<br>- 오른쪽 버튼: "완료" (파랑 텍스트) → handleSubmit()<br>- 하단 구분선: border-b (#C6C6C8) |
| SHEET01_FORM01 | AI 자동 생성 토글 | - 레이아웃: 그라데이션 배경 (파랑→보라)<br>- 아이콘: 번개 모양 (흰색 원형 배경)<br>- 텍스트:<br>  * 메인: "AI 자동 생성"<br>  * 서브: "실시간 트렌드 분석" (회색)<br>- 토글 스위치: 우측 정렬<br>- 상태: aiGenerate (useState, 기본 true)<br>- 클릭 시: setAiGenerate(!aiGenerate) |
| SHEET01_FORM02 | 포스팅 시간 선택 | - 레이블: "포스팅 시간" + 시계 아이콘<br>- 입력: select dropdown<br>- 옵션: 09:00 ~ 22:00 (1시간 단위, 15개 옵션)<br>- 스타일: iOS 스타일 select (appearance-none)<br>- 상태: selectedTime (useState, 기본 "09:00")<br>- 필수 입력: 빨강 별표(*) 표시 |
| SHEET01_FORM03 | 자동 이미지 첨부 토글 | - 레이블: "자동 이미지 첨부" + 이미지 아이콘<br>- 설명: "Unsplash에서 자동 선택" (회색, 작은 텍스트)<br>- 토글 스위치: 우측 정렬<br>- 상태: autoImage (useState, 기본 true) |
| SHEET01_SUBMIT01 | 완료 버튼 액션 | - 실행 순서:<br>  1) onSuccess() 콜백 호출 → toast "✅ 야핑 예약 완료!"<br>  2) onClose() 호출 → 시트 닫기<br>  3) 폼 초기화:<br>     - setContent("")<br>     - setSelectedTime("09:00")<br>- 검증: 현재 미구현 (모든 입력 허용)<br>- 에러 처리: 없음 |
| SHEET01_HIGHLIGHT01 | 하이라이트 시스템 | - highlightElement prop 기반<br>- "schedule-sheet" → 전체 시트 강조<br>- "schedule-form" → 폼 영역 강조<br>- 스타일: outline-4 outline-red-500 + glow 효과<br>- z-index: relative z-10 |

---

### LOG01: 활동 로그 필터링 및 목록 표시

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| LOG01_FILTER01 | 시간 필터 탭 | - 탭 구성: "오늘" / "이번 주" / "전체"<br>- 스타일: iOS 세그먼트 컨트롤<br>  * 비활성: 회색 배경 (#F3F4F6)<br>  * 활성: 흰색 배경 + 그림자<br>- 상태: activeTab (useState, 기본 "today")<br>- 클릭 시: setActiveTab() + 로그 필터링<br>- 레이아웃: 3개 균등 분할 (flex-1) |
| LOG01_LIST01 | 로그 카드 리스트 | - 데이터: activityLogs 배열 (mockData 기반)<br>- 각 카드 구성:<br>  * 상태 아이콘: ✅ (성공) / ⚠️ (실패)<br>  * 시간: "HH:MM" 형식 (Caption, 12px)<br>  * 제목: "포스팅 성공/실패" (Headline, 17px)<br>  * 내용 미리보기: 최대 2줄 (Body, 15px)<br>  * 코인 배지: 색상별 구분 (우측 상단)<br>  * 수익: 성공 시만 표시 (초록 텍스트)<br>- 정렬: 시간 역순 (최신순)<br>- 스크롤: 세로 스크롤, pb-24 (탭바 공간) |
| LOG01_EMPTY01 | 빈 상태 UI | - 조건: filteredLogs.length === 0<br>- 표시:<br>  * 아이콘: 회색 문서 아이콘 (48px)<br>  * 메시지: "아직 활동 로그가 없습니다" (Headline)<br>  * 서브텍스트: "포스팅이 실행되면 여기에 표시됩니다" (Caption, 회색)<br>- 위치: 화면 중앙 (flex items-center justify-center) |
| LOG01_ACTION01 | 로그 상세보기 | - 트리거: 로그 카드 클릭<br>- 이벤트: onOpenDetail(log) 콜백 호출<br>- 데이터 전달: { id, type, time, fullTime, title, content, coin, revenue, error }<br>- 결과: SHEET02 (LogDetailSheet) 모달 오픈<br>- 터치 피드백: active:bg-gray-50 |

---

### SHEET02: 로그 상세보기 모달 시트

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| SHEET02_LAYOUT01 | 상세 시트 컨테이너 | - 레이아웃: SHEET01_LAYOUT01과 동일<br>- 애니메이션: 하단 슬라이드업/다운<br>- 최대 높이: 85vh (SHEET01보다 더 높음)<br>- 백드롭 닫기 지원 |
| SHEET02_HEADER01 | 상세 정보 헤더 | - 상태 아이콘: 좌측 (성공/실패 배지)<br>- 제목: log.title (Title 2, 22px)<br>- 시간: log.fullTime (Caption, 12px, 회색)<br>- 닫기 버튼: 우측 상단 X 아이콘 |
| SHEET02_CONTENT01 | 포스팅 내용 표시 | - 레이블: "포스팅 내용"<br>- 텍스트: log.content (전체 내용, 줄바꿈 유지)<br>- 스타일: 회색 배경 박스 (#F9FAFB), 패딩, 모서리 8px<br>- 폰트: Body (15px), line-height 1.5 |
| SHEET02_META01 | 메타 정보 표시 | - 연관 코인: log.coin (색상별 배지)<br>- 실제 수익: log.revenue (성공 시만, 초록 텍스트)<br>- 에러 메시지: log.error (실패 시만, 빨강 텍스트)<br>- 레이아웃: 2컬럼 그리드 (라벨 - 값) |
| SHEET02_LINK01 | 트위터 링크 버튼 | - 조건: log.type === "success"<br>- 버튼 텍스트: "트위터에서 보기"<br>- 아이콘: 외부 링크 아이콘<br>- 스타일: 파랑 배경, 흰색 텍스트, 전체 너비<br>- 클릭 시: toast "링크를 클립보드에 복사했습니다" (실제 링크 없음) |
| SHEET02_ACTION01 | 재전송 버튼 | - 조건: log.type === "error"<br>- 버튼 텍스트: "재전송"<br>- 스타일: 초록 배경, 흰색 텍스트<br>- 클릭 이벤트:<br>  1) 로딩 상태 표시 (1초)<br>  2) toast "✅ 재전송 시뮬레이션 완료!"<br>  3) 시트 닫기<br>- 비동기: setTimeout(1000ms) |

---

### MONITOR01: 시스템 모니터링 대시보드

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| MONITOR01_STATUS01 | 시스템 상태 카드 | - 구성:<br>  * API 응답 시간: "145ms" (Caption)<br>  * 시스템 가동률: "99.8%" (Title 2, 초록)<br>  * 상태 인디케이터: 초록 원 + "정상" 텍스트<br>- 레이아웃: 2x2 그리드<br>- 스타일: 흰색 카드, 그림자<br>- 애니메이션: 숫자 카운트업 효과 (선택적) |
| MONITOR01_ACTIVITY01 | 최근 활동 스트림 | - 데이터: recentActivity 배열<br>- 각 항목 구성:<br>  * 액션 아이콘: 원형 배경 + 아이콘<br>  * 액션 설명: "포스팅 생성됨", "트렌드 감지", "스케줄 실행" 등<br>  * 시간: "X분 전" 형식<br>  * 관련 정보: 코인명 또는 트렌드 태그<br>- 스크롤: 세로 스크롤, 최대 5개 표시<br>- 실시간 업데이트: 모의 (setInterval 미사용) |
| MONITOR01_TREND01 | 실시간 트렌드 목록 | - 데이터: trendingTopics 배열<br>- 각 항목 구성:<br>  * 해시태그: "#트렌드명" (Headline, 17px)<br>  * 인기도 점수: 0-100 (진행바 표시)<br>  * 관련 코인: 배지 배열 (최대 3개)<br>  * 예상 수익 임팩트: "높음/중간/낮음" (색상별 구분)<br>- 정렬: 인기도 점수 내림차순<br>- 스타일: 흰색 카드, 구분선 |
| MONITOR01_METRICS01 | 성과 지표 요약 | - 항목:<br>  * 오늘 포스팅 수: "12" (파랑)<br>  * 성공률: "94%" (초록)<br>  * 평균 수익: "$18.40" (파랑)<br>  * 트렌드 정확도: "87%" (초록)<br>- 레이아웃: 2x2 그리드<br>- 애니메이션: 페이드인 효과 |
| MONITOR01_ACTION01 | 연결 테스트 버튼 | - 버튼 텍스트: "Kaito API 연결 테스트"<br>- 스타일: 파랑 배경, 높이 44px<br>- 클릭 이벤트:<br>  1) toast.loading("연결 테스트 중...", 1초)<br>  2) setTimeout 후:<br>     - toast.success("✅ 연결 테스트 성공!")<br>     - 설명: "Kaito API가 정상적으로 작동하고 있습니다"<br>  3) 총 2초 소요<br>- 위치: 화면 하단 고정 |

---

### SET01: 설정 화면 계정 및 연결 관리

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| SET01_ACCOUNT01 | 연결된 계정 표시 | - 섹션 제목: "연결된 계정"<br>- X 계정 정보:<br>  * 아이콘: X 로고 (24px)<br>  * 사용자명: "@crypto_siyeon"<br>  * 상태: "활성" (초록 원)<br>- 스타일: 흰색 카드, 좌우 화살표 아이콘 (더보기) |
| SET01_API01 | API 키 관리 버튼 | - 버튼 텍스트: "API 키 관리"<br>- 아이콘: 열쇠 아이콘<br>- 스타일: 흰색 카드, 우측 화살표<br>- 클릭 이벤트: onApiKeySheetChange(true) → SHEET03 오픈<br>- 터치 피드백: active:bg-gray-50 |
| SET01_DISCONNECT01 | 계정 연결 끊기 | - 버튼 텍스트: "X 계정 연결 끊기"<br>- 스타일: Destructive (빨강 텍스트 #FF3B30)<br>- 클릭 시: 확인 다이얼로그 (toast) 표시<br>- 확인 후: ONBOARD 화면으로 전환<br>- 경고: "연결을 끊으면 자동화가 중지됩니다" |

---

### SET02: 설정 화면 일반 및 고급 설정

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| SET02_GENERAL01 | 알림 설정 토글 | - 레이블: "알림"<br>- 설명: "포스팅 관련 알림 받기"<br>- 토글: iOS 스위치<br>- 상태: notificationsEnabled (useState, 기본 true) |
| SET02_GENERAL02 | 포스팅 전 검토 토글 | - 레이블: "포스팅 전 검토"<br>- 설명: "포스팅 전 수동 승인 필요"<br>- 토글: iOS 스위치<br>- 상태: reviewBeforePost (useState, 기본 true) |
| SET02_GENERAL03 | 언어 설정 | - 레이블: "언어"<br>- 현재 값: "한국어"<br>- 옵션: "한국어" / "English"<br>- 스타일: 우측 화살표, 클릭 시 액션 시트 (미구현) |
| SET02_GENERAL04 | 다크 모드 토글 | - 레이블: "다크 모드"<br>- 토글: iOS 스위치<br>- 상태: darkMode (useState, 기본 false)<br>- 기능: 현재 시각적 효과만 (실제 다크 모드 미구현) |
| SET02_ADVANCED01 | 자동 재시도 설정 | - 레이블: "자동 재시도"<br>- 설명: "API 실패 시 재시도 횟수"<br>- 현재 값: "3회"<br>- 입력: 숫자 선택 (1-5회) |
| SET02_ADVANCED02 | API 타임아웃 설정 | - 레이블: "API 타임아웃"<br>- 설명: "요청 타임아웃 시간"<br>- 현재 값: "30초"<br>- 입력: 숫자 선택 (10-60초) |
| SET02_ADVANCED03 | 디버그 모드 토글 | - 레이블: "디버그 모드"<br>- 설명: "개발자용 상세 로그"<br>- 토글: iOS 스위치<br>- 상태: debugMode (useState, 기본 false) |

---

### SET03: 설정 화면 앱 정보 및 로그아웃

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| SET03_INFO01 | 버전 정보 표시 | - 레이블: "버전"<br>- 값: "1.0.0" (하드코딩)<br>- 스타일: 회색 텍스트, 우측 정렬 |
| SET03_INFO02 | 이용약관 링크 | - 텍스트: "이용약관"<br>- 아이콘: 외부 링크<br>- 클릭 시: toast "외부 링크 시뮬레이션" (실제 링크 없음) |
| SET03_INFO03 | 개인정보 처리방침 | - 텍스트: "개인정보 처리방침"<br>- 아이콘: 외부 링크<br>- 클릭 시: toast 표시 |
| SET03_LOGOUT01 | 로그아웃 버튼 | - 버튼 텍스트: "로그아웃"<br>- 스타일: Destructive (빨강 텍스트)<br>- 클릭 이벤트:<br>  1) toast 확인 다이얼로그:<br>     - 메시지: "로그아웃 하시겠습니까?"<br>     - 액션 버튼: "확인" / "취소"<br>  2) 확인 시:<br>     - setCurrentScreen("onboarding")<br>     - toast "로그아웃되었습니다"<br>- duration: 5초 (액션 대기 시간) |

---

### SHEET03: API 키 관리 모달 시트

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| SHEET03_DISPLAY01 | API 키 마스킹 표시 | - 레이블: "X API Key"<br>- 값: "sk-•••••••••••••2h4j" (끝 4자리만 표시)<br>- 폰트: 고정폭 폰트 (monospace)<br>- 배경: 회색 박스 (#F9FAFB) |
| SHEET03_TOGGLE01 | 키 보기/숨기기 버튼 | - 아이콘: Eye / EyeOff<br>- 위치: 입력 필드 우측<br>- 클릭 시:<br>  * showKey === true: 전체 키 표시 "sk-abc123...xyz789"<br>  * showKey === false: 마스킹 표시<br>- 상태: showKey (useState, 기본 false) |
| SHEET03_COPY01 | 클립보드 복사 버튼 | - 아이콘: Copy 아이콘<br>- 버튼 텍스트: "복사"<br>- 클릭 이벤트:<br>  1) navigator.clipboard.writeText(apiKey)<br>  2) toast "✅ API 키가 클립보드에 복사되었습니다"<br>- 스타일: 회색 배경, 작은 버튼 |
| SHEET03_EDIT01 | API 키 변경 입력 | - 레이블: "새 API 키"<br>- 입력: textarea (2줄)<br>- placeholder: "새로운 API 키를 입력하세요"<br>- 검증: 길이 체크 (최소 20자)<br>- 상태: newApiKey (useState) |
| SHEET03_STATS01 | API 키 통계 표시 | - 항목:<br>  * 등록일: "2025.11.01"<br>  * 마지막 사용: "2시간 전"<br>  * 총 요청 수: "2,847"<br>  * 상태: "활성" (초록 배지)<br>- 레이아웃: 2컬럼 그리드 (라벨 - 값)<br>- 스타일: 회색 배경 섹션 |
| SHEET03_GUIDE01 | API 키 발급 안내 | - 제목: "API 키 발급 방법"<br>- 내용:<br>  * "1. X 개발자 포털 접속"<br>  * "2. 앱 생성 및 권한 설정"<br>  * "3. API 키 복사"<br>- 링크: "자세히 보기" (파랑 텍스트)<br>- 스타일: 정보 박스 (파랑 배경) |
| SHEET03_SAVE01 | 저장 버튼 | - 버튼 텍스트: "저장"<br>- 조건: newApiKey.length > 20<br>- 클릭 이벤트:<br>  1) API 키 업데이트 (로컬 상태만)<br>  2) toast "✅ 설정 저장 완료!"<br>  3) 시트 닫기<br>- 비활성화: 조건 미충족 시 회색 처리 |

---

### SHEET04: 포스팅 수정 모달 시트

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| SHEET04_EDIT01 | 포스팅 내용 수정 | - 레이블: "포스팅 내용"<br>- 입력: textarea (8줄)<br>- 현재 값: post.content<br>- 실시간 글자 수: "현재 글자 수 / 280"<br>- 제한: 최대 280자 (maxLength 속성)<br>- 상태: editedContent (useState) |
| SHEET04_COIN01 | 코인 선택 드롭다운 | - 레이블: "타겟 코인"<br>- 현재 값: post.coin<br>- 옵션: AI16Z, ELIZA, VIRTUAL, PRIME, RNDR, ZEREBRO<br>- 스타일: iOS select 스타일<br>- 변경 시: 예상 수익 재계산<br>- 상태: selectedCoin (useState) |
| SHEET04_IMAGE01 | 이미지 미리보기 | - 현재 이미지: post.image (Unsplash URL)<br>- 크기: 전체 너비 × 200px<br>- 모서리: 12px<br>- 버튼: "이미지 변경" (회색, 하단)<br>- 클릭 시: toast "이미지 변경 시뮬레이션" (실제 업로드 없음) |
| SHEET04_TIME01 | 예약 시간 변경 | - 레이블: "예약 시간"<br>- 현재 값: post.scheduledTime<br>- 입력: datetime-local (HTML5)<br>- 최소 값: 현재 시간<br>- 상태: scheduledTime (useState) |
| SHEET04_SAVE01 | 수정 저장 액션 | - 버튼 텍스트: "저장"<br>- 클릭 이벤트:<br>  1) 수정된 데이터 객체 생성:<br>     { id, content: editedContent, coin: selectedCoin, scheduledTime, image }<br>  2) onSave(updatedPost) 콜백 호출<br>  3) toast "✅ 수정 완료!"<br>  4) 시트 닫기<br>- 검증: content 필수 (빈 문자열 불가) |

---

### NAV01: 공통 탭바 네비게이션

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| NAV01_LAYOUT01 | 탭바 컨테이너 | - 위치: fixed bottom-0, 전체 너비<br>- 배경: 흰색 + backdrop-blur-lg (iOS 반투명 효과)<br>- 그림자: 상단 그림자 (0 -1px 3px rgba)<br>- 높이: 68px (Safe Area 대응)<br>- z-index: 40 |
| NAV01_TAB01 | 홈 탭 | - 아이콘: House (lucide-react)<br>- 텍스트: "홈"<br>- 활성 색상: 파랑 (#007AFF)<br>- 비활성 색상: 회색 (#8E8E93)<br>- 클릭 시: onTabChange("home") |
| NAV01_TAB02 | 스케줄러 탭 | - 아이콘: Calendar<br>- 텍스트: "스케줄"<br>- 동작: NAV01_TAB01과 동일<br>- 클릭 시: onTabChange("scheduler") |
| NAV01_TAB03 | 로그 탭 | - 아이콘: FileText<br>- 텍스트: "로그"<br>- 동작: NAV01_TAB01과 동일<br>- 클릭 시: onTabChange("logs") |
| NAV01_TAB04 | 모니터 탭 | - 아이콘: Activity<br>- 텍스트: "모니터"<br>- 동작: NAV01_TAB01과 동일<br>- 클릭 시: onTabChange("monitor") |
| NAV01_TAB05 | 설정 탭 | - 아이콘: Settings<br>- 텍스트: "설정"<br>- 동작: NAV01_TAB01과 동일<br>- 클릭 시: onTabChange("settings") |
| NAV01_ACTIVE01 | 활성 탭 표시 로직 | - 조건: activeTab === tabName<br>- 스타일 변경:<br>  * 아이콘 색상: 파랑<br>  * 텍스트 색상: 파랑<br>  * 폰트 무게: semibold<br>- 애니메이션: 0.2초 ease 전환<br>- 터치 피드백: scale(0.95) |

---

### PRESENT01: 발표 모드 스토리보드 화면

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| PRESENT01_TAB01 | 스토리보드 탭 네비게이션 | - 탭 구성: Overview / Screens / Flows / Design<br>- 스타일: 상단 고정 탭바<br>- 활성: 파랑 하단 바 (2px 높이)<br>- 클릭 시: 해당 탭 컨텐츠로 전환<br>- 상태: storyboardView (useState, 기본 "overview") |
| PRESENT01_OVERVIEW01 | 프로젝트 개요 섹션 | - 제목: "Kaito 야핑 자동화 시스템"<br>- 설명: 프로젝트 목적, 주요 기능, 기술 스택<br>- 통계:<br>  * 총 화면 수: 7개<br>  * 총 플로우: 12개<br>  * 컴포넌트 수: 13개<br>- 레이아웃: 카드 기반, 아이콘 + 텍스트 |
| PRESENT01_SCREENS01 | 화면 목록 표시 | - 데이터: 7개 화면 (온보딩, 홈, 스케줄러, 로그, 모니터, 설정, 스토리보드)<br>- 각 카드 구성:<br>  * 화면명 (Headline, 17px)<br>  * 설명 (Caption, 12px)<br>  * 썸네일 이미지 (선택적)<br>  * "보기" 버튼<br>- 그리드: 2컬럼<br>- 클릭 시: 해당 화면으로 직접 전환 |
| PRESENT01_FLOWS01 | 플로우 목록 표시 | - 데이터: PRESENTATION_FLOWS 배열 (12개)<br>- 각 플로우 카드:<br>  * 아이콘 (이모지, 48px)<br>  * 플로우명 (Headline, 17px)<br>  * 단계 수: "N단계" (Caption, 회색)<br>  * "시작" 버튼 (파랑 배경)<br>- 레이아웃: 세로 리스트<br>- 클릭 시: onStartFlow(flowId) 호출 |
| PRESENT01_DESIGN01 | 디자인 시스템 문서 | - 섹션:<br>  * 컬러 팔레트 (Primary, Success, Destructive, 코인별 색상)<br>  * 타이포그래피 (11단계)<br>  * 컴포넌트 (버튼, 카드, 토글 등)<br>- 스타일: 실제 컴포넌트 미리보기 + 코드 예시<br>- 복사 가능: 색상 코드 클릭 시 클립보드 복사 |

---

### PRESENT02: 발표 모드 실행 및 제어

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| PRESENT02_START01 | 플로우 시작 액션 | - 트리거: "시작" 버튼 클릭<br>- 실행 순서:<br>  1) handleStartFlow(flowId) 호출<br>  2) 모든 데모 상태 초기화:<br>     - setDemoAutomationEnabled(false)<br>     - setDemoShowPostAnimation(false)<br>     - setHighlightElement(null)<br>     - 모든 시트 닫기<br>  3) setPresentationMode(true)<br>  4) setCurrentFlowId(flowId)<br>  5) setCurrentStepIndex(0)<br>  6) 첫 단계 화면으로 전환<br>  7) 첫 단계 하이라이트 적용<br>  8) executeStepAction() 실행<br>  9) toast "🎯 발표 모드 시작!" |
| PRESENT02_NAV01 | 단계 네비게이션 | - 이전 버튼:<br>  * 조건: currentStepIndex > 0<br>  * 클릭 시: handlePresentationPrev()<br>  * 동작: 단계 -1, 해당 화면으로 전환, 하이라이트 업데이트<br>- 다음 버튼:<br>  * 조건: currentStepIndex < totalSteps - 1<br>  * 클릭 시: handlePresentationNext()<br>  * 동작: 단계 +1, 화면 전환, 액션 실행 |
| PRESENT02_ACTION01 | 단계별 액션 실행 | - executeStepAction(action) 함수<br>- 지원 액션 (switch-case):<br>  * click_connect: 온보딩 연결 안내<br>  * complete_onboarding: 완료 토스트<br>  * reset_automation: 자동화 OFF<br>  * enable_automation: 자동화 ON + 토스트<br>  * open_new_schedule: 시트 오픈<br>  * save_schedule: 시트 닫기 + 성공 토스트<br>  * approve_post: 포스팅 완료 토스트<br>  * open_edit_post: 수정 시트 오픈 + 데이터 전달<br>  * save_edit_post: 시트 닫기 + 업데이트 토스트<br>  * open_log_detail: 로그 상세 시트 오픈<br>  * test_connection: 로딩 → 성공 토스트<br>  * 기타 10개 액션 정의<br>- 각 액션은 UI 변경 + toast 피드백 포함 |
| PRESENT02_HIGHLIGHT01 | 하이라이트 시스템 | - prop 전달: highlightElement<br>- 각 컴포넌트에서 getHighlightStyle() 함수:<br>  * 조건: highlightElement === elementId<br>  * 스타일: "outline outline-4 outline-red-500 outline-offset-4 shadow-[0_0_20px_rgba(239,68,68,0.5)] relative z-10"<br>- 적용 요소 ID 예시:<br>  * "connect-button"<br>  * "metrics-section"<br>  * "schedule-list"<br>  * "add-schedule-button"<br>  * "schedule-sheet"<br>  * "schedule-form"<br>- 단계 전환 시 자동 업데이트 |
| PRESENT02_OVERLAY01 | 발표 컨트롤 오버레이 | - 위치: fixed bottom-0, 전체 화면 위<br>- z-index: 60 (모든 UI 위)<br>- 배경: 반투명 검정 (rgba(0,0,0,0.9))<br>- 내용:<br>  * 현재 플로우명 (Headline, 흰색)<br>  * 진행 상황: "N / M 단계" (Caption, 회색)<br>  * 이전 버튼 (회색)<br>  * 다음 버튼 (파랑)<br>  * 종료 버튼 (빨강, 우측 상단)<br>- 터치 이벤트: 오버레이 배경 클릭해도 닫히지 않음 |
| PRESENT02_CLOSE01 | 발표 모드 종료 | - 트리거: "종료" 버튼 클릭<br>- 실행 순서:<br>  1) setPresentationMode(false)<br>  2) setCurrentFlowId(null)<br>  3) setCurrentStepIndex(0)<br>  4) setCurrentScreen("storyboard")<br>  5) setStoryboardView("flows")<br>  6) toast "발표 모드 종료"<br>- 결과: 스토리보드 화면의 Flows 탭으로 복귀 |

---

### DATA01: 데이터 모델 및 상태 관리

| 기능ID | 기능명 | 상세설명 |
|--------|--------|----------|
| DATA01_POST01 | 포스팅 데이터 구조 | - 인터페이스:<br>  * id: number<br>  * content: string (한글/영어 믹스, 최대 280자)<br>  * coin: string (AI16Z, ELIZA, VIRTUAL 등)<br>  * scheduledTime: string ("오후 HH:MM" 형식)<br>  * earnings: string ("$XX.XX" 형식)<br>  * engagement: number (0-100, 참여도 점수)<br>  * status: "scheduled" \| "ready" \| "posting"<br>  * eta: string ("X분 후" 또는 "준비완료")<br>  * date: string ("YYYY.MM.DD" 형식)<br>  * image: string (Unsplash URL) |
| DATA01_LOG01 | 로그 데이터 구조 | - 인터페이스:<br>  * id: number<br>  * type: "success" \| "error"<br>  * time: string ("HH:MM" 형식)<br>  * fullTime: string ("YYYY.MM.DD HH:MM:SS" 형식)<br>  * title: string ("포스팅 성공/실패")<br>  * content: string (포스팅 내용)<br>  * coin: string<br>  * revenue?: string (성공 시만)<br>  * error?: string (실패 시만)<br>  * details?: string (추가 정보) |
| DATA01_SCHEDULE01 | 스케줄 데이터 구조 | - 인터페이스:<br>  * id: number<br>  * title: string (규칙명)<br>  * time: string ("HH:MM" 또는 "24시간 활성" 등)<br>  * active: boolean<br>  * posts: number (생성된 포스팅 수)<br>  * lastTrigger: string ("X분 전" 또는 "-") |
| DATA01_TREND01 | 트렌드 데이터 구조 | - 인터페이스:<br>  * tag: string (해시태그, "#" 포함)<br>  * score: number (0-100, 인기도 점수)<br>  * relatedCoins: string[] (관련 코인 배열)<br>  * impact: "high" \| "medium" \| "low" (예상 임팩트) |
| DATA01_STATE01 | React 상태 관리 구조 | - 주요 상태 변수 (App.tsx):<br>  * currentScreen: Screen<br>  * isNewScheduleOpen: boolean<br>  * isLogDetailOpen: boolean<br>  * isEditPostOpen: boolean<br>  * isApiKeySheetOpen: boolean<br>  * selectedLog: any \| null<br>  * editingPost: any \| null<br>  * presentationMode: boolean<br>  * currentFlowId: string \| null<br>  * currentStepIndex: number<br>  * highlightElement: string \| null<br>- 각 컴포넌트 로컬 상태:<br>  * scheduledPosts (Home)<br>  * rules (Scheduler)<br>  * activityLogs (Logs)<br>  * notificationsEnabled (Settings)<br>- 상태 업데이트: useState + setter 함수 패턴 |
| DATA01_MOCK01 | 모의 데이터 생성 규칙 | - 포스팅 내용:<br>  * 한글/영어 믹스 (70% 한글, 30% 영어)<br>  * 이모지 포함 (🚀 💫 😱 ㅋㅋ 등)<br>  * 트렌드 반영 (AI, 크립토, K-POP, 테크 등)<br>  * 해시태그 2-4개<br>  * 유머 감각 포함<br>- 이미지:<br>  * Unsplash API 사용<br>  * 키워드: AI, tech, crypto, music, gaming 등<br>  * 고품질 (w=800&q=80)<br>- 수익:<br>  * $10 ~ $25 범위<br>  * 코인별 차등 (AI16Z > ELIZA > VIRTUAL)<br>- 시간:<br>  * 현재 시간 기준 상대 시간 ("X분 후")<br>  * 날짜: "YYYY.MM.DD" 형식 |

---

## 플로우 시나리오 정의

### FLOW01: 회원가입 플로우 (onboarding_flow)

| 단계 | 화면 | 액션 | 하이라이트 | 설명 |
|------|------|------|------------|------|
| 1 | onboarding | - | - | 앱 실행, 온보딩 화면 표시 |
| 2 | onboarding | click_connect | connect-button | X 계정 연결 버튼 클릭 안내 |
| 3 | home | complete_onboarding | - | 홈 화면 진입, 완료 토스트 |
| 4 | home | - | metrics-section | 대시보드 둘러보기, 실시간 수익 확인 |

### FLOW02: 자동화 제어 플로우 (automation_control_flow)

| 단계 | 화면 | 액션 | 하이라이트 | 설명 |
|------|------|------|------------|------|
| 1 | home | reset_automation | - | OFF 상태에서 시작 |
| 2 | home | enable_automation | automation-toggle | 토글 클릭으로 자동화 활성화 |
| 3 | home | - | posting-queue | 자동 생성된 포스팅 큐 확인 |

### FLOW03: 스케줄 생성 플로우 (schedule_create_flow)

| 단계 | 화면 | 액션 | 하이라이트 | 설명 |
|------|------|------|------------|------|
| 1 | scheduler | - | schedule-list | 스케줄러 화면, 기존 규칙 확인 |
| 2 | scheduler | open_new_schedule | add-schedule-button | "새 규칙 추가" 버튼 클릭 |
| 3 | scheduler | - | schedule-sheet | 시트 모달 오픈, 폼 표시 |
| 4 | scheduler | - | schedule-form | 입력 필드 작성 (AI 토글, 시간, 코인 등) |
| 5 | scheduler | save_schedule | - | 완료 버튼 클릭, 저장 완료 |

### FLOW04: 즉시 포스팅 플로우 (instant_post_flow)

| 단계 | 화면 | 액션 | 하이라이트 | 설명 |
|------|------|------|------------|------|
| 1 | home | - | posting-queue | 예약 포스팅 목록 확인 |
| 2 | home | - | post-card-1 | 첫 번째 포스팅 검토 |
| 3 | home | approve_post | post-now-button | "지금 포스팅" 버튼 클릭 |
| 4 | logs | - | - | 활동 로그에 성공 기록 확인 |

### FLOW05: 로그 상세보기 플로우 (log_detail_flow)

| 단계 | 화면 | 액션 | 하이라이트 | 설명 |
|------|------|------|------------|------|
| 1 | logs | - | filter-tabs | 로그 화면, 필터 탭 확인 |
| 2 | logs | - | log-list | 로그 목록 스크롤 |
| 3 | logs | open_log_detail | log-item-1 | 첫 번째 로그 클릭 |
| 4 | logs | - | log-detail-sheet | 상세 정보 시트 표시 |
| 5 | logs | close_log_detail | - | 시트 닫기 |

### 기타 플로우 (FLOW06 ~ FLOW12)

- **FLOW06**: 포스팅 수정 플로우 (edit_post_flow) - 4단계
- **FLOW07**: 포스팅 취소 플로우 (cancel_post_flow) - 3단계
- **FLOW08**: 스케줄 토글 플로우 (schedule_toggle_flow) - 3단계
- **FLOW09**: 시스템 모니터링 플로우 (monitor_flow) - 5단계
- **FLOW10**: 설정 변경 플로우 (settings_flow) - 5단계
- **FLOW11**: 수익 분석 플로우 (revenue_flow) - 4단계
- **FLOW12**: 코인 선택 플로우 (coin_select_flow) - 4단계

---

## 비기능 요구사항

### PERF01: 성능 요구사항

- 초기 로딩: 2초 이내
- 화면 전환: 60fps 유지, 0.3초 애니메이션
- 터치 반응: 100ms 이내
- 스크롤 성능: 부드러운 스크롤 (transform 사용)

### ACCESS01: 접근성 요구사항

- 터치 타겟: 최소 44px × 44px
- 색상 대비: WCAG AA 기준 (4.5:1)
- 의미있는 레이블: 모든 인터랙티브 요소
- Safe Area 대응: iOS 노치 및 홈 바 영역

### DESIGN01: 디자인 일관성

- iOS 18 Human Interface Guidelines 준수
- SF Pro 폰트 시스템 사용
- 애니메이션 타이밍: ease 또는 spring
- 그림자/모서리: 일관된 토큰 사용

### CONSTRAINT01: 제약사항

- 모의 데이터 전용 (실제 API 연동 없음)
- 상태 비영구성 (새로고침 시 초기화)
- 프론트엔드 전용 (백엔드 없음)
- 실제 포스팅 금지 (시뮬레이션만)
- PII 수집 금지
- 이미지 출처: Unsplash API만 사용

---

## 문서 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 1.0 | 2025.12.03 | 초안 작성, UI 컴포넌트 기반 분석 완료 | AI Assistant |

---

**총 요구사항**: 10개 도메인 × 평균 3-6개 세부 요구사항 = 약 40개 요구사항  
**총 기능**: 약 120개 세부 기능  
**총 플로우**: 12개 사용자 시나리오
