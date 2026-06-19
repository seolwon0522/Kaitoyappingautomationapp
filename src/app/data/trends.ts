import { relativeFromNow } from "../utils/date";

// 실시간 인기 트렌드 (Kaito 야핑 생태계)
export const hotTrends = [
  { tag: "#KaitoYaps", coin: "KAITO", score: 97, change: "+41%", volume: "3.2M" },
  { tag: "#Berachain", coin: "BERA", score: 92, change: "+33%", volume: "2.1M" },
  { tag: "#Monad", coin: "MON", score: 88, change: "+27%", volume: "1.6M" },
  { tag: "#StoryProtocol", coin: "IP", score: 84, change: "+18%", volume: "1.3M" },
  { tag: "#Movement", coin: "MOVE", score: 80, change: "+14%", volume: "1.05M" },
];

// 실시간 활동 피드
export const realtimeActivity = [
  { time: relativeFromNow(0), action: "트렌드 감지", detail: "Kaito Yaps 시즌 보상 버즈 급상승" },
  { time: relativeFromNow(2), action: "포스팅 완료", detail: "베라체인 PoL 스테이킹 뉴스" },
  { time: relativeFromNow(5), action: "분석 완료", detail: "모나드 테스트넷 트랜잭션 분석" },
  { time: relativeFromNow(8), action: "예약 등록", detail: "Story Protocol 관련 3건 예약" },
  { time: relativeFromNow(12), action: "포스팅 완료", detail: "Movement 인센티브 요약 게시" },
];
