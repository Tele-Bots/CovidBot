const TelegramBot = require('node-telegram-bot-api')
const request = require('request')
const { start } = require('./commands/start')
const { all } = require('./commands/all')
const { stateName } = require('./commands/stateName')

require('dotenv').config()

let options = { json: true }
const url = 'https://api.covid19india.org/data.json'
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
    polling: true
})

// Listen for any kind of message and reply with the data
bot.on('message', (msg) => {
    const chatId = msg.chat.id

    request(url, options, (error, res, body) => {
        if (error) {
            return console.log(error)
        }

        if (!error && res.statusCode == 200) {
            let userMessage = msg.text.toLowerCase().replace(/[^a-zA-Z ]/g, "")

            // `/start` command
            // Returns: Welcome message
            if (userMessage == "start")
                return start(bot, chatId);


            // `all` command
            // Returns: All india stats
            if (userMessage == 'all')
                return all(body, bot, chatId)

            // `{statename} or {stateCode} command
            // Returns: State wise stats
            return stateName(body, userMessage, bot, chatId)
        }
    })
})