import { formatDotDate, formatClockTime, DEMO_NOW } from "../utils/date";

const today = formatDotDate(DEMO_NOW);

const IMG = {
  kaito: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
  bera: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
  mon: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&q=80",
  ip: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
  move: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&q=80",
};

// 홈 화면 예약 포스팅 큐 (Kaito 야핑 생태계, 2026.06 기준)
export const scheduledPosts = [
  {
    id: 1,
    content: "Kaito Yaps 시즌 또 열렸다 🔥\n\n야핑 점수 = 에어드랍 가중치\n지금이 포인트 쌓을 골든타임\n\n꾸준함이 답이다 ㄹㅇ\n\n#KAITO #Yaps #Airdrop",
    image: IMG.kaito,
    coin: "KAITO",
    earnings: "$24.80",
    engagement: 94,
    scheduledTime: "오후 2:50",
    status: "scheduled",
    eta: "5분 후",
    date: today,
  },
  {
    id: 2,
    content: "베라체인 메인넷 온보딩 폭발 중 🐻\n\nTVL 하루 만에 2배\nPoL 구조 진짜 영리하다\n\n에어드랍 시즌2 떡밥도 솔솔\n\n#Berachain #BERA #DeFi",
    image: IMG.bera,
    coin: "BERA",
    earnings: "$21.30",
    engagement: 90,
    scheduledTime: "오후 3:15",
    status: "scheduled",
    eta: "20분 후",
    date: today,
  },
  {
    id: 3,
    content: "모나드 테스트넷 TPS 실화냐...\n\n1만 TPS 체감 속도 ㄷㄷ\n가스비는 거의 공짜 수준\n\nTGE 전에 활동량 채워두자\n\n#Monad #MON #Testnet",
    image: IMG.mon,
    coin: "MON",
    earnings: "$18.60",
    engagement: 86,
    scheduledTime: "오후 4:00",
    status: "ready",
    eta: "준비완료",
    date: today,
  },
  {
    id: 4,
    content: "Story Protocol이 IP를 온체인으로 🎨\n\n창작자 로열티 자동 정산\nAI 학습 데이터 출처 증명까지\n\n내러티브 제대로 잡혔다\n\n#Story #IP #RWA",
    image: IMG.ip,
    coin: "IP",
    earnings: "$15.40",
    engagement: 82,
    scheduledTime: "오후 5:30",
    status: "scheduled",
    eta: "1시간 후",
    date: today,
  },
];

// 자동화 활성 시 큐에 추가되는 트윗 템플릿
export const newPostTemplates = [
  {
    content: "Movement 메인넷 카운트다운 ⚡\n\nMove 언어 = 보안 끝판왕\n앱토스/수이 개발자 대거 이동 중\n\n생태계 인센티브 빵빵하다\n\n#Movement #MOVE #L2",
    image: IMG.move,
    coin: "MOVE",
    earnings: "$17.20",
    engagement: 88,
  },
  {
    content: "소닉 체인 속도 미쳤다 🦔\n\n10,000 TPS + 1초 파이널리티\nFTM에서 마이그레이션 완료\n\nDeFi 여름 다시 오나\n\n#Sonic #S #DeFi",
    image: IMG.bera,
    coin: "S",
    earnings: "$14.90",
    engagement: 84,
  },
  {
    content: "Initia의 인터위븐 롤업 구조\n\n앱특화 체인을 한 방에 묶음\nVIP 인센티브 설계 신박하다\n\n야퍼들 벌써 몰림 ㅋㅋ\n\n#Initia #INIT #Rollup",
    image: IMG.mon,
    coin: "INIT",
    earnings: "$16.10",
    engagement: 87,
  },
];

// 자동 추가용 미래 예약 시간 풀
export const autoPostTimes = ["오후 6:00", "오후 6:30", "오후 7:00", "오후 7:30", "오후 8:00"];
export const autoPostDate = formatDotDate(DEMO_NOW);
