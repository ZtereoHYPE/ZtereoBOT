const path = require('path')
module.exports = {
    name: 'absolve',
    aliases: ['unwarn', 'delwarn', 'delinfraction'],
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Deletes a user\'s infraction.',
    execute(message, args, database, shortcuts) {
        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'absolve', '[@member] [warn number]', 'Deletes a user\'s infraction.', database[`${message.guild.id}`]["prefix"], 'Manage Members perms required');
            return;
        }

        // if the message author doesn't have permissions to manage members say it and cancel
        if (!message.author.hasPermission('MANAGE_MEMBERS')) {
            shortcuts.functions.quickEmbed(message, "You don\'t have the permission to do that (Manage Members perms).", 'failure');
            return;
        }

        // of there are no entries in the server's database say it and cancel
        if (Object.entries(database[message.guild.id]['warnings']).length === 0) {
            shortcuts.functions.quickEmbed(message, 'This server has no infractions for any user.', 'warning');
            return;
        }

        // if the member doesn't mention a user then say it and cancel
        if (!message.mentions.users.first()) {
            shortcuts.functions.quickEmbed(message, 'Please specify a user whose infractions to remove.', 'warning');
            return;
        };

        // let user be the mentioned user and warningnumber be the first argument
        let User = message.guild.members.cache.get(message.mentions.users.first().id)
        let warningNumber = args[1]

        // if the database doesn't have warnings for that user say it and cancel
        if (!database[message.guild.id]['warnings'][User.id]) {
            shortcuts.functions.quickEmbed(message, "That user has no infractions in this server.", 'warning');
            return;
        }

        // if the database doesnt have that user then say it and cancel
        if (!database[message.guild.id]['warnings'].hasOwnProperty(User.id)) {
            shortcuts.functions.quickEmbed(message, "That user has no warnings in this server.", 'warning');
            return;
        };

        // if the warningnumber isnt present in the database for that user say it and cancel
        if (!warningNumber || !database[message.guild.id]['warnings'][User.id].hasOwnProperty(warningNumber - 1)) {
            shortcuts.functions.quickEmbed(message, `Please provide a valid warning number. To see warning numbers, use \`${database[`${message.guild.id}`]["prefix"]}warnhistory [@member]\``, 'failure');
            return;
        };

        // delete the warning from the database
        let infractionIndex = database[message.guild.id]['warnings'][User.id].indexOf(database[message.guild.id]['warnings'][User.id][warningNumber - 1])
        database[message.guild.id]['warnings'][User.id].splice(infractionIndex, 1)

        // if there are no longer warnings for that user, delete his entry
        if (database[message.guild.id]['warnings'][User.id].length == '0') {
            delete database[message.guild.id]['warnings'][User.id]
        };

        // save the database
        shortcuts.functions.saveDatabase(database);

        // send a success message
        shortcuts.functions.quickEmbed(message, `Successfully deleted ${User.user.username}'s infraction.`, 'success');
    },
};