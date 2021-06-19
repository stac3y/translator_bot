let axios = require("axios").default;

module.exports = ()=> (ctx)=>{
    let options = {
        method: 'GET',
        url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/api/get',
        params: {q: ctx.message.text, langpair: `${ctx.session.from}|${ctx.session.to}`, onlyprivate: '0', mt: '1'},
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.RAPIDAPI_HOST
        }
    };
    // console.log(options);
    axios.request(options).then(function (response) {
        ctx.reply(response.data.responseData.translatedText);
    }).catch(function (error) {
       ctx.reply(error);
    });
}


