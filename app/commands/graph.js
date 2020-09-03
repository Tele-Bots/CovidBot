const prepareAnswer = require('../utils/prepareAnswer');

function graph(body, bot, chatId, n = 10) {
  prepareAnswer.summaryGraph(body, n, chatId, bot);

  return true;
}

module.exports = {
  graph,
};
