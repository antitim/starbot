# Starbot [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

## About

Starbot is a lightweight framework for quickly and easily creating bots for different social platforms.
Plug-ins expand functionality of the framework. The framework only manages the modules.

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
$ npm install --save starbot starbot-store-redis starbot-vk-adapter starbot-story-bot
```

## Using

```js
const app = require('express')();
const bodyParser = require('body-parser');

const Starbot = require('starbot');
const StoreRedis = require('starbot-store-redis');
const AdapterVk = require('starbot-vk-adapter');
const StoryBot = require('starbot-story-bot');


const bot1 = Starbot({
  bot: new StoryBot({
    ...configBot,
  }),
  store: new StoreRedis({
    ...configStore,
  }),
  adapter: new AdapterVk({
    ...configAdapter,
  })
});

app.use(bodyParser.json());
app.use('/bot/telegram', bot1);

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
```

## License

MIT © [antitim](http://vk.com/antitim)


[npm-image]: https://badge.fury.io/js/starbot.svg
[npm-url]: https://npmjs.org/package/starbot
[travis-image]: https://travis-ci.org/antitim/starbot.svg?branch=master
[travis-url]: https://travis-ci.org/antitim/starbot
