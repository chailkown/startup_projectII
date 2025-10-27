// 대화 저장 테스트

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./supabase-config.json', 'utf8'));

const SUPABASE_URL = config.url;
const SUPABASE_KEY = config.serviceRoleKey;

async function testConversationSave() {
  console.log('🧪 대화 저장 테스트 시작...\n');

  const testData = {
    user_id: 'chailkown',
    question: '테스트: 시스템이 정상 작동하나요?',
    answer: '네! Supabase 연동이 완료되었고 이제 모든 대화가 자동으로 저장됩니다.',
    context: JSON.stringify({ 
      test: true,
      timestamp: new Date().toISOString(),
      system: 'conversation-manager'
    })
  };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/conversations`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ 성공! 대화가 저장되었습니다.');
      console.log('📝 저장된 ID:', result[0].id);
      console.log('💾 데이터:', result[0]);
      return true;
    } else {
      console.error('❌ 오류 발생:', result);
      console.log('상태 코드:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ 예외 발생:', error.message);
    return false;
  }
}

// 실행
testConversationSave().then(success => {
  if (success) {
    console.log('\n🎉 대화 저장 시스템이 정상 작동합니다!');
    console.log('이제 모든 대화가 자동으로 데이터베이스에 저장됩니다.');
  } else {
    console.log('\n⚠️ 테스트 실패 - 추가 설정이 필요할 수 있습니다.');
  }
});

