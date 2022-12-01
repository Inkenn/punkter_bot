var express = require('express');
const https = require('https');
const async = require('async');
const { Telegraf } = require('telegraf');
var app = express();
var options = {};
const fs = require('fs-extra');

app.use(express.static(__dirname));

// Запустить сервер
https.createServer(options, app).listen(3101, '0.0.0.0');
app.listen(1210);

function loggerTime(logstring) {
    let string = "[MSMPUBKTER-TG][" + new Date().toISOString() + "]" + logstring
    console.log(string);
}

const bot = new Telegraf("") // в кавычки вписать токен
bot.on('text', async function (ctx) {
    let message = ctx.message.text;
    if ((message.indexOf("1.") == 0)) {
        let punkter_array = [];
        if (message.indexOf("\n2.") > 0 && (message.indexOf("\n2.") > message.indexOf("\n1. "))) {
            let punkt = 2;
            let lastIndex = message.indexOf("\n" + punkt + ".");
            punkter_array.push(message.slice(0, lastIndex));
            while (lastIndex < message.length) {
                lastIndex = (message.indexOf("\n" + (punkt + 1) + ".") > lastIndex) ? message.indexOf("\n" + (punkt + 1) + ".") : message.length;
                punkter_array.push(message.slice(message.indexOf("\n" + (punkt) + ".") + 1, lastIndex));
                punkt++;
            }
            await sender(ctx.chat.id, punkter_array, punkter_array.length, ctx)
        }
    }
})
bot.on('channel_post', async function (ctx) {
    let message = ctx.update.channel_post.text;
    if ((message.indexOf("1.") == 0)) {
        let punkter_array = [];
        if (message.indexOf("\n2.") > 0 && (message.indexOf("\n2.") > message.indexOf("\n1."))) {
            let punkt = 2;
            let lastIndex = message.indexOf("\n" + punkt + ".");
            punkter_array.push(message.slice(0, lastIndex));
            while (lastIndex < message.length) {
                lastIndex = (message.indexOf("\n" + (punkt + 1) + ".") > lastIndex) ? message.indexOf("\n" + (punkt + 1) + ".") : message.length;
                punkter_array.push(message.slice(message.indexOf("\n" + (punkt) + ".") + 1, lastIndex));
                punkt++;
            }
            await sender(ctx.chat.id, punkter_array, punkter_array.length, ctx)
        }
    }
})

async function sender(tochat, punkter_array, i, ctx) {
    setTimeout(async function () {
        try {
            await ctx.telegram.sendMessage(tochat, punkter_array[punkter_array.length - i]);
        }
        catch (err) {
            if (err) throw err;
        }
        if (--i) sender(tochat, punkter_array, i, ctx);
    }, 1000)
};

bot.launch()