const prepareAnswer = require('../utils/prepareAnswer');

async function dailyGraph(body, bot, chatId, n = 10) {
  const data = await prepareAnswer.dailyStatsGraph(body, n);

  return bot.sendPhoto(chatId, data);
}

module.exports = {
  dailyGraph,
};
