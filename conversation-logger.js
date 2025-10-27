// 대화 기록을 Supabase에 저장하고 검색하는 스크립트

class ConversationLogger {
  constructor(supabaseUrl, supabaseKey) {
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    this.userId = 'chailkown'; // 사용자 ID
  }

  // 대화 저장
  async saveConversation(question, answer, context = null) {
    try {
      const response = await fetch(`${this.supabaseUrl}/rest/v1/conversations`, {
        method: 'POST',
        headers: {
          'apikey': this.supabaseKey,
          'Authorization': `Bearer ${this.supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          user_id: this.userId,
          question: question,
          answer: answer,
          context: context
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Error saving conversation:', error);
      return null;
    }
  }

  // 대화 검색
  async searchConversations(query, limit = 10) {
    try {
      const response = await fetch(
        `${this.supabaseUrl}/rest/v1/conversations?` +
        `user_id=eq.${this.userId}&order=created_at.desc&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'apikey': this.supabaseKey,
            'Authorization': `Bearer ${this.supabaseKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const conversations = await response.json();
      
      // 쿼리로 필터링 (간단한 검색)
      if (query) {
        return conversations.filter(conv => 
          conv.question.toLowerCase().includes(query.toLowerCase()) ||
          conv.answer.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      return conversations;
    } catch (error) {
      console.error('Error searching conversations:', error);
      return [];
    }
  }

  // 컨텍스트 기반 검색
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

// 사용 예시
/*
const logger = new ConversationLogger(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// 대화 저장
await logger.saveConversation(
  "프로젝트는 무엇인가요?",
  "물고기 어종구분 및 체장 측정 앱입니다.",
  { project: "하지"
```

