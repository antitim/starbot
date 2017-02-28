'use strict';
const path = require('path');

function smartRequire (id) {
  let firstChar = id.slice(0, 1);

  if (firstChar === '.' || firstChar === '/') {
    let dirname = path.dirname(require.main.filename);
    return require(path.resolve(dirname, id));
  } else {
    return require(id);
  }
}

class StarBot {
  constructor (settings) {
    settings = settings || {};

    /**
     * Подключаем store
     */
    let Store = smartRequire(settings.store);
    this.store = new Store(settings);

    this.use = (botScript, presetName) => {
      /**
       * Загружаем скрипт бота
       */
      let bot;

      switch (botScript.constructor) {
        case String:
          /**
           * Указан путь к файлу. Загружаем файл.
           */
          bot = smartRequire(botScript);
          break;
        case Object:
          /**
           * Указан объект с ботом
           */
          bot = botScript;
          break;
      }

      /**
       * Создаём инстанс store для конкретного бота
       */
      let store = this.store.run(bot['name']);

      /**
       * Подключаем управляющего ботом
       */
      let botControlName = bot['botControl'];
      let botControl = smartRequire(botControlName)(bot, store);

      /**
       * Подключаем адаптер
       */
      let adapterPreset = bot[presetName];
      let Adapter = smartRequire(adapterPreset.type);

      let botAdapter = new Adapter(adapterPreset, botControl);

      return botAdapter.receiver;
    };
  };
}

module.exports = StarBot;
