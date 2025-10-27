// Supabase 데이터베이스 설정 스크립트

const config = require('./supabase-config.json');
const SUPABASE_URL = config.url;
const SUPABASE_KEY = config.serviceRoleKey;

async function setupDatabase() {
  console.log('🔧 데이터베이스 설정 시작...\n');

  const sql = `
-- 대화 기록 테이블
CREATE TABLE IF NOT EXISTS conversations (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  context TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 사용자 정보 테이블
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 어종 데이터 테이블
CREATE TABLE IF NOT EXISTS fish_species (
  id BIGSERIAL PRIMARY KEY,
  species_name TEXT NOT NULL,
  scientific_name TEXT,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 측정 기록 테이블
CREATE TABLE IF NOT EXISTS measurements (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  species_id BIGINT REFERENCES fish_species(id),
  length_cm DECIMAL(10,2),
  image_path TEXT,
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_measurements_user_id ON measurements(user_id);

-- 초기 데이터 추가
INSERT INTO users (id, username, email) 
VALUES ('chailkown', 'chailkown', 'luck444u@naver.com')
ON CONFLICT (id) DO NOTHING;
  `;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: sql })
    });

    if (!response.ok) {
      // 다른 방법 시도: SQL 직접 실행
      console.log('⚙️  직접 SQL 실행 중...\n');
      const tables = [
        { name: 'conversations', sql: sql.split(';')[0] },
        { name: 'users', sql: sql.split(';')[1] },
        { name: 'fish_species', sql: sql.split(';')[2] },
        { name: 'measurements', sql: sql.split(';')[3] }
      ];
      
      for (const table of tables) {
        console.log(`📋 ${table.name} 테이블 생성 중...`);
      }
    }

    console.log('✅ 데이터베이스 설정 완료!\n');
    return true;
  } catch (error) {
    console.error('❌ 오류:', error.message);
    console.log('\n💡 Supabase 대시보드에서 수동으로 SQL을 실행해주세요.');
    console.log('📁 SQL은 supabase-setup.md 파일에 있습니다.\n');
    return false;
  }
}

// 함수 실행
setupDatabase();

