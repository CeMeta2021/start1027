const { generateResponse } = require('./llmService');
const { extractContent } = require('./urlExtractor');
const { replyPrompt } = require('./prompts');

// 配置系统提示词
const SYSTEM_PROMPT = `你是一个友好的AI助手，能够回答各种问题并提供帮助。请用简洁、准确的中文回答。`;

async function handleMessage(message) {
  const content = message.text();
  let response;

  // 检查消息是否是URL
  if (content.startsWith('http://') || content.startsWith('https://')) {
    const extractedContent = await extractContent(content);
    const prompt = `${SYSTEM_PROMPT}\n\n请根据以下提取的网页内容生成一个简短的总结:\n\n${extractedContent}`;
    response = await generateResponse(prompt);
  } else {
    // 如果不是URL，将系统提示词和用户输入组合作为提示词生成回复
    const prompt = `${SYSTEM_PROMPT}\n\n用户: ${content}\n助手:`;
    response = await generateResponse(prompt);
  }

  // 发送回复
  await message.say(response);

  return response;
}

module.exports = { handleMessage };
