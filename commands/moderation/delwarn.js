const fs = require('fs');
const Discord = require('discord.js');
const path = require('path')
module.exports = {
    name: 'delwarn',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Deletes a user\'s warm.',
    execute(message, args, database, shortcuts) {
        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'delwarn', '[@member] [warn number]', 'Deletes a user\'s warm.', database[`${message.guild.id}`]["prefix"], 'Manage Members perms required');
            return;
        }

        // if the message author doesn't have permissions to manage members say it and cancel
        if (!(message.guild.member(message.author).hasPermission('MANAGE_MEMBERS') || message.guild.member(message.author).id == message.guild.ownerID)) {
            shortcuts.functions.quickEmbed(message, "you don\'t have the permission to do that (Manage Members perms).", 'failure');
            return;
        }

        // of there are no entries in the server's database say it and cancel
        if (Object.entries(database[message.guild.id]['warnings']).length === 0) {
            shortcuts.functions.quickEmbed(message, 'This server has no warnings for any user.', 'failure');
            return;
        }

        // if the member doesn't mention a user then say it and cancel
        if (!message.mentions.users.first()) {
            shortcuts.functions.quickEmbed(message, 'please specify a user whose warning to remove.', 'failure');
            return;
        };

        // let user be the mentioned user and warningnumber be the first argument
        let User = message.guild.member(message.mentions.users.first())
        let warningNumber = args[1]

        // if the database doesn't have warnings for that user say it and cancel
        if (!database[message.guild.id]['warnings'][User.id]) {
            shortcuts.functions.quickEmbed(message, "That user has no warnings in this server.", 'failure');
            return;
        }

        // if the database doesnt have that user then say it and cancel
        if (!database[message.guild.id]['warnings'].hasOwnProperty(User.id)) {
            shortcuts.functions.quickEmbed(message, "That user has no warnings in this server.", 'failure');
            return;
        };

        // if the warningnumber isnt present in the database for that user say it and cancel
        if (!warningNumber || !database[message.guild.id]['warnings'][User.id]['warns'].hasOwnProperty(warningNumber - 1)) {
            shortcuts.functions.quickEmbed(message, `please provide a valid warning number. To see warning numbers, use \`${database[`${message.guild.id}`]["prefix"]}warnhistory [@member]\``, 'failure');
            return;
        };

        // delete the warning from the database
        let warnIndex = database[message.guild.id]['warnings'][User.id]['warns'].indexOf(database[message.guild.id]['warnings'][User.id]['warns'][warningNumber - 1])
        database[message.guild.id]['warnings'][User.id]['warns'].splice(warnIndex, 1)

        // if there are no longer warnings for that user, delete his entry
        if (database[message.guild.id]['warnings'][User.id]['warns'].length == '0') {
            delete database[message.guild.id]['warnings'][User.id]
        };

        // save the database
        shortcuts.functions.saveDatabase(database);

        // send a success message
        message.channel.send(`Successfully deleted ${User.user.username}'s warning.`)
    },
};