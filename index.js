const {Telegraf, Stage, session} = require('telegraf');
// const TLS = require('telegraf-session-local');
require('custom-env').env('staging');
const Scene = require('telegraf/scenes/base');

//commands
const startCommand = require('./commands/start.js');
const helpCommand = require('./commands/help.js');

//scenes
const fromScene = require('./scenes/from')
const toScene = require('./scenes/to')

//handlers
const message = require('./handlers/message')
const inline_query = require('./handlers/inline_query')

const init = async (bot)=>{
    //stage, scenes
    const stage = new Stage([fromScene, toScene]);
    //middlewares
    // bot.use(new TLS({database: 'data/session.json'}).middleware());
    bot.use(session());
    bot.use(stage.middleware());

    //commands
    bot.start(startCommand());
    bot.help(helpCommand());
    bot.command('from', ctx => {
        ctx.scene.enter('fromScene');
    });
    bot.command('to', ctx => {
        ctx.scene.enter('toScene');
    });
    bot.command('lang', ctx => {
       ctx.reply(`${ctx.session.from} - ${ctx.session.to}`)
    });
    bot.command('env', ctx => {
        ctx.reply(`ENV is ${process.env.NODE_ENV}`)
    })
    //handlers
    bot.on('message', message());
    bot.on('inline_query', inline_query());
    return bot;
}

init(new Telegraf(process.env.BOT_TOKEN)).then( (bot) =>{
    if (process.env.NODE_ENV === 'production'){
        bot.telegram.setWebhook(`${process.env.URL}bot${process.env.BOT_TOKEN}`).then(()=>{
            bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, process.env.PORT)
            console.log(`Launched ${new Date()}`)
        });
    }
    else
    {
        bot.launch().then(()=>{
            console.log(`Launched ${new Date()}`)
        })
    }

});

module.exports = init;