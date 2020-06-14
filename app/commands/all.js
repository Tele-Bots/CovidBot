const prepareAnswer = require('../utils/prepareAnswer');

function all(body, bot, chatId) {
  let data = prepareAnswer.prepareStatsCompactAnswer(body, 0, 'Total Cases in India');

  data += prepareAnswer.prepareAllIndiaCasesTested(body);

  data += prepareAnswer.prepareStatsStateAnswer(body);

  return bot.sendMessage(chatId, data, {
    parse_mode: 'HTML',
  });
}

module.exports = {
  all,
};
