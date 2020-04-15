const request = require('request')
const prepareAnswer = require('./../utils/prepareAnswer')
const { prepareError } = require('./../utils/prepareError')
const district = 'https://api.covid19india.org/state_district_wise.json'
let options = { json: true }

function stateName(body, userMessage, bot, chatId) {
    // For full state full name and state code, convert the user input into lower case

    request(district, options, (error, res, body2) => {
        if (error) {
            return console.log(error)
        }

        if (!error && res.statusCode == 200) {
            let statewise = body['statewise']
            let stateindex
            for (let index = 0; index < statewise.length; index++) {
                let currentdata = statewise[index]
                if (currentdata['state'].toLowerCase() == userMessage ||
                    currentdata['statecode'].toLowerCase() == userMessage) {
                    stateindex = index
                    break
                }
            }

            if (stateindex == undefined)
                return prepareError(bot, chatId)

            let statedata = statewise[stateindex]
            let data = prepareAnswer.prepareStatsCompactAnswer(body, stateindex, statedata['state'])
            data += prepareAnswer.prepareStatsDistrictAnswer(body2, statedata['state']);

            // send a message to the chat
            return bot.sendMessage(chatId, data, {
                parse_mode: 'HTML'
            })
        }
    })
}

module.exports = {
    stateName
}