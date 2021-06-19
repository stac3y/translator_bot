const translateFunc = require('../functions/translate.js')

module.exports = () => async (ctx) => {
    ctx.session.to = ctx.session.to || 'en';

    if (!ctx.session.from) return ctx.reply(`Please set /from language first.`);
    try {
        const result = await translateFunc(ctx.message.text, ctx.session.from, ctx.session.to);
        return ctx.reply(result.data.responseData.translatedText);
    } catch (err) {
        return ctx.reply(err);
    }

}