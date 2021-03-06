const path = require('path')
module.exports = {
    name: 'warn',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Warns a user for rule-breaking and adds the warning to a user-specific record.',
    execute(message, args, database, shortcuts) {
        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'warn', '[@member] [reason]', 'Warns a user for rule-breaking and adds the warning along with its reasons to a record.', database[`${message.guild.id}`]["prefix"], 'Kick Members perms required');
            return;
        }

        // if the author doesn't have enough permissions say it and cancel
        if (!message.guild.members.cache.get(message.author.id).permissions.has('KICK_MEMBERS')) {
            shortcuts.functions.quickEmbed(message, 'You don\'t have the permission to do that (Kick Members perms)', 'failure');
            return;
        }

        // if the message doesnt mention anyone, say it and cancel
        if (!message.mentions.users.first()) {
            shortcuts.functions.quickEmbed(message, 'Please specify a user to warn.', 'failure');
            return;
        };

        // let user be the first mention
        let User = message.guild.members.cache.get(message.mentions.users.first().id)

        // shift args to remove mention
        args.shift();

        // if no args left change them to not specified
        if (args.length == 0) args = ['Not', 'specified'];
        var date = new Date();

        
        if (!Object.keys(database[message.guild.id]['warnings']).includes(User.id)) {
            database[message.guild.id]['warnings'][User.id] = []
        }

        database[message.guild.id]['warnings'][User.id].push(
            {
                "type": "Warning",
                "date": `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`,
                "reason": args.join(' ')
            }
        )

        // save the database
        shortcuts.functions.saveDatabase(database);

        // send success message
        shortcuts.functions.quickEmbed(message, `You warned ${User.user.username} for reason: ${args.join(' ')}\n (warning number ${Object.keys(database[message.guild.id]['warnings'][User.id]).length})`, 'success');
    }
};