const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
const bodyParser = require('body-parser')

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
const url = 'https://telegram-reverse-bot.glitch.me/'
const port = process.env.PORT

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TELEGRAM_TOKEN)

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TELEGRAM_TOKEN}`)

const app = express()

app.use(bodyParser.json());

app.post(`/bot${TELEGRAM_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body)
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Express server is listening on ${port}`)
})

function reverseString(s) {
  return s.split('').reverse().join('')
}

bot.on('message', (msg) => {
  console.log(msg)
  if (msg.text)
    bot.sendMessage(msg.chat.id, reverseString(msg.text))
})
