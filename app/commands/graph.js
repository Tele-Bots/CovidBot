const prepareAnswer = require('../utils/prepareAnswer');

async function graph(body, bot, chatId, n = 10) {
  const data = await prepareAnswer.summaryGraph(body, n);

  return bot.sendPhoto(chatId, data);;
}

module.exports = {
  graph,
};
