const TelegramBot = require('node-telegram-bot-api')
const request = require('request')
require('dotenv').config()
let options = { json: true }

const url = 'https://api.covid19india.org/data.json'

// replace the value below with the Telegram token
const token = process.env.TELEGRAM_BOT_TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true })

// Listen for any kind of message and reply with the data
bot.on('message', (msg) => {
    const chatId = msg.chat.id


    request(url, options, (error, res, body) => {
        if (error) {
            return console.log(error)
        }

        if (!error && res.statusCode == 200) {
            // For full state full name, convert the user input into lower case and then
            // convert the first letters into capital
            let user_msg_state = msg.text.toLowerCase()
            user_msg_state = user_msg_state.charAt(0).toUpperCase() + user_msg_state.slice(1)
            var splitStr = user_msg_state.toLowerCase().split(' ')
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
            }
            user_msg_state = splitStr.join(' ')

            // For shortcut state just capitalize the user input
            let user_msg = msg.text.toUpperCase()

            let statewise = body['statewise']
            let stateindex
            for (let index = 0; index < statewise.length; index++) {
                let currentdata = statewise[index]
                if (currentdata['state'] == user_msg_state || currentdata['statecode'] == user_msg) {
                    stateindex = index
                    break
                }
            }

            // For first time messages
            if (msg.text == "/start") {
                return bot.sendMessage(chatId, 'Welcome to Covid19 Bot. Send me your state ' +
                    'code or state name and I will provide you with updated Corona stats.' +
                    '\nFor example: \n<i>pb</i> for Punjab\n<i>jk</i> for Jammu and Kashmir etc', {
                    parse_mode: 'HTML'
                })
            }
            if (stateindex == undefined) {
                return bot.sendMessage(chatId,
                    'Sorry ! I am not able to understand. Send me your state code or state ' +
                    'name and I will provide you with updated Corona stats.\nFor example: \n<i>pb</i> ' +
                    'for Punjab\n<i>jk</i> for Jammu and Kashmir etc', {
                    parse_mode: 'HTML'
                })
            }
            let statedata = statewise[stateindex]
            let data = '<b>' + statedata['state'] + '</b>'
            data += "\nConfirmed Cases: " + statedata['confirmed']
            if (parseInt(statedata['deltaconfirmed']) > 0) {
                if (parseInt(statedata['deltaconfirmed']) > 1) {
                    data += '<i> (' + statedata['deltaconfirmed'] + ' new cases)</i>'
                } else {
                    data += '<i> (' + statedata['deltaconfirmed'] + ' new case)</i>'
                }
            }
            data += "\nActive Cases: " + statedata['active']
            data += "\nRecovered: " + statedata['recovered']
            if (parseInt(statedata['deltarecovered']) > 0) {
                if (parseInt(statedata['deltarecovered']) > 1) {
                    data += '<i> (' + statedata['deltarecovered'] + ' new recoveries)</i>'
                } else {
                    data += '<i> (' + statedata['deltaconfirmed'] + ' new recovery)</i>'
                }
            }
            data += "\nDeaths: " + statedata['deaths']
            if (parseInt(statedata['deltadeaths']) > 0) {
                if (parseInt(statedata['deltadeaths']) > 1) {
                    data += '<i> (' + statedata['deltadeaths'] + ' new deaths)</i>'
                } else {
                    data += '<i> (' + statedata['deltadeaths'] + ' new death)</i>'
                }
            }

            // send a message to the chat
            return bot.sendMessage(chatId, data, {
                parse_mode: 'HTML'
            })
        }
    })
})