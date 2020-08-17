const prepareAnswer = require('../utils/prepareAnswer');

function dailyGraph(body, bot, chatId, n = 10) {
  const data = prepareAnswer.dailyStatsGraph(body, n);

  return bot.sendPhoto(chatId, data);
}

module.exports = {
  dailyGraph,
};
