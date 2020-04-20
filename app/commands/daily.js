const prepareAnswer = require('./../utils/prepareAnswer')

function daily(body, bot, chatId, n = 5) {
    let data = prepareAnswer.prepareDailyStatsAnswer(body, n)
    return bot.sendMessage(chatId, data, {
        parse_mode: 'HTML'
    })
}

module.exports = {
    daily
}
