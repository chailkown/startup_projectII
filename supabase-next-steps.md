# Supabase 설정 완료 ✅

Supabase CLI가 설치되었습니다!

## 다음 단계

### 1. Supabase 프로젝트 생성

1. https://supabase.com 접속
2. "Start your project" 클릭
3. 프로젝트 정보 입력:
   - **Name**: `fish-app-db` (또는 원하는 이름)
   - **Database Password**: (안전한 비밀번호 설정)
   - **Region**: Northeast Asia (Seoul)

### 2. Access Token 발급

1. Supabase 대시보드에서 **Settings > Access Tokens**
2. "Generate new token" 클릭
3. 토큰 이름 지정 (예: `fish-app-dev`)
4. 생성된 토큰 복사

### 3. 프로젝트 연결

아래 명령어를 실행하세요:

```powershell
# Access Token 설정
$env:SUPABASE_ACCESS_TOKEN = "여기에_발급받은_토큰_입력"

# Supabase CLI로 로그인
supabase login --token $env:SUPABASE_ACCESS_TOKEN

# 프로젝트 연결 (프로젝트 ref는 대시보드 URL에서 확인)
supabase link --project-ref your_project_ref
```

### 4. 데이터베이스 테이블 생성

`supabase-setup.md` 파일의 SQL을 실행하세요.

### 5. 완료!

이제 제가 Supabase 데이터베이스를 직접 조작할 수 있습니다!

