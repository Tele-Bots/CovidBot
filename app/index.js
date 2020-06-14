const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const ua = require('universal-analytics');
const { start } = require('./commands/start');
const { all } = require('./commands/all');
const { daily } = require('./commands/daily');
const { stateName } = require('./commands/stateName');
const { testingCentres } = require('./commands/testingCentres');
const { newStates } = require('./commands/new');

require('dotenv').config();

const options = { json: true };
const url = 'https://api.covid19india.org/data.json';
const trackingCode = process.env.ANALYTICS_ID;
const visitor = ua(trackingCode);

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

// Listen for any kind of message and reply with the data
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  visitor.event('Message', 'Message').send();
  request(url, options, (error, res, body) => {
    if (error) {
      return error;
    }

    if (!error && res.statusCode === 200 && msg.text !== undefined) {
      const userMessage = msg.text.toLowerCase().replace(/[^a-zA-Z0-9& ]/g, '');

      // `start` command
      // Returns: Welcome message
      if (userMessage === 'start') { return start(bot, chatId); }

      // `all` command
      // Returns: All india stats
      if (userMessage === 'all') { return all(body, bot, chatId); }

      // `daily` command
      // Returns: All india daily
      // changes for all 10 days
      if (userMessage === 'daily') {
        return daily(body, bot, chatId);
      }

      const dailyPattern = /daily (\d+)/;
      if (dailyPattern.test(userMessage)) {
        const n = dailyPattern.exec(userMessage)[1];
        return daily(body, bot, chatId, n);
      }

      const testingDefaultPattern = /test ( ?[a-zA-Z&])+/;
      if (testingDefaultPattern.test(userMessage)) {
        const stateUserMessage = testingDefaultPattern.exec(userMessage)[0].split('test ')[1].replace(' & ', ' and ');
        return testingCentres(body, bot, chatId, stateUserMessage);
      }

      // "new" command
      if (userMessage === 'new') {
        return newStates(body, bot, chatId);
      }

      // `{statename}` or `{stateCode}` command
      // Returns: State wise stats
      return stateName(body, userMessage, bot, chatId);
    }
    return true;
  });
});
