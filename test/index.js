'use strict';

require('chai').should();

const Starbot = require('..');

describe('Starbot', () => {
  it('store error', () => {
    try {
      Starbot();
    } catch (err) {
      err.message.should.equal('Not specified store in settings');
    }
  });

  it('bot error', () => {
    try {
      Starbot({
        store: {}
      });
    } catch (err) {
      err.message.should.equal('Not specified bot in settings');
    }
  });

  it('adapter error', () => {
    try {
      Starbot({
        bot: {},
        store: {}
      });
    } catch (err) {
      err.message.should.equal('Not specified adapter in settings');
    }
  });

  it('initialization', () => {
    Starbot({
      bot: {},
      store: {},
      adapter: {}
    });
  });

  it('communication', async () => {
    const bot = Starbot({
      bot: {
        key: 'botValue'
      },
      store: {
        get: () => {}
      },
      adapter: {
        key: 'adapterKey'
      }
    });

    bot.should.deep.equal = {
      key: 'adapterKey',
      bot: {
        store: {
          get: () => {}
        },
        key: 'botValue'
      }
    };
  });
});
