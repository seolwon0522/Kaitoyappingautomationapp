import { format, subDays } from "date-fns";
import { ko } from "date-fns/locale";

export function formatDateDot(date: Date = new Date()) {
  return format(date, "yyyy.MM.dd");
}

export function formatKoreanDate(date: Date = new Date()) {
  return format(date, "yyyy년 M월 d일", { locale: ko });
}

export function formatKoreanDateWithWeekday(date: Date = new Date()) {
  return format(date, "yyyy년 M월 d일 EEEE", { locale: ko });
}

export function formatKoreanMonth(date: Date = new Date()) {
  return format(date, "yyyy년 M월", { locale: ko });
}

export function formatDateTimeKorean(date: Date = new Date()) {
  return format(date, "yyyy.MM.dd a h:mm", { locale: ko });
}

export function formatDateTime24(date: Date = new Date()) {
  return format(date, "yyyy.MM.dd HH:mm");
}

export function formatYesterdayDot() {
  return formatDateDot(subDays(new Date(), 1));
}
