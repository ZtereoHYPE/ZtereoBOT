const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "message",
    execute(message, client, database, shortcuts) {

        // If made by bot, cancel.
        if (message.author.bot) return;

        // If message comes from DM, say that bot doesn't work in dms *yet*
        if (message.channel.type == 'dm') {
            message.reply('I don\'t work in DMs *yet*.');
            return;
        }

        // Grab the prefix from the database
        let prefix = database[`${message.guild.id}`]["prefix"];

        // If doesn't start with prefix, cancel.
        if (!message.content.startsWith(prefix)) return;

        // Split the message in command and arguments.
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Put the command name into a command const.
        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        // If the command doesn't exist, cancel.
        if (!command) return;

        // Try to execute the command and in case of failure send error message.
        try {
            command.execute(message, args, database, shortcuts, client);
        } catch (error) {
            console.error(error);
            const embed = new MessageEmbed()
                .setColor('#FF1B1B')
                .setTitle('Oopsie woopsie!')
                .setDescription('UwU the bot did a fucky wucky! A little fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!')
                .addField("Error:", `\`\`\`${error}\`\`\``)
                .setFooter('kill me please')
                .setTimestamp()
            message.channel.send(embed);
        }
    }
}