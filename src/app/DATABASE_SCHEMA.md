# Kaito 야핑 자동화 시스템 - DB 스키마 설계

## 문서 정보
- **프로젝트명**: Kaito 야핑 자동화 시스템
- **DBMS**: PostgreSQL 14+
- **작성 기준**: FUNCTION_SPEC_SIMPLE.md 기능정의서
- **작성일**: 2025.12.03
- **버전**: 1.0

---

## 1. 엔티티 설계 개요

| 테이블명 | 설명 | 주요 컬럼 | 관련 도메인(요구사항ID/기능ID 예시) |
|---------|------|----------|-----------------------------------|
| **users** | 사용자 계정 및 프로필 | id, handle, name, avatar, followers, automation_enabled | AUTH01, USER01, DASH01, SET01 |
| **user_connections** | 외부 계정 연결 정보 | id, user_id, platform, external_user_id, access_token, refresh_token | AUTH01, SET01 (SET_ACCOUNT01, SET_DISCONNECT01) |
| **refresh_tokens** | JWT Refresh Token 관리 | id, user_id, token_hash, expires_at | AUTH03 (AUTH_TOKEN02) |
| **posts** | 포스팅 정보 | id, user_id, schedule_id, content, coin, status, scheduled_time, twitter_url, estimated_revenue, actual_revenue | POST01~POST06, DASH05, LOG02, QUEUE01 |
| **schedules** | 자동화 규칙 | id, user_id, name, time, frequency, coins, tone, ai_enabled, active, last_triggered_at | SCHED01~SCHED05, DASH05 |
| **activity_logs** | 활동 로그 | id, user_id, post_id, type, title, content, coin, revenue, error_message | LOG01~LOG04, POST05 |
| **trends** | 트렌드 정보 | id, tag, score, impact, source, metadata | TREND01, MONITOR03, DASH04 |
| **trend_coins** | 트렌드-코인 관계 (N:M) | trend_id, coin, relevance_score | TREND01, TREND02 |
| **api_keys** | 사용자별 API 키 | user_id, x_api_key_encrypted, kaito_api_key_encrypted, total_requests, last_used_at | SET02 (SET_APIKEY01~SET_APIKEY05) |
| **user_settings** | 사용자 설정 | user_id, notifications, review_before_post, language, dark_mode, auto_retry, api_timeout, debug_mode | SET03, SET04 (SET_GENERAL01~SET_ADVANCED02) |

---

## 2. ERD 관점의 관계 설명

### 2.1 핵심 관계

**users 중심 관계:**
- `users` 1:N `posts` — 한 사용자는 여러 포스팅을 작성. FK: posts.user_id → users.id, ON DELETE CASCADE
- `users` 1:N `schedules` — 한 사용자는 여러 자동화 규칙 생성. FK: schedules.user_id → users.id, ON DELETE CASCADE
- `users` 1:N `activity_logs` — 한 사용자는 여러 활동 로그 보유. FK: activity_logs.user_id → users.id, ON DELETE CASCADE
- `users` 1:1 `api_keys` — 한 사용자는 하나의 API 키 세트 보유. FK: api_keys.user_id → users.id, ON DELETE CASCADE
- `users` 1:1 `user_settings` — 한 사용자는 하나의 설정 세트 보유. FK: user_settings.user_id → users.id, ON DELETE CASCADE
- `users` 1:N `user_connections` — 한 사용자는 여러 외부 계정 연결 가능 (현재는 X만). FK: user_connections.user_id → users.id, ON DELETE CASCADE
- `users` 1:N `refresh_tokens` — 한 사용자는 여러 refresh token 보유 (멀티 디바이스). FK: refresh_tokens.user_id → users.id, ON DELETE CASCADE

**posts 관련 관계:**
- `schedules` 1:N `posts` — 한 스케줄은 여러 포스팅 생성 가능. FK: posts.schedule_id → schedules.id, ON DELETE SET NULL (스케줄 삭제 시 포스팅은 유지하되 참조만 NULL)
- `posts` 1:N `activity_logs` — 한 포스팅은 여러 로그 생성 (재시도 등). FK: activity_logs.post_id → posts.id, ON DELETE SET NULL

