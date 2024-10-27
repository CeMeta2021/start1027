const axios = require('axios');
const cheerio = require('cheerio');
const { extractUrlPrompt } = require('./prompts');

async function extractContent(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // 移除脚本和样式标签
    $('script, style').remove();
    
    // 提取标题和正文内容
    const title = $('title').text().trim();
    const content = $('body').text().trim().replace(/\s+/g, ' ').substring(0, 1000); // 限制内容长度
    
    return `标题: ${title}\n\n内容摘要: ${content}`;
  } catch (error) {
    console.error('URL内容提取失败:', error);
    return '无法提取URL内容。请确保URL是有效的。';
  }
}

async function extractUrlContent(url) {
  const content = await extractContent(url);
  // 使用extractUrlPrompt
  const summary = await llmService.getResponse(content, extractUrlPrompt);
  return summary;
}

module.exports = { extractContent, extractUrlContent };
