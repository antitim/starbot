# Starbot [![NPM version][npm-image]][npm-url]

## About

Starbot is a lightweight framework to quickly and easily create a bot for the different social platforms.
The framework extends the functionality of the plugins. The framework only manages the modules.

![Starbot](doc/starbot.png)

### Types of modules
Modules storage:

- [starbot-store-redis](https://github.com/antitim/starbot-store-redis)
- [starbot-store-object](https://github.com/antitim/starbot-store-object)

Modules adapters:

- [starbot-vk-adapter](https://github.com/antitim/starbot-vk-adapter)
- [starbot-telegram-adapter](https://github.com/antitim/starbot-telegram-adapter)
- [starbot-facebook-adapter](https://github.com/antitim/starbot-facebook-adapter)

Modules to control the bot:

- [starbot-story-bot](https://github.com/antitim/starbot-story-bot)
- [starbot-ktotam-bot](https://github.com/antitim/starbot-ktotam-bot)

## Installation

```sh
$ npm install --save starbot
```

## Using

```js
const app = require('express')();
const Starbot = require('starbot');
const bodyParser = require('body-parser');

const bot1 = Starbot({
  name: 'BotSmartTelegram',
  bot: './path/to/bot',
  store: {
    type: 'starbot-store-object'
  },
  adapter: {
    type: 'starbot-telegram-adapter',
    token: 'token'
  }
});

const bot2 = Starbot({
  name: 'BotSmartVk',
  bot: './path/to/bot',
  store: {
    type: 'starbot-store-object'
  },
  adapter: {
    type: 'starbot-vk-adapter',
    token: 'token',
    groupId: 'groupId',
    confirmCode: 'confirmCode'
  }
});

app.use(bodyParser.json());
app.use('/bot/telegram', bot1);
app.use('/bot/vk', bot2);

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
```

## License

MIT © [antitim](http://vk.com/antitim)


[npm-image]: https://badge.fury.io/js/starbot.svg
[npm-url]: https://npmjs.org/package/starbot
