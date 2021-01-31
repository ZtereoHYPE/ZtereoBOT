const owoify = require('owoify-js').default
const path = require('path')
module.exports = {
    name: 'owo',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Owoifies a message.',
    execute(message, args, database, shortcuts) {
        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'owo', '[message to owoify]', 'OwOifies a message.', database[`${message.guild.id}`]["prefix"]);
            return;
        }

        // Randomly choose one of the 3 modes of OwOification
        let owo
        switch (Math.ceil(Math.random() * 3)) {
            case 1:
                owo = 'owo'
                break;
            case 2:
                owo = 'uwu'
                break;
            case 3:
                owo = 'uvu'
        }

        // Delete the original message
        message.delete();

        // Send the OwOsified message
        message.channel.send(owoify(args.join(' '), owo))
    },
};
