module.exports = () => async (ctx) => {
    ctx.reply(`
Hey there! Please set /from language and /to language. 
The default translate language is 'en'.`)
}