module.exports = {
    name: "message",
    execute(message, client, database) {

        // If made by bot, cancel.
        if (message.author.bot) return;

        // If message comes from DM, say that bot doesn't work in dms *yet*
        if (message.channel.type == 'dm') {
            message.reply('I don\'t work in DMs *yet*.');
            return;
        }

        // Grab the prefix from the database
        let prefix = database[`${message.guild.id}`]["prefix"];

        if (message.content == "-help") {
            try {
                client.commands.get('help').execute(message, 0, 0, database);
            } catch (error) {
                console.error(error);
                message.reply('an error happened. Ask ZtereoHYPE to fix me please!')
            }
            return;
        }

        // If doesn't start with prefix, cancel.
        if (!message.content.startsWith(prefix)) return;

        // Split the message in command and arguments
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // If the command isn't part of the loaded commands, cancel.
        if (!client.commands.has(commandName)) return;

        // Put the command name into a command const.
        const command = client.commands.get(commandName);

        // Try to execute the command and in case of failure send error message.
        try {
            command.execute(message, args, client, database, Date.now());
        } catch (error) {
            console.error(error);
            message.reply('an error happened. Ask ZtereoHYPE to fix me please!')
        }
    }
}