**trends 관련 관계:**
- `trends` N:M `coins` — 한 트렌드는 여러 코인과 연관, 한 코인은 여러 트렌드와 연관. 중간 테이블: `trend_coins` (trend_id, coin)
- `trend_coins` FK: trend_id → trends.id, ON DELETE CASCADE

### 2.2 삭제 정책 요약

- **CASCADE**: users 삭제 시 관련 posts, schedules, logs, settings 모두 삭제
- **SET NULL**: schedule 삭제 시 posts.schedule_id만 NULL로 변경 (포스팅 자체는 유지)
- **SET NULL**: post 삭제 시 activity_logs.post_id만 NULL로 변경 (로그는 히스토리로 유지)

---

## 3. PostgreSQL DDL (CREATE TABLE)

### 3.1 users - 사용자 계정

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  handle VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100),
  avatar TEXT,
  followers INTEGER DEFAULT 0,
  automation_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ NULL
);

-- 인덱스
CREATE INDEX idx_users_handle ON users(handle);
CREATE INDEX idx_users_automation ON users(automation_enabled) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_deleted_at ON users(deleted_at) WHERE deleted_at IS NOT NULL;

-- 코멘트
COMMENT ON TABLE users IS '사용자 계정 및 프로필 정보';
COMMENT ON COLUMN users.handle IS 'X(트위터) 핸들명 (@username)';
COMMENT ON COLUMN users.automation_enabled IS '자동화 ON/OFF 상태';
COMMENT ON COLUMN users.deleted_at IS '소프트 삭제 시간 (NULL이면 활성 계정)';
```

---

### 3.2 user_connections - 외부 계정 연결

```sql
CREATE TABLE user_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform VARCHAR(20) NOT NULL DEFAULT 'X',
  external_user_id VARCHAR(100),
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  connected_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  CONSTRAINT uq_user_platform UNIQUE (user_id, platform)
);

-- 인덱스
CREATE INDEX idx_user_connections_user_id ON user_connections(user_id);
CREATE INDEX idx_user_connections_platform ON user_connections(platform);

-- 코멘트
COMMENT ON TABLE user_connections IS '외부 계정 연결 정보 (X, 추후 확장 가능)';
COMMENT ON COLUMN user_connections.access_token IS 'OAuth access_token (암호화 저장 권장)';
COMMENT ON COLUMN user_connections.refresh_token IS 'OAuth refresh_token (암호화 저장 권장)';
```

---

### 3.3 refresh_tokens - JWT Refresh Token 관리

```sql
CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 인덱스
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_hash ON refresh_tokens(token_hash) WHERE revoked = FALSE;
CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);

-- 코멘트
COMMENT ON TABLE refresh_tokens IS 'JWT Refresh Token 관리 (멀티 디바이스 지원)';
COMMENT ON COLUMN refresh_tokens.token_hash IS 'refresh_token의 SHA-256 해시값';
COMMENT ON COLUMN refresh_tokens.revoked IS '토큰 무효화 여부 (로그아웃 시 true)';
```

---

### 3.4 posts - 포스팅 정보

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  schedule_id UUID REFERENCES schedules(id) ON DELETE SET NULL,
  content TEXT NOT NULL CHECK (char_length(content) <= 280),
  coin VARCHAR(20) NOT NULL,
  image_url TEXT,
  scheduled_time TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ready', 'posting', 'posted', 'failed')),
  twitter_url TEXT,
  estimated_revenue NUMERIC(10,2),
  actual_revenue NUMERIC(10,2),
  engagement_score INTEGER,
  retry_count INTEGER DEFAULT 0 CHECK (retry_count >= 0 AND retry_count <= 3),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ NULL
);

-- 인덱스
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_schedule_id ON posts(schedule_id);
CREATE INDEX idx_posts_status ON posts(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_posts_user_status ON posts(user_id, status) WHERE deleted_at IS NULL;
CREATE INDEX idx_posts_scheduled_time ON posts(scheduled_time) WHERE status IN ('scheduled', 'ready');
CREATE INDEX idx_posts_coin ON posts(coin);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- 코멘트
COMMENT ON TABLE posts IS '포스팅 정보 (수동/자동 생성, 예약, 발행)';
COMMENT ON COLUMN posts.content IS '포스팅 내용 (최대 280자)';
COMMENT ON COLUMN posts.coin IS '타겟 코인 (AI16Z, ELIZA, VIRTUAL, PRIME 등)';
COMMENT ON COLUMN posts.status IS '포스팅 상태 (scheduled: 예약, ready: 준비완료, posting: 발행중, posted: 완료, failed: 실패)';
COMMENT ON COLUMN posts.retry_count IS '재시도 횟수 (최대 3회)';
```

