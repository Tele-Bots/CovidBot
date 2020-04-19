const prepareAnswer = require('./../utils/prepareAnswer')

function daily(body, bot, chatId) {
    let data = prepareAnswer.prepareDailyStatsAnswer(body)
    return bot.sendMessage(chatId, data, {
        parse_mode: 'HTML'
    })
}

module.exports = {
    daily
}