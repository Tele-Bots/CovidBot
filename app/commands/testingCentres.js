const request = require('request')
const prepareAnswer = require('./../utils/prepareAnswer')
const { prepareError } = require('./../utils/prepareError')
const resourcesUrl = 'https://api.covid19india.org/resources/resources.json'
let options = { json: true }

const TESTING_RESOURCE_CATEGORY = "CoVID-19 Testing Lab"

function testingCentres(body, bot, chatId, stateUserMessage) {
      request(resourcesUrl, options, (error, res, resourcesBody) => {
            if (error) {
                  return console.log(error)
            }

            if (!error && res.statusCode == 200) {
                  var statewise = body['statewise']
                  var stateName
                  statewise.every(state => {
                        if (state['state'].toLowerCase() == stateUserMessage.toLowerCase() ||
                              state['statecode'].toLowerCase() == stateUserMessage.toLowerCase()) {
                              stateName = state['state']
                              return false
                        } else {
                              return true
                        }
                  })

                  if (stateName == undefined) {
                        prepareError(bot, chatId)
                  }

                  var stateResources = resourcesBody['resources'].filter(resource =>
                        resource.state == stateName
                        && resource.category == TESTING_RESOURCE_CATEGORY
                  )

                  var data = prepareAnswer.prepareTestingResourceAnswer(stateResources)

                  return bot.sendMessage(chatId, data, {
                        parse_mode: 'HTML',
                        disable_web_page_preview: true
                  })
            }
      })
}

module.exports = {
      testingCentres
}