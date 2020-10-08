const prepareAnswer = require('../utils/prepareAnswer');

function dailyRecovered(body, bot, chatId, n = 10) {
  const data = prepareAnswer.prepareDailyRecoveredAnswer(body, n);
  return bot.sendMessage(chatId, data, {
    parse_mode: 'HTML',
  });
}

module.exports = {
  dailyRecovered,
};
