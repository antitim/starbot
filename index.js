module.exports = function (settings) {
  const {
    bot,
    store,
    adapter
  } = settings || {};

  if (!store) throw new Error('Not specified store in settings');
  if (!bot) throw new Error('Not specified bot in settings');
  if (!adapter) throw new Error('Not specified adapter in settings');

  adapter.bot = bot;
  adapter.store = store;

  return adapter;
};
