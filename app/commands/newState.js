const request = require('request');
const prepareAnswer = require('../utils/prepareAnswer');
const { prepareError } = require('../utils/prepareError');

const resourcesUrl = 'https://api.covid19india.org/state_district_wise.json';
const options = { json: true };

function newDistrictWiseState(body, bot, chatId, stateUserMessage) {
  request(resourcesUrl, options, (error, res, body2) => {
    if (error) {
      return error;
    }

    if (!error && res.statusCode === 200) {
      const { statewise } = body;
      let stateName;
      for (let index = 0; index < statewise.length; index += 1) {
        if (statewise[index].state.toLowerCase() === stateUserMessage.toLowerCase()
                    || statewise[index].statecode.toLowerCase()
                    === stateUserMessage.toLowerCase()) {
          stateName = statewise[index].state;
          break;
        }
      }

      if (stateName === undefined) {
        return prepareError(bot, chatId);
      }

      const data = prepareAnswer.prepareNewDistrictWiseState(body2, stateName);

      return bot.sendMessage(chatId, data, {
        parse_mode: 'HTML',
      });
    }
    return true;
  });
}

module.exports = {
  newDistrictWiseState,
};