---

### 3.5 schedules - 자동화 규칙

```sql
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  time VARCHAR(10),
  frequency VARCHAR(50) NOT NULL,
  coins TEXT[] NOT NULL,
  tone VARCHAR(50),
  ai_enabled BOOLEAN DEFAULT TRUE,
  active BOOLEAN DEFAULT TRUE,
  last_triggered_at TIMESTAMPTZ,
  total_posts_generated INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ NULL,
  
  CHECK (array_length(coins, 1) >= 1)
);

-- 인덱스
CREATE INDEX idx_schedules_user_id ON schedules(user_id);
CREATE INDEX idx_schedules_active ON schedules(active) WHERE deleted_at IS NULL;
CREATE INDEX idx_schedules_user_active ON schedules(user_id, active) WHERE deleted_at IS NULL;
CREATE INDEX idx_schedules_last_triggered ON schedules(last_triggered_at);

-- 코멘트
COMMENT ON TABLE schedules IS '자동화 규칙 (크론 기반 포스팅 자동 생성)';
COMMENT ON COLUMN schedules.time IS '실행 시간 (HH:MM 형식 또는 "24시간 활성")';
COMMENT ON COLUMN schedules.frequency IS '반복 빈도 (daily, hourly, event-based 등)';
COMMENT ON COLUMN schedules.coins IS '타겟 코인 배열';
COMMENT ON COLUMN schedules.tone IS '포스팅 톤 (aggressive, humorous, professional 등)';
```

---

### 3.6 activity_logs - 활동 로그

```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('success', 'error', 'info')),
  title VARCHAR(200) NOT NULL,
  content TEXT,
  coin VARCHAR(20),
  revenue NUMERIC(10,2),
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 인덱스
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_post_id ON activity_logs(post_id);
CREATE INDEX idx_activity_logs_type ON activity_logs(type);
CREATE INDEX idx_activity_logs_user_type_created ON activity_logs(user_id, type, created_at DESC);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX idx_activity_logs_content_search ON activity_logs USING gin(to_tsvector('simple', content));

-- 코멘트
COMMENT ON TABLE activity_logs IS '활동 로그 (포스팅 성공/실패, 시스템 이벤트)';
COMMENT ON COLUMN activity_logs.type IS '로그 타입 (success: 성공, error: 에러, info: 정보)';
COMMENT ON COLUMN activity_logs.metadata IS '추가 정보 (JSON 형태)';
```

---

### 3.7 trends - 트렌드 정보

