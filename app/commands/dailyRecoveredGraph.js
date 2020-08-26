const prepareAnswer = require('../utils/prepareAnswer');

function dailyRecGraph(body, bot, chatId, n = 10) {
  const data = prepareAnswer.dailyRecStatsGraph(body, n);

  return bot.sendPhoto(chatId, data);
}

module.exports = {
  dailyRecGraph,
};
