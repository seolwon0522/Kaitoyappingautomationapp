import React from 'react';

// A안: 한 장으로 완성된 ERD (PPT 16:9)
export function ERD_Diagram() {
  return (
    <div className="w-full h-screen bg-white p-8 overflow-auto">
      <div className="relative mx-auto" style={{ width: '1600px', height: '900px' }}>
        {/* Title */}
        <div className="absolute top-0 left-0 right-0">
          <h1 className="text-gray-900 mb-1">Kaito 야핑 자동화 시스템 - Database ERD</h1>
          <p className="text-sm text-gray-600">PostgreSQL 14+ • 10 Tables • Complete Schema</p>
        </div>

        {/* SVG Canvas for relationships */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <defs>
            {/* Arrow markers for different relationships */}
            <marker id="one-to-many" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto">
              <path d="M 2,2 L 10,6 L 2,10" fill="none" stroke="#64748B" strokeWidth="2" />
            </marker>
            <marker id="one-to-one" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto">
              <path d="M 2,2 L 2,10 M 10,2 L 10,10" fill="none" stroke="#64748B" strokeWidth="2" />
            </marker>
          </defs>

          {/* Top Row: users -> user_connections (1:N) */}
          <path d="M 250,200 L 700,200" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#one-to-many)" />
          <text x="475" y="190" className="text-xs fill-blue-600">1:N</text>

          {/* Top Row: users -> refresh_tokens (1:N) */}
          <path d="M 250,230 L 700,230" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#one-to-many)" />
          <text x="475" y="220" className="text-xs fill-blue-600">1:N</text>

          {/* Top Row: users -> api_keys (1:1) */}
          <path d="M 1050,200 L 1100,200" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#one-to-one)" />
          <text x="1060" y="190" className="text-xs fill-blue-600">1:1</text>

          {/* Top Row: users -> user_settings (1:1) */}
          <path d="M 1050,230 L 1350,230" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#one-to-one)" />
          <text x="1200" y="220" className="text-xs fill-blue-600">1:1</text>

          {/* users -> schedules (1:N) */}
          <path d="M 800,320 L 300,420" stroke="#A855F7" strokeWidth="2" markerEnd="url(#one-to-many)" />
          <text x="550" y="370" className="text-xs fill-purple-600">1:N</text>

          {/* users -> posts (1:N) */}
          <path d="M 900,320 L 800,420" stroke="#A855F7" strokeWidth="2" markerEnd="url(#one-to-many)" />
          <text x="850" y="370" className="text-xs fill-purple-600">1:N</text>

          {/* users -> activity_logs (1:N) */}
          <path d="M 1000,320 L 1300,420" stroke="#A855F7" strokeWidth="2" markerEnd="url(#one-to-many)" />
          <text x="1150" y="370" className="text-xs fill-purple-600">1:N</text>

          {/* schedules -> posts (1:N) */}
          <path d="M 500,550 L 650,550" stroke="#A855F7" strokeWidth="2" markerEnd="url(#one-to-many)" />
          <text x="575" y="540" className="text-xs fill-purple-600">1:N</text>

          {/* posts -> activity_logs (1:N) */}
          <path d="M 1050,550 L 1100,550" stroke="#A855F7" strokeWidth="2" markerEnd="url(#one-to-many)" />
          <text x="1060" y="540" className="text-xs fill-purple-600">1:N</text>

          {/* trends -> trend_coins (1:N) */}
          <path d="M 550,800 L 850,800" stroke="#10B981" strokeWidth="2" markerEnd="url(#one-to-many)" />
          <text x="700" y="790" className="text-xs fill-emerald-600">1:N</text>
        </svg>

        {/* Tables positioned absolutely */}
        
        {/* TOP ROW - User & Auth Domain */}
        <div className="absolute" style={{ top: '80px', left: '50px' }}>
          <ERDTable
            name="user_connections"
            color="blue"
            fields={[
              { name: 'id', type: 'UUID', key: 'PK' },
              { name: 'user_id', type: 'UUID', key: 'FK', ref: 'users.id' },
              { name: 'platform', type: 'VARCHAR(20)' },
              { name: 'external_user_id', type: 'VARCHAR(100)' },
              { name: 'access_token', type: 'TEXT' },
              { name: 'refresh_token', type: 'TEXT' },
              { name: 'status', type: 'VARCHAR(20)' },
              { name: 'connected_at', type: 'TIMESTAMPTZ' },
            ]}
          />
        </div>

        <div className="absolute" style={{ top: '80px', left: '300px' }}>
          <ERDTable
            name="refresh_tokens"
            color="blue"
            fields={[
              { name: 'id', type: 'UUID', key: 'PK' },
              { name: 'user_id', type: 'UUID', key: 'FK', ref: 'users.id' },
              { name: 'token_hash', type: 'VARCHAR(64)' },
              { name: 'expires_at', type: 'TIMESTAMPTZ' },
              { name: 'revoked', type: 'BOOLEAN' },
              { name: 'created_at', type: 'TIMESTAMPTZ' },
            ]}
          />
        </div>

        <div className="absolute" style={{ top: '60px', left: '700px' }}>
          <ERDTable
            name="users"
            color="blue"
            highlight={true}
            fields={[
              { name: 'id', type: 'UUID', key: 'PK' },
              { name: 'handle', type: 'VARCHAR(50)', note: 'UNIQUE' },
              { name: 'name', type: 'VARCHAR(100)' },
              { name: 'avatar', type: 'TEXT' },
              { name: 'followers', type: 'INTEGER' },
              { name: 'automation_enabled', type: 'BOOLEAN' },
              { name: 'created_at', type: 'TIMESTAMPTZ' },
              { name: 'updated_at', type: 'TIMESTAMPTZ' },
              { name: 'deleted_at', type: 'TIMESTAMPTZ' },
            ]}
          />
        </div>

        <div className="absolute" style={{ top: '80px', left: '1100px' }}>
          <ERDTable
            name="api_keys"
            color="blue"
            fields={[
              { name: 'user_id', type: 'UUID', key: 'PK, FK', ref: 'users.id' },
              { name: 'x_api_key_encrypted', type: 'TEXT' },
              { name: 'kaito_api_key_encrypted', type: 'TEXT' },
              { name: 'encryption_iv', type: 'TEXT' },
              { name: 'total_requests', type: 'INTEGER' },
              { name: 'last_used_at', type: 'TIMESTAMPTZ' },
            ]}
          />
        </div>

        <div className="absolute" style={{ top: '80px', left: '1350px' }}>
          <ERDTable
            name="user_settings"
            color="blue"
            fields={[
              { name: 'user_id', type: 'UUID', key: 'PK, FK', ref: 'users.id' },
              { name: 'notifications', type: 'BOOLEAN' },
              { name: 'review_before_post', type: 'BOOLEAN' },
              { name: 'language', type: 'VARCHAR(10)' },
              { name: 'dark_mode', type: 'BOOLEAN' },
              { name: 'auto_retry', type: 'INTEGER' },
              { name: 'api_timeout', type: 'INTEGER' },
            ]}
          />
        </div>

        {/* MIDDLE ROW - Posts & Schedule Domain */}
        <div className="absolute" style={{ top: '420px', left: '50px' }}>
          <ERDTable
            name="schedules"
            color="purple"
            fields={[
              { name: 'id', type: 'UUID', key: 'PK' },
              { name: 'user_id', type: 'UUID', key: 'FK', ref: 'users.id' },
              { name: 'name', type: 'VARCHAR(100)' },
              { name: 'time', type: 'VARCHAR(10)' },
              { name: 'frequency', type: 'VARCHAR(50)' },
              { name: 'coins', type: 'TEXT[]' },
              { name: 'tone', type: 'VARCHAR(50)' },
              { name: 'ai_enabled', type: 'BOOLEAN' },
              { name: 'active', type: 'BOOLEAN' },
              { name: 'last_triggered_at', type: 'TIMESTAMPTZ' },
            ]}
          />
        </div>

        <div className="absolute" style={{ top: '420px', left: '650px' }}>
          <ERDTable
            name="posts"
            color="purple"
            fields={[
              { name: 'id', type: 'UUID', key: 'PK' },
              { name: 'user_id', type: 'UUID', key: 'FK', ref: 'users.id' },
              { name: 'schedule_id', type: 'UUID', key: 'FK', ref: 'schedules.id' },
              { name: 'content', type: 'TEXT' },
              { name: 'coin', type: 'VARCHAR(20)' },
              { name: 'image_url', type: 'TEXT' },
              { name: 'scheduled_time', type: 'TIMESTAMPTZ' },
              { name: 'status', type: 'VARCHAR(20)' },
              { name: 'twitter_url', type: 'TEXT' },
              { name: 'estimated_revenue', type: 'NUMERIC(10,2)' },
              { name: 'actual_revenue', type: 'NUMERIC(10,2)' },
              { name: 'engagement_score', type: 'INTEGER' },
              { name: 'retry_count', type: 'INTEGER' },
            ]}
          />
        </div>

        <div className="absolute" style={{ top: '420px', left: '1100px' }}>
          <ERDTable
            name="activity_logs"
            color="purple"
            fields={[
              { name: 'id', type: 'UUID', key: 'PK' },
              { name: 'user_id', type: 'UUID', key: 'FK', ref: 'users.id' },
              { name: 'post_id', type: 'UUID', key: 'FK', ref: 'posts.id' },
              { name: 'type', type: 'VARCHAR(20)' },
              { name: 'title', type: 'VARCHAR(200)' },
              { name: 'content', type: 'TEXT' },
              { name: 'coin', type: 'VARCHAR(20)' },
              { name: 'revenue', type: 'NUMERIC(10,2)' },
              { name: 'error_message', type: 'TEXT' },
              { name: 'metadata', type: 'JSONB' },
              { name: 'created_at', type: 'TIMESTAMPTZ' },
            ]}
          />
        </div>

        {/* BOTTOM ROW - Trends Domain */}
        <div className="absolute" style={{ top: '720px', left: '250px' }}>
          <ERDTable
            name="trends"
            color="green"
            fields={[
              { name: 'id', type: 'UUID', key: 'PK' },
              { name: 'tag', type: 'VARCHAR(100)' },
              { name: 'score', type: 'INTEGER' },
              { name: 'impact', type: 'VARCHAR(20)' },
              { name: 'source', type: 'VARCHAR(50)' },
              { name: 'metadata', type: 'JSONB' },
              { name: 'created_at', type: 'TIMESTAMPTZ' },
              { name: 'updated_at', type: 'TIMESTAMPTZ' },
            ]}
          />
        </div>

        <div className="absolute" style={{ top: '720px', left: '850px' }}>
          <ERDTable
            name="trend_coins"
            color="green"
            fields={[
              { name: 'trend_id', type: 'UUID', key: 'PK, FK', ref: 'trends.id' },
              { name: 'coin', type: 'VARCHAR(20)', key: 'PK' },
              { name: 'relevance_score', type: 'NUMERIC(5,2)' },
              { name: 'created_at', type: 'TIMESTAMPTZ' },
            ]}
          />
        </div>

        {/* Legend */}
        <div className="absolute" style={{ top: '720px', right: '50px' }}>
          <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 shadow-lg" style={{ width: '220px' }}>
            <div className="text-sm text-gray-900 mb-3" style={{ fontWeight: 600 }}>Legend</div>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>User & Auth</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span>Posts & Schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                <span>Trends</span>
              </div>
              <div className="h-px bg-gray-300 my-2"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-gray-600"></div>
                <span>1:N Relationship</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-gray-600 border-2 border-dashed"></div>
                <span>1:1 Relationship</span>
              </div>
              <div className="h-px bg-gray-300 my-2"></div>
              <div className="text-[10px] text-gray-600">
                <div>• PK: Primary Key</div>
                <div>• FK: Foreign Key</div>
                <div>• ON DELETE CASCADE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Field {
  name: string;
  type: string;
  key?: string;
  ref?: string;
  note?: string;
}

interface ERDTableProps {
  name: string;
  color: 'blue' | 'purple' | 'green';
  fields: Field[];
  highlight?: boolean;
}

function ERDTable({ name, color, fields, highlight }: ERDTableProps) {
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
      className={`bg-white border-2 ${colors.border} rounded-lg shadow-lg overflow-hidden ${highlight ? 'ring-4 ring-blue-300' : ''}`}
      style={{ width: '240px', position: 'relative', zIndex: 10 }}
    >
      {/* Table Header */}
      <div className={`${colors.header} px-3 py-2 text-white`}>
        <div style={{ fontWeight: 600, fontSize: '14px' }}>{name}</div>
      </div>

      {/* Table Fields */}
      <div className={`${colors.bg} p-2`}>
        {fields.map((field, idx) => (
          <div 
            key={idx} 
            className="flex items-start justify-between py-1 border-b border-gray-200 last:border-0"
            style={{ fontSize: '11px' }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                {field.key?.includes('PK') && <span className="text-blue-600">🔑</span>}
                {field.key?.includes('FK') && !field.key.includes('PK') && <span className="text-orange-600">🔗</span>}
                <span className="text-gray-900 truncate" style={{ fontWeight: 500 }}>
                  {field.name}
                </span>
              </div>
              <div className="text-gray-600 text-[10px] truncate pl-4">{field.type}</div>
              {field.ref && (
                <div className="text-orange-600 text-[9px] truncate pl-4">→ {field.ref}</div>
              )}
              {field.note && (
                <div className="text-gray-500 text-[9px] italic truncate pl-4">{field.note}</div>
              )}
            </div>
            {field.key && (
              <div className="text-[9px] text-gray-500 ml-1 flex-shrink-0">{field.key}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ERD_Diagram;
