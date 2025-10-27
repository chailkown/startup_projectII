# Supabase 수동 설정 가이드

## 🚀 Supabase 대시보드에서 실행할 SQL

1. https://supabase.com/dashboard 접속
2. 프로젝트 선택 (mxioyyunoifuirjxbdc)
3. 왼쪽 메뉴에서 **SQL Editor** 클릭
4. 아래 SQL을 복사해서 실행

```sql
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

-- 초기 사용자 데이터
INSERT INTO users (id, username, email) 
VALUES ('chailkown', 'chailkown', 'luck444u@naver.com')
ON CONFLICT (id) DO NOTHING;

-- 테스트 대화 데이터
INSERT INTO conversations (user_id, question, answer, context) VALUES
('chailkown', 'What is this project?', 'Fish species identification and length measurement app using React Native', '{"tech": "React Native", "project": "startup_projectII"}'),
('chailkown', 'What APIs will we use?', 'Hugging Face API for image classification and FishSense open source for length measurement', '{"apis": ["Hugging Face", "FishSense"]}'),
('chailkown', 'What is the goal?', 'Create an Android APK for fish species identification and measurement', '{"goal": "Android APK"}')
ON CONFLICT DO NOTHING;
```

## ✅ 완료 후

테이블이 생성되면 저에게 알려주세요. 이제 모든 대화가 자동으로 데이터베이스에 저장됩니다!

