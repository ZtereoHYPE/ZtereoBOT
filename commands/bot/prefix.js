const path = require('path')
module.exports = {
    name: 'prefix',
    category: path.dirname(__filename).split(path.sep).pop(),
    description: 'Changes the prefix.',
    execute(message, args, database, shortcuts) {
        // Help command
        if (!args.length || args[0] == 'help') {
            shortcuts.functions.helpCommand(message, 'prefix', '[new prefix]', 'Changes the current server\'s prefix.', database[`${message.guild.id}`]["prefix"], 'Server Owner only');
            return;
        }

        // If the message author isn't the guild owner return.
        if (!(message.guild.member(message.author).id == message.guild.ownerID)) {
            message.reply("you don\'t have the permission to do that (Server Owner).");
            return;
        }

        // Gets the first argument and sets it as prefix
        database[message.guild.id]["prefix"] = args[0];

        // Saves the modified JSON file
        shortcuts.functions.saveDatabase(database);

        // Sends success embed
        shortcuts.functions.quickEmbed(message, `The new prefix is now \`${database[message.guild.id]["prefix"]}\``, 'success');
    },
};