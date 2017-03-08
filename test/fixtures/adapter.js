'use strict';

module.exports = function (settings, botControl) {
  let { botStory, store } = botControl;
  return {
    adapter: settings.settings,
    store,
    botStory
  };
};
