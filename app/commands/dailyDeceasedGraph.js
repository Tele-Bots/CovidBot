const prepareAnswer = require('../utils/prepareAnswer');

async function dailyDecGraph(body, bot, chatId, n = 10) {
  const data = await prepareAnswer.dailyDecStatsGraph(body, n);

  return bot.sendPhoto(chatId, data);
}

module.exports = {
  dailyDecGraph,
};
