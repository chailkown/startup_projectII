// 대화 기록 관리 시스템

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./supabase-config.json', 'utf8'));

const SUPABASE_URL = config.url;
const SUPABASE_KEY = config.serviceRoleKey;
const USER_ID = 'chailkown';

class ConversationManager {
  
  // 대화 저장
  async saveConversation(question, answer, context = null) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/conversations`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        variant: question,
        answer: answer,
        context: typeof context === 'object' ? JSON.stringify(context) : context
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ 대화 저장 완료:', data[0].id);
      return data[0];
    } else {
      const error = await response.text();
      console.error('❌ 저장 실패:', error);
      return null;
    }
  }

  // 대화 검색
  async searchConversations(searchTerm, limit = 10) {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/conversations?` +
      `user_id=eq.${USER_ID}&order=created_at.desc&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.ok) {
      const conversations = await response.json();
      
      if (searchTerm) {
        return conversations.filter(conv => 
          conv.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          conv.answer?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      return conversations;
    } else {
      console.error('검색 실패:', await response.text());
      return [];
    }
  }

  // 관련 컨텍스트 찾기
  async findRelevantContext(query) {
    const conversations = await this.searchConversations(query, 5);
    
    if (conversations.length > 0) {
      return conversations.map(conv => ({
        question: conv.question,
        answer: conv.answer,
        context: conv.context
      }));
    }
    
    return null;
  }
}

// 모듈 내보내기
module.exports = ConversationManager;

// 직접 실행 시 테스트
if (require.main === module) {
  const manager = new ConversationManager();
  
  // 테스트 대화 저장
  manager.saveConversation(
    '프로젝트는 무엇인가요?',
    '물고기 어종구분 및 체장 측정 앱을 React Native로 개발합니다.',
    { project: 'startup_projectII', tech: 'React Native' }
  ).then(() => {
    console.log('테스트 완료!');
  });
}

