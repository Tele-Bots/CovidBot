const prepareAnswer = require('../utils/prepareAnswer');

function dailyDeceased(body, bot, chatId, n = 10) {
  const data = prepareAnswer.prepareDailyDeceasedAnswer(body, n);
  return bot.sendMessage(chatId, data, {
    parse_mode: 'HTML',
  });
}

module.exports = {
  dailyDeceased,
};
