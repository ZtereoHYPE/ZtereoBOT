const path = require('path');
let { exec } = require('child_process')
module.exports = {
    name: 'pull',
    aliases: ['download'],
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Sends a Test To Speech Message',
    execute(message) {
        let allowedArray = [
            '434842825805266944',
            '547767393724792844',
            '341383949462798337'
        ]

        // If the id isn't in the allowed array, return.
        if (!allowedArray.includes(message.author.id)) {
            message.reply("You are not allowed to use this command.");
            return;
        }
        
        exec('git pull').stdout.on(
            'data', (data)=>{message.channel.send(data)}
        );
    },
};