const Scene = require('telegraf/scenes/base');

const fromScene = new Scene('fromScene');
fromScene.enter((ctx) => {
    ctx.reply('Hi! Please send a code of from language');
});
fromScene.on('text', ctx => {
    if (ctx.message.text.length !== 2) {
        return ctx.reply('Language must be a 2 chars');
    }
    ctx.session.from = ctx.message.text.toLowerCase();
    ctx.reply(`${ctx.message.text} set as a language`).then(() => {
        return ctx.scene.leave();
    });
})

fromScene.on('message', ctx => {
    return ctx.reply(`Only text messages please!`)
})
fromScene.leave((ctx) => {
    ctx.reply('Thanks for setting language')
})

module.exports = fromScene;