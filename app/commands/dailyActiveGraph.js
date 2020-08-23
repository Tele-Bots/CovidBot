const prepareAnswer = require('../utils/prepareAnswer');

function dailyActiveGraph(body, bot, chatId, n = 10) {
  const data = prepareAnswer.dailyActiveStatsGraph(body, n);

  return bot.sendPhoto(chatId, data);
}

module.exports = {
  dailyActiveGraph,
};
