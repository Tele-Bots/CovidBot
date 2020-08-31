const prepareAnswer = require('../utils/prepareAnswer');

function dailyDecGraph(body, bot, chatId, n = 10) {
  const data = prepareAnswer.dailyDecStatsGraph(body, n);

  return bot.sendPhoto(chatId, data);
}

module.exports = {
  dailyDecGraph,
};
