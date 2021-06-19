const Scene = require('telegraf/scenes/base');

const toScene = new Scene('toScene');
toScene.enter((ctx) =>{
    ctx.reply('Hi! Please send a code of translate language');
});
toScene.on('text', ctx=>{
    if (ctx.message.text.length !== 2){
        return ctx.reply('Language must be a 2 chars');
    }
    ctx.session.to = ctx.message.text.toLowerCase();
    ctx.reply(`${ctx.message.text} set as a translate language`).then(() => {
        return ctx.scene.leave();
    });
})

toScene.on('message', ctx=>{
    return ctx.reply(`Only text messages please!`)
})
toScene.leave((ctx)=>{
    ctx.reply('Thanks for setting translate language')
})

module.exports = toScene;