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
    return require(path.resolve(process.cwd(), id));
  } else {
    return require(id);
  }
}

module.exports = function (settings) {
  settings = settings || {};

  if (!settings.store) {
    throw new Error('Not specified store in settings');
  }

  if (!settings.bot) {
    throw new Error('Not specified bot in settings');
  }

  if (!settings.adapter) {
    throw new Error('Not specified adapter in settings');
  }

  if (settings.store.constructor === String) {
    settings.store = {
      type: settings.store
    };
  }

  if (settings.bot.constructor === String) {
    settings.bot = {
      path: settings.bot
    };
  }

  if (settings.adapter.constructor === String) {
    settings.adapter = {
      type: settings.adapter
    };
  }

  let Store = smartRequire(settings.store.type);

  /**
   * @type {Store}
   */
  let store = new Store(settings.store, settings.name);

  /**
   * @type {Bot}
   */
  let bot = smartRequire(settings.bot.path);

  /**
   * @type {function}
   */
  let botControl;

  if (bot.botControl) {
    botControl = smartRequire(bot.botControl)(bot, store);
  } else {
    throw new Error('Not specified botControl in bot file');
  }

  let Adapter = smartRequire(settings.adapter.type);
  /**
   * @type {function}
   */
  let adapter = Adapter(settings.adapter, botControl);

  return adapter;
};
