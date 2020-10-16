const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const ua = require('universal-analytics');
const express = require('express');
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
const { dailyActiveGraph } = require('./commands/dailyActiveGraph');
const { dailyDeceased } = require('./commands/dailyDeceased');
const { dailyRecGraph } = require('./commands/dailyRecoveredGraph');
const { graph } = require('./commands/graph');
const { dailyDecGraph } = require('./commands/dailyDeceasedGraph');
const { myState, requestLocation } = require('./commands/myState');

require('dotenv').config();

const app = express();

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

      // `daily rec` command
      // Returns: All india daily
      // recovery changes for past 10 days
      if (userMessage === 'daily rec') { return dailyRecovered(body, bot, chatId); }

      // `daily dec` command
      // Returns: All india daily
      // deceased changes for past 10 days
      if (userMessage === 'daily dec') { return dailyDeceased(body, bot, chatId); }

      // `new` command
      // Returns: All india states
      // with highest cfrmd cases
      if (userMessage === 'new') { return newStates(body, bot, chatId); }

      // `daily active N` command
      // Returns: All india daily
      // active changes for past N days
      const dailyActivePattern = /^daily active (\d+)/;
      if (dailyActivePattern.test(userMessage)) {
        const n = dailyActivePattern.exec(userMessage)[1];
        return dailyActive(body, bot, chatId, n);
      }

      // `daily rec N` command
      // Returns: All india daily
      // recovery changes for past N days
      const dailyRecPattern = /^daily rec (\d+)/;
      if (dailyRecPattern.test(userMessage)) {
        const n = dailyRecPattern.exec(userMessage)[1];
        return dailyRecovered(body, bot, chatId, n);
      }

      // `daily dec N` command
      // Returns: All india daily
      // deceased changes for past N days
      const dailyDecPattern = /^daily dec (\d+)/;
      if (dailyDecPattern.test(userMessage)) {
        const n = dailyDecPattern.exec(userMessage)[1];
        return dailyDeceased(body, bot, chatId, n);
      }

      // `daily N` command
      // Returns: All india daily
      // changes for past N days
      const dailyPattern = /^daily (\d+)/;
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

      // `g daily N` command
      // Returns: All india daily graph
      // changes for past N days
      const dailyGraphPattern = /g daily (\d+)/;
      if (dailyGraphPattern.test(userMessage)) {
        const n = dailyGraphPattern.exec(userMessage)[1];
        return dailyGraph(body, bot, chatId, n);
      }

      // `g daily active` command
      // Returns: All india daily active graph
      // changes for past 10 days
      if (userMessage === 'g daily active') { return dailyActiveGraph(body, bot, chatId); }

      // `g daily active N` command
      // Returns: All india daily active graph
      // changes for past N days
      const dailyActiveGraphPattern = /g daily active (\d+)/;
      if (dailyActiveGraphPattern.test(userMessage)) {
        const n = dailyActiveGraphPattern.exec(userMessage)[1];
        return dailyActiveGraph(body, bot, chatId, n);
      }

      // `g daily rec` command
      // Returns: All india daily recovered graph
      // changes for past 10 days
      if (userMessage === 'g daily rec') { return dailyRecGraph(body, bot, chatId); }

      // `g daily rec N` command
      // Returns: All india daily recovered graph
      // changes for past N days
      const dailyRecGraphPattern = /g daily rec (\d+)/;
      if (dailyRecGraphPattern.test(userMessage)) {
        const n = dailyRecGraphPattern.exec(userMessage)[1];
        return dailyRecGraph(body, bot, chatId, n);
      }

      // `g daily dec` command
      // Returns: All india daily deceased graph
      // changes for past 10 days
      if (userMessage === 'g daily dec') { return dailyDecGraph(body, bot, chatId); }

      // `g daily dec N` command
      // Returns: All india daily deceased graph
      // changes for past N days
      const dailyDecGraphPattern = /g daily dec (\d+)/;
      if (dailyDecGraphPattern.test(userMessage)) {
        const n = dailyDecGraphPattern.exec(userMessage)[1];
        return dailyDecGraph(body, bot, chatId, n);
      }

      // `graph` command
      // Returns: All india daily graph
      // summary for past 10 days
      if (userMessage === 'graph') {
        return graph(body, bot, chatId);
      }

      // `graph N` command
      // Returns: All india daily graph
      // summary for past N days
      const graphPattern = /graph (\d+)/;
      if (graphPattern.test(userMessage)) {
        const n = graphPattern.exec(userMessage)[1];
        return graph(body, bot, chatId, n);
      }

      // `my state` command
      // Returns: State wise stats of the
      // state obtained from user location
      if (userMessage === 'my state') {
        return requestLocation(bot, chatId);
      }

      // `statename` or `stateCode` command
      // Returns: State wise stats
      return stateName(body, userMessage, bot, chatId);
    }
    return true;
  });
});

// Main function which recieves the user location and acts upon it
bot.on('location', (msg) => {
  const chatId = msg.chat.id;
  request(url, options, (error, res, body) => {
    if (error) {
      return error;
    }

    if (!error && res.statusCode === 200) {
      // `my state` command
      // Returns: State wise stats of the
      // state obtained from user location
      return myState(msg, body, bot, chatId);
    }
    return true;
  });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server runnning');
});
