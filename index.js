'use strict';
const path = require('path');

/**
 * @typedef Bot
 * @type {object}
 * @property {string} botControl - Name of control bot module.
 */

/**
 * @typedef Store
 * @type {object}
 * @property {function} get - Get user state by user ID.
 * @property {function} set - Set user state.
 */

/**
 * Imports module path relative to the application root
 * @param {string} id - Path to module
 * @returns {module}
 */
function smartRequire (id) {
  let firstChar = id.slice(0, 1);

  if (firstChar === '.' || firstChar === '/') {
    let dirname = path.dirname(require.main.filename);
    return require(path.resolve(dirname, id));
  } else {
    return require(id);
  }
}

module.exports = function (settings) {
  settings = settings || {
    store: {},
    adapter: {}
  };

  /**
   * @type {Bot}
   */
  let bot;

  if (settings.bot) {
    switch (settings.bot.constructor) {
      case String:
        bot = smartRequire(settings.bot);
        break;
      case Object:
        bot = settings.bot;
        break;
    }
  } else {
    throw new Error('No bot module');
  }

  /**
   * @type {Store}
   */
  let store;

  if (settings.store.type) {
    let Store = smartRequire(settings.store.type);
    store = new Store(settings.store, settings.name);
  } else {
    throw new Error('No state module');
  }

  /**
   * @type {function}
   */
  let botControl;

  if (bot.botControl) {
    botControl = smartRequire(bot.botControl)(bot, store);
  } else {
    throw new Error('No botControl module');
  }

  /**
   * @type {function}
   */
  let adapter;

  if (settings.store.type) {
    let Adapter = smartRequire(settings.adapter.type);
    adapter = Adapter(settings.adapter, botControl);
  } else {
    throw new Error('No adapter module');
  }

  return adapter;
};
