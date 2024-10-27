const { WechatyBuilder } = require('wechaty');
const qrcode = require('qrcode-terminal');
const { handleMessage } = require('./messageHandler');

// 设置 Wechaty token
const token = 'your_wechaty_token_here'; // 替换为您的 Wechaty token

// 创建Wechaty实例
const bot = WechatyBuilder.build({
  name: 'wechat-ai-bot',
  puppet: 'wechaty-puppet-wechat4u',
  puppetOptions: {
    uos: true
  }
});

// 处理扫码登录
bot.on('scan', (qrcodeUrl, status) => {
  if (status === 2) {
    console.log('扫描二维码登录:');
    qrcode.generate(qrcodeUrl, { small: true });
  }
});

// 处理登录成功
bot.on('login', (user) => {
  console.log(`用户 ${user} 登录成功`);
});

// 处理收到消息
bot.on('message', async (message) => {
  if (message.self()) return; // 忽略自己发送的消息
  
  // 显示用户发送的消息
  console.log(`用户消息: ${message.text()}`);
  
  // 处理消息并获取LLM的回复
  const reply = await handleMessage(message);
  
  // 显示LLM的回复
  console.log(`LLM回复: ${reply}`);
});

// 启动机器人
bot.start()
  .then(() => console.log('机器人启动成功'))
  .catch((error) => console.error('机器人启动失败:', error));
