function prepareError(bot, chatId) {
    bot.sendMessage(chatId,
        'Sorry ! I am not able to understand. Send me your state code or state ' +
        'name and I will provide you with updated Corona stats.\nFor example: \n<i>pb</i> ' +
        'for Punjab\n<i>jk</i> for Jammu and Kashmir etc', {
        parse_mode: 'HTML'
    })
}

module.exports = {
    prepareError
}