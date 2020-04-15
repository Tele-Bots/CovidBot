const { prepareStatsCompactAnswer } = require('./../utils/prepareAnswer')
const { prepareError } = require('./../utils/prepareError')

function stateName(body, userMessage, bot, chatId) {
    // For full state full name and state code, convert the user input into lower case
    let statewise = body['statewise']
    let stateindex
    for (let index = 0; index < statewise.length; index++) {
        let currentdata = statewise[index]
        if (currentdata['state'].toLowerCase() == userMessage || currentdata['statecode'].toLowerCase() == userMessage) {
            stateindex = index
            break
        }
    }

    if (stateindex == undefined)
        return prepareError();

    let statedata = statewise[stateindex]
    let data = prepareStatsCompactAnswer(body, stateindex, statedata['state'])

    // send a message to the chat
    return bot.sendMessage(chatId, data, {
        parse_mode: 'HTML'
    })
}

module.exports = {
    stateName
}