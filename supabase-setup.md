# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. https://supabase.com 접속
2. Sign Up / Log In
3. New Project 클릭
4. 프로젝트 정보 입력:
   - Name: fish_app_db
   - Database Password: (안전한 비밀번호 설정)
   - Region: Northeast Asia (Seoul)

## 2. API 키 확인

1. 프로젝트 생성 후 Settings > API 이동
2. 다음 정보 확인:
   - Project URL
   - anon public key
   - service_role key

## 3. 데이터베이스 테이블 생성

SQL Editor에서 다음 쿼리 실행:

```sql
-- 대화 기록 테이블
CREATE TABLE conversations (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  context TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 사용자 정보 테이블
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 어종 데이터 테이블
CREATE TABLE fish_species (
  id BIGSERIAL PRIMARY KEY,
  species_name TEXT NOT NULL,
  scientific_name TEXT,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 측정 기록 테이블
CREATE TABLE measurements (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  species_id BIGINT REFERENCES fish_species(id),
  length_cm DECIMAL(10,2),
  image_path TEXT,
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (검색 성능 향상)
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_created_at ON conversations(created_at);
CREATE INDEX idx_measurements_user_id ON measurements(user_id);
```

## 4. Row Level Security (RLS) 설정

각 테이블에 RLS 정책 추가:

```sql
-- conversations 테이블
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can read their own conversations"
  ON conversations FOR SELECT
  USING (auth.uid()::text = user_id);

-- measurements 테이블
ALTER TABLE measurements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own measurements"
  ON measurements FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can read their own measurements"
  ON measurements FOR SELECT
  USING (auth.uid()::text = user_id);
```

## 5. 환경 변수 설정

.env 파일 생성:

```
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
```

