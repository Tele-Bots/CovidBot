function prepareError(bot, chatId) {
    bot.sendMessage(chatId,
        `Oops ! I am too dumb to understand that. Just send the statename or statecode.\n` +
        `Or try one of these:\n` +
        `/all - all india stats with top 15 states.\n` +
        `/daily - daily new cases for past 5 days.\n` +
        `test statename - get Covid19 test labs from the states.\n` +
        `daily N - daily new cases for past N days.`, {
        parse_mode: 'HTML'
    })
}

module.exports = {
    prepareError
}