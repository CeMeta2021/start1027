const axios = require('axios');

const SILICONFLOW_API_KEY = 'sk-zlkyvbopjnvsukvkldewdysmuvomdqjcrqtyelptwaochctg'; // 替换为您的SiliconFlow API密钥
const SILICONFLOW_API_URL = 'https://api.siliconflow.cn/v1/chat/completions';

async function generateResponse(prompt) {
  try {
    const response = await axios.post(
      SILICONFLOW_API_URL,
      {
        model: 'deepseek-ai/DeepSeek-V2-Chat', // 可以根据需要更换模型
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SILICONFLOW_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('LLM服务调用失败:', error);
    return '抱歉,我现在无法回答您的问题。请稍后再试。';
  }
}

module.exports = { generateResponse };
