// "데모 오늘" 단일 소스 — 발표 재현성을 위해 실시간 시계 대신 고정 상수 사용.
// 로컬 시간 컴포넌트로 생성해 머신 타임존과 무관하게 항상 동일하게 표시된다.
// 2026-06-19 14:45 (금요일)
export const DEMO_NOW = new Date(2026, 5, 19, 14, 45, 0);

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

// 2026.06.19
export function formatDotDate(d: Date = DEMO_NOW): string {
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

// 2026년 6월 19일 금요일
export function formatLongDate(d: Date = DEMO_NOW): string {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${WEEKDAYS[d.getDay()]}요일`;
}

// 2026년 6월 기준
export function formatMonthLabel(d: Date = DEMO_NOW): string {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 기준`;
}

// 오후 2:45
export function formatClockTime(d: Date = DEMO_NOW): string {
  const h = d.getHours();
  const m = d.getMinutes();
  const period = h < 12 ? "오전" : "오후";
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  return `${period} ${h12}:${pad(m)}`;
}

export function minutesAgo(n: number): Date {
  return new Date(DEMO_NOW.getTime() - n * 60 * 1000);
}

export function daysAgo(n: number): Date {
  return new Date(DEMO_NOW.getTime() - n * 24 * 60 * 60 * 1000);
}

// 상대 시간(과거): 방금 / N분 전 / N시간 전
export function relativeFromNow(minutes: number): string {
  if (minutes <= 0) return "방금";
  if (minutes < 60) return `${minutes}분 전`;
  return `${Math.floor(minutes / 60)}시간 전`;
}

// 예약 ETA(미래): 준비완료 / N분 후 / N시간 후
export function etaFromNow(minutes: number): string {
  if (minutes <= 0) return "준비완료";
  if (minutes < 60) return `${minutes}분 후`;
  return `${Math.floor(minutes / 60)}시간 후`;
}
