let axios = require("axios").default;

module.exports = (text, from, to)=>{
    let options = {
        method: 'GET',
        url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/api/get',
        params: {q: text, langpair: `${from}|${to}`, onlyprivate: '0', mt: '1'},
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.RAPIDAPI_HOST
        }
    };
    return axios.request(options);
    //     .then(function (response) {
    //     // console.log(response.data.responseData.translatedText)
    //     // return response.data.responseData.translatedText;
    // }).catch(function (error) {
    //    return error;
    // });
}


