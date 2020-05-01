const TelegramBot = require('node-telegram-bot-api')
const request = require('request')
const { start } = require('./commands/start')
const { all } = require('./commands/all')
const { daily } = require('./commands/daily')
const { stateName } = require('./commands/stateName')
const { testingCentres } = require('./commands/testingCentres')

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

        if (!error && res.statusCode == 200 && msg.text != undefined) {
            let userMessage = msg.text.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")

            // `start` command
            // Returns: Welcome message
            if (userMessage == "start")
                return start(bot, chatId)

            // `all` command
            // Returns: All india stats
            if (userMessage == 'all')
                return all(body, bot, chatId)

            // `daily` command
            // Returns: All india daily
            // changes for all 10 days
            if (userMessage == 'daily') {
                return daily(body, bot, chatId)
            }

            const dailyPattern = /daily (\d+)/
            if (dailyPattern.test(userMessage)) {
                const n = dailyPattern.exec(userMessage)[1]
                return daily(body, bot, chatId, n)
            }

            const testingDefaultPattern = /test ([a-zA-Z]+)/
            if (testingDefaultPattern.test(userMessage)) {
                const stateUserMessage = testingDefaultPattern.exec(userMessage)[1]
                return testingCentres(body, bot, chatId, stateUserMessage)
            }

            // `{statename}` or `{stateCode}` command
            // Returns: State wise stats
            return stateName(body, userMessage, bot, chatId)
        }
    })
})
