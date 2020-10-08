const request = require('request');
const prepareAnswer = require('../utils/prepareAnswer');
const { prepareError } = require('../utils/prepareError');

const district = 'https://api.covid19india.org/state_district_wise.json';
const stateTestUrl = 'https://api.covid19india.org/state_test_data.json';
const options = { json: true };

function stateName(body, userMessage, bot, chatId) {
  // For full state full name and state code, convert the user input into lower case

  request(district, options, (error, res, body2) => {
    if (error) {
      return error;
    }

    if (!error && res.statusCode === 200) {
      const { statewise } = body;
      let stateindex;
      for (let index = 0; index < statewise.length; index += 1) {
        const currentdata = statewise[index];
        if (currentdata.state.toLowerCase() === userMessage
          || currentdata.statecode.toLowerCase() === userMessage) {
          stateindex = index;
          break;
        }
      }

      if (stateindex === undefined) return prepareError(bot, chatId);

      bot.sendChatAction(chatId, 'typing');

      request(stateTestUrl, options, (err, response, body3) => {
        if (err) {
          return err;
        }

        if (!err && response.statusCode === 200) {
          const statedata = statewise[stateindex];
          let data = prepareAnswer.prepareStatsCompactAnswer(body, stateindex, statedata.state);
          data += prepareAnswer.prepareStateTestStat(body3, statedata.state);
          data += prepareAnswer.prepareStatsDistrictAnswer(body2, statedata.state);
          // send a message to the chat
          return bot.sendMessage(chatId, data, {
            parse_mode: 'HTML',
            reply_markup: { remove_keyboard: true },
          });
        }
        return true;
      });
    }
    return true;
  });
}

module.exports = {
  stateName,
};
