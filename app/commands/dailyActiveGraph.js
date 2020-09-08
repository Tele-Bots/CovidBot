const prepareAnswer = require('../utils/prepareAnswer');

async function dailyActiveGraph(body, bot, chatId, n = 10) {
  const data = await prepareAnswer.dailyActiveStatsGraph(body, n);

  return bot.sendPhoto(chatId, data);
}

module.exports = {
  dailyActiveGraph,
};
