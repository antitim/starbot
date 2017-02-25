# Starbot [![NPM version][npm-image]][npm-url]

## Что это?

Starbot - это инструмент для запуска унифицированных ботов под разные социальные платформы. 
Функционал Starbot можно расширить за счёт внешних модулей.

## Установка

```sh
$ npm install --save starbot
```

## Использование

```js
const Starbot = require('starbot');
const app = require('express')();

const bot = new Starbot({
  store: 'starbot-store-object'
});

app.use('/bot/vk', bot.use('./bots/bot1', 'vk'));

app.listen(3000, function () {
  onsole.log('Example app listening on port 3000!');
});
```

## Лицензия

MIT © [antitim](http://vk.com/antitim)


[npm-image]: https://badge.fury.io/js/starbot.svg
[npm-url]: https://npmjs.org/package/starbot