```sql
CREATE TABLE trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  impact VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (impact IN ('high', 'medium', 'low')),
  source VARCHAR(50) DEFAULT 'kaito' CHECK (source IN ('kaito', 'x', 'internal')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  CONSTRAINT uq_trend_tag_date UNIQUE (tag, date_trunc('day', created_at))
);

-- 인덱스
CREATE INDEX idx_trends_tag ON trends(tag);
CREATE INDEX idx_trends_score ON trends(score DESC);
CREATE INDEX idx_trends_created_at ON trends(created_at DESC);
CREATE INDEX idx_trends_impact ON trends(impact);

-- 코멘트
COMMENT ON TABLE trends IS '트렌드 정보 (Kaito API, X API 등에서 수집)';
COMMENT ON COLUMN trends.tag IS '트렌드 태그 (해시태그)';
COMMENT ON COLUMN trends.score IS '인기도 점수 (0-100)';
COMMENT ON COLUMN trends.impact IS '예상 임팩트 (high, medium, low)';
COMMENT ON COLUMN trends.source IS '트렌드 출처 (kaito, x, internal)';
```

---

### 3.8 trend_coins - 트렌드-코인 관계 (N:M)

```sql
CREATE TABLE trend_coins (
  trend_id UUID NOT NULL REFERENCES trends(id) ON DELETE CASCADE,
  coin VARCHAR(20) NOT NULL,
  relevance_score NUMERIC(5,2) DEFAULT 0.00 CHECK (relevance_score >= 0 AND relevance_score <= 100),
  created_at TIMESTAMPTZ DEFAULT now(),
  
  PRIMARY KEY (trend_id, coin)
);

-- 인덱스
CREATE INDEX idx_trend_coins_coin ON trend_coins(coin);
CREATE INDEX idx_trend_coins_relevance ON trend_coins(relevance_score DESC);

-- 코멘트
COMMENT ON TABLE trend_coins IS '트렌드-코인 관계 테이블 (N:M)';
COMMENT ON COLUMN trend_coins.relevance_score IS '트렌드와 코인의 연관도 점수 (0-100)';
```

---

### 3.9 api_keys - 사용자별 API 키

```sql
CREATE TABLE api_keys (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  x_api_key_encrypted TEXT,
  kaito_api_key_encrypted TEXT,
  encryption_iv TEXT,
  total_requests INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 인덱스
CREATE INDEX idx_api_keys_last_used ON api_keys(last_used_at);

-- 코멘트
COMMENT ON TABLE api_keys IS '사용자별 외부 API 키 (AES-256 암호화 저장)';
COMMENT ON COLUMN api_keys.x_api_key_encrypted IS 'X API 키 (암호화됨)';
COMMENT ON COLUMN api_keys.kaito_api_key_encrypted IS 'Kaito API 키 (암호화됨)';
COMMENT ON COLUMN api_keys.encryption_iv IS '암호화 초기화 벡터';
```

---

### 3.10 user_settings - 사용자 설정

```sql
CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  -- 일반 설정
  notifications BOOLEAN DEFAULT TRUE,
  review_before_post BOOLEAN DEFAULT TRUE,
  language VARCHAR(10) DEFAULT 'ko' CHECK (language IN ('ko', 'en')),
  dark_mode BOOLEAN DEFAULT FALSE,
  -- 고급 설정
  auto_retry INTEGER DEFAULT 3 CHECK (auto_retry >= 1 AND auto_retry <= 5),
  api_timeout INTEGER DEFAULT 30 CHECK (api_timeout >= 10 AND api_timeout <= 60),
  debug_mode BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 코멘트
COMMENT ON TABLE user_settings IS '사용자별 일반/고급 설정';
COMMENT ON COLUMN user_settings.notifications IS '알림 수신 여부';
COMMENT ON COLUMN user_settings.review_before_post IS '포스팅 전 수동 검토 필요 여부';
COMMENT ON COLUMN user_settings.auto_retry IS 'API 실패 시 재시도 횟수 (1-5)';
COMMENT ON COLUMN user_settings.api_timeout IS 'API 타임아웃 시간 (초, 10-60)';
```

---

## 4. 초기 데이터 및 제약조건

### 4.1 코인 마스터 데이터 (선택적)

트렌드/포스팅에서 사용되는 코인명을 정규화하려면 별도 `coins` 테이블 생성 고려 가능:

