function prepareError(bot, chatId) {
  bot.sendMessage(chatId,
    'Oops ! I am too dumb to understand that. Just send the statename or statecode.\n'
    + 'Or try one of these:\n'
    + '/all - all india stats with top 15 states.\n'
    + '/daily - daily new cases for past 10 days.\n'
    + '/daily_active - daily new active cases for past 10 days.\n'
    + '/new - all the states with sorted daily new cases.\n'
    + '/test_pb - get Covid19 test labs from punjab (or any other state).\n'
    + '/daily_30 - daily new cases for past 30 days.', {
      parse_mode: 'HTML',
    });
}

module.exports = {
  prepareError,
};
