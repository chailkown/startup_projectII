// 대화 저장 테스트

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./supabase-config.json', 'utf8'));

const SUPABASE_URL = config.url;
const SUPABASE_KEY = config.serviceRoleKey;

async function testSave() {
  const data = {
    user_id: 'chailkown',
    question: 'What is this project?',
    answer: 'Fish species identification and length measurement app using React Native',
    context: JSON.stringify({ 
      tech: 'React Native',
      project: 'startup_projectII',
      features: ['species identification via Hugging Face API', 'length measurement via FishSense']
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
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Successfully saved conversation:', result);
    } else {
      console.error('❌ Error:', result);
    }
  } catch (error) {
    console.error('❌ Exception:', error.message);
  }
}

testSave();

