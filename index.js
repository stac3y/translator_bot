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

    //handlers
    bot.command('lang', ctx => {
       ctx.reply(`${ctx.session.from} - ${ctx.session.to}`)
    });
    bot.on('message', message());
    bot.on('inline_query', inline_query());
    return bot;
}

init(new Telegraf(process.env.BOT_TOKEN)).then( (bot) =>{
    // await bot.launch();
    bot.telegram.setWebhook(`${process.env.URL}/bot${process.env.BOT_TOKEN}`).then(()=>{
        bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, 5000)
            console.log(`Launched ${new Date()}`)
    });
});

module.exports = init;