```sql
CREATE TABLE coins (
  code VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  color_hex VARCHAR(7),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 초기 데이터
INSERT INTO coins (code, name, color_hex) VALUES
  ('AI16Z', 'AI16Z', '#FF6B35'),
  ('ELIZA', 'ELIZA', '#A855F7'),
  ('VIRTUAL', 'VIRTUAL', '#10B981'),
  ('PRIME', 'PRIME', '#3B82F6'),
  ('RNDR', 'RNDR', '#6B7280'),
  ('ZEREBRO', 'ZEREBRO', '#8B5CF6');
```

**설계 메모**: 현재 기능정의서에서 코인은 문자열로 직접 저장되므로, 마스터 테이블은 선택적. 향후 코인 메타데이터 관리가 필요하면 추가 권장.

---

### 4.2 자동 updated_at 트리거

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 각 테이블에 트리거 적용
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_connections_updated_at BEFORE UPDATE ON user_connections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON schedules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trends_updated_at BEFORE UPDATE ON trends
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## 5. 통계/집계용 뷰 (선택적)

기능정의서의 STATS 도메인은 주로 집계 쿼리로 처리. 성능 최적화를 위해 Materialized View 고려:

### 5.1 일일 통계 뷰

```sql
CREATE MATERIALIZED VIEW daily_stats AS
SELECT
  user_id,
  date_trunc('day', created_at) AS date,
  COUNT(*) FILTER (WHERE status = 'posted') AS total_posts,
  SUM(actual_revenue) FILTER (WHERE status = 'posted') AS total_revenue,
  AVG(actual_revenue) FILTER (WHERE status = 'posted') AS avg_revenue,
  COUNT(*) FILTER (WHERE status = 'failed') AS failed_posts,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'posted')::NUMERIC / NULLIF(COUNT(*), 0) * 100,
    2
  ) AS success_rate
FROM posts
WHERE deleted_at IS NULL
GROUP BY user_id, date_trunc('day', created_at);

CREATE UNIQUE INDEX idx_daily_stats_user_date ON daily_stats(user_id, date);

-- 주기적 갱신 (예: 매일 자정)
REFRESH MATERIALIZED VIEW CONCURRENTLY daily_stats;
```

### 5.2 코인별 통계 뷰

```sql
CREATE MATERIALIZED VIEW coin_stats AS
SELECT
  user_id,
  coin,
  COUNT(*) AS total_posts,
  SUM(actual_revenue) AS total_revenue,
  AVG(actual_revenue) AS avg_revenue,
  AVG(engagement_score) AS avg_engagement
FROM posts
WHERE deleted_at IS NULL AND status = 'posted'
GROUP BY user_id, coin;

CREATE UNIQUE INDEX idx_coin_stats_user_coin ON coin_stats(user_id, coin);
```

---

## 6. 성능 최적화 가이드

### 6.1 파티셔닝 (대용량 데이터 예상 시)

```sql
-- activity_logs를 월별 파티션으로 분할
CREATE TABLE activity_logs_partitioned (
  LIKE activity_logs INCLUDING ALL
) PARTITION BY RANGE (created_at);

CREATE TABLE activity_logs_2025_12 PARTITION OF activity_logs_partitioned
  FOR VALUES FROM ('2025-12-01') TO ('2026-01-01');

-- 이후 매월 파티션 자동 생성 스크립트 필요
```

### 6.2 인덱스 최적화 전략

- **복합 인덱스**: 자주 함께 조회되는 컬럼 조합 (user_id + status)
- **부분 인덱스**: WHERE 조건 자주 사용되는 경우 (deleted_at IS NULL, active = TRUE)
- **GIN 인덱스**: JSONB 컬럼 검색 (metadata), 전체 텍스트 검색 (content)
- **BRIN 인덱스**: 시계열 데이터 (created_at) - 대용량일 때 고려

### 6.3 쿼리 최적화 팁

