const prepareAnswer = require('../utils/prepareAnswer');

function dailyActive(body, bot, chatId, n = 10) {
  const data = prepareAnswer.prepareDailyActiveAnswer(body, n);
  return bot.sendMessage(chatId, data, {
    parse_mode: 'HTML',
  });
}

module.exports = {
  dailyActive,
};
