const prepareAnswer = require('../utils/prepareAnswer');

function newStates(body, bot, chatId) {
  const data = prepareAnswer.prepareNewTopStatesStat(body);

  return bot.sendMessage(chatId, data, {
    parse_mode: 'HTML',
  });
}

module.exports = {
  newStates,
};
