const path = require('path')
module.exports = {
    name: 'kick',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Kicks a user.',
    execute(message, args, database, shortcuts) {
        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'kick', '[@member] [reason]', `Kicks the person out of the server.`, database[`${message.guild.id}`]["prefix"], 'Kick Members perms required');
            return
        }

        // if the message author doesn't have permissions, cancel.
        if (!(message.guild.member(message.author).hasPermission('KICK_MEMBERS') || message.guild.member(message.author).id == message.guild.ownerID)) {
            shortcuts.functions.quickEmbed(message, "You don\'t have the permission to do that (Kick Members perms).", 'failure');
            return;
        }

        // if the message doesn't mention anyone, 
        if (!message.mentions.users.first()) {
            shortcuts.functions.quickEmbed(message, 'Please specify a user to kick.', 'failure');
            return;
        };

        // let user be the first mention in the message
        let User = message.guild.member(message.mentions.users.first());

        // if the user isn't kickable, tell it and cancel
        if (!User.kickable) {
            shortcuts.functions.quickEmbed(message, "I don't have enough permissions to kick that user! Please make sure my role is high enough, and that I have Ban Members permissions.", 'failure');
            return
        }

        // shift the args skipping the mention
        var date = new Date();
        args.shift();

        // if there are no args, make them not specified
        if (args.length == 0) args = ['Not', 'specified'];

        User.kick(args.join(' '))
            .then(User => {

                if (!Object.keys(database[message.guild.id]['warnings']).includes(User.id)) {
                    database[message.guild.id]['warnings'][User.id] = []
                }

                database[message.guild.id]['warnings'][User.id].push(
                    {
                        "type": "Kick",
                        "date": `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`,
                        "reason": args.join(' ')
                    }
                )
                
                // save the database
                shortcuts.functions.saveDatabase(database);

                // send the success message
                shortcuts.functions.quickEmbed(message, `you kicked ${User.user.username} for reason: ${args.join(' ')}`, 'success');
            })
    },
};