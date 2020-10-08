const prepareAnswer = require('../utils/prepareAnswer');

async function dailyRecGraph(body, bot, chatId, n = 10) {
  const data = await prepareAnswer.dailyRecStatsGraph(body, n);

  return bot.sendPhoto(chatId, data);
}

module.exports = {
  dailyRecGraph,
};
