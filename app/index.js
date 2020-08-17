const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const ua = require('universal-analytics');
const { start } = require('./commands/start');
const { all } = require('./commands/all');
const { daily } = require('./commands/daily');
const { dailyActive } = require('./commands/dailyActive');
const { dailyRecovered } = require('./commands/dailyRecovered');
const { stateName } = require('./commands/stateName');
const { testingCentres } = require('./commands/testingCentres');
const { newStates } = require('./commands/new');
const { newDistrictWiseState } = require('./commands/newState');
const { dailyGraph } = require('./commands/dailyGraph');

require('dotenv').config();

const options = { json: true };
const url = 'https://api.covid19india.org/data.json';
const trackingCode = process.env.ANALYTICS_ID;
const visitor = ua(trackingCode);

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

// Main function which recieves the message and acts upon it
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  visitor.event('Message', 'Message').send();
  request(url, options, (error, res, body) => {
    if (error) {
      return error;
    }

    if (!error && res.statusCode === 200 && msg.text !== undefined) {
      let rawUserMessage = msg.text.toLowerCase();
      if (rawUserMessage[0] === '/') { rawUserMessage = rawUserMessage.slice(1); }

      const userMessage = rawUserMessage.replace(/[^a-zA-Z0-9& ]/g, ' ');

      // `start` command
      // Returns: Welcome message
      if (userMessage === 'start') { return start(bot, chatId); }

      // `all` command
      // Returns: All india stats
      if (userMessage === 'all') { return all(body, bot, chatId); }

      // `daily` command
      // Returns: All india daily
      // changes for past 10 days
      if (userMessage === 'daily') { return daily(body, bot, chatId); }

      // `daily active` command
      // Returns: All india daily
      // active changes for past 10 days
      if (userMessage === 'daily active') { return dailyActive(body, bot, chatId); }

      // `daily active` command
      // Returns: All india daily
      // active changes for past 10 days
      if (userMessage === 'daily rec') { return dailyRecovered(body, bot, chatId); }

      // `new` command
      // Returns: All india states
      // with highest cfrmd cases
      if (userMessage === 'new') { return newStates(body, bot, chatId); }

      // `daily active N` command
      // Returns: All india daily
      // active changes for past N days
      const dailyActivePattern = /daily active (\d+)/;
      if (dailyActivePattern.test(userMessage)) {
        const n = dailyActivePattern.exec(userMessage)[1];
        return dailyActive(body, bot, chatId, n);
      }

      // `daily N` command
      // Returns: All india daily
      // changes for past N days
      const dailyPattern = /daily (\d+)/;
      if (dailyPattern.test(userMessage)) {
        const n = dailyPattern.exec(userMessage)[1];
        return daily(body, bot, chatId, n);
      }

      // `test State` command
      // Returns: Get the test centers
      // for the give State
      const statePattern = /test ( ?[a-zA-Z&])+/;
      if (statePattern.test(userMessage)) {
        const stateUserMessage = statePattern.exec(userMessage)[0].split('test ')[1].replace(' & ', ' and ');
        return testingCentres(body, bot, chatId, stateUserMessage);
      }

      // `new State` command
      // Returns: All india states
      // with highest cfrmd cases
      // from a fixed state
      const newDistrictPattern = /new ( ?[a-zA-Z&])+/;
      if (newDistrictPattern.test(userMessage)) {
        const stateUserMessage = newDistrictPattern.exec(userMessage)[0].split('new ')[1].replace(' & ', ' and ');
        return newDistrictWiseState(body, bot, chatId, stateUserMessage);
      }

      // `g daily` command
      // Returns: All india daily graph
      // changes for past 10 days
      if (userMessage === 'g daily') { return dailyGraph(body, bot, chatId); }

      // `statename` or `stateCode` command
      // Returns: State wise stats
      return stateName(body, userMessage, bot, chatId);
    }
    return true;
  });
});
