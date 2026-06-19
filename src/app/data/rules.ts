import { relativeFromNow } from "../utils/date";

// 자동화 규칙 (Kaito 야핑 생태계 모니터링)
export const automationRules = [
  { id: 1, title: "Kaito 트렌드 24/7 추적", time: "24시간 활성", active: true, posts: 48, lastTrigger: relativeFromNow(3) },
  { id: 2, title: "에어드랍 프로젝트 모니터링", time: "24시간 활성", active: true, posts: 39, lastTrigger: relativeFromNow(8) },
  { id: 3, title: "신규 토큰 TGE 추적", time: "이벤트 발생시", active: true, posts: 21, lastTrigger: relativeFromNow(60) },
  { id: 4, title: "거래량 급등 코인 알림", time: "자동 감지", active: true, posts: 14, lastTrigger: relativeFromNow(180) },
  { id: 5, title: "온체인 고래 활동 포착", time: "임계치 도달시", active: true, posts: 11, lastTrigger: relativeFromNow(300) },
  { id: 6, title: "아침 시장 브리핑", time: "매일 08:30", active: false, posts: 0, lastTrigger: "-" },
  { id: 7, title: "저녁 일일 요약", time: "매일 19:00", active: false, posts: 0, lastTrigger: "-" },
];
