'use strict';

class StarBot {
  constructor (settings) {
    settings = settings || {};

    /**
     * Подключаем store
     */
    let Store = require(settings.store);
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
          bot = require(botScript);
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
      let botControl = require(botControlName)(bot, store);

      /**
       * Подключаем адаптер
       */
      let adapterPreset = bot[presetName];
      let Adapter = require(adapterPreset.type);

      let botAdapter = new Adapter(adapterPreset, botControl);

      return botAdapter.receiver;
    };
  };
}

module.exports = StarBot;
