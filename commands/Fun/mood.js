const path = require('path')
module.exports = {
    name: 'mood',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'the mood',
    hidden: true,
    execute(message, args) {
        if (!args.length == 0) return;
        message.channel.send('https://cdn.discordapp.com/attachments/707110170400129034/785150453150908436/lietomyself.mp4')
    },
};