import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// B안: 도메인별 3장 분리 ERD (PPT 16:9)
export function ERD_Detailed() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: 'Slide 1: Users & Authentication Domain', component: <Slide1_UserAuth /> },
    { title: 'Slide 2: Posts, Schedules & Logs Domain', component: <Slide2_PostsSchedule /> },
    { title: 'Slide 3: Trends & Analytics Domain', component: <Slide3_Trends /> },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col">
      {/* Navigation Header */}
      <div className="bg-slate-800 px-6 py-3 flex items-center justify-between border-b border-slate-700">
        <div className="text-white">
          <span className="text-slate-400">Kaito Database ERD</span>
          <span className="mx-3 text-slate-600">•</span>
          <span>{slides[currentSlide].title}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">
            {currentSlide + 1} / {slides.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="p-2 rounded-lg bg-slate-700 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
              className="p-2 rounded-lg bg-slate-700 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 p-8 overflow-auto bg-white">
        {slides[currentSlide].component}
      </div>

      {/* Slide Indicators */}
      <div className="bg-slate-800 px-6 py-3 flex justify-center gap-2 border-t border-slate-700">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentSlide ? 'bg-blue-500 w-8' : 'bg-slate-600 hover:bg-slate-500 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// SLIDE 1: Users & Authentication
function Slide1_UserAuth() {
  return (
    <div className="relative mx-auto" style={{ width: '1600px', height: '800px' }}>
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Users & Authentication Domain</h1>
        <p className="text-sm text-gray-600">Core user management, OAuth connections, API keys, and settings</p>
      </div>

      {/* SVG for relationships */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <marker id="s1-one-to-many" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto">
            <path d="M 2,2 L 10,6 L 2,10" fill="none" stroke="#3B82F6" strokeWidth="2" />
          </marker>
          <marker id="s1-one-to-one" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto">
            <path d="M 2,2 L 2,10 M 10,2 L 10,10" fill="none" stroke="#3B82F6" strokeWidth="2" />
          </marker>
        </defs>

        {/* user_connections -> users */}
        <path d="M 350,200 L 600,330" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#s1-one-to-many)" />
        <text x="475" y="265" className="text-sm fill-blue-600" style={{ fontWeight: 600 }}>1:N</text>
        <text x="430" y="285" className="text-xs fill-red-600" style={{ fontWeight: 600 }}>CASCADE</text>

        {/* refresh_tokens -> users */}
        <path d="M 350,460 L 600,390" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#s1-one-to-many)" />
        <text x="475" y="425" className="text-sm fill-blue-600" style={{ fontWeight: 600 }}>1:N</text>
        <text x="430" y="445" className="text-xs fill-red-600" style={{ fontWeight: 600 }}>CASCADE</text>

        {/* users -> api_keys */}
        <path d="M 900,330 L 1100,200" stroke="#3B82F6" strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#s1-one-to-one)" />
        <text x="1000" y="265" className="text-sm fill-blue-600" style={{ fontWeight: 600 }}>1:1</text>
        <text x="980" y="285" className="text-xs fill-red-600" style={{ fontWeight: 600 }}>CASCADE</text>

        {/* users -> user_settings */}
        <path d="M 900,390 L 1100,460" stroke="#3B82F6" strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#s1-one-to-one)" />
        <text x="1000" y="425" className="text-sm fill-blue-600" style={{ fontWeight: 600 }}>1:1</text>
        <text x="980" y="445" className="text-xs fill-red-600" style={{ fontWeight: 600 }}>CASCADE</text>
      </svg>

      {/* Tables */}
      <div className="absolute" style={{ top: '100px', left: '50px' }}>
        <DetailedERDTable
          name="user_connections"
          color="blue"
          fields={[
            { name: 'id', type: 'UUID', key: 'PK', default: 'gen_random_uuid()' },
            { name: 'user_id', type: 'UUID', key: 'FK', ref: 'users.id', onDelete: 'CASCADE' },
            { name: 'platform', type: 'VARCHAR(20)', default: "'X'" },
            { name: 'external_user_id', type: 'VARCHAR(100)', nullable: true },
            { name: 'access_token', type: 'TEXT', note: 'Encrypted (AES-256)' },
            { name: 'refresh_token', type: 'TEXT', note: 'Encrypted (AES-256)' },
            { name: 'token_expires_at', type: 'TIMESTAMPTZ', nullable: true },
            { name: 'status', type: 'VARCHAR(20)', constraint: "IN ('active','inactive','expired')" },
            { name: 'connected_at', type: 'TIMESTAMPTZ', default: 'now()' },
          ]}
        />
      </div>

      <div className="absolute" style={{ top: '100px', left: '600px' }}>
        <DetailedERDTable
          name="users"
          color="blue"
          highlight={true}
          fields={[
            { name: 'id', type: 'UUID', key: 'PK', default: 'gen_random_uuid()' },
            { name: 'handle', type: 'VARCHAR(50)', unique: true, note: 'X username' },
            { name: 'name', type: 'VARCHAR(100)', nullable: true },
            { name: 'avatar', type: 'TEXT', nullable: true, note: 'Profile image URL' },
            { name: 'followers', type: 'INTEGER', default: '0' },
            { name: 'automation_enabled', type: 'BOOLEAN', default: 'TRUE', note: 'Master ON/OFF' },
            { name: 'created_at', type: 'TIMESTAMPTZ', default: 'now()' },
            { name: 'updated_at', type: 'TIMESTAMPTZ', default: 'now()' },
            { name: 'deleted_at', type: 'TIMESTAMPTZ', nullable: true, note: 'Soft delete' },
          ]}
        />
      </div>

      <div className="absolute" style={{ top: '100px', left: '1100px' }}>
        <DetailedERDTable
          name="api_keys"
          color="blue"
          fields={[
            { name: 'user_id', type: 'UUID', key: 'PK, FK', ref: 'users.id', onDelete: 'CASCADE' },
            { name: 'x_api_key_encrypted', type: 'TEXT', note: 'AES-256' },
            { name: 'kaito_api_key_encrypted', type: 'TEXT', note: 'AES-256' },
            { name: 'encryption_iv', type: 'TEXT', note: 'Initialization Vector' },
            { name: 'total_requests', type: 'INTEGER', default: '0' },
            { name: 'last_used_at', type: 'TIMESTAMPTZ', nullable: true },
            { name: 'updated_at', type: 'TIMESTAMPTZ', default: 'now()' },
          ]}
        />
      </div>

      <div className="absolute" style={{ top: '360px', left: '50px' }}>
        <DetailedERDTable
          name="refresh_tokens"
          color="blue"
          fields={[
            { name: 'id', type: 'UUID', key: 'PK', default: 'gen_random_uuid()' },
            { name: 'user_id', type: 'UUID', key: 'FK', ref: 'users.id', onDelete: 'CASCADE' },
            { name: 'token_hash', type: 'VARCHAR(64)', unique: true, note: 'SHA-256 hash' },
            { name: 'expires_at', type: 'TIMESTAMPTZ' },
            { name: 'revoked', type: 'BOOLEAN', default: 'FALSE' },
            { name: 'created_at', type: 'TIMESTAMPTZ', default: 'now()' },
          ]}
        />
      </div>

      <div className="absolute" style={{ top: '360px', left: '1100px' }}>
        <DetailedERDTable
          name="user_settings"
          color="blue"
          fields={[
            { name: 'user_id', type: 'UUID', key: 'PK, FK', ref: 'users.id', onDelete: 'CASCADE' },
            { name: 'notifications', type: 'BOOLEAN', default: 'TRUE' },
            { name: 'review_before_post', type: 'BOOLEAN', default: 'TRUE' },
            { name: 'language', type: 'VARCHAR(10)', default: "'ko'", constraint: "IN ('ko','en')" },
            { name: 'dark_mode', type: 'BOOLEAN', default: 'FALSE' },
            { name: 'auto_retry', type: 'INTEGER', default: '3', constraint: 'BETWEEN 1 AND 5' },
            { name: 'api_timeout', type: 'INTEGER', default: '30', constraint: 'BETWEEN 10 AND 60' },
            { name: 'debug_mode', type: 'BOOLEAN', default: 'FALSE' },
          ]}
        />
      </div>

      {/* Summary Box */}
      <div className="absolute" style={{ bottom: '20px', left: '50px', right: '50px' }}>
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="text-blue-900 mb-2" style={{ fontWeight: 600 }}>Indexes:</div>
              <ul className="space-y-1 text-blue-800">
                <li>• idx_users_handle (UNIQUE)</li>
                <li>• idx_users_automation</li>
                <li>• idx_refresh_tokens_hash (UNIQUE)</li>
                <li>• idx_user_connections_user_id</li>
              </ul>
            </div>
            <div>
              <div className="text-blue-900 mb-2" style={{ fontWeight: 600 }}>Security:</div>
              <ul className="space-y-1 text-blue-800">
                <li>• AES-256 encryption for API keys</li>
                <li>• SHA-256 hashing for tokens</li>
                <li>• Soft delete support (deleted_at)</li>
                <li>• Row-level security ready</li>
              </ul>
            </div>
            <div>
              <div className="text-blue-900 mb-2" style={{ fontWeight: 600 }}>Deletion Policies:</div>
              <ul className="space-y-1 text-blue-800">
                <li>• All FKs: ON DELETE CASCADE</li>
                <li>• Users deleted → all data deleted</li>
                <li>• Soft delete for audit trail</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// SLIDE 2: Posts, Schedules & Logs
function Slide2_PostsSchedule() {
  return (
    <div className="relative mx-auto" style={{ width: '1600px', height: '800px' }}>
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Posts, Schedules & Activity Logs Domain</h1>
        <p className="text-sm text-gray-600">Content creation workflow, automation rules, and activity tracking</p>
      </div>

      {/* SVG for relationships */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <marker id="s2-one-to-many" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto">
            <path d="M 2,2 L 10,6 L 2,10" fill="none" stroke="#A855F7" strokeWidth="2" />
          </marker>
        </defs>

        {/* users (implied top) -> schedules */}
        <path d="M 250,100 L 250,180" stroke="#A855F7" strokeWidth="3" markerEnd="url(#s2-one-to-many)" />
        <text x="260" y="140" className="text-sm fill-purple-600" style={{ fontWeight: 600 }}>users 1:N</text>
        <text x="280" y="160" className="text-xs fill-red-600" style={{ fontWeight: 600 }}>CASCADE</text>

        {/* users (implied top) -> posts */}
        <path d="M 800,100 L 800,180" stroke="#A855F7" strokeWidth="3" markerEnd="url(#s2-one-to-many)" />
        <text x="810" y="140" className="text-sm fill-purple-600" style={{ fontWeight: 600 }}>users 1:N</text>
        <text x="830" y="160" className="text-xs fill-red-600" style={{ fontWeight: 600 }}>CASCADE</text>

        {/* users (implied top) -> activity_logs */}
        <path d="M 1350,100 L 1350,180" stroke="#A855F7" strokeWidth="3" markerEnd="url(#s2-one-to-many)" />
        <text x="1360" y="140" className="text-sm fill-purple-600" style={{ fontWeight: 600 }}>users 1:N</text>
        <text x="1380" y="160" className="text-xs fill-red-600" style={{ fontWeight: 600 }}>CASCADE</text>

        {/* schedules -> posts */}
        <path d="M 500,350 L 600,350" stroke="#A855F7" strokeWidth="3" markerEnd="url(#s2-one-to-many)" />
        <text x="530" y="340" className="text-sm fill-purple-600" style={{ fontWeight: 600 }}>1:N</text>
        <text x="520" y="360" className="text-xs fill-gray-600" style={{ fontWeight: 600 }}>SET NULL</text>

        {/* posts -> activity_logs */}
        <path d="M 1050,350 L 1150,350" stroke="#A855F7" strokeWidth="3" markerEnd="url(#s2-one-to-many)" />
        <text x="1080" y="340" className="text-sm fill-purple-600" style={{ fontWeight: 600 }}>1:N</text>
        <text x="1070" y="360" className="text-xs fill-gray-600" style={{ fontWeight: 600 }}>SET NULL</text>
      </svg>

      {/* "users" reference boxes */}
      <div className="absolute" style={{ top: '20px', left: '150px' }}>
        <div className="bg-blue-100 border-2 border-blue-400 rounded-lg px-4 py-2 text-sm text-blue-900" style={{ fontWeight: 600 }}>
          users.id
        </div>
      </div>
      <div className="absolute" style={{ top: '20px', left: '700px' }}>
        <div className="bg-blue-100 border-2 border-blue-400 rounded-lg px-4 py-2 text-sm text-blue-900" style={{ fontWeight: 600 }}>
          users.id
        </div>
      </div>
      <div className="absolute" style={{ top: '20px', left: '1250px' }}>
        <div className="bg-blue-100 border-2 border-blue-400 rounded-lg px-4 py-2 text-sm text-blue-900" style={{ fontWeight: 600 }}>
          users.id
        </div>
      </div>

      {/* Tables */}
      <div className="absolute" style={{ top: '180px', left: '50px' }}>
        <DetailedERDTable
          name="schedules"
          color="purple"
          fields={[
            { name: 'id', type: 'UUID', key: 'PK', default: 'gen_random_uuid()' },
            { name: 'user_id', type: 'UUID', key: 'FK', ref: 'users.id', onDelete: 'CASCADE' },
            { name: 'name', type: 'VARCHAR(100)', note: 'Rule name' },
            { name: 'time', type: 'VARCHAR(10)', note: 'HH:MM or "24h"' },
            { name: 'frequency', type: 'VARCHAR(50)', note: 'daily/hourly/event-based' },
            { name: 'coins', type: 'TEXT[]', constraint: 'array_length() >= 1' },
            { name: 'tone', type: 'VARCHAR(50)', note: 'aggressive/humorous/neutral' },
            { name: 'ai_enabled', type: 'BOOLEAN', default: 'TRUE' },
            { name: 'active', type: 'BOOLEAN', default: 'TRUE' },
            { name: 'last_triggered_at', type: 'TIMESTAMPTZ', nullable: true },
            { name: 'total_posts_generated', type: 'INTEGER', default: '0' },
            { name: 'created_at', type: 'TIMESTAMPTZ', default: 'now()' },
          ]}
        />
      </div>

      <div className="absolute" style={{ top: '180px', left: '600px' }}>
        <DetailedERDTable
          name="posts"
          color="purple"
          fields={[
            { name: 'id', type: 'UUID', key: 'PK', default: 'gen_random_uuid()' },
            { name: 'user_id', type: 'UUID', key: 'FK', ref: 'users.id', onDelete: 'CASCADE' },
            { name: 'schedule_id', type: 'UUID', key: 'FK', ref: 'schedules.id', onDelete: 'SET NULL', nullable: true },
            { name: 'content', type: 'TEXT', constraint: 'length <= 280' },
            { name: 'coin', type: 'VARCHAR(20)', note: 'AI16Z, ELIZA, etc.' },
            { name: 'image_url', type: 'TEXT', nullable: true },
            { name: 'scheduled_time', type: 'TIMESTAMPTZ', nullable: true },
            { name: 'status', type: 'VARCHAR(20)', constraint: "IN ('scheduled','ready','posting','posted','failed')" },
            { name: 'twitter_url', type: 'TEXT', nullable: true, note: 'After publish' },
            { name: 'estimated_revenue', type: 'NUMERIC(10,2)', nullable: true },
            { name: 'actual_revenue', type: 'NUMERIC(10,2)', nullable: true },
            { name: 'engagement_score', type: 'INTEGER', nullable: true },
            { name: 'retry_count', type: 'INTEGER', default: '0', constraint: '<= 3' },
            { name: 'error_message', type: 'TEXT', nullable: true },
            { name: 'published_at', type: 'TIMESTAMPTZ', nullable: true },
            { name: 'created_at', type: 'TIMESTAMPTZ', default: 'now()' },
          ]}
        />
      </div>

      <div className="absolute" style={{ top: '180px', left: '1150px' }}>
        <DetailedERDTable
          name="activity_logs"
          color="purple"
          fields={[
            { name: 'id', type: 'UUID', key: 'PK', default: 'gen_random_uuid()' },
            { name: 'user_id', type: 'UUID', key: 'FK', ref: 'users.id', onDelete: 'CASCADE' },
            { name: 'post_id', type: 'UUID', key: 'FK', ref: 'posts.id', onDelete: 'SET NULL', nullable: true },
            { name: 'type', type: 'VARCHAR(20)', constraint: "IN ('success','error','info')" },
            { name: 'title', type: 'VARCHAR(200)' },
            { name: 'content', type: 'TEXT', nullable: true },
            { name: 'coin', type: 'VARCHAR(20)', nullable: true },
            { name: 'revenue', type: 'NUMERIC(10,2)', nullable: true },
            { name: 'error_message', type: 'TEXT', nullable: true },
            { name: 'metadata', type: 'JSONB', nullable: true, note: 'Extra data' },
            { name: 'created_at', type: 'TIMESTAMPTZ', default: 'now()' },
          ]}
        />
      </div>

      {/* Workflow Box */}
      <div className="absolute" style={{ bottom: '20px', left: '50px', right: '50px' }}>
        <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <div className="text-purple-900 mb-2" style={{ fontWeight: 600 }}>Workflow:</div>
              <div className="space-y-1 text-purple-800">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-[10px]">1</span>
                  <span>Schedule triggers at specified time</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-[10px]">2</span>
                  <span>AI generates post content (if ai_enabled)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-[10px]">3</span>
                  <span>Post queued via BullMQ and published to X</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-[10px]">4</span>
                  <span>Activity log created with success/error result</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-purple-900 mb-2" style={{ fontWeight: 600 }}>Key Features:</div>
              <ul className="space-y-1 text-purple-800">
                <li>• Retry logic: Max 3 attempts on failure</li>
                <li>• ON DELETE SET NULL: Logs/posts preserved when schedule deleted</li>
                <li>• Full-text search: GIN index on activity_logs.content</li>
                <li>• WebSocket updates: Real-time status changes</li>
                <li>• Revenue tracking: Estimated vs actual comparison</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// SLIDE 3: Trends
function Slide3_Trends() {
  return (
    <div className="relative mx-auto" style={{ width: '1600px', height: '800px' }}>
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Trends & Analytics Domain</h1>
        <p className="text-sm text-gray-600">Real-time trend tracking, coin analysis, and N:M relationships</p>
      </div>

      {/* SVG for relationships */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <marker id="s3-one-to-many" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto">
            <path d="M 2,2 L 10,6 L 2,10" fill="none" stroke="#10B981" strokeWidth="2" />
          </marker>
        </defs>

        {/* trends -> trend_coins (1:N) */}
        <path d="M 550,350 L 800,350" stroke="#10B981" strokeWidth="3" markerEnd="url(#s3-one-to-many)" />
        <text x="675" y="340" className="text-sm fill-emerald-600" style={{ fontWeight: 600 }}>1:N</text>
        <text x="650" y="360" className="text-xs fill-red-600" style={{ fontWeight: 600 }}>CASCADE</text>
      </svg>

      {/* Tables */}
      <div className="absolute" style={{ top: '180px', left: '100px' }}>
        <DetailedERDTable
          name="trends"
          color="green"
          fields={[
            { name: 'id', type: 'UUID', key: 'PK', default: 'gen_random_uuid()' },
            { name: 'tag', type: 'VARCHAR(100)', note: 'Hashtag or topic' },
            { name: 'score', type: 'INTEGER', constraint: 'BETWEEN 0 AND 100', note: 'Popularity score' },
            { name: 'impact', type: 'VARCHAR(20)', default: "'medium'", constraint: "IN ('high','medium','low')" },
            { name: 'source', type: 'VARCHAR(50)', default: "'kaito'", constraint: "IN ('kaito','x','internal')" },
            { name: 'metadata', type: 'JSONB', nullable: true, note: 'Extra analytics data' },
            { name: 'created_at', type: 'TIMESTAMPTZ', default: 'now()' },
            { name: 'updated_at', type: 'TIMESTAMPTZ', default: 'now()' },
          ]}
        />
      </div>

      <div className="absolute" style={{ top: '180px', left: '800px' }}>
        <DetailedERDTable
          name="trend_coins"
          color="green"
          fields={[
            { name: 'trend_id', type: 'UUID', key: 'PK, FK', ref: 'trends.id', onDelete: 'CASCADE' },
            { name: 'coin', type: 'VARCHAR(20)', key: 'PK', note: 'AI16Z, ELIZA, VIRTUAL, etc.' },
            { name: 'relevance_score', type: 'NUMERIC(5,2)', default: '0.00', constraint: 'BETWEEN 0 AND 100' },
            { name: 'created_at', type: 'TIMESTAMPTZ', default: 'now()' },
          ]}
        />
      </div>

      {/* N:M Explanation */}
      <div className="absolute" style={{ top: '500px', left: '100px', right: '100px' }}>
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-6">
          <h2 className="text-emerald-900 mb-4" style={{ fontWeight: 600 }}>N:M Relationship Pattern</h2>
          <div className="grid grid-cols-2 gap-6 text-sm text-emerald-800">
            <div>
              <div className="mb-2" style={{ fontWeight: 600 }}>Junction Table (trend_coins):</div>
              <ul className="space-y-1">
                <li>• Composite Primary Key: (trend_id, coin)</li>
                <li>• Enables many-to-many mapping between trends and coins</li>
                <li>• One trend can relate to multiple coins</li>
                <li>• One coin can appear in multiple trends</li>
                <li>• Relevance score quantifies the relationship strength</li>
              </ul>
            </div>
            <div>
              <div className="mb-2" style={{ fontWeight: 600 }}>Example:</div>
              <div className="bg-white border border-emerald-200 rounded p-3 text-xs">
                <div className="mb-2"><strong>Trend:</strong> "#AIRevolution"</div>
                <div className="space-y-1">
                  <div>→ AI16Z (relevance: 95.5)</div>
                  <div>→ ELIZA (relevance: 88.2)</div>
                  <div>→ VIRTUAL (relevance: 76.8)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Info */}
      <div className="absolute" style={{ bottom: '20px', left: '100px', right: '100px' }}>
        <div className="bg-slate-50 border-2 border-slate-300 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-6 text-xs">
            <div>
              <div className="text-slate-900 mb-2" style={{ fontWeight: 600 }}>Indexes:</div>
              <ul className="space-y-1 text-slate-700">
                <li>• idx_trends_tag (B-tree)</li>
                <li>• idx_trends_score DESC</li>
                <li>• idx_trends_created_at DESC</li>
                <li>• idx_trend_coins_coin</li>
                <li>• UNIQUE (tag, date_trunc('day', created_at))</li>
              </ul>
            </div>
            <div>
              <div className="text-slate-900 mb-2" style={{ fontWeight: 600 }}>Materialized Views:</div>
              <ul className="space-y-1 text-slate-700">
                <li>• daily_stats (revenue, posts per user/day)</li>
                <li>• coin_stats (performance by coin)</li>
                <li>• Refreshed daily at midnight (cron)</li>
              </ul>
            </div>
            <div>
              <div className="text-slate-900 mb-2" style={{ fontWeight: 600 }}>External APIs:</div>
              <ul className="space-y-1 text-slate-700">
                <li>• Kaito API: Trend fetching (5min cache)</li>
                <li>• X API: Engagement metrics</li>
                <li>• OpenAI GPT-4: Content generation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Detailed ERD Table Component
interface Field {
  name: string;
  type: string;
  key?: string;
  ref?: string;
  onDelete?: string;
  unique?: boolean;
  nullable?: boolean;
  default?: string;
  constraint?: string;
  note?: string;
}

interface DetailedERDTableProps {
  name: string;
  color: 'blue' | 'purple' | 'green';
  fields: Field[];
  highlight?: boolean;
}

function DetailedERDTable({ name, color, fields, highlight }: DetailedERDTableProps) {
  const colorMap = {
    blue: {
      header: highlight ? 'bg-blue-600' : 'bg-blue-500',
      border: highlight ? 'border-blue-600' : 'border-blue-400',
      bg: 'bg-blue-50',
    },
    purple: {
      header: 'bg-purple-500',
      border: 'border-purple-400',
      bg: 'bg-purple-50',
    },
    green: {
      header: 'bg-emerald-500',
      border: 'border-emerald-400',
      bg: 'bg-emerald-50',
    },
  };

  const colors = colorMap[color];

  return (
    <div 
      className={`bg-white border-2 ${colors.border} rounded-lg shadow-xl overflow-hidden ${highlight ? 'ring-4 ring-blue-400' : ''}`}
      style={{ width: '340px', position: 'relative', zIndex: 10 }}
    >
      {/* Table Header */}
      <div className={`${colors.header} px-4 py-3 text-white`}>
        <div style={{ fontWeight: 600, fontSize: '16px' }}>{name}</div>
      </div>

      {/* Table Fields */}
      <div className={`${colors.bg} p-3`}>
        <div className="space-y-2">
          {fields.map((field, idx) => (
            <div 
              key={idx} 
              className="border-b border-gray-200 last:border-0 pb-2 last:pb-0"
            >
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 mt-0.5">
                  {field.key?.includes('PK') && <span className="text-blue-600 text-sm">🔑</span>}
                  {field.key?.includes('FK') && !field.key.includes('PK') && <span className="text-orange-600 text-sm">🔗</span>}
                  {!field.key && <span className="w-4"></span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>
                      {field.name}
                    </span>
                    {field.unique && <span className="text-[9px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">UNIQUE</span>}
                    {field.nullable && <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">NULL</span>}
                  </div>
                  <div className="text-gray-600 text-xs mt-0.5">{field.type}</div>
                  {field.ref && (
                    <div className="text-orange-600 text-[10px] mt-0.5 flex items-center gap-1">
                      → {field.ref}
                      {field.onDelete && (
                        <span className={`px-1.5 py-0.5 rounded ${field.onDelete === 'CASCADE' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                          {field.onDelete}
                        </span>
                      )}
                    </div>
                  )}
                  {field.default && (
                    <div className="text-slate-500 text-[10px] mt-0.5">default: {field.default}</div>
                  )}
                  {field.constraint && (
                    <div className="text-blue-600 text-[10px] mt-0.5">CHECK: {field.constraint}</div>
                  )}
                  {field.note && (
                    <div className="text-slate-400 text-[10px] mt-0.5 italic">// {field.note}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ERD_Detailed;
