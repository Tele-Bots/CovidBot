const { prepareStatsCompactAnswer } = require('./../utils/prepareAnswer')

function all(body, bot, chatId) {
    let data = prepareStatsCompactAnswer(body, index = 0, 'Total Cases in India')
    return bot.sendMessage(chatId, data, {
        parse_mode: 'HTML'
    })
}

module.exports = {
    all
}