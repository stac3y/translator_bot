module.exports = () => async (ctx) => {
    ctx.reply(`
Hello! Please set /from language and /to language. 
The default translate language is 'en'.`)
}