const request = require('request');
const prepareAnswer = require('../utils/prepareAnswer');
const { prepareError } = require('../utils/prepareError');

const resourcesUrl = 'https://api.covid19india.org/resources/resources.json';
const options = { json: true };

const TESTING_RESOURCE_CATEGORY = 'CoVID-19 Testing Lab';

function testingCentres(body, bot, chatId, stateUserMessage) {
  request(resourcesUrl, options, (error, res, resourcesBody) => {
    if (error) {
      return error;
    }

    if (!error && res.statusCode === 200) {
      const { statewise } = body;
      let stateName;
      for (let index = 0; index < statewise.length; index += 1) {
        if (statewise[index].state.toLowerCase() === stateUserMessage.toLowerCase()
          || statewise[index].statecode.toLowerCase() === stateUserMessage.toLowerCase()) {
          stateName = statewise[index].state;
          break;
        }
      }

      if (stateName === undefined) {
        return prepareError(bot, chatId);
      }

      const stateResources = resourcesBody.resources.filter((resource) => resource.state === stateName.replace(' and ', ' & ')
        && resource.category === TESTING_RESOURCE_CATEGORY);

      const data = prepareAnswer.prepareTestingResourceAnswer(stateResources);

      return bot.sendMessage(chatId, data[0], {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }).then(() => {
        if (data[1].length > 0) {
          return bot.sendMessage(chatId, data[1], {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          });
        }
      })
    }
    return true;
  });
}

module.exports = {
  testingCentres,
};
