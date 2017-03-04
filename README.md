# Starbot [![NPM version][npm-image]][npm-url]

## About

Starbot is a tool to launch a unified bots under different social platforms. 
Starbot functionality can be expanded by external modules.

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
