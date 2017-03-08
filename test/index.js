'use strict';

require('chai').should();

const Starbot = require('..');

describe('Starbot', () => {
  it('store error', async () => {
    try {
      Starbot({
        name: 'BotTest'
      });
    } catch (err) {
      err.message.should.equal('Not specified store in settings');
    }
  });

  it('bot error', async () => {
    try {
      Starbot({
        name: 'BotTest',
        store: {
          type: './test/fixtures/store'
        }
      });
    } catch (err) {
      err.message.should.equal('Not specified bot in settings');
    }
  });

  it('adapter error', async () => {
    try {
      Starbot({
        name: 'BotTest',
        bot: './test/fixtures/botScript',
        store: {
          type: './test/fixtures/store'
        }
      });
    } catch (err) {
      err.message.should.equal('Not specified adapter in settings');
    }
  });

  it('initialization', async () => {
    Starbot({
      name: 'BotTest',
      bot: './test/fixtures/botScript',
      store: './test/fixtures/store',
      adapter: './test/fixtures/adapter'
    });
  });

  it('communication', async () => {
    const bot = Starbot({
      name: 'BotTest',
      bot: './test/fixtures/botScript',
      store: {
        type: './test/fixtures/store',
        settings: 'storeSettings'
      },
      adapter: {
        type: './test/fixtures/adapter',
        settings: 'adapterSettings'
      }
    });

    bot.should.deep.equal = {
      adapter: 'adapterSettings',
      store: {
        botName: 'BotTest',
        settings: 'storeSettings'
      },
      botStory: 'Some story'
    };
  });
});
