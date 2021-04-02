const path = require('path')
module.exports = {
    name: 'ban',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Bans a player from the guild.',
    execute(message, args, database, shortcuts) {
        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'ban', '[@member] [reason] <days of msgs to delete (0-7)>', 'Bans a player from the server.', database[`${message.guild.id}`]["prefix"], 'Ban Member perms required');
            return;
        }

        // If the member doesn't have perms, say it and cancel
        if (!message.guild.members.cache.get(message.author.id).permissions.has('BAN_MEMBERS')) {
            shortcuts.functions.quickEmbed(message, 'You don\'t have the permission to do that (Ban Members perms).', 'failure')
            return;
        }

        // If the member does not specify a user to ban say it and cancel
        if (!message.mentions.users.first()) {
            shortcuts.functions.quickEmbed(message, 'Please specify a user to ban.', 'failure')
            return;
        };

        // let user be the mentioned user
        let User = message.guild.members.cache.get(message.mentions.users.first().id)

        // If the user isn't bannable say it and cancel
        if (!User.bannable) {
            shortcuts.functions.quickEmbed(message, 'I don\'t have enough permissions to ban that user! Please make sure my role is high enough, and that I have Ban Members permissions.', 'failure');
            return;
        }

        // let days be 0 and shift the arguments skipping the user
        let days = 0
        args.shift();

        // let the last element be the last arg
        let lastElement = args[args.length - 1]

        // if the last element is a number between 0 and 7 then accept it and set days to it, else reject it and cancel the command
        if (/[0-9]/.test(lastElement)) {
            if (parseInt(lastElement) < 8 && parseInt(lastElement) > -1) {
                days = parseInt(lastElement)
            } else {
                shortcuts.functions.quickEmbed(message, `${parseInt(lastElement)} is not a valid number of days of messages to remove. (0-7)`, 'failure')
                return;
            }
        }

        // if there are no args let them be "not specified"
        if (args.length == 0) args = ['Not', 'specified'];

        // try to ban the user
        try {
            User.ban({
                days: days,
                reason: args.join(' ')
            })
        } catch {
            message.reply(error)
        }

        // send a success message
        shortcuts.functions.quickEmbed(message, `you banned ${User.user.username} for reason: ${args.join(' ')}`, 'success');
    },
};