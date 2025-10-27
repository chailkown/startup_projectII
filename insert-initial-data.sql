-- 초기 데이터 삽입

-- 사용자 정보
INSERT INTO users (id, username, email) 
VALUES ('chailkown', 'chailkown', 'luck444u@naver.com')
ON CONFLICT (id) DO NOTHING;

-- 테스트 대화 데이터
INSERT INTO conversations (user_id, question, answer, context) VALUES
('chailkown', 'What is this project?', 'Fish species identification and length measurement app using React Native', '{"tech": "React Native", "project": "startup_projectII"}'),
('chailkown', 'What APIs will we use?', 'Hugging Face API for image classification and FishSense open source for length measurement', '{"apis": ["Hugging Face", "FishSense"]}'),
('chailkown', 'What is the goal?', 'Create an Android APK for fish species identification and measurement', '{"goal": "Android APK"}'),
('chailkown', 'What technologies are installed?', 'Node.js v25.0.0, npm v11.6.2, Supabase CLI v2.53.6, Git', '{"installed": ["Node.js", "npm", "Supabase CLI", "Git"]}'),
('chailkown', 'Where is the GitHub repository?', 'https://github.com/chailkown/startup_projectII', '{"repo": "startup_projectII"}')
ON CONFLICT DO NOTHING;

