const owoify = require('owoify-js').default
const path = require('path')
module.exports = {
    name: 'owo',
    aliases: ['uwu'],
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Owoifies a message.',
    execute(message, args, database, shortcuts) {
        // Help command
        if (!args.length) {
            shortcuts.functions.helpCommand(message, 'owo', '[message to owoify]', 'OwOifies a message.', database[`${message.guild.id}`]["prefix"]);
            return;
        }
        
        // Delete the original message
        message.delete();

        // Send the OwOsified message with a mode randomly chosen between the 3 available
        message.channel.send(owoify(args.join(' '), ['owo', 'uwu', 'uvu'][Math.round(Math.random()*3)]))
    },
};
