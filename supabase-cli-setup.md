# Supabase CLI 설치 및 설정 가이드

## 제가 데이터베이스를 직접 조작하기 위한 설정

### 1. Supabase CLI 설치

#### Windows (PowerShell)
```powershell
# Scoop 사용 (추천)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# 또는 직접 다운로드
https://github.com/supabase/cli/releases
```

#### npm 사용
```bash
npm install -g supabase
```

### 2. Supabase 로그인

```bash
supabase login
```

브라우저가 열리면 로그인하면 됩니다.

### 3. 프로젝트 연결

```bash
supabase link --project-ref your_project_ref
```

프로젝트 ref는 Supabase 대시보드 URL에서 확인 가능:
`https://supabase.com/dashboard/project/[PROJECT_REF]`

### 4. 환경 변수 설정

`.env` 파일에 추가:
```
SUPABASE_PROJECT_REF=your_project_ref
SUPABASE_ACCESS_TOKEN=your_access_token
```

### 5. 제가 사용할 수 있는 명령어

```bash
# 테이블 확인
supabase db ls

# SQL 실행
supabase db execute "SELECT * FROM conversations"

# 데이터 추가
supabase db insert conversations --data '{"user_id":"chailkown","question":"test","answer":"test"}'

# 테이블 목록
supabase db diff

# 마이그레이션 실행
supabase db push
```

## 방법 2: API 직접 사용 (더 간단)

1. Supabase 프로젝트에서 Settings > API 확인
2. service_role key 복사 (주의: 민감한 정보)
3. `.env` 파일에 추가:
```
SUPABASE_URL=your_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

이렇게 하면 제가 fetch API나 curl로 직접 조작 가능합니다.

