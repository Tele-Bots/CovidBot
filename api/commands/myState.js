const request = require('request');
const { stateName } = require('./stateName');

function requestLocation(bot, chatId) {
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        [{ text: 'Send Location', request_location: true }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    }),
  };
  return bot.sendMessage(chatId, 'Location required, please tap the button below to send your location.', opts);
}

function myState(msg, body, bot, chatId) {
  const stateURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${msg.location.latitude}&longitude=${msg.location.longitude}&localityLanguage=en`;
  request(stateURL, { json: true }, (error, res, locationInfo) => {
    if (error) {
      return error;
    }

    if (!error && res.statusCode === 200) {
      return stateName(body, locationInfo.principalSubdivision.toLowerCase(), bot, chatId);
    }
    return true;
  });
}

module.exports = { requestLocation, myState };