```sql
-- 예약 포스팅 조회 (자주 사용되는 쿼리)
EXPLAIN ANALYZE
SELECT * FROM posts
WHERE user_id = :user_id
  AND status IN ('scheduled', 'ready')
  AND deleted_at IS NULL
ORDER BY scheduled_time ASC
LIMIT 20;

-- 인덱스 활용: idx_posts_user_status
```

---

## 7. 보안 고려사항

### 7.1 암호화 필드

- `user_connections.access_token`, `refresh_token` → AES-256 암호화
- `api_keys.x_api_key_encrypted`, `kaito_api_key_encrypted` → AES-256 암호화
- 암호화 키는 환경 변수로 관리, DB에 저장 금지

### 7.2 Row-Level Security (RLS)

```sql
-- 사용자별 데이터 격리
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY posts_user_isolation ON posts
  USING (user_id = current_setting('app.current_user_id')::UUID);

-- 애플리케이션에서 SET app.current_user_id = '<user_id>'; 설정 후 쿼리
```

### 7.3 Soft Delete 정책

- `deleted_at` 컬럼 활용
- 실제 DELETE는 최소화, UPDATE deleted_at = now() 사용
- 주기적 아카이빙 및 물리 삭제는 별도 배치 작업

---

## 8. 마이그레이션 순서

```bash
# 1. 기본 테이블 (의존성 없음)
psql -f 01_create_users.sql
psql -f 02_create_coins.sql  # 선택적

# 2. users 의존 테이블
psql -f 03_create_user_connections.sql
psql -f 04_create_refresh_tokens.sql
psql -f 05_create_api_keys.sql
psql -f 06_create_user_settings.sql
psql -f 07_create_schedules.sql

# 3. schedules 의존 테이블
psql -f 08_create_posts.sql

# 4. posts 의존 테이블
psql -f 09_create_activity_logs.sql

# 5. 독립 테이블
psql -f 10_create_trends.sql
psql -f 11_create_trend_coins.sql

# 6. 트리거 및 뷰
psql -f 12_create_triggers.sql
psql -f 13_create_views.sql
```

---

## 9. 설계 메모 및 확장 가능성

### 9.1 현재 미포함 사항 (기능정의서에 없음)

- **Queue 상태 모니터링 테이블**: BullMQ/Redis로 관리하므로 DB 스키마 불필요
- **WebSocket 세션 관리**: 인메모리 관리, DB 불필요
- **발표 모드 (PRESENT)**: UI 전용 기능, DB 저장 불필요
- **네비게이션 (NAV)**: UI 전용, DB 불필요

### 9.2 향후 확장 고려사항

**알림 시스템 추가 시:**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(50),
  title VARCHAR(200),
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**멀티 테넌시 지원 시:**
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY,
  name VARCHAR(200),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE users ADD COLUMN organization_id UUID REFERENCES organizations(id);
```

**포스팅 템플릿 기능 추가 시:**
```sql
CREATE TABLE post_templates (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(100),
  content_template TEXT,
  coins TEXT[],
  tone VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 10. 테스트 데이터 예시

```sql
-- 테스트 사용자 생성
INSERT INTO users (handle, name, followers, automation_enabled)
VALUES ('crypto_siyeon', '박시연', 18200, TRUE);

-- 테스트 설정 생성
INSERT INTO user_settings (user_id)
SELECT id FROM users WHERE handle = 'crypto_siyeon';

-- 테스트 포스팅 생성
INSERT INTO posts (user_id, content, coin, status, estimated_revenue)
SELECT 
  id,
  'AI16z 프레임워크 미쳤다 ㄷㄷ #AI16z #Eliza #AIAgent',
  'AI16Z',
  'scheduled',
  18.50
FROM users WHERE handle = 'crypto_siyeon';
```

---

## 문서 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 1.0 | 2025.12.03 | 초안 작성, 기능정의서 기반 스키마 설계 완료 | AI Assistant |

---

**총 테이블 수**: 10개 (핵심) + 1개 (선택적 coins) = 11개  
**총 인덱스**: 약 40개  
**Materialized Views**: 2개 (선택적)
