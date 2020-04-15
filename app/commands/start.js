function start(bot, chatId) {
    return bot.sendMessage(chatId, 'Welcome to Covid19 Bot. Send me your state ' +
        'code or state name and I will provide you with updated Corona stats.' +
        '\nFor example: \n<i>pb</i> for Punjab\n<i>jk</i> for Jammu and Kashmir etc', {
        parse_mode: 'HTML'
    })
}

module.exports = {
    start
}