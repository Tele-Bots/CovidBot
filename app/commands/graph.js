const prepareAnswer = require('../utils/prepareAnswer');

function graph(body, bot, chatId, n = 10) {
  const data = prepareAnswer.summaryGraph(body, n);

  return bot.sendPhoto(chatId, data);
}

module.exports = {
  graph,
};
