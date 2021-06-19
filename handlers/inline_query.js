const translateFunc = require('../functions/translate.js')

module.exports = () => async (ctx) => {
    if(!ctx.inlineQuery.query) return;
    try {
        const result = await translateFunc(ctx.inlineQuery.query, ctx.session.from, ctx.session.to);
        return ctx.answerInlineQuery([{
            type:'article',
            id: ctx.inlineQuery.id,
            title: result.data.responseData.translatedText,
            description: `${ctx.session.from} - ${ctx.session.to}`,
            input_message_content: {
                message_text: result.data.responseData.translatedText
            }
        }]);
    } catch (err) {
        return ctx.answerInlineQuery([{
            type:'article',
            id: ctx.inlineQuery.id,
            title: 'Some error',
            description: err,
        }]);
    }
}