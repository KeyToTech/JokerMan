const SlackBot = require('slackbots');
const axios = require('axios')

const slack_channel = "off_top"

const bot = new SlackBot({
    token: 'xoxb-196355864036-423288689844-g5kjnAAqhvCAxNydgD4mxl4S',
    name: 'jokerman'
});

// Start Handler
bot.on('start', () => {
    var params = {
        icon_emoji: ':smiley:'
    };
    bot.postMessageToChannel(
        slack_channel, 
        'Get ready to laugh with JokerMan',
        params
    );
});

// Error handler
bot.on('error', (err) => console.log(err));

//Message handler
bot.on('message', (data) => {
    if(data.type == 'message'){
        console.log(data);
        if(data.username !== 'jokerman'){
            handleMessage(data.user, data.text)
        }
    }
});

//Respons to Data
function handleMessage(fromUser, message){
    if(message.includes(' chucknorris')){
        chuckJoke();
    } else if (message.includes(' random')) {
        randomJoke();
    } else if (message.includes(' not funny')){
        stilLearningMessage();
    } else {
        sorryMessage();
    }
}

// Tell a Chuck Norris joke
function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random')
        .then(res => {
            const joke = res.data.value.joke;
            console.log(joke);
            var params = {
                icon_emoji: ':laughing:'
            };
            sendJoke(
                params,
                `Chuck Norris: ${joke}`
            )
        })
}

function randomJoke() {
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.get('https://icanhazdadjoke.com/')
    .then(res => {
        const joke = res.data.joke
        console.log(res)
        var params = {
            icon_emoji: ':laughing:'
        };
        sendJoke(
            params,
            `Random one: ${joke}`
        )
    })
}

function sendJoke(params, joke){
    bot.postMessageToChannel(
        slack_channel, 
        joke,
        params
    );
}

function sorryMessage() {
    var params = {
        icon_emoji: ':confused:'
    };
    bot.postMessageToChannel(
        slack_channel,
        'Sorry, I can tell jokes about :chucknorris or :random only for now:(',
        params
    );
}

function stilLearningMessage() {
    var params = {
        icon_emoji: ':upside_down_face:'
    };
    bot.postMessageToChannel(
        slack_channel,
        'Well, I\'m still learning...',
        params
    );
}